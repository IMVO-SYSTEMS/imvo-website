// Generate responsive derivatives of the heaviest local portfolio covers.
// The source files are retained unchanged for full-resolution project viewing.
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.join(process.cwd(), "public");
const outputDir = path.join(sourceDir, "studio-optimized");
const covers = ["p01-01", "p02-1", "p03-1", "p04-1", "p05-1", "p06-1"];
const widths = [480, 960];

await mkdir(outputDir, { recursive: true });
for (const name of covers) {
  const input = path.join(sourceDir, `${name}.webp`);
  const original = await stat(input).catch(() => null);
  if (!original) {
    throw new Error(`Missing required portfolio source image: ${input}`);
  }
  for (const width of widths) {
    const output = path.join(outputDir, `${name}-${width}.webp`);
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(output);
    const optimized = await stat(output);
    console.log(`Portfolio image ${name} ${width}px: ${original.size} -> ${optimized.size} bytes`);
  }
}
