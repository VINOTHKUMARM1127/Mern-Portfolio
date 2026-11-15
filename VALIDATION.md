# Validation — portfolio v2.2.0

- Frontend lint passed with no errors/warnings.
- Production build generated initial HTML for Home, About, Projects, Services, Contact, Review and 404; rendered HTML contains actual content and route-specific metadata.
- Production-browser checks: 360, 390, 768 and 1440px; all routes; no hydration/page errors or horizontal overflow.
- No-JavaScript Projects page exposes its heading and live links. Form submission is disabled until hydration to avoid accidental GET requests containing form fields.
- StrictMode plus focus/visibility events: one mocked public CMS request within the cache lifetime.
- Consent: monitoring script absent before acceptance; loads after acceptance; query/hash sanitized; callback returns null after withdrawal.
- Theme persists across full-page navigation; local font and no Google Fonts API requests.
- Clipboard copied the expected email. Contact empty validation, mocked HTTP 500 error, retry and HTTP 200 success checked without sending real email.
- Mobile menu: Escape restores focus; resizing to desktop closes menu and unlocks scrolling.
- Project modal keyboard/focus checks retained from v2.1; project cards now use native buttons and separate direct live links.
- All six external project URLs and the existing CV URL responded HTTP 200 after correcting SNK's obsolete 404 URL to its live resume address.
- Slow-mobile simulation: one cold-page run in Chromium with 4x CPU slowdown, 1.6 Mbps download, 750 Kbps upload and 150ms latency. Heading visible 1704ms, LCP 1036ms, CLS 0, no overflow or external-font calls. Local preview server, not field data or a Lighthouse score; repeat on deployed site/real devices for representative performance.
- gzip/Brotli artifacts and explicit cache headers generated; negotiated compression verified after deployment.

Real EmailJS delivery, human CAPTCHA completion and real client review submissions are not exercised automatically. Public CMS records are read only; no review records are modified by these checks. No private credentials or resume PDF are added to GitHub. Static published-content snapshots can require a rebuild after editorial changes.


## Version 2.3 design checks
- 28 production-preview route/viewport checks at 360, 390, 768 and 1440px; no overflow or hydration errors.
- Fixed light mode ignores a previously saved dark preference and the theme toggle is absent.
- All fourteen local skill-logo SVGs load with nonzero natural dimensions.
- Card image/body clicks and keyboard activation open the details dialog; Escape restores focus.
- No visible details link; a single live action fills the row, and personal projects with a repository show two links.
- External GitHub link opens separately without also opening the dialog.
- CMS data mapping checked for new URL values, explicit empty/null clears, unsafe URL rejection and RepTrack deduplication.
- Real RepTrack thumbnail captured from its public landing page; no account data or review records changed.


## Version 2.4 layout/contact checks
- Lint and prerendered production build passed.
- 28 route/viewport checks across 360, 390, 768 and 1440px: no page errors or horizontal overflow.
- Measured desktop spacing: 32px from hero section boundary to Portfolio badge; 84px from project CTA bottom to Skills badge; no full-screen project/skills minimum height or per-section glow layers.
- Service CTA navigates to the matching service anchor; selecting a service carries context into the direct email link.
- Footer Let's Talk remains white on a darkened purple hover background and navigates to Contact.
- Contact contains no form or Send Message control. Email/WhatsApp/Call hrefs checked; no real email or calls initiated.
- Email and phone clipboard controls copied their exact corresponding values, with controls aligned in each value row.
- Visual review of project spacing, process cards and contact cards completed.

- Direct Contact service-enquiry URLs and full reloads preserve their context without hydration errors.
