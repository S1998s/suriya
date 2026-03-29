import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const targetDirs = [path.join(publicDir, "images")];
const allowedExtensions = new Set([".jpg", ".jpeg", ".png"]);
const widths = [320, 480, 640, 768, 960, 1200, 1600];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(fullPath) : fullPath;
    })
  );
  return files.flat();
}

function isSourceImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const name = path.basename(filePath);
  return allowedExtensions.has(ext) && !name.includes("__w");
}

async function ensureVariants(filePath) {
  const metadata = await sharp(filePath).rotate().metadata();
  if (!metadata.width) return;

  const ext = path.extname(filePath).toLowerCase();
  const base = filePath.slice(0, -ext.length);
  const targetWidths = widths.filter((width) => width < metadata.width);

  const writeOriginalVariant = (pipeline, outputPath) => {
    if (ext === ".png") {
      return pipeline.png({ compressionLevel: 9 }).toFile(outputPath);
    }
    return pipeline.jpeg({ quality: 74, mozjpeg: true }).toFile(outputPath);
  };

  await Promise.all(
    targetWidths.flatMap((width) => {
      const resized = sharp(filePath).rotate().resize({ width, withoutEnlargement: true });
      return [
        writeOriginalVariant(resized.clone(), `${base}__w${width}${ext}`),
        resized.clone().webp({ quality: 72 }).toFile(`${base}__w${width}.webp`),
        resized.clone().avif({ quality: 52 }).toFile(`${base}__w${width}.avif`),
      ];
    })
  );
}

async function main() {
  const files = (
    await Promise.all(targetDirs.map(async (dir) => (await fs.stat(dir).catch(() => null)) ? walk(dir) : []))
  )
    .flat()
    .filter(isSourceImage);

  await Promise.all(files.map(ensureVariants));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});