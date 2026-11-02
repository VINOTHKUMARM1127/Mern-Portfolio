import crypto from "node:crypto";
import { createClient } from "@sanity/client";
import { validateReviewSpam } from "../src/utils/reviewSpamRules.js";

// In-memory rate limiting map as cheap first filter: ipHash -> [timestamps in ms]
const inMemoryIpStore = new Map();

function isMemoryRateLimited(ipHash, windowMs = 3600000, maxAttempts = 6) {
  const now = Date.now();
  const timestamps = inMemoryIpStore.get(ipHash) || [];
  const validTimestamps = timestamps.filter((time) => now - time < windowMs);

  if (validTimestamps.length >= maxAttempts) {
    inMemoryIpStore.set(ipHash, validTimestamps);
    return true;
  }

  // Clean up memory map periodically
  if (inMemoryIpStore.size > 2000) {
    inMemoryIpStore.clear();
  }

  return false;
}

function recordMemoryAttempt(ipHash) {
  const now = Date.now();
  const timestamps = inMemoryIpStore.get(ipHash) || [];
  timestamps.push(now);
  inMemoryIpStore.set(ipHash, timestamps);
}

// Strip real HTML tags only (complete angle-bracket tags), keeping strings like "<3" or "< 5" intact
function sanitizeInput(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/gi, "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

// Normalizes text across case, line breaks, and all whitespace variations for duplicate comparison
function normalizeReviewText(str) {
  if (typeof str !== "string") return "";
  return str
    .toLowerCase()
    .replace(/\r\n/g, "\n")
    .replace(/[\s\u200B-\u200D\uFEFF]+/g, " ")
    .trim();
}

// Best-effort cleanup of reviewRateLimit records older than 24 hours (non-blocking)
function pruneOldRateLimitRecords(client) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  client
    .fetch(
      `*[_type == "reviewRateLimit" && submittedAt < $twentyFourHoursAgo]._id`,
      { twentyFourHoursAgo },
      { perspective: "raw" }
    )
    .then(async (oldIds) => {
      if (oldIds && oldIds.length > 0) {
        const tx = client.transaction();
        for (const id of oldIds.slice(0, 100)) {
          tx.delete(id);
        }
        await tx.commit();
      }
    })
    .catch((err) => {
      console.warn("[submit-review] Rate-limit records cleanup notice:", err.message);
    });
}

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const isDev = process.env.NODE_ENV !== "production";

    // 2. Strict Origin / Referer check
    const allowedOriginEnv = process.env.ALLOWED_ORIGIN || "";

    if (!isDev) {
      if (!allowedOriginEnv) {
        console.error(
          "[submit-review] Error: ALLOWED_ORIGIN environment variable is required in production"
        );
        return res
          .status(500)
          .json({ error: "Server configuration error. Please contact administrator." });
      }

      const rawOrigin = req.headers.origin || req.headers.referer;
      if (!rawOrigin) {
        return res
          .status(403)
          .json({ error: "Forbidden: Missing origin or referer header." });
      }

      let requestOrigin;
      try {
        requestOrigin = new URL(rawOrigin).origin.toLowerCase();
      } catch {
        return res
          .status(403)
          .json({ error: "Forbidden: Invalid origin format." });
      }

      const allowedList = allowedOriginEnv
        .split(",")
        .map((o) => o.trim().toLowerCase())
        .filter(Boolean);

      const isAllowed = allowedList.includes(requestOrigin);
      if (!isAllowed) {
        return res.status(403).json({ error: "Forbidden: Origin not permitted." });
      }
    }

    // 3. Parse JSON body safely
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: "Invalid JSON payload." });
      }
    }
    body = body || {};

    // 4. Honeypot check (Autofill-safe field name)
    const honeypotVal = body.feedbackNotes_hp || body.website;
    if (honeypotVal && String(honeypotVal).trim() !== "") {
      return res.status(200).json({ ok: true });
    }

    // 5. Bot Challenge Verification (Cloudflare Turnstile)
    const clientIp = String(
      req.headers["x-forwarded-for"] ||
        req.headers["x-real-ip"] ||
        req.socket?.remoteAddress ||
        "127.0.0.1"
    )
      .split(",")[0]
      .trim();

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

    // Server-side: in production, if TURNSTILE_SECRET_KEY is missing, log an error and refuse
    if (!isDev && !turnstileSecret) {
      console.error(
        "[submit-review] Error: TURNSTILE_SECRET_KEY is required in production"
      );
      return res.status(500).json({
        error: "Server configuration error. Please contact administrator.",
      });
    }

    if (turnstileSecret) {
      const turnstileToken = body.turnstileToken;
      if (!turnstileToken) {
        return res.status(400).json({
          error: "Security verification required. Please complete the security check.",
        });
      }

      try {
        const verifyRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              secret: turnstileSecret,
              response: turnstileToken,
              remoteip: clientIp,
            }),
          }
        );
        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          console.warn(
            "[submit-review] Turnstile verification failed:",
            verifyData["error-codes"]
          );
          return res.status(400).json({
            error: "Security verification failed. Please refresh and try again.",
          });
        }
      } catch (turnstileErr) {
        console.error(
          "[submit-review] Turnstile request error:",
          turnstileErr.message
        );
        return res.status(500).json({
          error: "Unable to verify security challenge. Please try again later.",
        });
      }
    }

    // Require the elapsed-time value; a missing value must be rejected, not skipped
    if (
      body.elapsedMs === undefined ||
      body.elapsedMs === null ||
      body.elapsedMs === ""
    ) {
      return res.status(400).json({
        error: "Invalid submission metadata: elapsed time is required.",
      });
    }

    const elapsedMs = Number(body.elapsedMs);
    if (isNaN(elapsedMs) || elapsedMs <= 0) {
      return res.status(400).json({
        error: "Invalid submission metadata: invalid elapsed time value.",
      });
    }

    if (elapsedMs < 1500) {
      return res.status(400).json({
        error: "Submission was too fast. Please take your time.",
      });
    }

    // 6. Validate & Clean fields
    const clientName = sanitizeInput(body.name);
    const clientRole = sanitizeInput(body.role);
    const quote = sanitizeInput(body.quote);
    const ratingNum = Number(body.rating);

    if (!clientName || clientName.length < 2 || clientName.length > 80) {
      return res.status(400).json({
        error: "Name must be between 2 and 80 characters.",
      });
    }

    if (!clientRole || clientRole.length < 2 || clientRole.length > 100) {
      return res.status(400).json({
        error: "Designation / Company must be between 2 and 100 characters.",
      });
    }

    if (!quote || quote.length < 10 || quote.length > 800) {
      return res.status(400).json({
        error: "Review must be between 10 and 800 characters.",
      });
    }

    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        error: "Rating must be an integer between 1 and 5.",
      });
    }

    // 7. Shared Link & Spam validation (Zoho.com/Booking.com in role accepted; crypto/forex permitted)
    const spamCheck = validateReviewSpam({
      name: clientName,
      role: clientRole,
      quote,
    });
    if (!spamCheck.isValid) {
      return res.status(400).json({ error: spamCheck.error });
    }

    // 8. Compute visitor IP hash (REQUIRE REVIEW_HASH_SECRET)
    const hashSecret = process.env.REVIEW_HASH_SECRET;
    if (!hashSecret) {
      console.error(
        "[submit-review] Error: REVIEW_HASH_SECRET environment variable is required"
      );
      return res.status(500).json({
        error: "Server configuration error. Please contact administrator.",
      });
    }

    const ipHash = crypto
      .createHmac("sha256", hashSecret)
      .update(clientIp)
      .digest("hex");

    // 9. Rate limiting (Validation has passed, now check limits)
    if (isMemoryRateLimited(ipHash, 3600000, 6)) {
      return res.status(429).json({
        error: "Too many submissions from this device. Please try again later.",
      });
    }

    // Initialize Sanity client with explicit perspective: 'raw' to include all drafts
    const projectId =
      process.env.SANITY_PROJECT_ID ||
      process.env.VITE_SANITY_PROJECT_ID ||
      "n2y8hmqi";
    const dataset =
      process.env.SANITY_DATASET ||
      process.env.VITE_SANITY_DATASET ||
      "production";
    const token = process.env.SANITY_WRITE_TOKEN;

    if (!token) {
      console.error("[submit-review] Error: SANITY_WRITE_TOKEN is missing");
      return res.status(500).json({
        error: "Server configuration error. Please contact administrator.",
      });
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2024-05-01",
      token,
      useCdn: false,
      perspective: "raw",
    });

    // Best-effort cleanup of rate limit records older than 24 hours (non-blocking)
    pruneOldRateLimitRecords(client);

    // Shared Sanity-based rate limit: Global cap (20/hr) + Visitor cap (3/hr)
    const oneHourAgo = new Date(Date.now() - 3600 * 1000).toISOString();
    try {
      const [globalCount, visitorCount] = await Promise.all([
        client.fetch(
          `count(*[(_type == "reviewRateLimit" || (_type == "testimonial" && source == "public-form")) && submittedAt > $oneHourAgo])`,
          { oneHourAgo },
          { perspective: "raw" }
        ),
        client.fetch(
          `count(*[(_type == "reviewRateLimit" || _type == "testimonial") && ipHash == $ipHash && submittedAt > $oneHourAgo])`,
          { ipHash, oneHourAgo },
          { perspective: "raw" }
        ),
      ]);

      if (globalCount >= 20) {
        return res.status(429).json({
          error: "Global submission limit reached for this hour. Please try again later.",
        });
      }

      if (visitorCount >= 3) {
        return res.status(429).json({
          error: "Too many submissions from this device. Please try again in an hour.",
        });
      }
    } catch (countErr) {
      console.error(
        "[submit-review] Sanity rate-limit check failed:",
        countErr.message
      );
      return res.status(429).json({
        error: "Service is temporarily busy. Please try again later.",
      });
    }

    // 10. Normalized duplicate check (handles whitespace, line breaks, case)
    const normalizedName = normalizeReviewText(clientName);
    const normalizedQuote = normalizeReviewText(quote);
    const contentHash = crypto
      .createHash("sha256")
      .update(`${normalizedName}:::${normalizedQuote}`)
      .digest("hex")
      .slice(0, 32);

    const docId = `drafts.review-${contentHash}`;
    const publishedId = `review-${contentHash}`;

    // Query published testimonials and compare normalized text and stored hash
    const publishedTestimonials = await client.fetch(
      `*[_type == "testimonial" && !(_id in path("drafts.**"))]{ _id, clientName, quote, contentHash }`,
      {},
      { perspective: "raw" }
    );

    const isDuplicate = publishedTestimonials.some((t) => {
      if (t._id === publishedId) return true;
      if (t.contentHash && t.contentHash === contentHash) return true;
      const tNormName = normalizeReviewText(t.clientName || "");
      const tNormQuote = normalizeReviewText(t.quote || "");
      return tNormName === normalizedName && tNormQuote === normalizedQuote;
    });

    if (isDuplicate) {
      return res.status(200).json({ ok: true, duplicate: true });
    }

    // 11. Create document as unpublished draft
    // NOTICE: We do NOT write "approved" field. Approval is simply clicking "Publish" in Studio.
    // NOTICE: We do NOT write "ipHash" on the testimonial document so it is never exposed on publication.
    const doc = {
      _id: docId,
      _type: "testimonial",
      source: "public-form",
      submittedAt: new Date().toISOString(),
      clientName,
      clientRole,
      quote,
      rating: ratingNum,
      contentHash,
    };

    // createIfNotExists prevents duplicates from double-click or page refresh
    await client.createIfNotExists(doc);

    // 12. Store rate limit record separately as a private draft (never published, never public)
    const rateLimitDoc = {
      _id: `drafts.rateLimit-${contentHash}-${Date.now()}`,
      _type: "reviewRateLimit",
      ipHash,
      submittedAt: new Date().toISOString(),
    };
    try {
      await client.create(rateLimitDoc);
    } catch (rlErr) {
      console.warn("[submit-review] Rate record notice:", rlErr.message);
    }

    // Record attempt in memory store now that submission succeeded
    recordMemoryAttempt(ipHash);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[submit-review] Error submitting review:", err.message);
    return res.status(500).json({
      error: "Failed to submit review. Please try again later.",
    });
  }
}
