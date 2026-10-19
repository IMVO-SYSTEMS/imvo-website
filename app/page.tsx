import StudioCanvas from "./studio-canvas/StudioCanvas";
import { getHomePageContent } from "@/sanity/lib/siteContent";
import { getAllProjects, getFeaturedProjects } from "@/sanity/lib/projects";
import { getHomePageControls, getTeamMembers } from "@/sanity/lib/cmsBackend";
import type { HomePageContent } from "@/sanity/types/siteContent";

export const revalidate = 300;

export default async function HomePage() {
  const [content, featuredProjects, allProjects, structuredTeam, controls] = await Promise.all([
    getHomePageContent(),
    getFeaturedProjects(3),
    getAllProjects(),
    getTeamMembers(),
    getHomePageControls(),
  ]);

  const resolvedContent: HomePageContent | null = structuredTeam.length
    ? { ...(content || {}), teamMembers: structuredTeam }
    : content;
  return <StudioCanvas content={resolvedContent} projects={allProjects} featuredProjects={featuredProjects} controls={controls} />;
}
