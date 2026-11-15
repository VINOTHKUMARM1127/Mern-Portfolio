import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2024-05-01";

export const sanityConfigured = Boolean(projectId && projectId !== "your_project_id");

/**
 * In dev, route API calls through Vite proxy (/sanity → apicdn) to avoid CORS.
 * For production, add your site URL in Sanity: Manage → API → CORS origins.
 */
const useDevProxy = import.meta.env.DEV && !import.meta.env.SSR && sanityConfigured;

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  timeout: 10000,
  maxRetries: 1,
  ...(useDevProxy && {
    useProjectHostname: false,
    apiHost: `${window.location.origin}/sanity`,
  }),
});
