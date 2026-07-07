# Supabase Auth — email setup checklist

On-brand, working magic-link / signup emails for Debt Angel. Everything here is
**Supabase dashboard + DNS** configuration — no app redeploy required.

The application code is already done:
- `app/auth/callback/route.ts` verifies both `token_hash`+`type` (recommended)
  and PKCE `?code=`, and redirects back to the **same origin** it ran on.
- `lib/auth/session.ts` builds `emailRedirectTo` from `window.location.origin`,
  so links point back to whichever domain the user requested from.

---

## 1. URL Configuration

Supabase → **Authentication → URL Configuration**

- **Site URL:** `https://mydebtangel.com`
- **Redirect URLs** (add each origin you use):
  - `https://mydebtangel.com/auth/callback`
  - `https://debtangel.t3kdesigns.app/auth/callback`
  - `http://localhost:3000/auth/callback`

> Both domains work from one template because the emails link to
> `{{ .RedirectTo }}`, which reflects the origin that requested the link.
> Every origin must be in the allow-list above or Supabase rejects the redirect.

---

## 2. Email templates

Supabase → **Authentication → Email Templates**

| Template | Subject | Body file |
|----------|---------|-----------|
| **Confirm signup** (new users — the plain default screenshot) | `Confirm your email to access your Debt Angel plan` | `confirm-signup.html` |
| **Magic Link** (existing users) | `Your secure sign-in link for MyDebtAngel` | `magic-link.html` |

Paste the file contents into the template body. Both must be branded — new users
receive **Confirm signup**, existing users receive **Magic Link**.

The links use the token-hash flow the callback verifies:
- Confirm signup → `...&token_hash={{ .TokenHash }}&type=signup`
- Magic Link → `...&token_hash={{ .TokenHash }}&type=magiclink`

---

## 3. Custom SMTP (send from your own domain)

Default emails come from `noreply@mail.app.supabase.io`. To send from
`no-reply@mydebtangel.com` (big trust + deliverability win):

### 3a. Provider
Recommended: **Resend** (resend.com). Alternatives: Postmark, Amazon SES,
SendGrid, Mailgun. Supabase config is identical for any of them.

### 3b. Verify the sending domain (DNS)
In the provider, add domain `mydebtangel.com`, then add the DNS records it gives
you at your DNS host:
- **SPF** — `TXT` (e.g. `v=spf1 include:amazonses.com ~all`)
- **DKIM** — `TXT`/`CNAME` (provider-specific value — this is the key one)
- **DMARC** — `TXT` at `_dmarc.mydebtangel.com`:
  `v=DMARC1; p=none; rua=mailto:dmarc@mydebtangel.com`

Click **Verify** in the provider once DNS propagates (minutes–hours).

### 3c. Configure Supabase
Supabase → **Project Settings → Authentication → SMTP Settings** →
enable **Custom SMTP**:

| Field | Value (Resend) |
|-------|----------------|
| Sender email | `no-reply@mydebtangel.com` |
| Sender name | `Debt Angel` |
| Host | `smtp.resend.com` |
| Port | `465` |
| Username | `resend` |
| Password | provider API key (`re_...`) |

The sender email domain **must** match the domain verified in 3b.

### 3d. Rate limits
Supabase → **Authentication → Rate Limits** → raise "Emails per hour"
(the built-in limit is ~3–4/hour; custom SMTP lets you increase it).

---

## 4. Test

1. `https://mydebtangel.com/login` → request a link.
2. Email arrives **from `Debt Angel <no-reply@mydebtangel.com>`** with the dark/
   gold branded template, lands in inbox (not spam).
3. Click the link → lands on `/dashboard` signed in (no `?error=auth`).
4. Repeat from `https://debtangel.t3kdesigns.app/login`.

### If a fresh link still fails with `?error=auth`
- Confirm that exact `/auth/callback` URL is in the Redirect URLs allow-list.
- Check **Supabase → Authentication → Logs** for the rejection reason.
- Verify the `emailRedirectTo` in the email matches the domain you clicked from.
