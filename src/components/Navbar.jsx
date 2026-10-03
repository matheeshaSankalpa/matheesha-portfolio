import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Arrow } from "./ui";
const links = [
  ["Home", "/"],
  ["Work", "/work"],
  ["Skills", "/skills"],
  ["Education", "/timeline"],
  ["Blogs", "/blogs"],
  ["Videos", "/videos"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const mobileNav = useRef(null);
  useEffect(() => {
    if (!open) return;
    mobileNav.current?.querySelector("a")?.focus();
    function escape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    function resize() {
      if (window.innerWidth > 1000) setOpen(false);
    }
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner container">
        <Link
          className="wordmark"
          to="/"
          onClick={() => setOpen(false)}
          aria-label="Matheesha, home"
        >
          matheesha<span>✳</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, path]) => (
            <NavLink key={path} to={path} end={path === "/"}>
              {name}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link
            className="nav-contact"
            to="/contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <Arrow diagonal />
          </Link>
          <button
            ref={menuButton}
            className={`menu-toggle ${open ? "is-open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {open && (
        <nav
          ref={mobileNav}
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[...links, ["Contact", "/contact"]].map(([name, path], i) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={() => setOpen(false)}
            >
              <span className="nav-index">0{i + 1}</span>
              {name}
              <Arrow diagonal />
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
