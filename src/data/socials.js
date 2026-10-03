import { personal } from "./content.js";

// Profile URLs retained from the current portfolio and its original social list.
// Keep profile updates here rather than in individual components.
export const socialLinks = [
  { id: "linkedin", name: "LinkedIn", url: personal.linkedin },
  {
    id: "tiktok",
    name: "TikTok",
    url: "https://www.tiktok.com/@matheesha_sankalpa",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/@Matheesha_Sankalpa",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://web.facebook.com/matheesha.sankalpa.1420",
  },
  { id: "medium", name: "Medium", url: personal.medium },
  { id: "x", name: "X / Twitter", url: "https://x.com/MatheeshaSanka2" },
  {
    id: "threads",
    name: "Threads",
    url: "https://www.threads.com/@_.matheesha_sankalpa.___",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/_.matheesha_sankalpa.___/",
  },
].map((profile) => ({ ...profile, icon: `/socials/${profile.id}.svg` }));
