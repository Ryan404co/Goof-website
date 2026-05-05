# Goof CMS — Supabase Setup

Quick reference for getting the custom CMS running. **Do not commit this file's secrets.**

## 1. Create the Supabase project

1. Go to https://supabase.com → New project (region: EU West for NL site).
2. Note the project's **Project URL** and **anon key** (Settings → API).
3. Note the **service_role** key (Settings → API → secret) — only used by scripts/, never in the app.

## 2. Set environment variables

Add to `.env` (gitignored):

```
PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<anon key>

# Server-only — used by scripts/
SUPABASE_SERVICE_ROLE_KEY=<service-role key>

# Existing values
RESEND_API_KEY=...
PUBLIC_GA4_ID=...

# Only needed for the one-time Storyblok import
PUBLIC_STORYBLOK_ACCESS_TOKEN=...
```

## 3. Run the migrations

In the Supabase Dashboard → SQL Editor, paste and run **in order**:

1. `supabase/migrations/001_goof_cms_schema.sql` — creates tables + RLS
2. `supabase/migrations/002_storage_bucket.sql` — creates the `media` bucket
3. `supabase/seeds/site_texts.sql` — seeds default copy

## 4. Configure auth provider

Authentication → Providers → Email:

- **Enable email provider**: yes
- **Confirm email**: OFF (we use OTP, not email confirmation)
- **Mailer OTP expiry**: 600 seconds is fine
- **Mailer OTP length**: 6 digits

## 5. Custom SMTP (Resend)

Authentication → Emails → SMTP Settings → enable Custom SMTP:

- Sender email: `noreply@goof.design`
- Sender name: `Goof`
- Host: `smtp.resend.com`
- Port: `465`
- Username: `resend` (literal string)
- Password: your `RESEND_API_KEY`

## 6. Branded email templates

Paste the contents of `supabase/email-templates/magic-link.html` and
`confirm-signup.html` into the matching tabs in Authentication → Email Templates.
See `supabase/email-templates/README.md`.

## 7. Migrate content from Storyblok (optional, one-time)

```
npx tsx scripts/migrate-from-storyblok.ts --dry-run     # preview
npx tsx scripts/migrate-from-storyblok.ts               # actually insert
npx tsx scripts/migrate-project-images.ts --dry-run     # preview
npx tsx scripts/migrate-project-images.ts               # download + re-upload
npx tsx scripts/migrate-over-image.ts                   # one-shot for over portrait
```

After migrating, run the cache-warmer so visitors don't pay cold-cache penalty:

```
npx tsx scripts/warm-image-cache.ts
```

## 8. Deploy

The site reads the same env vars in production. Add them to your deploy
environment (Vercel / Plesk / Node host).

## Admin access

Allowed login emails are hard-coded in `src/lib/cms/admin.ts`:

- ryan@404co.nl
- zara@goof.design

To add or remove admins, edit that file and redeploy.

## Login flow

1. Visit `/admin/login`
2. Enter your email
3. Check inbox for 6-digit code (Supabase sends it via Resend)
4. Enter the code → land on `/admin`
