import type { RequestHandler } from './$types';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';

const SITE_URL = 'https://goof.design';

const staticRoutes = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/werk', priority: '0.9', changefreq: 'weekly' },
	{ path: '/diensten', priority: '0.8', changefreq: 'monthly' },
	{ path: '/over', priority: '0.7', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.7', changefreq: 'monthly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/voorwaarden', priority: '0.3', changefreq: 'yearly' },
	{ path: '/cookies', priority: '0.3', changefreq: 'yearly' }
];

export const GET: RequestHandler = async ({ fetch }) => {
	let projectSlugs: Array<{ slug: string; updated: string }> = [];

	try {
		const res = await fetch(
			`https://api.storyblok.com/v2/cdn/stories?token=${PUBLIC_STORYBLOK_ACCESS_TOKEN}&starts_with=werk/&version=published&per_page=100&sort_by=position:asc`
		);
		if (res.ok) {
			const data = await res.json();
			projectSlugs = (data.stories ?? []).map((s: { slug: string; published_at?: string; created_at: string }) => ({
				slug: s.slug,
				updated: s.published_at ?? s.created_at
			}));
		}
	} catch (err) {
		console.error('Sitemap: failed to fetch Storyblok projects', err);
	}

	const today = new Date().toISOString().split('T')[0];

	const urls = [
		...staticRoutes.map(
			(r) => `
	<url>
		<loc>${SITE_URL}${r.path}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>${r.changefreq}</changefreq>
		<priority>${r.priority}</priority>
	</url>`
		),
		...projectSlugs.map(
			(p) => `
	<url>
		<loc>${SITE_URL}/werk/${p.slug}</loc>
		<lastmod>${p.updated.split('T')[0]}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.6</priority>
	</url>`
		)
	].join('');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
