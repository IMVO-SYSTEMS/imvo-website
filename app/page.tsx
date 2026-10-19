import StudioHome from "./studio-home/StudioHome";
import { getHomePageContent } from "@/sanity/lib/siteContent";
import { getAllProjects } from "@/sanity/lib/projects";
import { getTeamMembers } from "@/sanity/lib/cmsBackend";
import type { HomePageContent } from "@/sanity/types/siteContent";

export const revalidate = 300;

export default async function HomePage() {
  const [content, allProjects, structuredTeam] = await Promise.all([
    getHomePageContent(),
    getAllProjects(),
    getTeamMembers(),
  ]);

  const resolvedContent: HomePageContent | null = structuredTeam.length
    ? { ...(content || {}), teamMembers: structuredTeam }
    : content;
  return <StudioHome content={resolvedContent} projects={allProjects} />;
}
