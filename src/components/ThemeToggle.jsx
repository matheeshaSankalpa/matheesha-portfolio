import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function followSystem(event) {
      let stored;
      try {
        stored = localStorage.getItem("portfolio-theme");
      } catch {
        /* Storage can be unavailable. */
      }
      if (!stored) {
        const next = event.matches ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        setTheme(next);
      }
    }
    function sync(event) {
      if (event.key === "portfolio-theme") {
        const next = ["dark", "light"].includes(event.newValue)
          ? event.newValue
          : media.matches
            ? "dark"
            : "light";
        document.documentElement.dataset.theme = next;
        setTheme(next);
      }
    }
    media.addEventListener("change", followSystem);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", followSystem);
      window.removeEventListener("storage", sync);
    };
  }, []);
  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Keep switching functional without storage. */
    }
  }
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-pressed={theme === "dark"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        {theme === "light" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </>
        ) : (
          <path d="M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z" />
        )}
      </svg>
    </button>
  );
}
