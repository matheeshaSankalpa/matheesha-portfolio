import { workImages } from "virtual:portfolio-assets";
import { workItems } from "./portfolio";

// The Vite manifest supplies naturally sorted files at build time. Metadata
// stays in portfolio.js; adding artwork requires no component changes.
export const workProjects = workItems.map((project) => ({
  ...project,
  images: workImages.filter((path) =>
    path.startsWith(`/work/${project.folder}/`),
  ),
}));
export const workCategories = [
  "All",
  ...new Set(workItems.map((project) => project.category)),
];
