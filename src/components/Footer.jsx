import { Link } from "react-router-dom";
import Connect from "./Connect";
export default function Footer() {
  return (
    <footer className="site-footer container">
      <Connect />
      <div className="footer-top">
        <Link className="wordmark" to="/">
          matheesha<span>✳</span>
        </Link>
        <p>
          Somewhere between a campaign,
          <br />a design file and a browser tab.
        </p>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Matheesha Sankalpa</p>
        <nav aria-label="Footer navigation">
          <Link to="/timeline">Education</Link>
          <Link to="/videos">Videos</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
