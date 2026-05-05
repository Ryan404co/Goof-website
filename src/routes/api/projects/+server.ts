import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAdminEmail } from '$lib/cms/admin';
import { projectCreateSchema } from '$lib/cms/schemas';
import type { Project, Database } from '$lib/cms/database.types';

type ProjectInsert = Database['public']['Tables']['projects']['Insert'];

async function requireAdmin(locals: App.Locals) {
	const session = await locals.getSession();
	if (!session || !isAdminEmail(session.user?.email)) {
		throw error(401, 'Niet geautoriseerd.');
	}
}

export const GET: RequestHandler = async ({ locals }) => {
	await requireAdmin(locals);
	const { data, error: dbErr } = await locals.supabase
		.from('projects')
		.select('*')
		.order('sort_order', { ascending: true })
		.order('created_at', { ascending: false })
		.returns<Project[]>();
	if (dbErr) throw error(500, 'Kon projecten niet laden.');
	return json({ projects: data ?? [] });
};

export const POST: RequestHandler = async ({ request, locals }) => {
	await requireAdmin(locals);
	const body = await request.json().catch(() => ({}));
	const parsed = projectCreateSchema.safeParse(body);
	if (!parsed.success) {
		throw error(400, parsed.error.issues[0]?.message ?? 'Ongeldige invoer.');
	}

	const insert: ProjectInsert = {
		...parsed.data,
		tags: parsed.data.tags ?? [],
		afbeeldingen: parsed.data.afbeeldingen ?? []
	};

	const { data, error: dbErr } = await locals.supabase
		.from('projects')
		.insert(insert as never)
		.select()
		.single<Project>();

	if (dbErr) {
		if (dbErr.code === '23505') throw error(409, 'Deze slug bestaat al.');
		console.error(dbErr);
		throw error(500, 'Kon project niet opslaan.');
	}
	return json({ project: data }, { status: 201 });
};
