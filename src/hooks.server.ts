import type { Handle } from '@sveltejs/kit';
import { createSupabaseServerClient } from '$lib/supabase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(
		{
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: '/' });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: '/' });
			}
		},
		event.fetch
	);

	event.locals.getSession = async () => {
		const {
			data: { user }
		} = await event.locals.supabase.auth.getUser();
		if (!user) return null;
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	const response = await resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});

	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), interest-cohort=()'
	);
	response.headers.set('X-DNS-Prefetch-Control', 'on');

	return response;
};
