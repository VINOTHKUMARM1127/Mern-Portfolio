import { useCallback, useEffect, useState } from "react";
import { CorsOriginError } from "@sanity/client";
import { sanityClient, sanityConfigured } from "../sanity/client";
import { PORTFOLIO_QUERY } from "../sanity/queries";
import { mapPortfolioData } from "../utils/mapSanityData";

export default function usePortfolioContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    if (!sanityConfigured) {
      setError("Sanity is not configured. Set VITE_SANITY_PROJECT_ID in .env");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const raw = await sanityClient.fetch(PORTFOLIO_QUERY);
      setData(mapPortfolioData(raw));
    } catch (err) {
      console.error("Sanity fetch failed:", err);
      if (err instanceof CorsOriginError) {
        setError(
          "Sanity CORS: restart npm run dev (uses Vite proxy), or add http://localhost:5173 in Sanity Manage → API → CORS origins."
        );
      } else {
        setError(err.message || "Failed to load portfolio content");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    ...data,
    loading,
    error,
    refetch: fetchContent,
    sanityConfigured,
  };
}
