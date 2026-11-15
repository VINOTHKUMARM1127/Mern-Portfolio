# Requested feature checklist — v2.4.0

Implemented or retained:
- Page skeleton, real initial HTML, route-based JS splitting and streaming build-time rendering.
- WebP images, explicit image boxes/native lazy loading and first-photo priority.
- Shared 60-second public CMS cache and in-flight deduplication (including React StrictMode/focus).
- Sanity batch query/projections; existing independent rate-limit checks run concurrently.
- Sanity, email and CAPTCHA request deadlines; no automatic email retries.
- Vercel CDN and immutable cache rules for hashed assets/images; self-hosted Inter font.
- gzip/Brotli output artifacts; Vercel negotiates compression automatically.
- Removed unused 3D, GSAP, EmailJS SDK, image-loading and remote icon libraries.
- Fixed light visual design, hover feedback, sticky navigation, skip link, copy controls, progress, FAQ and floating contact.
- Form success/error feedback, semantic project dialog and accessible mobile-menu focus handling.
- Favicon, clickable logo/email/phone, route titles/descriptions, sitemap and custom static 404.
- Consent-gated Vercel Speed Insights. Consent can be withdrawn; queries/hashes are stripped.
- Broken SNK link replaced with its verified live resume URL.

Not needed at current scale: search/autocomplete and their debounce, API pagination, marketing UTM storage, Redis, SQL indexes/connection pooling. Sanity is the managed datastore; no SQL connection is opened by this site. No destructive public actions require confirmation dialogs. Metrics preferences use localStorage; a consent panel appears only when optional monitoring is enabled.

Notes: Static content is a build snapshot; live Sanity reads refresh after hydration/focus. Removing a published review from all static HTML requires a rebuild and updating the local snapshot as well. Vercel measurement reporting depends on visitor consent and project availability. Tests simulate slow mobile conditions; they do not replace physical-device or real-user measurements.

Version 2.3 removes theme switching, restores real local skill logos, adds a real RepTrack thumbnail, removes the visible details CTA and uses card-wide detail opening with separate Live Site/GitHub buttons. CMS link updates and explicit clears are respected.

Version 2.4 replaces the visitor contact form with direct Email/WhatsApp/Call links by owner choice, aligns copy controls within their value rows, removes full-screen homepage section heights, unifies section backgrounds and fixes service/footer CTA hover contrast. The review submission form remains unchanged.
