# Matheesha Sankalpa portfolio

An existing React and Vite portfolio redesigned around marketing, design, web development and data. The original content, assets and routes are preserved.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

The development server defaults to http://127.0.0.1:5173. For production:

```powershell
npm.cmd run build
npm.cmd run preview
```

## Content and design

- `src/data/portfolio.js`: the existing work collections, academic details, certificates, skill groups, videos and Medium articles.
- `src/data/content.js`: original contact links, web skills and additional certificate links.
- `src/styles/tokens.css`: centralized light and dark palettes, spacing, corners and shadows.
- `src/index.css`: shared design primitives and page compositions.
- `src/styles/responsive.css`: tablet, mobile and reduced-motion behavior.
- `public/`: all original photos, work, blog images and institution logos.
- `public/illustrations/`: generated personal illustrations and optimized WebP copies.
- `ILLUSTRATION_PROMPTS.md`: exact prompts and the face reference used.

Theme choice is saved under `portfolio-theme` in localStorage. The first visit follows the system preference. The hero crossfades between `profile2.png` in light mode and `profile.png` in dark mode. Storage restrictions do not prevent switching themes.

Existing routes: `/`, `/skills`, `/timeline`, `/work`, `/videos`, `/blogs`, `/contact`. The additional `/education` alias opens the same Education page.

Gallery and illustration files are discovered automatically by a small Vite plugin. Public assets retain their original URLs and are copied once. Adding or removing an image updates the development preview.

## Refinement pass

The established typography, palettes, theme persistence, hero profile switching and original illustrations are preserved. The homepage Selected Work block has been removed; all four Work collections and all 24 designs remain on `/work`.

Changed application files: `src/App.jsx`, `src/main.jsx`, `src/pages/Home.jsx`, `src/components/CreativeBento.jsx`, `Skills.jsx`, `Work.jsx`, `Videos.jsx`, `ui.jsx`, `src/data/portfolio.js`, `src/data/publicAssetsPlugin.js`, `src/index.css` and `src/styles/responsive.css`.

New implementation files:

- `src/hooks/useScrollReveal.js`: reusable replayable IntersectionObserver system, with route cleanup, filter-change discovery and live reduced-motion handling.
- `src/styles/motion.css`: rise, left, right and scale entrances; 650ms easing, 85ms stagger, smaller mobile movement and independent hover transforms.
- `src/styles/refinements.css`: subtle homepage grid, character placement, dimensional tool compositions and compact responsive galleries.
- `src/components/ToolComposition.jsx` and `src/data/tools.js`: curated real logos for existing disciplines.
- `src/data/work.js`: joins centralized project metadata to discovered gallery images and derives category filters.

Four new character illustrations are stored in `public/illustrations/`, each as a source PNG and optimized WebP: `matheesha-about`, `matheesha-data-detective`, `matheesha-video` and `matheesha-contact`. The original three illustrations were not overwritten. All exact prompts and reference roles are recorded in `ILLUSTRATION_PROMPTS.md`.

### Adding portfolio artwork

Put JPG, JPEG, PNG, WebP or AVIF images in the existing project folder:

```text
public/work/lagops/flyer16.jpg
public/work/lagops/flyer17.jpg
```

The build-time Vite manifest discovers files recursively and sorts filenames numerically, so `flyer2` precedes `flyer10`. No JSX or image list changes are needed. A development add/remove triggers a reload. Production additions need a fresh build and deployment.

Project title, role, period, description, tags, category and folder are centralized in `workItems` inside `src/data/portfolio.js`. To add a new project, add one metadata record and its matching `public/work/<folder>/` images. Gallery markup and filters are derived automatically. Existing public URLs are preserved instead of moving the artwork into `src`.

### Video previews and tool sources

All four video records retain their original YouTube embed URLs. Each now has a local genuine vertical YouTube poster in `public/videos/`; their `poster` paths and descriptive accessible titles are centralized in `src/data/portfolio.js`. Visible numbered Short labels are removed. Clicking a poster loads the corresponding autoplay embed; the separate YouTube link remains available. New videos need one data record plus a genuine poster image.

Vector logo sources, stored locally in `public/tools/`:

- Photoshop, Illustrator, Python, JavaScript, React and Tailwind: [Devicon](https://github.com/devicons/devicon/tree/master/icons).
- Meta: [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/meta.svg), using the blue brand color.
- Excel and Power BI: [VS Code Icons](https://github.com/vscode-icons/vscode-icons/tree/master/icons).

Posters come from `https://i.ytimg.com/vi/<existing-video-id>/oardefault.jpg`. No generated brand logos or generic video placeholders are used.

No manual asset replacement is needed for this pass. The existing contact service configuration remains unchanged.

The contact form retains the original FormSubmit POST endpoint. Video cards load the original YouTube embeds on click. Medium articles keep their original URLs and Sinhala/English copy.

## Verification

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4173
```

In another terminal:

```powershell
$env:QA_URL='http://127.0.0.1:4173'
npm.cmd run qa
node qa/interactions.mjs
node qa/refinements.mjs
node qa/polish.mjs
```

Browser QA uses the locally installed Microsoft Edge in headless mode. Results are written to `qa/results.json` and `qa/interactions-results.json`. Screenshots are saved in `qa/screenshots/` and excluded from version control.

Targeted refinement results are in `qa/refinement-results.json`. These checks cover ten responsive widths in both themes, logo bounds, compact thumbnails, actual poster ratios, all four playback buttons, every Work collection's lightbox, numeric asset discovery, staggered replayable reveals and live reduced-motion changes. `qa/live-video-results.json` records a separate live YouTube playback check for all four original videos.

The QA script checks all eight routes in both themes at 1440, 1280, 1024, 768, 430, 390, 375, 360 and 320px, along with accessibility, content counts, broken images, overflow, theme persistence, navigation, filters, deep links, modal focus, contact validation and reduced motion. Contact submission and the YouTube player are intercepted locally in tests. No test message is sent.

## Final polish

The approved visual identity, theme tokens, type, desktop hero and all seven illustrations are preserved.

Application files changed in this pass: `src/hooks/useScrollReveal.js`, `src/styles/motion.css`, `src/styles/polish.css`, `src/main.jsx`, `src/components/Connect.jsx`, `src/components/SocialIcon.jsx`, `src/components/Footer.jsx`, `src/components/Contact.jsx`, `src/components/Timeline.jsx`, `src/data/socials.js` and `src/data/portfolio.js`. Added marks are in `public/socials/`. QA scripts/results and this documentation were updated separately.

- Reveals now replay after every sufficiently distant exit. Entrance uses 6% visibility and a 24px bottom inset; a separate 96px exit buffer prevents boundary flicker. Elements stay observed, detached filtered cards are cleaned up, and current geometry guards against stale observer records during quick scrolling. Focused content stays readable. Reduced motion reveals everything immediately.
- `src/styles/polish.css` contains responsive portrait sizing, intentional illustration crops, the larger contact character and Connect cards. Large mobile illustrations fill their frames; transparent portraits and genuine brand logos retain appropriate sizing. The mobile Design image reserves its frame before lazy loading.
- `src/components/Connect.jsx`, `SocialIcon.jsx` and `src/data/socials.js` provide exactly eight social cards. URLs were reused from current data and the original portfolio's Git history. LinkedIn, TikTok, YouTube, Facebook, Medium, X / Twitter, Threads and Instagram are centralized in one list. WhatsApp uses the existing real contact URL separately. All URLs are populated.
- `public/socials/` contains nine local recognizable SVG marks from Simple Icons, including WhatsApp. No character artwork was replaced or generated in this pass.
- Academic dates are April 2024 - January 2026 (Completed) for the Higher Diploma, April 2024 - Present for Ruhuna, and June 2026 - Present for Data Science Top Up. Existing stored qualification titles are unchanged.

`qa/polish.mjs` exercises every relevant card's exit/re-entry, refresh, route navigation, filter remounts, viewport-edge stability, reduced motion, image frames, eight social cards and contact character geometry. Results are recorded in `qa/polish-results.json`. `qa/polish-visual.mjs` captures both themes at all requested widths and checks development console errors. See `QA_REPORT.md` for the final verification record.

`npm.cmd run format` formats the source files.
