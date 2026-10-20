import { archivedAboutTestimonials } from "./about/archivedTestimonials";
import StudioCanvas from "./studio-canvas/StudioCanvas";
import { getHomePageContent, getAboutPageContent } from "@/sanity/lib/siteContent";
import { getAllProjects, getFeaturedProjects } from "@/sanity/lib/projects";
import { getHomePageControls, getTeamMembers, getTestimonials } from "@/sanity/lib/cmsBackend";
import type { HomePageContent } from "@/sanity/types/siteContent";
import type { StudioReview } from "./studio-canvas/StudioTestimonials";

export const revalidate = 300;

export default async function HomePage() {
  const [content, featuredProjects, allProjects, structuredTeam, controls, structuredReviews, aboutContent] = await Promise.all([
    getHomePageContent(),
    getFeaturedProjects(3),
    getAllProjects(),
    getTeamMembers(),
    getHomePageControls(),
    getTestimonials(),
    getAboutPageContent(),
  ]);

  const resolvedContent: HomePageContent | null = structuredTeam.length
    ? { ...(content || {}), teamMembers: structuredTeam }
    : content;
  // Publish only genuine approved feedback, without placeholder client identities.
  const reviews: StudioReview[] = structuredReviews.length
    ? structuredReviews.filter(r=>r.author?.trim()&&r.quote?.trim()).map(r=>({
        quote:r.quote!,author:r.author!,role:r.role,company:r.company,source:r.source,rating:r.rating
      }))
    : (aboutContent?.testimonials||[]).filter(r=>r.active!==false&&r.text?.trim()&&r.author?.trim()).map(r=>({
        quote:r.text!,author:r.author!,role:r.role,company:r.company,source:r.source
      }));
  const resolvedReviews = reviews.length ? reviews : archivedAboutTestimonials.map(r=>({quote:r.text,author:r.author,source:r.date==="Client Review"?"Archived About page":r.date}));
  return <StudioCanvas content={resolvedContent} projects={allProjects} featuredProjects={featuredProjects} controls={controls} reviews={resolvedReviews} />;
}
