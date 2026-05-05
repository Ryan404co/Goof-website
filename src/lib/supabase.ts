import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from './cms/database.types';

export function createSupabaseClient(fetch?: typeof globalThis.fetch) {
	if (isBrowser()) {
		return createBrowserClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			global: { fetch }
		});
	}
	throw new Error('Use createSupabaseServerClient on the server');
}

export function createSupabaseServerClient(
	cookies: {
		get: (key: string) => string | undefined;
		set: (key: string, value: string, options: Record<string, unknown>) => void;
		remove: (key: string, options: Record<string, unknown>) => void;
	},
	fetch?: typeof globalThis.fetch
) {
	return createServerClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => cookies.get(key),
			set: (key, value, options) => cookies.set(key, value, { ...options, path: '/' }),
			remove: (key, options) => cookies.remove(key, { ...options, path: '/' })
		},
		global: { fetch }
	});
}
