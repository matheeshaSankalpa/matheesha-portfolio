import { Link } from "react-router-dom";
import { personal } from "../data/content";
import { Arrow } from "./ui";
export default function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <Link className="wordmark" to="/">
          matheesha<span>✳</span>
        </Link>
        <p>
          Somewhere between a campaign,
          <br />a design file and a browser tab.
        </p>
        <div className="footer-socials">
          {[
            ["LinkedIn", personal.linkedin],
            ["GitHub", personal.github],
            ["Medium", personal.medium],
            ["HackerRank", personal.hackerrank],
          ].map(([label, url]) => (
            <a href={url} key={label} target="_blank" rel="noreferrer">
              {label}
              <Arrow diagonal />
            </a>
          ))}
        </div>
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
