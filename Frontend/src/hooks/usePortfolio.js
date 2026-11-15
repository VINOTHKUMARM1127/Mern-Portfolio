import { useContext } from "react";
import { PortfolioContext } from "../context/portfolioContextValue";
export function usePortfolio() {
 const context = useContext(PortfolioContext);
 if (!context) throw new Error("usePortfolio requires PortfolioProvider");
 return context;
}
