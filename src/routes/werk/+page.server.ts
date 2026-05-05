import type { PageServerLoad } from './$types';
import type { Project } from '$lib/cms/database.types';

type ProjectListItem = Pick<Project, 'id' | 'slug' | 'name' | 'hoofd_afbeelding_url' | 'hoofd_afbeelding_alt'>;

export const load: PageServerLoad = async ({ locals }) => {
	const { data: projects } = await locals.supabase
		.from('projects')
		.select('id, slug, name, hoofd_afbeelding_url, hoofd_afbeelding_alt')
		.eq('status', 'published')
		.order('sort_order', { ascending: true })
		.returns<ProjectListItem[]>();

	return { projects: (projects ?? []) as ProjectListItem[] };
};
