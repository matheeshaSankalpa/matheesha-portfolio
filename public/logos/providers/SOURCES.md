# Short Courses provider logos and verification

Verified on 2026-10-19. Coursera is the learning platform; the providers below are the issuing organizations. Each supplied share link was opened separately, followed to its official Coursera accomplishment page, and returned HTTP 200.

## Credential verification

| Card | Original title | Verified provider | Accomplishment reached from the supplied share link | Supporting Coursera catalog/partner page |
| --- | --- | --- | --- | --- |
| 01 | AI SEO: Mastering Generative Engine Optimization (GEO) | SkillUp | [T60G49YMVYTL](https://www.coursera.org/account/accomplishments/verify/T60G49YMVYTL) | [Course](https://www.coursera.org/learn/seo-mastering-generative-engine-optimization-geo), [SkillUp partner](https://www.coursera.org/partners/skillup-ed-tech) |
| 02 | Digital Marketing Strategy and Planning | Digital Marketing Institute | [U1KYADLEXFIL](https://www.coursera.org/account/accomplishments/specialization/U1KYADLEXFIL) | [Current DMI strategy specialization](https://www.coursera.org/specializations/planning-digital-marketing-strategy) |
| 03 | Generative AI for Marketers | Microsoft | [WGHBB3IH6PQ7](https://www.coursera.org/account/accomplishments/specialization/WGHBB3IH6PQ7) | [Specialization](https://www.coursera.org/specializations/microsoft-copilotformarketing) |
| 04 | Operations Systems Excellence | University of London | [NU7SBS8ZM779](https://www.coursera.org/account/accomplishments/verify/NU7SBS8ZM779) | [Course](https://www.coursera.org/learn/operations-systems-excellence) |
| 05 | Consumption, Marketing and Culture | University of London | [N0IV4QKPCINV](https://www.coursera.org/account/accomplishments/verify/N0IV4QKPCINV) | [Course](https://www.coursera.org/learn/consumption-marketing-culture) |
| 06 | Node.js & MongoDB: Developing Back-end Database Applications | IBM | [TMVUD5JT2Z24](https://www.coursera.org/account/accomplishments/verify/TMVUD5JT2Z24) | [Course](https://www.coursera.org/learn/intermediate-back-end-development-with-node-js-mongodb) |

For cards 01, 04, 05 and 06, the accomplishment page's certificate description explicitly names the provider. Its embedded Coursera partner record supplies the same provider and logo: SkillUp (partner 829), University of London (26), and IBM (348).

For card 02, the accomplishment's structured specialization record identifies the original title and states that its CDMA certification is awarded by the Digital Marketing Institute. The historical catalog slug `digital-marketing-strategy-planning` currently returns 404; the original credential link still resolves successfully. The currently published DMI strategy specialization independently identifies Digital Marketing Institute as its provider and supplies its partner logo. The card's historical title and certificate URL were preserved.

For card 03, the accomplishment identifies the specialization slug `microsoft-copilotformarketing`. That official catalog page names Microsoft under Offered by and supplies the Microsoft partner logo.

Only card 06's provider label needed correction: `MongoDB / Back-End Development` became `IBM`. MongoDB is a technology taught in that course. No title, description, category, number or certificate URL was changed. No provider remains unverified.

## Logo sources

These are the original partner-logo files referenced by Coursera's official course, specialization, partner or accomplishment data. They were downloaded over HTTPS from Coursera's university-assets bucket and stored byte-for-byte, with no recoloring, stretching, cropping or reconstruction. Their source resolutions exceed the 32px rendered logo size. The neutral white tile preserves contrast in both portfolio themes.

| Provider / cards | Local file | Original partner asset | Resolution |
| --- | --- | --- | --- |
| SkillUp / 01 | `skillup.png` | [SkillUp-Logo-360X360.png](https://coursera-university-assets.s3.amazonaws.com/c5/8e53fe46f94e5e993ec5e52bf7a1c0/SkillUp-Logo-360X360.png) | 360 x 360 PNG |
| Digital Marketing Institute / 02 | `digital-marketing-institute.png` | [2.-Logo-Image.png](https://coursera-university-assets.s3.amazonaws.com/28/2c2f7e9dbd41768c96d0a193307137/2.-Logo-Image.png) | 180 x 180 transparent PNG |
| Microsoft / 03 | `microsoft.png` | [MSFT-stacked-logo_FINAL.png](https://coursera-university-assets.s3.amazonaws.com/cc/61dbdf2c1c475d82d3b8bf8eee1bda/MSFT-stacked-logo_FINAL.png) | 360 x 360 transparent PNG |
| University of London / 04 and 05 | `university-of-london.png` | [UoL-Logo_180x180.png](https://coursera-university-assets.s3.amazonaws.com/fb/b28a301e0211e8a40e23e4176c8e4a/UoL-Logo_180x180.png) | 180 x 180 transparent PNG |
| IBM / 06 | `ibm.png` | [IBM-Logo-Blk---Square.png](https://coursera-university-assets.s3.amazonaws.com/bb/f5ced2bdd4437aa79f00eb1bf7fbf0/IBM-Logo-Blk---Square.png) | 180 x 180 transparent PNG |

Brand ownership remains with the respective organizations. The portfolio uses local assets, without external image hotlinks or Google favicons.

## Change scope and verification

- Application changes: `src/components/Timeline.jsx` (only the six card footers plus the scoped stylesheet import), `src/data/portfolio.js` (six logo paths and the confirmed IBM provider correction), `src/styles/course-providers.css` (selectors restricted to the six credential cards).
- Assets: the five PNGs in this directory and this provenance record. No dependencies added.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed. Logo files are present in `dist/logos/providers/`, with filename casing checked segment by segment for Linux compatibility.
- Production-build preview browser checks: 1440, 1024, 768, 390 and 320px, each in light and dark mode (10 combinations, all six cards).
- Checked all six decoded logos, official provider labels, meaningful alt text, consistent 44px tiles/32px contained images, unchanged titles/descriptions/numbers/links, readable provider names, and absence of horizontal overflow or browser errors.
- Scoped automated WCAG checks passed on desktop and mobile in both themes. Screenshots visually reviewed.
- A blocked-logo test confirms the broken image tile is hidden while the institution name and credential link remain available. Both `/timeline` and `/education` render the cards.
- All other exports in the portfolio data file were compared with Git HEAD and are unchanged. Git diff was reviewed for unrelated edits. Hero, Work, carousel, other Education entries, navigation, footer, animations, themes, analytics, routing and SEO were not modified.
- Browser evidence and downloaded research pages are in ignored `.tools/courses/`. No production deployment was performed: production-output verification used the local Vite preview. Changes are intentionally uncommitted for review.
