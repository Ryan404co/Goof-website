import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Project } from '$lib/cms/database.types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { data: project, error: dbErr } = await locals.supabase
		.from('projects')
		.select('*')
		.eq('id', params.id)
		.single<Project>();

	if (dbErr || !project) throw error(404, 'Project niet gevonden.');
	return { project };
};
