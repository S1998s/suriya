# Pre-Commit Website Check

Audit date: October 3, 2026. Tested the generated static site at
`http://127.0.0.1:8932/` in the VS Code integrated browser.

## Fixes

- Prevented hero chapter cards from overlapping controls on short screens.
- Kept the complete hero surname inside the heading at 280px width.
- Improved small-text contrast on darker paper backgrounds.
- Fixed chapter reveal targets and completed active reveals when reduced motion is enabled.
- Added 16 static gallery thumbnails and full-image links for script-failure fallback.
- Added the gallery footer's home link and accurately labeled DEV search destinations.
- Versioned shared styles and scripts so existing visitors receive the repairs.

## Passed Checks

- All four main routes and four compatibility redirects.
- Local link targets, section anchors, asset paths, image alternatives and security markup.
- Four pages at 280, 320, 390, 480, 700, 768, 850, 1024, 1440, 1920 and 2560px widths.
- No horizontal overflow or clipped text in the final 44-case sweep.
- Short hero checks at 280x568, 320x480, 320x568, 390x667, 700x500, 1024x600 and 1440x900.
- Desktop and mobile section links, chapter navigation, keyboard skip links and menu Escape behavior.
- Desktop and mobile project expand/collapse using pointer and keyboard.
- All gallery categories and transformation phases; all 16 full-size photos on both layouts.
- Photo viewer close buttons, Escape, backdrop dismissal and focus restoration.
- Resume response is a valid PDF; compatibility routes reach their intended sections.
- Desktop/mobile video sources, resize selection, pause/resume, reduced motion and Data Saver.
- Visible image fallback when video loading fails.
- Functional pages when external fonts and GSAP are blocked.
- Static gallery remains usable when scripts are blocked.
- No JavaScript console errors or warnings in the normal final four-page sweep.
- Source portrait, original photographs, resume, videos and custom domain preserved.
- Private environment files and the generated `_site` artifact remain ignored.

## Recheck Before Publishing

```sh
node --check assets/vintage.js
node --check assets/chapters.js
node --check scripts/build-static.mjs
node scripts/build-static.mjs
python scripts/validate-static.py _site
git diff --check
```

Include all new source pages, assets, videos and scripts along with the intentional
legacy-file deletions when committing. Do not commit `_site` or private environment files.

## Limits

This is a local browser audit, not a guarantee of every possible browser/device combination.
Native Safari/Firefox and physical phones were not available for this run. The GitHub
Actions deployment itself must run after pushing. LinkedIn blocks automated profile checks;
email, telephone and WhatsApp targets were inspected without sending messages or making calls.
GitHub, Instagram and all four DEV search URLs responded successfully during this audit.
The DEV cards intentionally link to topic searches, not individual article permalinks.