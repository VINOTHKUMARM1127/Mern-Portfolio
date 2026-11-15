import usePortfolioContent from "../hooks/usePortfolioContent";
import { PortfolioContext } from "./portfolioContextValue";
export function PortfolioProvider({ children }) {
 const portfolio = usePortfolioContent();
 return <PortfolioContext.Provider value={portfolio}>{children}</PortfolioContext.Provider>;
}
