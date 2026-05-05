import type { RequestHandler } from './$types';

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

interface ProjectRow {
	slug: string;
	updated_at: string | null;
}

export const GET: RequestHandler = async ({ locals }) => {
	const { data: projects } = await locals.supabase
		.from('projects')
		.select('slug, updated_at')
		.eq('status', 'published')
		.order('sort_order', { ascending: true })
		.returns<ProjectRow[]>();

	const today = new Date().toISOString().split('T')[0];
	const list = (projects ?? []) as ProjectRow[];

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
		...list.map(
			(p) => `
	<url>
		<loc>${SITE_URL}/werk/${p.slug}</loc>
		<lastmod>${(p.updated_at ?? today).split('T')[0]}</lastmod>
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
