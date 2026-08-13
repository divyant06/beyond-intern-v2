# Security

Beyond Intern takes the security of its users and platform seriously. If you believe you have found a security vulnerability, please report it privately so it can be fixed before disclosure.

## Reporting a vulnerability

Do **not** open a public GitHub issue for security problems.

Email the maintainers directly at **info@beyondintern.com** and include:

- A short description of the issue
- The affected area (for example auth, checkout, webhook, Supabase policies)
- Steps to reproduce, including any requests or payloads involved
- Impact assessment if known

We will acknowledge reports as soon as possible and coordinate a fix and disclosure timeline.

## Responsible disclosure

Please give the maintainers a reasonable window to address the issue before sharing details publicly. We will credit reporters who follow responsible disclosure practices, unless they prefer to stay anonymous.

## Security notes for maintainers

- The `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `NEXTAUTH_SECRET`, `ZOOM_SDK_SECRET`, and `GOOGLE_GENERATIVE_AI_API_KEY` environment variables must only exist in the deployment environment or a private local environment. Never commit real values.
- `NEXTAUTH_SECRET` must be set in production. Missing secrets fail closed for protected routes.
- Admin authorization is enforced server-side via `src/lib/auth-guards.ts` and an `ADMIN_EMAILS` environment variable. Do not rely on the client-side admin check alone.
- Stripe access grants flow from the verified webhook; keep `STRIPE_WEBHOOK_SECRET` unique and rotated.
- Supabase service-role access must stay server-only and never be exposed to the browser.
