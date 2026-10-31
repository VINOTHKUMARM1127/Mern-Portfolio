import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PortfolioProvider } from "./context/PortfolioContext";
import GlobalLoader from "./components/ui/GlobalLoader";
import PageTransition from "./components/ui/PageTransition";

const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Projects = lazy(() => import("./Pages/Projects"));
const Services = lazy(() => import("./Pages/Services"));
const Contact = lazy(() => import("./Pages/Contact"));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <Projects />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <Suspense fallback={<GlobalLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </PortfolioProvider>
  );
}

export default App;
