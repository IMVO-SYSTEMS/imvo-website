"use client";
import { BookOpen, ExternalLink, FileImage, MessageSquareQuote, PenTool, UploadCloud } from "lucide-react";

const groups=[
 {icon:PenTool,title:"Add a new project",description:"Open Projects in the left navigation, choose Create Project, fill in title, category, Kigali/site location, year and summary. Use Generate beside Page address to create the project URL."},
 {icon:FileImage,title:"Add photos and drawings",description:"Under Media upload a landscape Cover image with alternative text. Add gallery images and any approved floor plans under Plans and drawings. Images can be reordered before publishing."},
 {icon:UploadCloud,title:"Publish when ready",description:"Use Publish, not merely Save Draft. Only published projects appear publicly. Set Feature this project to show it among the first three featured projects in the homepage On the boards section. Drag projects in Projects to control display order."},
 {icon:MessageSquareQuote,title:"Add genuine client reviews",description:"Open Client Testimonials, create a review with the actual verified quote and the client's permitted attribution. Mark Show on the website, then Publish. Empty or unpublished reviews never appear as fake five-star cards."},
 {icon:BookOpen,title:"Edit the website later",description:"Homepage edits include section text and an optional alternative team group photo. About Page controls the company story, while Team Members are maintained separately. Allow approximately five minutes for updates to appear on the public site."},
];
export default function EditorGuide(){
 return <main style={{maxWidth:1000,margin:"0 auto",padding:"clamp(20px,4vw,56px)",fontFamily:"system-ui, sans-serif",color:"#202124"}}>
  <div style={{borderBottom:"1px solid #ccc",paddingBottom:28,marginBottom:26}}>
   <p style={{fontSize:12,letterSpacing:".16em",margin:0}}>IMVO GROUP / CONTENT CONTROL</p>
   <h1 style={{fontSize:"clamp(26px,3vw,44px)",letterSpacing:"-.05em",margin:"12px 0"}}>WEBSITE EDITOR GUIDE</h1>
   <p style={{fontSize:15,lineHeight:1.6,maxWidth:720}}>Everything below is manageable from this CMS. Start with a Draft. Publish only when a project, photo or review is approved for the public website.</p>
   <a href="/projects" target="_blank" rel="noreferrer" style={{display:"inline-flex",gap:7,alignItems:"center",marginTop:12,color:"#202124",fontSize:13}}>View live Projects page <ExternalLink size={14}/></a>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:0,borderTop:"1px solid #d5d5d5",borderLeft:"1px solid #d5d5d5"}}>
  {groups.map((g,i)=><section key={g.title} style={{borderBottom:"1px solid #d5d5d5",borderRight:"1px solid #d5d5d5",padding:24}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><g.icon size={24} strokeWidth={1.4}/><span style={{fontFamily:"monospace",fontSize:11}}>{String(i+1).padStart(2,"0")}</span></div>
    <h2 style={{fontSize:19,letterSpacing:"-.03em",margin:"25px 0 10px"}}>{g.title}</h2>
    <p style={{fontSize:13,lineHeight:1.7,margin:0,color:"#555"}}>{g.description}</p>
   </section>)}</div>
  <p style={{marginTop:28,fontSize:12,color:"#666"}}>Only authorized editors can publish content. Studio designs and other IMVO divisions remain independent.</p>
 </main>;
}
