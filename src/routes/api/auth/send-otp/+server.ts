import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAdminEmail } from '$lib/cms/admin';

const rateLimitMap = new Map<string, number[]>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const timestamps = rateLimitMap.get(ip) || [];
	const recent = timestamps.filter((t) => now - t < WINDOW_MS);
	rateLimitMap.set(ip, recent);
	return recent.length >= MAX_REQUESTS;
}

function recordRequest(ip: string): void {
	const timestamps = rateLimitMap.get(ip) || [];
	timestamps.push(Date.now());
	rateLimitMap.set(ip, timestamps);
}

export const POST: RequestHandler = async ({ request, locals, getClientAddress }) => {
	const ip = getClientAddress();

	if (isRateLimited(ip)) {
		throw error(429, 'Te veel verzoeken. Probeer het later opnieuw.');
	}

	const body = await request.json().catch(() => ({}));
	const email = String(body.email ?? '').trim().toLowerCase();

	if (!email || !email.includes('@')) {
		throw error(400, 'Ongeldig e-mailadres.');
	}

	if (!isAdminEmail(email)) {
		throw error(403, 'Dit e-mailadres heeft geen toegang.');
	}

	recordRequest(ip);

	const { error: authError } = await locals.supabase.auth.signInWithOtp({
		email,
		options: { shouldCreateUser: true }
	});

	if (authError) {
		console.error('Supabase OTP send error:', authError);
		throw error(500, 'Kon geen verificatiecode versturen.');
	}

	return json({ success: true, message: 'Verificatiecode verstuurd.' });
};
