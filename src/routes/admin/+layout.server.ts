import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { isAdminEmail } from '$lib/cms/admin';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// Allow the login page through without a session check.
	if (url.pathname === '/admin/login') return { session: null };

	const session = await locals.getSession();
	if (!session || !isAdminEmail(session.user?.email)) {
		throw redirect(303, '/admin/login');
	}

	return { session };
};
