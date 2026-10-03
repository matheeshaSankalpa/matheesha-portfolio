import { useLayoutEffect } from "react";

// Entrance motion uses individual translate/scale properties, so card hover
// transforms and the existing portrait transitions remain independent.
const compositions = [
  [".section-heading, .page-heading, .cta-inner", "up"],
  [".about-portrait, .sketchbook-art", "scale"],
  [".about-copy, .sketchbook-copy, .experience-detail", "right"],
  [".experience-stat, .work-collection-header, .contact-info", "left"],
  [
    ".bento-card, .blog-card, .education-item, .credential-card, .gallery-tile",
    "up",
  ],
  [".video-card, .video-hero-art", "scale"],
  [".skill-art", "left"],
  [".skill-copy, .contact-form", "right"],
];

export default function useScrollReveal(route) {
  useLayoutEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet();
    const elements = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.classList.add("is-visible");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
    );

    function discover() {
      compositions.forEach(([selector, direction]) => {
        document.querySelectorAll(selector).forEach((element) => {
          if (seen.has(element)) return;
          seen.add(element);
          elements.add(element);
          let entrance = direction;
          if (
            element.matches(".skill-art, .skill-copy") &&
            element.closest(".skill-area")?.matches(":nth-child(even)")
          ) {
            entrance = direction === "left" ? "right" : "left";
          }
          const grid = element.parentElement;
          if (
            grid.matches(
              ".creative-grid, .blog-grid, .video-grid, .work-gallery, .credential-grid",
            )
          ) {
            const index = [...grid.children].indexOf(element);
            element.style.setProperty(
              "--reveal-delay",
              `${(index % 3) * 85}ms`,
            );
            if (grid.matches(".creative-grid"))
              entrance = ["left", "right", "up", "scale", "right"][index % 5];
          }
          element.dataset.reveal = entrance;
          element.classList.add("reveal");
          if (
            preference.matches ||
            element.getBoundingClientRect().bottom <= 0
          ) {
            element.classList.add("is-visible");
          } else observer.observe(element);
        });
      });
    }
    function revealAll() {
      if (!preference.matches) return;
      elements.forEach((element) => element.classList.add("is-visible"));
      observer.disconnect();
    }
    function revealFocused(event) {
      const element = event.target.closest(".reveal");
      if (element) {
        element.classList.add("is-visible");
        observer.unobserve(element);
      }
    }
    discover();
    // Filter changes mount new cards without a route change.
    const mutations = new MutationObserver(discover);
    mutations.observe(document.getElementById("main-content"), {
      childList: true,
      subtree: true,
    });
    preference.addEventListener("change", revealAll);
    document.addEventListener("focusin", revealFocused);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", revealAll);
      document.removeEventListener("focusin", revealFocused);
      elements.forEach((element) => {
        element.classList.remove("reveal", "is-visible");
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [route]);
}
