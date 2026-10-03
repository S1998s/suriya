# Vintage Portfolio

The published site is plain HTML, CSS, and JavaScript. The retired Next.js application and its package dependencies have been removed. No npm packages are required to build or serve the portfolio.

The opening scene keeps the full-screen animated illustration and two path cards. Chapter I opens the complete professional story; Chapter II opens the complete personal story. The professional timeline, skills, certifications, award, six projects, four article links, contact methods, and résumé are in the static export. The personal page preserves the original biography, interests, family details, milestones, social links, and curated photo gallery. All 16 original photos remain available in the gallery with category filters and a keyboard-accessible viewer.

## Preview

Build the Pages export and serve `_site` locally. The source root is not the deployable document root because image and chapter assets are staged during packaging. Google Fonts and GSAP load from pinned/allowlisted CDNs. With no internet connection, fallback serif fonts, visible content, text controls, and core interactions remain available.

## Media

Desktop uses `Animations/WebView.mp4`; screens at 700px and below use `Animations/MobileView.mp4`. Only the selected MP4 is loaded, after the page load event and an idle opportunity so it does not compete with the first screen's assets. Playback is muted, looped, and inline, with a pause control and page-visibility handling. Both supplied H.264 videos were verified in the hosted browser preview. Browsers without support for these videos display the matching static illustration.

`assets/panorama-desktop.jpg` and `assets/panorama-mobile.jpg` are exact first-frame posters extracted from the supplied videos. The separately attached panorama was not present as a local image file. To use that original still instead, replace the desktop JPEG and update its dimensions in the HTML.

The matching WebP posters are the preferred first-screen images; JPEGs remain as picture fallbacks and for social previews. Regenerate the WebP versions when changing the JPEGs.

Reduced-motion preferences disable autoplay and GSAP reveals. Data Saver and 2G connections, when exposed by the browser, also disable automatic video downloads. Visitors can explicitly start the video with the play control. When JavaScript, autoplay, or video decoding is unavailable, the static picture stays visible.

## Edit

- `index.html`: content, career, projects, skills, photographs, and links.
- `assets/vintage.css`: palette, typography, paper texture, and responsive layouts.
- `assets/vintage.js`: video selection, GSAP reveals, and accessible photo dialog.
- `assets/chapters.js`: chapter navigation, filtered photo gallery, and accessible photo viewer.
- `assets/portrait-mark.webp` and `assets/favicon-photo.png`: the compact portrait used for the site mark and browser tab icon. The 128px transparent WebP is about 8 KB and is shared by headers and footers. The original `public/logo.png` is preserved as a source image and is not deployed or downloaded by visitors.

Email links open the visitor's mail application. No contact backend or API secrets are needed.

## Validate And Package

```sh
node --check assets/vintage.js
node --check assets/chapters.js
node scripts/build-static.mjs
python scripts/validate-static.py _site
```

The validation script uses only Python's standard library. The packaging script uses only Node's standard library. Neither is required by visitors.

## GitHub Pages

Select **GitHub Actions** in repository **Settings > Pages**, then push the changes, both MP4s, and referenced static assets to `main`. The deployment workflow validates the site and copies only the résumé and photo variants used by the pages into `_site`; unused legacy pill art and duplicate image sizes are not published. The custom domain in `CNAME` is preserved; keep the DNS configuration and enable HTTPS in Pages settings.

Relative URLs also work on project Pages URLs. `/professional/`, `/personal/`, and `/personal/gallery/` are the published chapter and gallery pages. The former `/personal/photos/` address redirects to the single curated gallery. Other older personal aliases redirect to their corresponding story sections. The generated `_site` folder is disposable and should not be committed.

## Security

Published HTML pages use a Content Security Policy that restricts scripts, styles, fonts, images, media, object embeds, base URLs, and form targets to the site and required providers. The pinned GSAP CDN script uses Subresource Integrity. Referrer information is limited to the origin on cross-site navigation. Gallery controls render content with DOM text APIs; no user input is inserted as HTML. Contact links open the visitor's mail or phone application; the site does not store messages or credentials. No environment files or dependency tree are part of the static deployment.

GitHub Pages does not provide repository-defined response headers. The policy is therefore delivered as an HTML meta policy; server-only headers such as `Strict-Transport-Security`, `X-Frame-Options`, and `X-Content-Type-Options` are controlled by the hosting platform.