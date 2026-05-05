import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAdminEmail } from '$lib/cms/admin';

export const POST: RequestHandler = async ({ request, locals }) => {
	const body = await request.json().catch(() => ({}));
	const email = String(body.email ?? '').trim().toLowerCase();
	const token = String(body.token ?? '').trim();

	if (!email || !token) {
		throw error(400, 'E-mail en code zijn verplicht.');
	}

	if (!isAdminEmail(email)) {
		throw error(403, 'Dit e-mailadres heeft geen toegang.');
	}

	const { data, error: authError } = await locals.supabase.auth.verifyOtp({
		email,
		token,
		type: 'email'
	});

	if (authError || !data.session) {
		throw error(401, 'Ongeldige of verlopen code.');
	}

	return json({ success: true });
};
