-- ============================================
-- Storage bucket for media uploads
-- ============================================
-- Run this AFTER 001 in the Supabase SQL editor.
-- Creates a public "media" bucket and access policies.

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can read (the bucket is public — required for serving images on the site)
CREATE POLICY "Public can read media files"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'media');

-- Only authenticated admins can upload, update, or delete
CREATE POLICY "Authenticated users can upload media"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can update media"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can delete media"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'media');
