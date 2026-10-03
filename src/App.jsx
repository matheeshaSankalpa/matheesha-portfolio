import { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkPage from "./pages/WorkPage";
import VideosPage from "./pages/VideosPage";
import BlogsPage from "./pages/BlogsPage";
import SkillsPage from "./pages/SkillsPage";
import ContactPage from "./pages/ContactPage";
import TimelinePage from "./pages/TimelinePage";
import useScrollReveal from "./hooks/useScrollReveal";
const titles = {
  "/": "Marketing, Design & Web",
  "/work": "Selected Work",
  "/skills": "Skills & Tools",
  "/timeline": "Education & Learning",
  "/education": "Education & Learning",
  "/videos": "Videos",
  "/blogs": "Blogs",
  "/contact": "Contact",
};
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);
  useScrollReveal(pathname);
  useEffect(() => {
    document.title =
      (titles[pathname] || "Page not found") + " | Matheesha Sankalpa";
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({ behavior: "instant" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      if (!firstRender.current)
        document.getElementById("main-content")?.focus({ preventScroll: true });
      firstRender.current = false;
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
export default function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <RouteEffects />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/education" element={<TimelinePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="*"
          element={
            <main
              className="page-section container"
              id="main-content"
              tabIndex="-1"
            >
              <div className="page-heading">
                <p className="section-label">404</p>
                <h1>This page wandered off.</h1>
                <Link className="button button-dark" to="/">
                  Back to home ↗
                </Link>
              </div>
            </main>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
