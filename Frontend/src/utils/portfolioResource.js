import { sanityClient } from "../sanity/client";
import { PORTFOLIO_QUERY } from "../sanity/queries";
let cached = null;
let cachedAt = 0;
let pending = null;
const MAX_AGE = 60000;
export function readPortfolio({ force = false } = {}) {
  if (pending) return pending;
  if (!force && cached && Date.now() - cachedAt < MAX_AGE) return Promise.resolve(cached);
  pending = sanityClient.fetch(PORTFOLIO_QUERY).then(data => {
    cached = data;
    cachedAt = Date.now();
    return data;
  }).finally(() => { pending = null; });
  return pending;
}
