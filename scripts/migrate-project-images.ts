/**
 * Migrate every Storyblok-hosted project image (cover + gallery) to Supabase Storage,
 * register it in the `media` table, and rewrite the project rows to point at the new URLs.
 *
 * Idempotent: an image already on supabase.co is left alone, so re-running is safe.
 *
 * Run:
 *   npx tsx scripts/migrate-project-images.ts --dry-run      # preview only
 *   npx tsx scripts/migrate-project-images.ts                # actually migrate
 */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const DRY_RUN = process.argv.includes('--dry-run');

if (!SUPABASE_URL || !SERVICE_ROLE) throw new Error('Supabase URL or service role key missing');

const supa = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

interface GalleryImage {
	url: string;
	alt?: string;
}
interface ProjectRow {
	id: string;
	slug: string;
	hoofd_afbeelding_url: string | null;
	hoofd_afbeelding_alt: string | null;
	afbeeldingen: GalleryImage[];
}

function isStoryblok(url: string | null | undefined): boolean {
	return !!url && url.includes('a.storyblok.com');
}

function deriveFilename(storyblokUrl: string, projectSlug: string, suffix: string): string {
	// pull the original filename from the URL: .../filename.png
	const last = storyblokUrl.split('/').pop() ?? 'image.png';
	const base = last.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
	return `${projectSlug}-${suffix}-${base}.webp`;
}

async function uploadFromStoryblok(
	sourceUrl: string,
	projectSlug: string,
	suffix: string,
	altText: string | null
): Promise<string> {
	// Storyblok delivers an optimized WebP at the source CDN — fetch a large master (2000w)
	const transformedUrl = `${sourceUrl}/m/2000x0/filters:quality(85):format(webp)`;
	const res = await fetch(transformedUrl);
	if (!res.ok) throw new Error(`Storyblok fetch ${res.status} for ${sourceUrl}`);
	const buffer = await res.arrayBuffer();

	const filename = deriveFilename(sourceUrl, projectSlug, suffix);
	const storagePath = `${Date.now()}-${filename}`;

	if (DRY_RUN) {
		console.log(
			`    + WOULD upload ${(buffer.byteLength / 1024).toFixed(0)} KB → media/${storagePath}`
		);
		return `https://placeholder/${storagePath}`;
	}

	const { error: upErr } = await supa.storage
		.from('media')
		.upload(storagePath, buffer, { contentType: 'image/webp', upsert: false });
	if (upErr) throw upErr;

	const { data: pub } = supa.storage.from('media').getPublicUrl(storagePath);
	const publicUrl = pub.publicUrl;

	const { error: dbErr } = await supa.from('media').insert({
		filename,
		storage_path: storagePath,
		public_url: publicUrl,
		mime_type: 'image/webp',
		file_size: buffer.byteLength,
		width: 2000,
		alt_text: altText
	});
	if (dbErr) {
		await supa.storage.from('media').remove([storagePath]);
		throw dbErr;
	}

	console.log(`    ✓ ${(buffer.byteLength / 1024).toFixed(0)} KB → ${storagePath}`);
	return publicUrl;
}

async function main() {
	const { data: projects, error } = await supa
		.from('projects')
		.select('id, slug, hoofd_afbeelding_url, hoofd_afbeelding_alt, afbeeldingen')
		.order('sort_order', { ascending: true });

	if (error) throw error;

	console.log(`Found ${projects?.length ?? 0} project(s) to inspect.\n`);

	let migrated = 0;
	let skipped = 0;

	for (const p of (projects ?? []) as ProjectRow[]) {
		console.log(`--- ${p.slug} ---`);
		const updates: Partial<ProjectRow> = {};

		if (isStoryblok(p.hoofd_afbeelding_url)) {
			console.log(`  cover:`);
			const newUrl = await uploadFromStoryblok(
				p.hoofd_afbeelding_url!,
				p.slug,
				'cover',
				p.hoofd_afbeelding_alt
			);
			updates.hoofd_afbeelding_url = newUrl;
			migrated++;
		} else if (p.hoofd_afbeelding_url) {
			console.log(`  cover: already migrated (skip)`);
			skipped++;
		}

		if (Array.isArray(p.afbeeldingen) && p.afbeeldingen.length > 0) {
			const newGallery: GalleryImage[] = [];
			for (let i = 0; i < p.afbeeldingen.length; i++) {
				const img = p.afbeeldingen[i];
				if (isStoryblok(img.url)) {
					console.log(`  gallery[${i}]:`);
					const newUrl = await uploadFromStoryblok(
						img.url,
						p.slug,
						`gallery-${i + 1}`,
						img.alt ?? null
					);
					newGallery.push({ url: newUrl, alt: img.alt });
					migrated++;
				} else {
					newGallery.push(img);
					if (img.url) skipped++;
				}
			}
			if (newGallery.some((g, i) => g.url !== p.afbeeldingen[i].url)) {
				updates.afbeeldingen = newGallery;
			}
		}

		if (!DRY_RUN && Object.keys(updates).length > 0) {
			const { error: upErr } = await supa.from('projects').update(updates).eq('id', p.id);
			if (upErr) {
				console.error(`  ! update failed: ${upErr.message}`);
			} else {
				console.log(`  ✓ project row updated`);
			}
		} else if (DRY_RUN && Object.keys(updates).length > 0) {
			console.log(`  + WOULD update project row with ${Object.keys(updates).join(', ')}`);
		} else {
			console.log(`  (nothing to update)`);
		}
	}

	console.log(`\n${DRY_RUN ? '[DRY-RUN] Would have migrated' : 'Migrated'} ${migrated} image(s); ${skipped} already on Supabase.`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
