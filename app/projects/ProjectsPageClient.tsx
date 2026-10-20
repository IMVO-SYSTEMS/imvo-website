"use client";
import type { Project } from "./projectsData";
import ProjectsMasonry from "./ProjectsMasonry";
import DrawingExplorer from "../studio-canvas/DrawingInteraction";
import styles from "../studio-canvas/StudioCanvas.module.css";
export default function ProjectsPageClient({projects}:{projects:Project[]}){
 return <div><section className={styles.indexIntro}><div><h1>Built studies across design, context, and execution.</h1><p>A curated portfolio of residential, commercial, institutional, hospitality, and urban work — presented through scale, atmosphere, material thinking, and project discipline.</p></div><DrawingExplorer src="/studio/study-residential.jpg" kind="residential" label="Explore an illustrative floor plan"/></section><ProjectsMasonry projects={projects}/></div>;
}
