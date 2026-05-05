import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAdminEmail } from '$lib/cms/admin';
import type { Media } from '$lib/cms/database.types';

const ALLOWED_MIME = new Set([
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/avif',
	'image/gif',
	'image/svg+xml'
]);
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

async function requireAdmin(locals: App.Locals) {
	const session = await locals.getSession();
	if (!session || !isAdminEmail(session.user?.email)) {
		throw error(401, 'Niet geautoriseerd.');
	}
}

function safeFilename(name: string): string {
	return name
		.normalize('NFKD')
		.replace(/[^a-zA-Z0-9._-]/g, '-')
		.replace(/-+/g, '-')
		.toLowerCase()
		.slice(0, 120);
}

export const GET: RequestHandler = async ({ locals }) => {
	await requireAdmin(locals);
	const { data, error: dbError } = await locals.supabase
		.from('media')
		.select('*')
		.order('created_at', { ascending: false })
		.returns<Media[]>();

	if (dbError) throw error(500, 'Kon media niet laden.');
	return json({ media: data ?? [] });
};

export const POST: RequestHandler = async ({ request, locals }) => {
	await requireAdmin(locals);

	const form = await request.formData();
	const file = form.get('file');
	const altText = String(form.get('alt_text') ?? '').slice(0, 300);

	if (!(file instanceof File)) throw error(400, 'Geen bestand ontvangen.');
	if (file.size === 0) throw error(400, 'Bestand is leeg.');
	if (file.size > MAX_BYTES) throw error(413, 'Bestand is groter dan 10 MB.');
	if (!ALLOWED_MIME.has(file.type)) throw error(415, 'Bestandstype niet toegestaan.');

	const ts = Date.now();
	const cleanName = safeFilename(file.name) || 'upload';
	const storagePath = `${ts}-${cleanName}`;

	const { error: upErr } = await locals.supabase.storage
		.from('media')
		.upload(storagePath, file, {
			contentType: file.type,
			upsert: false
		});

	if (upErr) {
		console.error('Storage upload error:', upErr);
		throw error(500, 'Upload mislukt.');
	}

	const { data: pub } = locals.supabase.storage.from('media').getPublicUrl(storagePath);
	const publicUrl = pub.publicUrl;

	const { data: row, error: dbErr } = await locals.supabase
		.from('media')
		.insert({
			filename: file.name,
			storage_path: storagePath,
			public_url: publicUrl,
			mime_type: file.type,
			file_size: file.size,
			alt_text: altText || null
		} as never)
		.select()
		.single<Media>();

	if (dbErr || !row) {
		await locals.supabase.storage.from('media').remove([storagePath]);
		throw error(500, 'Kon media niet opslaan.');
	}

	return json({ media: row });
};
