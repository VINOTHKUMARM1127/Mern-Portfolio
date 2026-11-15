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
