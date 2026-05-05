import type { PageServerLoad } from './$types';
import type { Media } from '$lib/cms/database.types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: media } = await locals.supabase
		.from('media')
		.select('*')
		.order('created_at', { ascending: false })
		.returns<Media[]>();
	return { media: (media ?? []) as Media[] };
};
