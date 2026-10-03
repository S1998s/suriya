# Portfolio Site Guidance

This repository publishes a static HTML, CSS, and JavaScript portfolio through GitHub Pages. There is no Next.js application or npm dependency tree.

## Important Paths

- `index.html` and `static-pages/`: published pages and their content.
- `assets/`: shared styling, scripts, portrait branding, and artwork.
- `public/images/personal/`: original personal photos plus the explicitly packaged AVIF variants.
- `Animations/`: mobile and desktop hero videos.
- `scripts/build-static.mjs`: creates the disposable `_site` deployment folder.
- `scripts/validate-static.py`: validates the packaged HTML, local links, image alternatives, assets, and videos.
- `.github/workflows/deploy.yml`: validates and publishes `_site` to GitHub Pages.

## Working Rules

- Preserve the supplied portrait in `public/logo.png`; `assets/portrait-mark.png` and `assets/favicon-photo.png` are its derived site-wide marks.
- Preserve all content, custom-domain configuration in `CNAME`, source photographs, résumé, and both hero videos.
- Keep the builder's photo allowlist synchronized with image paths used by the pages. It packages only selected 640/1200 AVIF files plus `candid-1__w960.avif`.
- Do not add credentials or environment files to the static build. The site has no server-side form handler.
- Retain the CSP, Referrer Policy, Subresource Integrity for the GSAP CDN script, and least-privilege workflow permissions when editing security-sensitive markup or deployment settings.
- Validate changes with `node scripts/build-static.mjs` and `python scripts/validate-static.py _site`; syntax-check both `assets/vintage.js` and `assets/chapters.js`.
