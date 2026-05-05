# Supabase Auth — Email Templates

Branded HTML templates for the OTP login flow. These are NOT auto-applied — paste them
manually into the Supabase Dashboard once.

## Where to install

[Authentication → Email Templates](https://supabase.com/dashboard/project/mzieksteauronawsvefv/auth/templates)

| Template tab in dashboard | File | Subject line |
|---|---|---|
| Magic Link | `magic-link.html` | `je verificatiecode voor goof admin` |
| Confirm signup | `confirm-signup.html` | `welkom bij goof admin — bevestig je toegang` |

For each: open the tab → set the subject → paste the file contents into the **Message
body (HTML)** field → save.

## Why both?

The login endpoint calls `signInWithOtp({ shouldCreateUser: true })`, so:

- **Existing admin** (already in `auth.users`) → Supabase sends the **Magic Link** template
- **New admin** (first ever login from that email) → Supabase sends the **Confirm signup** template

If only one of the two is branded, the other admin's first login email will look like a
generic Supabase notice — confusing in production.

## Template variables

Both templates use:

- `{{ .Token }}` — the 6-digit OTP code, displayed in the big yellow box
- `{{ .ConfirmationURL }}` — full magic-link URL (also contains the token; not used in our
  design because we want users to type the code into our custom `/admin/login` form)

## Updating

Edit the file here, then re-paste into Supabase. There's no Supabase CLI command to push
email templates today — the manual paste is the canonical workflow.
