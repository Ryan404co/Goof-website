/**
 * Pre-warm Supabase's image-transform CDN cache for every project image at every
 * srcset variant the site actually requests. Run once after migrating or after
 * any new project is added.
 *
 *   npx tsx scripts/warm-image-cache.ts
 */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!SUPABASE_URL || !SERVICE_ROLE) throw new Error('Supabase env vars missing');

const supa = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

// All widths that any srcset on the public site uses
const WIDTHS = [400, 600, 800, 900, 1200, 1280, 1600, 2000];

interface Img {
	url: string;
	context: string;
}

function variants(url: string): string[] {
	if (!url.includes('/storage/v1/object/public/')) return [url];
	const base = url.replace('/object/public/', '/render/image/public/');
	return WIDTHS.map((w) => `${base}?width=${w}&quality=80&format=webp&resize=contain`);
}

async function warmOne(url: string, context: string) {
	const t0 = Date.now();
	const res = await fetch(url, { method: 'HEAD' });
	const ms = Date.now() - t0;
	const status = res.ok ? '✓' : `✗ ${res.status}`;
	const cache = res.headers.get('cf-cache-status') ?? '?';
	console.log(`  ${status} ${ms.toString().padStart(4)}ms  [${cache}]  ${context}`);
}

async function main() {
	const images: Img[] = [];

	// Project covers + galleries
	const { data: projects } = await supa
		.from('projects')
		.select('slug, hoofd_afbeelding_url, afbeeldingen');
	for (const p of (projects ?? []) as { slug: string; hoofd_afbeelding_url: string | null; afbeeldingen: { url: string }[] }[]) {
		if (p.hoofd_afbeelding_url) images.push({ url: p.hoofd_afbeelding_url, context: `${p.slug}/cover` });
		for (let i = 0; i < (p.afbeeldingen ?? []).length; i++) {
			const img = p.afbeeldingen[i];
			if (img?.url) images.push({ url: img.url, context: `${p.slug}/gallery[${i}]` });
		}
	}

	// site_texts image fields (e.g. over.body.image_url)
	const { data: texts } = await supa
		.from('site_texts')
		.select('key, value, field_type')
		.eq('field_type', 'url');
	for (const t of (texts ?? []) as { key: string; value: string; field_type: string }[]) {
		if (typeof t.value === 'string' && t.value.startsWith('http')) {
			images.push({ url: t.value, context: `text:${t.key}` });
		}
	}

	console.log(`Warming ${images.length} image(s) × ${WIDTHS.length} variants = ${images.length * WIDTHS.length} requests\n`);

	for (const img of images) {
		console.log(`--- ${img.context} ---`);
		const urls = variants(img.url);
		// fire 4 in parallel per image to stay polite
		for (let i = 0; i < urls.length; i += 4) {
			await Promise.all(urls.slice(i, i + 4).map((u, j) => warmOne(u, `width=${WIDTHS[i + j]}`)));
		}
	}

	console.log('\nDone. Subsequent visitors get cached responses (~120 ms instead of ~700 ms).');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
