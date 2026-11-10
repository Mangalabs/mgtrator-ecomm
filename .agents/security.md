# SECURITY RULES

Treat environment secrets, server-only integrations, contact/quote forms,
tracking scripts, security headers, and any customer data as high-risk
surfaces.

## Secrets and environment

- Integration tokens (`GESTAOCLICK_*`, `CLICK_API_*`, backend URLs) stay in
  server-only code (`*.server.ts`, route handlers, Server Components). Never
  prefix them with `NEXT_PUBLIC_`, return them from route handlers, or log
  them.
- `.env*` files are gitignored; never commit them or paste their values into
  docs, issues, or PRs.

## Input and output

- Treat query params, route params, form input, and provider responses as
  untrusted. Validate with Zod at boundaries; client validation is UX only.
- Do not render provider HTML with `dangerouslySetInnerHTML` without
  sanitizing it.
- Build WhatsApp/contact links through `src/lib/whatsapp.ts`; encode user text.

## Headers, scripts, and privacy

- Security headers and CSP live in `next.config.ts`. Adding a script, iframe,
  font, or image origin requires the minimal CSP/image-domain change; do not
  loosen CSP broadly.
- Tracking (GA4, Meta Pixel) loads only through
  `src/components/shared/TrackingScripts.tsx` with `NEXT_PUBLIC_*` IDs.
- Do not collect or log personal data beyond what the contact flow needs.

Never disable or weaken validation or headers to make a feature pass. Fix the
incompatibility.
