import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAdminEmail } from '$lib/cms/admin';
import type { Media } from '$lib/cms/database.types';

async function requireAdmin(locals: App.Locals) {
	const session = await locals.getSession();
	if (!session || !isAdminEmail(session.user?.email)) {
		throw error(401, 'Niet geautoriseerd.');
	}
}

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	await requireAdmin(locals);
	const body = await request.json().catch(() => ({}));
	const altText = body.alt_text === null ? null : String(body.alt_text ?? '').slice(0, 300);

	const { data, error: dbErr } = await locals.supabase
		.from('media')
		.update({ alt_text: altText } as never)
		.eq('id', params.id)
		.select()
		.single<Media>();

	if (dbErr || !data) throw error(404, 'Niet gevonden.');
	return json({ media: data });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	await requireAdmin(locals);

	const { data: row, error: getErr } = await locals.supabase
		.from('media')
		.select('storage_path')
		.eq('id', params.id)
		.single<Pick<Media, 'storage_path'>>();

	if (getErr || !row) throw error(404, 'Niet gevonden.');

	await locals.supabase.storage.from('media').remove([row.storage_path]);

	const { error: delErr } = await locals.supabase.from('media').delete().eq('id', params.id);
	if (delErr) throw error(500, 'Kon niet verwijderen.');

	return json({ success: true });
};
