/**
 * One-shot migration: Storyblok werk/* stories → Supabase projects table.
 *
 * Usage:
 *   1. Add to .env (NOT .env.example): SUPABASE_SERVICE_ROLE_KEY, PUBLIC_STORYBLOK_ACCESS_TOKEN
 *      (PUBLIC_SUPABASE_URL must also be set.)
 *   2. Dry run first to preview:
 *        npx tsx scripts/migrate-from-storyblok.ts --dry-run
 *   3. Real run:
 *        npx tsx scripts/migrate-from-storyblok.ts
 *
 * Notes:
 *   - Reuses Storyblok asset URLs (a.storyblok.com/...) for images.
 *     Replace via the admin Media library afterwards if you want to fully
 *     decouple from Storyblok.
 *   - Skips projects whose slug already exists in Supabase (idempotent).
 */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const STORYBLOK_TOKEN = process.env.PUBLIC_STORYBLOK_ACCESS_TOKEN;
const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DRY_RUN = process.argv.includes('--dry-run');

if (!STORYBLOK_TOKEN) throw new Error('PUBLIC_STORYBLOK_ACCESS_TOKEN missing');
if (!SUPABASE_URL || !SERVICE_ROLE) throw new Error('Supabase URL or service role key missing');

const supa = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

interface StoryblokAsset {
	filename?: string;
	alt?: string;
}
interface StoryblokProject {
	hoofdAfbeelding?: StoryblokAsset;
	projectTitel?: string;
	projectBeschrijving?: string;
	klant?: string;
	jaar?: string | number;
	tags?: string[];
	afbeelding1?: StoryblokAsset;
	afbeelding2?: StoryblokAsset;
	afbeelding3?: StoryblokAsset;
	afbeelding4?: StoryblokAsset;
	afbeelding5?: StoryblokAsset;
}
interface Story {
	id: number;
	name: string;
	slug: string;
	position: number;
	content: StoryblokProject & Record<string, unknown>;
}

async function fetchAllStories(): Promise<Story[]> {
	const all: Story[] = [];
	let page = 1;
	const perPage = 100;

	while (true) {
		const url = `https://api.storyblok.com/v2/cdn/stories?token=${STORYBLOK_TOKEN}&starts_with=werk/&version=published&per_page=${perPage}&page=${page}&sort_by=position:asc`;
		const res = await fetch(url);
		if (!res.ok) throw new Error(`Storyblok ${res.status}: ${await res.text()}`);
		const data = await res.json();
		const stories = (data.stories ?? []) as Story[];
		all.push(...stories);
		if (stories.length < perPage) break;
		page++;
	}

	return all;
}

function transform(story: Story) {
	const c = story.content;
	const gallery = [c.afbeelding1, c.afbeelding2, c.afbeelding3, c.afbeelding4, c.afbeelding5]
		.filter((img): img is StoryblokAsset => Boolean(img?.filename))
		.map((img) => ({ url: img.filename!, alt: img.alt ?? '' }));

	return {
		slug: story.slug,
		name: story.name,
		klant: c.klant ?? null,
		jaar: c.jaar != null ? String(c.jaar) : null,
		tags: Array.isArray(c.tags) ? c.tags : [],
		project_titel: c.projectTitel ?? null,
		project_beschrijving: c.projectBeschrijving ?? null,
		hoofd_afbeelding_url: c.hoofdAfbeelding?.filename ?? null,
		hoofd_afbeelding_alt: c.hoofdAfbeelding?.alt ?? null,
		afbeeldingen: gallery,
		meta_description: null,
		status: 'published' as const,
		sort_order: story.position ?? 0
	};
}

async function main() {
	console.log(`Fetching Storyblok stories under werk/ ...`);
	const stories = await fetchAllStories();
	console.log(`Found ${stories.length} story/stories.\n`);

	const { data: existing } = await supa.from('projects').select('slug');
	const existingSlugs = new Set((existing ?? []).map((r: { slug: string }) => r.slug));

	let created = 0;
	let skipped = 0;
	for (const s of stories) {
		const row = transform(s);
		if (existingSlugs.has(row.slug)) {
			console.log(`  - skip (exists): ${row.slug}`);
			skipped++;
			continue;
		}
		console.log(`  + ${DRY_RUN ? 'WOULD insert' : 'inserting'}: ${row.slug}  (${row.name})`);
		if (DRY_RUN) {
			created++;
			continue;
		}
		const { error } = await supa.from('projects').insert(row);
		if (error) {
			console.error(`    ! failed: ${error.message}`);
		} else {
			created++;
		}
	}

	console.log(`\nDone. ${DRY_RUN ? '[DRY-RUN] Would have inserted' : 'Inserted'} ${created}, skipped ${skipped}.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
