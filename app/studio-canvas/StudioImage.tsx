import type { ImgHTMLAttributes } from "react";
const localImages = new Set(["/about-hero.webp", "/chosen/atria-residence.webp", "/chosen/aurelian-villa.webp", "/chosen/brick-vine.webp", "/chosen/casa-forma.webp", "/chosen/casa-lumara.webp", "/chosen/casa-palma.webp", "/chosen/casa-siena.webp", "/chosen/casa-vento.webp", "/chosen/grand-horizon.webp", "/chosen/horizon-frame.webp", "/chosen/meridian-residence.webp", "/chosen/photo-axis.webp", "/chosen/prism-residences.webp", "/chosen/urban-villa.webp", "/chosen/verdea-2.webp", "/chosen/verdea-hotel.webp", "/chosen/virunga-residence.webp", "/contact-hero.webp", "/domicile/domicile-white.webp", "/domicile/estate/estate-c1.webp", "/domicile/estate/estate-hero.webp", "/domicile/estate/estate-street.webp", "/domicile/logo-icon-white.webp", "/domicile/properties/property-c1.webp", "/domicile/properties/property-estate.webp", "/domicile/properties/property-street.webp", "/hero-2.webp", "/imvo-about-main.webp", "/imvo-about-support.webp", "/imvo-contact-team.webp", "/imvo-services-consultancy.webp", "/imvo-services-coordination.webp", "/imvo-services-technical.webp", "/imvo-team-main.webp", "/p01-01.webp", "/p01-02.webp", "/p01-03.webp", "/p02-1.webp", "/p03-1.webp", "/p04-1.webp", "/p05-1.webp", "/p06-1.webp", "/p07-1.webp", "/p08-1.webp", "/p09-1-jpg.webp", "/p09-1-png.webp", "/p10-1.webp", "/p11-1.webp", "/p13-1.webp", "/p14-1.webp", "/p15-1.webp", "/p16-1.webp", "/p20-1.webp", "/p21-1.webp", "/p22-1.webp", "/p23-1.webp", "/p24-1.webp", "/p25-1.webp", "/p26-1.webp", "/p27-1.webp", "/p28-1.webp", "/p31-1.webp", "/project-030.webp", "/project-10.webp", "/project-100.webp", "/project-12.webp", "/project-14.webp", "/project-22.webp", "/project-23.webp", "/project-30.webp", "/project-36.webp", "/project-44.webp", "/project-46.webp", "/project-80.webp", "/project-90.webp", "/regional-map.webp", "/service-planning.webp", "/service-process.webp", "/service-site-1.webp", "/services-hero.webp", "/team.webp", "/team1.webp", "/team2.webp", "/team3.webp", "/team4.webp"]);
function source(src: ImgHTMLAttributes<HTMLImageElement>["src"]) {
 if (typeof src !== "string" || !src.startsWith("/")) return src;
 const explicit: Record<string,string> = { "/p09-1.png":"/p09-1-png.webp", "/p09-1.jpg":"/p09-1-jpg.webp" };
 const candidate = explicit[src] || src.replace(/\.(png|jpe?g)$/i,".webp");
 return localImages.has(candidate) ? candidate : src;
}
const responsiveCovers = new Set(["p01-01", "p02-1", "p03-1", "p04-1", "p05-1", "p06-1"]);
export default function StudioImage({src,...props}: ImgHTMLAttributes<HTMLImageElement>) {
 const resolved=source(src);
 // Opt into small derivatives only at image positions with an explicit sizes hint.
 // Larger architectural drawings elsewhere keep their original, full-resolution files.
 const name=typeof resolved==="string"?/^\/(p\d{2}(?:-\d{1,2})?)\.webp$/.exec(resolved)?.[1]:undefined;
 const srcSet=name&&responsiveCovers.has(name)&&props.sizes
  ? `/studio-optimized/${name}-480.webp 480w, /studio-optimized/${name}-960.webp 960w`
  : undefined;
 return <img {...props} src={resolved} srcSet={props.srcSet||srcSet}/>;
}
