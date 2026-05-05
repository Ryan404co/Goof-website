/**
 * Image URL helpers — produce optimized variants from Storyblok or Supabase Storage URLs.
 * Both sources support on-the-fly width / quality / format transforms; we use WebP at q=80
 * by default, which is ~70-80% smaller than the original PNG/JPEG.
 */

const DEFAULT_QUALITY = 80;
const DEFAULT_WIDTH = 1200;

function isStoryblok(url: string) {
	return url.includes('a.storyblok.com');
}

function isSupabase(url: string) {
	return url.includes('/storage/v1/object/public/');
}

/** Single optimized URL. `width` is the rendered pixel width you want. */
export function optimizeImage(
	url: string | undefined | null,
	width = DEFAULT_WIDTH,
	quality = DEFAULT_QUALITY
): string {
	if (!url || typeof url !== 'string') return '';

	if (isStoryblok(url)) {
		// Storyblok image service: /m/<w>x<h>/filters:quality(q):format(webp)
		// height=0 means "auto / preserve aspect ratio".
		return `${url}/m/${width}x0/filters:quality(${quality}):format(webp)`;
	}

	if (isSupabase(url)) {
		// Supabase Storage render endpoint.
		// - `format=webp`: needed explicitly, otherwise Supabase serves JPEG even when
		//   the source is WebP.
		// - `resize=contain`: REQUIRED when only width is given. Without it, Supabase
		//   keeps the original height and just resizes width — distorting the aspect
		//   ratio (e.g. a 2000×1410 source served at width=400 becomes 400×1410).
		const transformed = url.replace('/object/public/', '/render/image/public/');
		const sep = transformed.includes('?') ? '&' : '?';
		return `${transformed}${sep}width=${width}&quality=${quality}&format=webp&resize=contain`;
	}

	return url;
}

/**
 * Build a `srcset` string for responsive images. Pass the widths you want available;
 * the browser picks the smallest one that satisfies the layout.
 */
export function srcSet(
	url: string | undefined | null,
	widths: number[] = [400, 800, 1200, 1800],
	quality = DEFAULT_QUALITY
): string {
	if (!url) return '';
	return widths.map((w) => `${optimizeImage(url, w, quality)} ${w}w`).join(', ');
}

// Backwards-compatible alias used in older imports — remove after refactor.
export const optimizeStoryblokImage = optimizeImage;
