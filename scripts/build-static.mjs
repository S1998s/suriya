import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '_site');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of ['index.html', 'assets', 'Animations', 'CNAME']) {
  await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
}
await cp(path.join(root, 'public', 'Shanmugavel_Resume.pdf'), path.join(output, 'Shanmugavel_Resume.pdf'));
const publishedPhotos = [
  'candid-1', 'candid-2', 'childhood-1', 'childhood-2', 'family-1',
  'portraits-1', 'portraits-3', 'portraits-4',
  'sports-1', 'sports-2', 'sports-3',
  'transformation-after-1', 'transformation-after-2', 'transformation-after-3',
];
const imageDirectory = path.join(output, 'images', 'personal');
await mkdir(imageDirectory, { recursive: true });
for (const name of publishedPhotos) {
  for (const width of [640, 1200]) {
    const filename = `${name}__w${width}.avif`;
    await cp(path.join(root, 'public', 'images', 'personal', filename), path.join(imageDirectory, filename));
  }
}
for (const name of ['transformation-before-2', 'transformation-before-3']) {
  for (const width of [640, 1200]) {
    const filename = `${name}__w${width}.jpg`;
    await cp(path.join(root, 'public', 'images', 'personal', filename), path.join(imageDirectory, filename));
  }
}
await cp(
  path.join(root, 'public', 'images', 'personal', 'candid-1__w960.avif'),
  path.join(imageDirectory, 'candid-1__w960.avif')
);
await writeFile(path.join(output, '.nojekyll'), '');
const chapterPages = [
  ['professional', 'professional.html'],
  ['personal', 'personal.html'],
  ['personal/gallery', 'gallery.html'],
];
for (const [route, template] of chapterPages) {
  const directory = path.join(output, route);
  await mkdir(directory, { recursive: true });
  await cp(path.join(root, 'static-pages', template), path.join(directory, 'index.html'));
}
const oldRoutes = [
  ['personal/about', 'about'],
  ['personal/blog', 'memories'],
  ['personal/contact', 'friends'],
];
for (const [route, section] of oldRoutes) {
  const destination = `${'../'.repeat(route.split('/').length - 1)}#${section}`;
  const directory = path.join(output, route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${destination}"><title>Shanmugavel Ravichandran</title></head><body><a href="${destination}">Continue to the journey</a></body></html>`);
}
const legacyPhotos = path.join(output, 'personal/photos');
await mkdir(legacyPhotos, { recursive: true });
await writeFile(path.join(legacyPhotos, 'index.html'), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=../gallery/"><title>Photo Collection | Shanmugavel Suriya</title></head><body><a href="../gallery/">Continue to the photo collection</a></body></html>');
const html = await readFile(path.join(output, 'index.html'), 'utf8');
if (!html.includes('assets/vintage.js')) throw new Error('Static entry point is missing.');
console.log('Static site packaged in _site. No npm install or framework build required.');