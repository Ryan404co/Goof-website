import type { PageServerLoad } from './$types';
import type { Project } from '$lib/cms/database.types';

type ProjectListItem = Pick<
	Project,
	'id' | 'slug' | 'name' | 'klant' | 'jaar' | 'status' | 'sort_order' | 'hoofd_afbeelding_url' | 'updated_at'
>;

export const load: PageServerLoad = async ({ locals }) => {
	const { data: projects } = await locals.supabase
		.from('projects')
		.select('id, slug, name, klant, jaar, status, sort_order, hoofd_afbeelding_url, updated_at')
		.order('sort_order', { ascending: true })
		.order('updated_at', { ascending: false })
		.returns<ProjectListItem[]>();

	return { projects: (projects ?? []) as ProjectListItem[] };
};
