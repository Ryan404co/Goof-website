import type { LayoutServerLoad } from './$types';
import type { SiteText } from '$lib/cms/database.types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { data } = await locals.supabase.from('site_texts').select('*');

	const texts: Record<string, SiteText> = {};
	for (const t of (data ?? []) as SiteText[]) {
		texts[t.key] = t;
	}

	return {
		texts,
		session: await locals.getSession()
	};
};
