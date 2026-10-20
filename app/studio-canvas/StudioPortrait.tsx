import StudioImage from "./StudioImage";
import styles from "./StudioCanvas.module.css";

/**
 * IMVO's eight approved cross-hatched portraits can be placed in
 * public/studio-portraits/team{1..4}-{dark|light}.webp.
 * Build-time fallbacks keep the website functional until originals arrive.
 */
export default function StudioPortrait({ src, alt, index }: { src: string; alt: string; index: number }) {
  const local = /^\/team([1-4])\.(?:png|jpe?g|webp)$/i.exec(src);
  const person = local?.[1];
  return (
    <div className={styles.memberImage} data-portrait-interaction aria-label={`${alt} — focus or hover to reveal photograph`}>
      {person ? <>
        <StudioImage className={styles.memberSketchDark} src={`/studio-portraits/team${person}-dark.webp`} alt="" width="760" height="950" loading="lazy" decoding="async" aria-hidden="true"/>
        <StudioImage className={styles.memberSketchLight} src={`/studio-portraits/team${person}-light.webp`} alt="" width="760" height="950" loading="lazy" decoding="async" aria-hidden="true"/>
      </> : <StudioImage className={styles.memberSketch} src={src} alt="" width="760" height="950" loading="lazy" decoding="async" aria-hidden="true"/>}
      <StudioImage className={styles.memberPhotograph} src={src} alt={alt} width="760" height="950" loading="lazy" decoding="async"/>
      <span className={styles.memberPortraitFrame} aria-hidden="true"><i/><i/><i/><i/></span>
      <span className={styles.memberPortraitIndex} aria-hidden="true">{String(index+1).padStart(2,"0")} / PORTRAIT</span>
    </div>
  );
}
