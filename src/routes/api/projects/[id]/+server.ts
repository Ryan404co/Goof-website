import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAdminEmail } from '$lib/cms/admin';
import { projectUpdateSchema } from '$lib/cms/schemas';
import type { Project } from '$lib/cms/database.types';

async function requireAdmin(locals: App.Locals) {
	const session = await locals.getSession();
	if (!session || !isAdminEmail(session.user?.email)) {
		throw error(401, 'Niet geautoriseerd.');
	}
}

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	await requireAdmin(locals);
	const body = await request.json().catch(() => ({}));
	const parsed = projectUpdateSchema.safeParse(body);
	if (!parsed.success) {
		throw error(400, parsed.error.issues[0]?.message ?? 'Ongeldige invoer.');
	}

	const { data, error: dbErr } = await locals.supabase
		.from('projects')
		.update(parsed.data as never)
		.eq('id', params.id)
		.select()
		.single<Project>();

	if (dbErr) {
		if (dbErr.code === '23505') throw error(409, 'Deze slug bestaat al.');
		throw error(500, 'Kon niet bijwerken.');
	}
	if (!data) throw error(404, 'Project niet gevonden.');
	return json({ project: data });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	await requireAdmin(locals);
	const { error: dbErr } = await locals.supabase.from('projects').delete().eq('id', params.id);
	if (dbErr) throw error(500, 'Kon niet verwijderen.');
	return json({ success: true });
};
