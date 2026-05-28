import React, { createContext, useContext } from "react";
import usePortfolioContent from "../hooks/usePortfolioContent";

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const portfolio = usePortfolioContent();
  return (
    <PortfolioContext.Provider value={portfolio}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return ctx;
}
