# Vinoth Kumar — portfolio v2.2.0

Source for the revised portfolio. Run it locally with the instructions below. Production releases are published only when requested by the owner.

## Requirements
Node.js 22 LTS and npm. Internet is needed to install dependencies and use external services.

## Start the portfolio
```sh
cd Frontend
npm ci
npm run dev
```
Open the localhost URL printed by Vite (normally http://localhost:5173).
The portfolio includes local project images, the existing hosted CV link, curated content and a snapshot of the two reviews that were publicly published when this package was prepared. No private credentials are required to preview it.

## Enable live Sanity content
Copy Frontend/.env.example to Frontend/.env.local and restart Vite. In Windows Explorer you can copy/rename the file; on macOS/Linux use `cp .env.example .env.local` inside Frontend.
The public Sanity project/dataset settings are prefilled. Public reads use a development proxy. Successful live reads replace the review snapshot, including an empty collection if you unpublish all reviews. Switching back to the tab refreshes content. If a read fails, the saved content remains available.

## What to edit
- Frontend/src/data/portfolioSnapshot.json: introduction, curated project descriptions/order and local image paths. These curated fields take priority over older CMS descriptions so the improved content stays consistent.
- Frontend/src/data/staticData.js: shared services, skills, education, FAQ and contact defaults.
- Sanity: published reviews and additional projects; existing curated project descriptions are maintained in the snapshot in this revision.
- Resume download: the existing public Sanity-hosted CV URL in portfolioSnapshot.json. The PDF itself is not included in GitHub.
No TCS employment or invented experience dates were added.

## Contact form
EmailJS public identifiers are provided as existing defaults and can be overridden by the VITE_EMAILJS_* variables. Actual delivery depends on your EmailJS account, template field names (name, email, subject, message), allowed origins and quota. Local browser checks intercept delivery rather than send real mail.

## Review submissions
Previewing reviews requires no private credentials. Submitting to Sanity requires your own SANITY_WRITE_TOKEN (write access) and REVIEW_HASH_SECRET in Frontend/.env.local. Obtain these from your existing dashboards; never commit the file. The Vite server runs /api/submit-review locally. With no Turnstile key, development uses Cloudflare's public test widget; no private test secret is required locally. In production configure the matching VITE_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY plus ALLOWED_ORIGIN. The server intentionally rejects submissions if required credentials are missing. There is no fake success or silent demo submission.
Submitted reviews remain drafts. Open Studio and Publish to display them publicly. Do not publish test entries.

## Sanity Studio (optional)
```sh
cd studio
npm ci
```
Copy .env.example to .env.local, then run `npm run dev` and sign in to your existing Sanity project. The Reviews menu is a single list, with Sanity's native draft/published indicators.
CAUTION: the Studio connects to your real dataset. Publishing/editing there changes live content. The provided code does not migrate or alter any records automatically.

## Validation
```sh
cd Frontend
npm run lint
npm run build
npm run preview
```
Manual checks: each navigation route, 404, project filters, keyboard Enter/Escape and focus return, resume download, mobile menu, service enquiry prefill, form validation and published review carousel.

## Deployment after approval only
Keep Frontend as the portfolio Vercel root and studio as the Studio project's root. Production variables already in Vercel are separate from this ZIP and must remain there. The owner has authorized publication of version 2.2.0. Keep credentials in Vercel and local .env files, never in Git.

## Changes
- Evidence-focused copy; six curated projects including RepTrack; local images and the existing CV link.
- Shorter homepage and shared service content, working service links and enquiry prefill.
- Freelance responsibilities without invented dates; degree-first education; no TCS update.
- Fallback content and live review refresh; removed unused Three.js scene and legacy ornamental sections.
- Semantic dialog via portal, focus trap, Escape and focus return; keyboard project cards.
- Native/contact whitespace validation with inline delivery errors; safer review response handling.
- Per-page canonical/title/social metadata, 404 page, readable heading spacing and reduced-motion styles.
- Existing backend moderation, validation and bot protection retained. Rate limiting remains best-effort with Sanity records; it is not a globally atomic quota service.

Dependency versions remain locked. Automated checks do not prove third-party account delivery, every external project, or a human-completed CAPTCHA. These require your own local smoke test.


## Version 2.2 performance and UX
`npm run build` renders HTML for all six pages and a 404 using Vite SSR and React streaming, then writes precompressed gzip/Brotli copies. The browser hydrates that HTML. Vercel serves the static output through its CDN with negotiated compression. For another host, configure content negotiation for the .br/.gz files; do not serve those files as unencoded JavaScript.

Fonts are self-hosted (Inter, OFL license in public/fonts) and images are local WebP files. Route chunks, native image loading, a shared Sanity request cache and bounded external calls reduce unnecessary work. Core content is available without JavaScript; interactive forms stay disabled until hydration to prevent accidental non-JavaScript GET submissions.

The light/dark toggle follows the system preference initially and remembers an explicit selection. Contact details have copy controls. The mobile menu traps keyboard focus, closes on Escape and resets when resized to desktop. A small scroll progress indicator and existing back-to-top button aid navigation.

Optional real-user performance monitoring uses Vercel Speed Insights. Set VITE_ENABLE_PERFORMANCE_MONITORING=true to show the consent panel. Its script loads only after approval; privacy settings allow withdrawal. Query strings and hashes are removed before measurements are sent; form content is never included. Check Vercel's Speed Insights panel for data after visitors opt in. The SDK integration does not authorize changing plans or buying paid monitoring.

Search, autocomplete, pagination, UTM campaign collection, Redis, SQL indexes and database connection pooling have not been added: this six-project portfolio uses Sanity's managed APIs and does not need them. There are no destructive visitor actions requiring extra confirmation dialogs. See FEATURES.md and VALIDATION.md for implementation and testing details.
