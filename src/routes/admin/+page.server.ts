import type { PageServerLoad } from './$types';
import type { Project } from '$lib/cms/database.types';

type ProjectStatusRow = Pick<Project, 'id' | 'status'>;

export const load: PageServerLoad = async ({ locals }) => {
	const [textsRes, projectsRes, mediaRes] = await Promise.all([
		locals.supabase.from('site_texts').select('key', { count: 'exact', head: true }),
		locals.supabase
			.from('projects')
			.select('id, status', { count: 'exact' })
			.returns<ProjectStatusRow[]>(),
		locals.supabase.from('media').select('id', { count: 'exact', head: true })
	]);

	const projects = (projectsRes.data ?? []) as ProjectStatusRow[];

	return {
		stats: {
			textCount: textsRes.count ?? 0,
			projectsTotal: projectsRes.count ?? 0,
			projectsPublished: projects.filter((p) => p.status === 'published').length,
			projectsDraft: projects.filter((p) => p.status === 'draft').length,
			mediaCount: mediaRes.count ?? 0
		}
	};
};
