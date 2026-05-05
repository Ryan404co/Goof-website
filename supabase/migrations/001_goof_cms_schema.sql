-- ============================================
-- Goof CMS — Database Schema
-- ============================================

-- Helper: auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- site_texts — key/value editable copy
-- ============================================
-- One row per editable string/list/object on the site.
-- key       → dotted identifier, e.g. "home.hero.headline_lines"
-- page      → grouping for admin UI ("home", "over", "diensten", ...)
-- field_type→ tells admin which input widget to render
-- value     → JSONB so a single column can hold strings, arrays, or objects
CREATE TABLE site_texts (
    key TEXT PRIMARY KEY,
    page TEXT NOT NULL,
    field_type TEXT NOT NULL DEFAULT 'text'
        CHECK (field_type IN ('text', 'textarea', 'list', 'rich', 'url', 'email', 'tel')),
    label TEXT NOT NULL,
    value JSONB NOT NULL DEFAULT '""'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_site_texts_page ON site_texts(page, sort_order);

CREATE TRIGGER site_texts_updated_at
    BEFORE UPDATE ON site_texts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE site_texts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read texts"
    ON site_texts FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage texts"
    ON site_texts FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- projects — replaces Storyblok werk/ stories
-- ============================================
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,                            -- shown as page H1 (was story.name)
    klant TEXT,
    jaar TEXT,                                     -- string to allow "2024", "2024–2025"
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    project_titel TEXT,
    project_beschrijving TEXT,
    hoofd_afbeelding_url TEXT,                     -- cover image
    hoofd_afbeelding_alt TEXT,
    afbeeldingen JSONB NOT NULL DEFAULT '[]',      -- gallery: [{url, alt}, ...]
    meta_description TEXT,
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status_sort ON projects(status, sort_order);

CREATE TRIGGER projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published projects"
    ON projects FOR SELECT
    USING (status = 'published');

CREATE POLICY "Authenticated users can read all projects"
    ON projects FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can manage projects"
    ON projects FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- media — uploaded files index
-- ============================================
-- Files live in Supabase Storage (bucket "media").
-- This table is a metadata index so we can browse + reuse uploads.
CREATE TABLE media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL UNIQUE,
    public_url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL DEFAULT 0,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_media_created_at ON media(created_at DESC);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read media"
    ON media FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage media"
    ON media FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
