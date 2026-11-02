# 🌐 Vinoth Kumar M — Portfolio & Review Flow

A high-performance modern Developer Portfolio Website built using **React, Tailwind CSS, Framer Motion, and Sanity CMS**.

---

## 🌟 Hardened Public Review & Moderation System

The portfolio includes a privacy-first, hardened public review submission system (`/review`) with moderation handled via Sanity CMS.

### Security & Privacy Architecture
1. **Privacy Guarantee (No Email in Public CMS):** Reviewers' email addresses are never requested or stored in Sanity. The public dataset is treated as fully accessible, ensuring zero PII leak risk.
2. **Publish Equals Approve:** Submissions are created directly as unpublished Sanity drafts (`_id: drafts.review-<hash>`). Sanity's API specification guarantees that unauthenticated public API queries **never** see drafts. Approval simply requires clicking **Publish** in Sanity Studio. No secondary flags or approval checkboxes are needed.
3. **Deterministic Deduplication:** Document IDs are deterministically hashed from the normalized reviewer name and text (`drafts.review-<hash>`). The server checks whether a published or draft review already exists before writing with `createIfNotExists`. Re-submitting, double-clicking, or refreshing creates exactly one document.
4. **Post-Validation Rate Limiting:** All input validation runs before rate-limiting counts are incremented, ensuring validation errors never exhaust a visitor's quota.
5. **Sanity-Backed Global & Visitor Limits (Draft Perspective):**
   - **Global Cap:** Max 20 submissions per hour across the entire site.
   - **Per-Visitor Cap:** Max 3 submissions per hour per visitor, identified via HMAC-SHA256 hashed IP (`REVIEW_HASH_SECRET`).
   - **Separate Rate-Limit Records:** Hashed IPs are stored in separate, unpublished rate records (`reviewRateLimit`) and never attached to the testimonial document. Published reviews have zero IP hashes.
   - **Perspective:** Count queries explicitly use `perspective: "raw"` so drafts are counted accurately.
6. **Strict Origin & Referer Verification:** Requires `ALLOWED_ORIGIN` in production, rejects requests lacking both Origin and Referer, performs exact origin checks (scheme + host), and supports comma-separated domain lists.
7. **Cloudflare Turnstile Bot Protection:** Free bot challenge with server-side token verification (`/siteverify`), combined with an autofill-safe honeypot. The widget resets after every attempt (success or failure) and keeps the submit button disabled until verified.
8. **Real-Tag Sanitizer & Shared Spam Rules:** Strips only valid complete HTML tags, ensuring reviews containing `<3` or `< 5` are preserved intact. Checks links only in review text so company names like "Zoho.com" or "Booking.com" in designations are accepted. Words like "crypto" or "forex" are not rejected.
9. **SEO Header:** `/review` is protected by `X-Robots-Tag: noindex, nofollow` in `vercel.json` without modifying `index.html` or executing JavaScript DOM hacks.

---

## 🔑 Required Environment Variables

Configure these in your Vercel Dashboard (**Project Settings** → **Environment Variables**) and in `Frontend/.env.local` for local development:

| Variable | Scope | Description | Example |
|---|---|---|---|
| `SANITY_PROJECT_ID` | Serverless / Build | Your Sanity project ID | `n2y8hmqi` |
| `SANITY_DATASET` | Serverless / Build | Your Sanity dataset | `production` |
| `SANITY_WRITE_TOKEN` | Serverless (Private) | Sanity API token with **Editor** role | `sk...` |
| `ALLOWED_ORIGIN` | Serverless (Private) | Comma-separated allowed origins (exact scheme + host) | `https://vinothkumarm27.vercel.app,http://localhost:5173` |
| `REVIEW_HASH_SECRET` | Serverless (Private) | Required secret key for HMAC-SHA256 IP hashing (min 32 chars) | `random_secret_32_chars` |
| `TURNSTILE_SECRET_KEY` | Serverless (Private) | Cloudflare Turnstile secret key (Required in production) | `0x4AAAA...` |
| `VITE_TURNSTILE_SITE_KEY` | Frontend (Public) | Cloudflare Turnstile public site key | `0x4AAAA...` |
| `VITE_SANITY_PROJECT_ID` | Frontend (Public) | Client Sanity project ID | `n2y8hmqi` |
| `VITE_SANITY_DATASET` | Frontend (Public) | Client Sanity dataset | `production` |
| `VITE_SANITY_API_VERSION` | Frontend (Public) | Sanity API version | `2024-05-01` |

---

## ⚙️ Setup & Local Testing Guide

### 1. Configure Local Environment (`Frontend/.env.local`)
Create `Frontend/.env.local` and add:
```env
SANITY_PROJECT_ID=n2y8hmqi
SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_sanity_editor_token_here
REVIEW_HASH_SECRET=your_random_32_character_secret_here
ALLOWED_ORIGIN=http://localhost:5173,https://vinothkumarm27.vercel.app

# Optional: Cloudflare Turnstile test keys (enabled by default in dev)
VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

### 2. Run Local Development
```bash
cd Frontend
npm run dev
```
The embedded API middleware in `Frontend/vite.config.js` automatically loads `Frontend/.env.local` directly into the Node environment, executing `/api/submit-review` on `http://localhost:5173/api/submit-review` without any server configuration errors.

### 3. Generate Sanity Write Token for Production
1. Go to [Sanity Manage](https://manage.sanity.io) → Select project (`n2y8hmqi`).
2. Navigate to **API** → **Tokens** → **Add API token**.
3. Name: `Portfolio Reviews`, Role: `Editor`.
4. Copy the token into `SANITY_WRITE_TOKEN` in your Vercel Dashboard.

### 4. Setup Cloudflare Turnstile (Free)
1. In Cloudflare Dashboard, go to **Turnstile** → **Add Site**.
2. Name: `Portfolio Reviews`, Domain: `vinothkumarm27.vercel.app` (and `localhost`).
3. Set `VITE_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in Vercel.

### 5. Run Migration & Privacy Scrub
```bash
# 1. Run safe dry-run (default: lists studio vs. public reviews, modifies nothing):
npm run migrate:testimonials:dry

# 2. Execute safe updates (marks studio testimonials approved, scrubs legacy emails):
npm run migrate:testimonials

# 3. Optional: Delete old public-form test submissions:
node scripts/migrate-testimonials.js --delete-public-submissions
```

### 6. Deploy Sanity Studio
Deploy updated studio schemas and Pending/Approved review structure:
```bash
cd studio
npm run deploy
```

---

## 🧑‍💻 Author

**Vinoth Kumar M**  
Full Stack & MERN Stack Developer  
- 📧 [vinothkumarm1127@gmail.com](mailto:vinothkumarm1127@gmail.com)  
- 🌐 [https://vinothkumarm27.vercel.app/](https://vinothkumarm27.vercel.app/)