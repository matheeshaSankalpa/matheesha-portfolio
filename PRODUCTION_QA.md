# Production readiness verification

Date: 2026-10-19 (Asia/Colombo).

## Investigation

- The checkout started clean on `main`, remote `https://github.com/matheeshaSankalpa/matheesha-portfolio.git`. A network fetch confirmed local HEAD and remote main were both `cc542b254607f3bd8f1aa1196982e8eca1d646e3`.
- The new carousel is introduced by `cc542b2`. The live bundle `/assets/index-B5MKFuk1.js` contained the earlier grid. GitHub's latest Vercel Production deployment was successful for `440b4e05ca6ae09f438eaacf1735487ca1f10d48`; there were no checks or deployments for `cc542b2` at investigation time. Production was behind the repository. Account access is needed to determine why Vercel did not build the newer commit.
- Both live portrait URLs returned HTTP 200, `image/png`, with the correct lowercase filenames. The PNGs are valid tracked 1080 x 1080 transparent images. Fresh live browser requests took about 16.6 seconds for the light image and 31.5 seconds for the dark image; the dark portrait decoded after about 33.2 seconds. A permanent missing-file state was not reproduced. Smaller WebP sources address the observed loading delay; originals remain available as fallbacks.
- The first original MP4 is HEVC/AAC. Its documented compatible copy was absent. The other five MP4s are H.264/AAC.
- The live analytics script URL returned HTML through the old catch-all rewrite. The new rewrite excludes Vercel endpoints and file requests. Dashboard enablement and a new deployment must be verified before reporting live collection as working.

## Changes

- `package.json`, `package-lock.json`: install `@vercel/analytics` 2.0.1; patch the reported `source-map-js` advisory from 1.2.1 to 1.2.2 without forced upgrades.
- `src/main.jsx`: one React Analytics component, with explicit Vite development/production mode. The official script handles initial views and browser history; no manual duplicate tracker.
- `src/components/Hero.jsx`, `public/profile.webp`, `public/profile2.webp`: same theme portraits and composition, original PNG fallbacks, explicit intrinsic dimensions. WebP sizes: 79,652 and 97,682 bytes, over 90% smaller.
- `src/components/Work.jsx`, `src/data/work.js`, `src/data/publicAssetsPlugin.js`: discover and apply optional real video posters without adding them to artwork galleries.
- `public/work/lagops/video1.web.mp4`: H.264, yuv420p, original AAC audio, fast-start MP4. Original `video1.mp4` retained.
- `public/videos/lagops/video1.jpg` through `video6.jpg`: real frames from the six corresponding videos.
- `vercel.json`: exclude `/_vercel/*`, asset paths and file requests from SPA fallback; prevent caching the build identifier.
- `vite.config.js`, `src/data/buildInfoPlugin.js`: emit `/build-info.json` containing the exact build's Git SHA, using Vercel's commit environment variable in deployment.
- `qa/check.mjs`, `qa/video-carousel.mjs`, `qa/results.json`: local Vercel infrastructure stubs, production-bundle carousel option, fresh complete QA evidence.
- `qa/production.mjs`: exact-case build asset checks, portraits, playback of all six MP4s, posters, and official analytics script/navigation checks. Local analytics requests use an intercepted collector; live mode uses actual endpoints.
- `qa/deployment.mjs`: compare live build SHA with HEAD, inspect GitHub/Vercel statuses, and require a JavaScript analytics response.
- `.gitignore`, `eslint.config.js`: exclude local tools/cache and Vercel account state from source/lint.
- `README.md`, this report: document media, analytics setup, testing and deployment verification.

No original projects, images, videos, routes, typography, colors, animation rules or content were removed. The existing Work carousel and separate four-card YouTube Videos page are preserved.

## Completed checks

- `npm.cmd install @vercel/analytics`: passed.
- `npm.cmd audit fix --ignore-scripts`: compatible patch applied; zero reported vulnerabilities.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed.
- Production preview at `http://127.0.0.1:4173` using `npm.cmd run preview`.
- `npm.cmd run qa` against preview: 144 route/theme/width combinations passed. Eight routes, both themes, nine widths from 320 to 1440px. No broken images, application console errors or horizontal overflow; desktop automated WCAG checks passed. Interaction checks cover themes, persistence, mobile menu, filters, gallery, deep links, skip link, 404, intercepted YouTube embed and intercepted contact submission. No test message was sent.
- `node qa/production.mjs` against preview: passed. All six videos decoded and played unmuted at desktop/mobile widths in both themes, with native controls and valid posters. The official Vercel script was loaded with a local collector; exactly three views for initial Home, Work navigation and browser Back, no anchor view, one script instance. Correct filename casing verified in build output.
- `node qa/video-carousel.mjs --built` against preview: passed. Seven widths, both themes, keyboard/button bounds, side selection, real playback, single-player enforcement, retained video identity, mouse drag, touch swipe/cancel, vertical scroll, landscape sizing and carousel accessibility.
- `node qa/video-carousel.mjs` against Vite development: passed, including zero/one/two/26-video manifest substitution. One initial development run timed out during a touch check; the complete rerun passed with no browser console errors.
- Portrait, full Home and carousel screenshots visually reviewed on desktop and mobile in both themes. Captures remain in ignored `qa/screenshots/`.
- `git diff --check`: passed.

## Deployment gate

The Vercel CLI reported **Logged out**. Do not create a temporary or replacement project. After the verified commit is pushed, run `node qa/deployment.mjs` against `https://matheesha.dev`; deployment is synchronized only when `/build-info.json` matches that commit. Then run `qa/production.mjs` with `QA_URL=https://matheesha.dev` to verify real media and analytics requests. Local analytics interception does not prove live collection.

If automatic deployment is missing, sign into the existing Vercel project, confirm its Git repository and production branch `main`, inspect ignored-build settings, and deploy the new commit. Enable Web Analytics if the real script route is unavailable. CLI recovery is `npx.cmd vercel login`, `npx.cmd vercel link` to the existing project, then `npx.cmd vercel --prod`. The final delivery reports the actual push/deployment result and remaining account actions.

References: [Vercel React Analytics setup](https://vercel.com/docs/analytics/quickstart), [Analytics configuration](https://vercel.com/docs/analytics/package).
