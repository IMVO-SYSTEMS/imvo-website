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

// Original IMVO team photos -> light pencil study. The photographic originals
// remain separate and are revealed on hover/focus. No third-party artwork.
const sketchDir = path.join(sourceDir, "studio-sketches");
await mkdir(sketchDir, { recursive: true });
for (const name of ["team1", "team2", "team3", "team4"]) {
  const input = path.join(sourceDir, `${name}.webp`);
  const original = await stat(input).catch(() => null);
  if (!original) throw new Error(`Missing IMVO team image: ${input}`);

  const mono = await sharp(input).rotate()
    .resize({ width: 760, withoutEnlargement: true })
    .grayscale().normalise().toBuffer();
  const dodgeLayer = await sharp(mono).negate().blur(13).toBuffer();
  const output = path.join(sketchDir, `${name}.webp`);
  await sharp(mono)
    .composite([{ input: dodgeLayer, blend: "colour-dodge" }])
    .webp({ quality: 81, effort: 4 })
    .toFile(output);
  const optimized = await stat(output);
  // Retain the same face and pose in both modes. In dark mode, use a
  // true white-pencil contour on black, not CSS inversion of a full photo.
  const darkOutput = path.join(sketchDir, `${name}-dark.webp`);
  await sharp(output).grayscale().linear(1.5, -100)
    .threshold(170).negate()
    .webp({ quality: 80, effort: 4 })
    .toFile(darkOutput);
  const darkSize = await stat(darkOutput);
  console.log(`IMVO pencil portrait ${name}: ${original.size} -> ${optimized.size} light, ${darkSize.size} dark bytes`);
}
