import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Project } from '$lib/cms/database.types';

type ProjectListItem = Pick<Project, 'id' | 'slug' | 'name' | 'hoofd_afbeelding_url' | 'hoofd_afbeelding_alt'>;

function shuffle<T>(arr: T[]): T[] {
	const out = [...arr];
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[out[i], out[j]] = [out[j], out[i]];
	}
	return out;
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const { data: project, error: dbErr } = await locals.supabase
		.from('projects')
		.select('*')
		.eq('slug', params.slug)
		.eq('status', 'published')
		.single<Project>();

	if (dbErr || !project) throw error(404, 'Project niet gevonden.');

	const { data: others } = await locals.supabase
		.from('projects')
		.select('id, slug, name, hoofd_afbeelding_url, hoofd_afbeelding_alt')
		.eq('status', 'published')
		.neq('id', project.id)
		.order('sort_order', { ascending: true })
		.limit(20)
		.returns<ProjectListItem[]>();

	return {
		project,
		moreProjects: shuffle(others ?? []).slice(0, 3) as ProjectListItem[]
	};
};
