import { useLayoutEffect } from "react";

// Entrance motion uses individual translate/scale properties, so card hover
// transforms and the existing portrait transitions remain independent.
const compositions = [
  [".section-heading, .page-heading, .cta-inner, .connect-heading", "up"],
  [".about-portrait, .sketchbook-art", "scale"],
  [".about-copy, .sketchbook-copy, .experience-detail", "right"],
  [".experience-stat, .work-collection-header, .contact-info", "left"],
  [
    ".bento-card, .blog-card, .education-item, .credential-card, .gallery-tile, .social-card",
    "up",
  ],
  [".video-card, .video-hero-art", "scale"],
  [".skill-art", "left"],
  [".skill-copy, .contact-form", "right"],
];

export default function useScrollReveal(route) {
  useLayoutEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    // Registration prevents duplicate observers, not subsequent entrances.
    const elements = new Set();
    const entrance = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
          if (
            preference.matches ||
            (isIntersecting && intersectionRatio >= 0.06)
          ) {
            // Observer records may precede a rapid scroll or layout change.
            const bounds = target.getBoundingClientRect();
            if (
              preference.matches ||
              (bounds.bottom > 0 && bounds.top < innerHeight - 24)
            )
              target.classList.add("is-visible");
          }
        });
      },
      { threshold: [0, 0.06], rootMargin: "0px 0px -24px 0px" },
    );
    // A wider exit boundary creates hysteresis. Tiny boundary movements and
    // the entrance translation cannot immediately reset a visible element.
    const departure = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (
            !isIntersecting &&
            !preference.matches &&
            !target.contains(document.activeElement)
          ) {
            const bounds = target.getBoundingClientRect();
            if (bounds.bottom < -96 || bounds.top > innerHeight + 96)
              target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0, rootMargin: "96px 0px 96px 0px" },
    );

    function discover() {
      elements.forEach((element) => {
        if (!element.isConnected) {
          entrance.unobserve(element);
          departure.unobserve(element);
          elements.delete(element);
        }
      });
      compositions.forEach(([selector, direction]) => {
        document.querySelectorAll(selector).forEach((element) => {
          if (elements.has(element)) return;
          elements.add(element);
          let motion = direction;
          if (
            element.matches(".skill-art, .skill-copy") &&
            element.closest(".skill-area")?.matches(":nth-child(even)")
          ) {
            motion = direction === "left" ? "right" : "left";
          }
          const grid = element.parentElement;
          if (
            grid.matches(
              ".creative-grid, .blog-grid, .video-grid, .work-gallery, .credential-grid, .social-grid",
            )
          ) {
            const index = [...grid.children].indexOf(element);
            element.style.setProperty(
              "--reveal-delay",
              `${(index % 3) * 85}ms`,
            );
            if (grid.matches(".creative-grid"))
              motion = ["left", "right", "up", "scale", "right"][index % 5];
          }
          element.dataset.reveal = motion;
          element.classList.add("reveal");
          element.classList.toggle("is-visible", preference.matches);
          if (!preference.matches) {
            entrance.observe(element);
            departure.observe(element);
          }
        });
      });
    }
    function updatePreference() {
      entrance.disconnect();
      departure.disconnect();
      elements.forEach((element) => {
        if (preference.matches) element.classList.add("is-visible");
        else {
          entrance.observe(element);
          departure.observe(element);
        }
      });
    }
    function revealFocused(event) {
      const element = event.target.closest(".reveal");
      if (element) {
        element.classList.add("is-visible");
      }
    }
    function resetAfterFocus(event) {
      const element = event.target.closest(".reveal");
      if (
        !element ||
        preference.matches ||
        element.contains(event.relatedTarget)
      )
        return;
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom < -96 || bounds.top > innerHeight + 96)
        element.classList.remove("is-visible");
    }
    discover();
    // Filter changes mount new cards without a route change.
    const mutations = new MutationObserver(discover);
    mutations.observe(document.getElementById("main-content"), {
      childList: true,
      subtree: true,
    });
    preference.addEventListener("change", updatePreference);
    document.addEventListener("focusin", revealFocused);
    document.addEventListener("focusout", resetAfterFocus);
    return () => {
      entrance.disconnect();
      departure.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("focusin", revealFocused);
      document.removeEventListener("focusout", resetAfterFocus);
      elements.forEach((element) => {
        element.classList.remove("reveal", "is-visible");
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [route]);
}
