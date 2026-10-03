# Shanmugavel Ravichandran

Vintage static portfolio for [shanmugavel.in](https://shanmugavel.in), built with HTML, CSS, and JavaScript.

## Preview

Build and serve the Pages export:

```sh
node scripts/build-static.mjs
python scripts/validate-static.py _site
python -m http.server 8932 --directory _site
```

Then visit `http://localhost:8932/`.

## Deploy

GitHub Pages is configured to deploy `_site` through `.github/workflows/deploy.yml`. Set the Pages source to **GitHub Actions**, then push to `main`. The existing `CNAME` keeps the custom domain mapping.

## Contents

- `index.html`: illustrated homepage and both journeys.
- `static-pages/`: professional, personal, and photo-collection pages.
- `assets/`: styles, scripts, logo, favicon, illustration posters, and grain texture.
- `Animations/`: desktop and mobile hero videos.
- `public/Shanmugavel_Resume.pdf` and the referenced personal-photo variants.
- `scripts/build-static.mjs`: copies only required site assets to `_site`.
- `scripts/validate-static.py`: checks generated pages, links, assets, and videos.

See [STATIC-SITE.md](STATIC-SITE.md) for media, editing, deployment, and security details. The previous Next.js application and unused pill artwork have been removed; there are no npm dependencies.
