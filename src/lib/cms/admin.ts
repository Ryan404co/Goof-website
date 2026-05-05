// Allowlist of email addresses permitted to log in to the Goof admin.
// Update this list AND the goof_admin_allowlist memory if access changes.
export const ADMIN_EMAILS: ReadonlyArray<string> = ['ryan@404co.nl', 'zara@goof.design'];

export function isAdminEmail(email: string | null | undefined): boolean {
	if (!email) return false;
	return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}
