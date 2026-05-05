import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SiteText } from '$lib/cms/database.types';

const PAGE_LABELS: Record<string, string> = {
	header: 'Header',
	home: 'Home',
	over: 'Over',
	diensten: 'Diensten',
	werk: 'Werk',
	contact: 'Contact',
	footer: 'Footer'
};
const PAGE_ORDER = ['header', 'home', 'over', 'diensten', 'werk', 'contact', 'footer'];

export const load: PageServerLoad = async ({ locals, url }) => {
	const { data: texts, error: dbError } = await locals.supabase
		.from('site_texts')
		.select('*')
		.order('page', { ascending: true })
		.order('sort_order', { ascending: true })
		.returns<SiteText[]>();

	if (dbError) {
		throw error(500, 'Kon teksten niet laden.');
	}

	const grouped = new Map<string, SiteText[]>();
	for (const t of (texts ?? []) as SiteText[]) {
		const list = grouped.get(t.page) ?? [];
		list.push(t);
		grouped.set(t.page, list);
	}

	const pages = PAGE_ORDER.filter((p) => grouped.has(p)).map((p) => ({
		key: p,
		label: PAGE_LABELS[p] ?? p,
		texts: grouped.get(p) ?? []
	}));
	for (const [key, list] of grouped) {
		if (!PAGE_ORDER.includes(key)) {
			pages.push({ key, label: PAGE_LABELS[key] ?? key, texts: list });
		}
	}

	const activePage = url.searchParams.get('page') ?? pages[0]?.key ?? 'home';

	return { pages, activePage };
};
