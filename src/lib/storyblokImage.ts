/**
 * Append Storyblok image-service transforms to a Storyblok asset URL.
 * Non-Storyblok URLs and empty values pass through unchanged.
 *
 * Format: https://a.storyblok.com/f/.../filename.jpg/m/<width>x<height>/filters:quality(<q>):format(webp)
 */
export function optimizeStoryblokImage(
	url: string | undefined | null,
	width = 1200,
	quality = 80,
	height = 0
): string {
	if (!url || typeof url !== 'string') return '';
	if (!url.includes('a.storyblok.com')) return url;
	return `${url}/m/${width}x${height}/filters:quality(${quality}):format(webp)`;
}
