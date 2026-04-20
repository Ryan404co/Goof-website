import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';

const TO_EMAIL = 'info@goof.design';
const FROM_EMAIL = 'Goof Contact <noreply@goof.design>';
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MIN_SUBMIT_DELAY_MS = 2000;

const resend = new Resend(RESEND_API_KEY);

export const load: PageServerLoad = () => {
	return { renderedAt: Date.now() };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		if (String(data.get('website') ?? '').length > 0) {
			return { success: true };
		}

		const renderedAt = Number(data.get('_ts') ?? 0);
		if (renderedAt && Date.now() - renderedAt < MIN_SUBMIT_DELAY_MS) {
			return { success: true };
		}

		const naam = String(data.get('naam') ?? '').trim().slice(0, MAX_FIELD_LENGTH);
		const achternaam = String(data.get('achternaam') ?? '').trim().slice(0, MAX_FIELD_LENGTH);
		const telefoon = String(data.get('telefoon') ?? '').trim().slice(0, MAX_FIELD_LENGTH);
		const email = String(data.get('e-mail') ?? '').trim().slice(0, MAX_FIELD_LENGTH);
		const bericht = String(data.get('bericht') ?? '').trim().slice(0, MAX_MESSAGE_LENGTH);

		const values = { naam, achternaam, telefoon, email, bericht };

		if (!naam || !achternaam || !telefoon || !email || !bericht) {
			return fail(400, { ...values, error: 'Vul alstublieft alle velden in.' });
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { ...values, error: 'Vul een geldig e-mailadres in.' });
		}

		const fullName = `${naam} ${achternaam}`;

		try {
			const { error } = await resend.emails.send({
				from: FROM_EMAIL,
				to: TO_EMAIL,
				replyTo: email,
				subject: `nieuw bericht van ${fullName.toLowerCase()}`,
				text: [
					`Naam: ${fullName}`,
					`Telefoon: ${telefoon}`,
					`E-mail: ${email}`,
					'',
					'Bericht:',
					bericht
				].join('\n'),
				html: renderEmailHtml({ fullName, telefoon, email, bericht })
			});

			if (error) {
				console.error('Resend error:', error);
				return fail(500, { ...values, error: 'Er ging iets mis bij het versturen. Probeer het later opnieuw.' });
			}

			return { success: true };
		} catch (err) {
			console.error('Contact form error:', err);
			return fail(500, { ...values, error: 'Er ging iets mis bij het versturen. Probeer het later opnieuw.' });
		}
	}
};

function escapeHtml(str: string) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function renderEmailHtml(fields: {
	fullName: string;
	telefoon: string;
	email: string;
	bericht: string;
}) {
	const { fullName, telefoon, email, bericht } = fields;
	const font = `'Outfit', 'Helvetica Neue', Arial, sans-serif`;
	const green = '#4a5b4c';
	const greenDark = '#25302b';
	const yellow = '#fdff96';
	const offwhite = '#f6f6ef';

	const row = (label: string, value: string, isLink = false) => `
		<tr>
			<td style="padding: 0 0 18px; font-family: ${font};">
				<div style="font-size: 13px; font-weight: 500; color: ${green}; text-transform: lowercase; letter-spacing: 0.02em; margin-bottom: 4px;">${label}</div>
				<div style="font-size: 17px; font-weight: 300; color: ${greenDark}; line-height: 1.4;">
					${isLink ? `<a href="mailto:${escapeHtml(value)}" style="color: ${greenDark}; text-decoration: underline;">${escapeHtml(value)}</a>` : escapeHtml(value)}
				</div>
			</td>
		</tr>
	`;

	return `<!DOCTYPE html>
<html lang="nl">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>nieuw contactbericht</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap" rel="stylesheet" />
</head>
<body style="margin: 0; padding: 0; background: ${offwhite}; font-family: ${font};">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: ${offwhite};">
		<tr>
			<td align="center" style="padding: 32px 16px;">
				<table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; width: 100%;">
					<!-- Header -->
					<tr>
						<td style="background: ${green}; border-radius: 20px 20px 0 0; padding: 36px 36px 32px; font-family: ${font};">
							<div style="font-size: 13px; font-weight: 500; color: ${yellow}; text-transform: lowercase; letter-spacing: 0.04em; margin-bottom: 10px;">goof — contactformulier</div>
							<div style="font-size: 32px; font-weight: 500; color: ${yellow}; text-transform: lowercase; line-height: 1.1;">nieuw bericht<br />van ${escapeHtml(fullName.toLowerCase())}.</div>
						</td>
					</tr>
					<!-- Body -->
					<tr>
						<td style="background: #ffffff; padding: 36px; font-family: ${font};">
							<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
								${row('naam', fullName)}
								${row('telefoon', telefoon)}
								${row('e-mail', email, true)}
							</table>

							<div style="height: 1px; background: ${green}; opacity: 0.15; margin: 8px 0 24px;"></div>

							<div style="font-size: 13px; font-weight: 500; color: ${green}; text-transform: lowercase; letter-spacing: 0.02em; margin-bottom: 12px;">bericht</div>
							<div style="background: ${yellow}; border-radius: 16px; padding: 20px 22px; font-size: 16px; font-weight: 300; color: ${greenDark}; line-height: 1.55; white-space: pre-wrap;">${escapeHtml(bericht)}</div>

							<div style="margin-top: 28px;">
								<a href="mailto:${escapeHtml(email)}" style="display: inline-block; background: ${green}; color: ${yellow}; font-family: ${font}; font-size: 15px; font-weight: 500; text-transform: lowercase; text-decoration: none; padding: 14px 24px; border-radius: 12px;">beantwoorden</a>
							</div>
						</td>
					</tr>
					<!-- Footer -->
					<tr>
						<td style="background: #ffffff; border-radius: 0 0 20px 20px; padding: 0 36px 32px; font-family: ${font};">
							<div style="height: 1px; background: ${green}; opacity: 0.15; margin-bottom: 18px;"></div>
							<div style="font-size: 12px; font-weight: 300; color: ${green}; text-transform: lowercase; line-height: 1.5;">
								verzonden via goof.design<br />
								reply-to is ingesteld op de afzender — druk op 'reageren' om direct te antwoorden.
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>`;
}
