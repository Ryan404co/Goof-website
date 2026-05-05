/**
 * One-shot: download the over-page portrait from Storyblok (as optimized WebP),
 * upload it to Supabase Storage `media` bucket, register it in the `media` table,
 * and update site_texts['over.body.image_url'] to point to the new URL.
 */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const SOURCE = 'https://a.storyblok.com/f/287568057655304/1080x1600/0c5168c551/zara_ter_steege_goof.jpeg';
// Storyblok will resize + convert on the fly; 1280w is plenty for the 640px-tall display slot
const TRANSFORMED = `${SOURCE}/m/1280x0/filters:quality(85):format(webp)`;
const FILENAME = 'zara-ter-steege-goof.webp';
const ALT = 'Zara ter Steege, oprichter van Goof';

const supa = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

async function main() {
	console.log(`Fetching ${TRANSFORMED} ...`);
	const res = await fetch(TRANSFORMED);
	if (!res.ok) throw new Error(`Storyblok fetch ${res.status}`);
	const buffer = await res.arrayBuffer();
	console.log(`  Got ${(buffer.byteLength / 1024).toFixed(1)} KB`);

	const storagePath = `${Date.now()}-${FILENAME}`;
	console.log(`Uploading to media/${storagePath} ...`);
	const { error: upErr } = await supa.storage
		.from('media')
		.upload(storagePath, buffer, { contentType: 'image/webp', upsert: false });
	if (upErr) throw upErr;

	const { data: pub } = supa.storage.from('media').getPublicUrl(storagePath);
	const publicUrl = pub.publicUrl;
	console.log(`  Public URL: ${publicUrl}`);

	console.log(`Inserting media row ...`);
	const { error: dbErr } = await supa.from('media').insert({
		filename: FILENAME,
		storage_path: storagePath,
		public_url: publicUrl,
		mime_type: 'image/webp',
		file_size: buffer.byteLength,
		width: 1280,
		alt_text: ALT
	});
	if (dbErr) {
		await supa.storage.from('media').remove([storagePath]);
		throw dbErr;
	}

	console.log(`Updating site_texts['over.body.image_url'] ...`);
	const { error: txtErr } = await supa
		.from('site_texts')
		.update({ value: publicUrl })
		.eq('key', 'over.body.image_url');
	if (txtErr) throw txtErr;

	console.log(`\n✓ Done. The over page will now serve the image from Supabase.`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
