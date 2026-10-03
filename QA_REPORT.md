# Portfolio refinement QA report

Date: 2026-10-03

Result: passed.

## Running application

- Development app: http://127.0.0.1:5174.
- Production preview: http://127.0.0.1:4174.
- `npm.cmd run lint` passes.
- `npm.cmd run build` passes without errors or warnings.
- All eight routes load in the development app without console or application errors.
- No new dependencies were added during this refinement pass.

## Preservation and requested changes

The established light/dark tokens, typography, selection highlight, hero composition, profile switching, original three character illustrations and genuine content remain intact.

- Homepage Selected Work block removed; Work page and every original artwork retained.
- About star replaced with a personal illustrated portrait including shoulders and upper chest.
- Subtle CSS grid texture added only around selected homepage sections.
- Curated recognizable tool marks added to Marketing/Data bento cards and existing Skills categories.
- Generic Skills data chart replaced with Matheesha as a data detective.
- Work changed to project information beside compact galleries, with two-column mobile thumbnails and existing full-size image previews.
- Gallery discovery remains build-time, preserves original public URLs and sorts filenames numerically.
- Video hero receives a personal content-creator illustration.
- Every video has a genuine local vertical YouTube poster and click-to-play interaction.
- Visible numbered Short labels removed; all four original embed URLs retained.
- Repeated contact CTA receives personal phone/listening character artwork.
- Old unused star, generic chart and numbered-poster CSS removed.
- No em dashes appear in rendered site copy.

## Browser QA

Microsoft Edge, headless. Eight routes, both themes and four widths: 1440px, 834px, 390px and 320px. All 64 combinations pass on the final production build.

- No browser console or uncaught application errors.
- No broken local images or horizontal overflow.
- Exactly one main heading per route.
- Automated WCAG 2 A/AA and WCAG 2.1 AA checks report no violations on all desktop routes in both themes.
- Theme choice persists in both modes, honors initial system preference and synchronizes across tabs.
- Light mode uses `profile2.png`; dark mode uses `profile.png`; crossfade works without reload.
- Mobile navigation, keyboard focus, skip link, route focus, category filters, hash deep links and 404 behavior pass.
- Work image preview, Escape, close button and focus restoration pass for all four collections.
- Contact validation and POST payload pass with the outgoing request intercepted locally. No message was sent.

## Targeted refinement QA

`qa/refinements.mjs` passes.

- Additional responsive checks at 1440, 1100, 1024, 834, 768, 701, 700, 640, 390 and 320px in both themes.
- Tool visuals stay within their Marketing and Data cards.
- Contact heading and character artwork do not collide.
- Work thumbnails remain compact at every tested width; mobile uses two columns.
- All four video frames retain their 9:16 ratio at every tested width.
- Homepage introduction, Learning by doing and sketchbook sections remain present; Selected Work is absent from Home.
- Build-time fixture confirms automatic new-file discovery and ordering of flyer1, flyer2, flyer10, flyer16 and flyer17.
- Every collection opens its original full-resolution image.
- All four poster buttons load their corresponding original YouTube embeds with autoplay.
- Entrances include left, right, rise and scale, with small stagger and visible intermediate transition states.
- Reveals happen once per mounted element, remain compatible with hover motion and respond to live reduced-motion changes.
- Normal-motion Home, Skills, Work and Videos pass at tablet and mobile widths in both themes, with no hidden content or horizontal scrollbar.

`qa/interactions.mjs` also passes normal-motion reveals on all seven original routes, bento hover motion, portrait crossfade, cross-tab theme updates, visible keyboard focus and storage-unavailable behavior.

Desktop, tablet and mobile screenshots were visually reviewed, including the new portraits, tool compositions, compact Work galleries and actual video posters. The full gallery, hover and reduced-motion behaviors were exercised in the browser.

## Live video playback

All four real YouTube players were tested without interception:

- Decoy Effect: playback progressed, ready state 4, not paused, no media/player error.
- Red Bull and Social Proof: playback progressed, ready state 4, not paused, no media/player error.
- AI Search: playback progressed, ready state 4, not paused, no media/player error.
- Facebook Ads and the 60/40 Rule: playback progressed, ready state 4, not paused, no media/player error.

Evidence: `qa/live-video-results.json`. The ordinary repeatable QA tests intercept external services so they remain reliable without sending messages or depending on YouTube.

## Content and asset inventory

- Four work collections and all 24 genuine designs retained.
- All 13 original blog articles, links, images and Sinhala/English text retained.
- Five academic entries, six primary credentials and five additional original certificate links retained.
- All 25 original grouped skills and additional original web/supporting tools retained.
- Original contact, social and internship information retained.
- All 49 original public assets remain present.
- Original three illustration PNG/WebP pairs retained unchanged.
- Four new illustration PNG/WebP pairs added.
- Nine local recognizable tool-logo SVGs added.
- Four genuine vertical video posters added.
- Public asset total: 76 files.

New illustration stems in `public/illustrations/`:

- `matheesha-about`
- `matheesha-data-detective`
- `matheesha-video`
- `matheesha-contact`

All were generated with the built-in imagegen tool using the real face reference and original successful artwork as identity/style references. About, Video and Contact retain true transparency. Exact prompts are in `ILLUSTRATION_PROMPTS.md`.

## Updating content

No manual replacement assets or unfinished implementation steps remain.

Add new artwork under `public/work/<project>/`, following the existing filename pattern, then rebuild for production. Project metadata is centralized in `src/data/portfolio.js`; `src/data/work.js` joins it to the Vite manifest. No gallery JSX edits are needed for additional images.

New video entries need a data record and genuine poster. Blogs, Education, Skills and credentials remain data-driven. The existing FormSubmit account configuration is unchanged; actual inbox delivery was not tested.

Raw results: `qa/results.json`, `qa/interactions-results.json`, `qa/refinement-results.json`, `qa/live-video-results.json`. Screenshots: `qa/screenshots/`.
