/**
 * Shared Spam & Link Rules for Portfolio Reviews
 * Used identically across client (ReviewForm.jsx) and server (api/submit-review.js)
 */

// Detect URLs/links ONLY in the review body text
export const URL_IN_QUOTE_REGEX =
  /(?:https?:\/\/|www\.)[^\s]+|[a-zA-Z0-9-]+\.(?:com|net|org|io|xyz|ru|cn|biz|top|info|site|online|tech|edu|gov|app|co)\b(?:\/[^\s]*)?/i;

// Obvious spam, gambling, illicit drugs, solicitation spam, or abusive language.
// Notice: "crypto" and "forex" are intentionally NOT rejected to support legitimate tech/fintech clients.
export const OBVIOUS_SPAM_REGEX =
  /\b(casino|slot\s+game|slot\s+machine|gambling|sportsbook|poker\s+online|viagra|cialis|adult\s+dating|escort\s+service|whatsapp\s+me\s+at|contact\s+(?:me\s+)?on\s+telegram|telegram\s+@|dm\s+me\s+at\s+@|fuck|bitch|asshole)\b/i;

/**
 * Validates text content against link and abuse rules.
 * - Links are checked ONLY in quote (review text).
 * - Company names like "Zoho.com" or "Booking.com" in name or role are accepted.
 * 
 * @param {{ name: string, role: string, quote: string }} params
 * @returns {{ isValid: boolean, error?: string }}
 */
export function validateReviewSpam({ name = "", role = "", quote = "" }) {
  // 1. Check for web links ONLY in the review body
  if (URL_IN_QUOTE_REGEX.test(quote)) {
    return {
      isValid: false,
      error: "Reviews cannot contain web links or URLs. Please remove any web addresses.",
    };
  }

  // 2. Check for obvious abuse/spam across fields
  if (
    OBVIOUS_SPAM_REGEX.test(quote) ||
    OBVIOUS_SPAM_REGEX.test(name) ||
    OBVIOUS_SPAM_REGEX.test(role)
  ) {
    return {
      isValid: false,
      error:
        "Your review contains prohibited content. Please ensure your feedback is appropriate and contains no promotional content.",
    };
  }

  return { isValid: true };
}
