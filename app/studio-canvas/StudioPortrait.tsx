import StudioImage from "./StudioImage";
import styles from "./StudioCanvas.module.css";

/** The original IMVO photograph remains the interactive reveal, not a stock portrait. */
export default function StudioPortrait({ src, alt, index }: { src: string; alt: string; index: number }) {
  const local = /^\/team([1-4])\.(?:png|jpe?g|webp)$/i.exec(src);
  const sketch = local ? `/studio-sketches/team${local[1]}.webp` : src;
  return (
    <div className={styles.memberImage} data-portrait-interaction aria-label={`${alt} — hover or focus to reveal photograph`}>
      <StudioImage className={styles.memberSketch} src={sketch} alt="" width="760" height="900" loading="lazy" decoding="async" aria-hidden="true"/>
      <StudioImage className={styles.memberPhotograph} src={src} alt={alt} width="760" height="900" loading="lazy" decoding="async"/>
      <span className={styles.memberPortraitFrame} aria-hidden="true"><i/><i/><i/><i/></span>
      <span className={styles.memberPortraitIndex} aria-hidden="true">{String(index+1).padStart(2,"0")} / PORTRAIT</span>
    </div>
  );
}
