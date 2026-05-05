import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAdminEmail } from '$lib/cms/admin';
import { siteTextUpdateSchema } from '$lib/cms/schemas';
import type { SiteText } from '$lib/cms/database.types';

async function requireAdmin(locals: App.Locals) {
	const session = await locals.getSession();
	if (!session || !isAdminEmail(session.user?.email)) {
		throw error(401, 'Niet geautoriseerd.');
	}
}

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	await requireAdmin(locals);

	const body = await request.json().catch(() => ({}));
	const parsed = siteTextUpdateSchema.safeParse(body);
	if (!parsed.success) {
		throw error(400, 'Ongeldige waarde.');
	}

	const { error: dbError, data } = await locals.supabase
		.from('site_texts')
		.update({ value: parsed.data.value } as never)
		.eq('key', params.key)
		.select()
		.single<SiteText>();

	if (dbError || !data) {
		throw error(404, 'Tekst niet gevonden.');
	}

	return json({ success: true, text: data });
};
