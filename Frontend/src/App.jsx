import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext";
import GlobalLoader from "./components/ui/GlobalLoader";

const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Projects = lazy(() => import("./Pages/Projects"));
const Services = lazy(() => import("./Pages/Services"));
const Contact = lazy(() => import("./Pages/Contact"));

function App() {
  return (
    <PortfolioProvider>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </PortfolioProvider>
  );
}

export default App;
