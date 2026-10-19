import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Check, Search, RotateCcw, Play, Pause, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonials, LogoMarquees, TechnologyTools, TeamFeature } from './motion.jsx';
import { asset, groups, services, industries, projects, articles } from './data.js';
import { link, Button, PageHero, ServiceCard, ServiceTabs, Presence, ProjectStories, ConsultationBanner, ArticleCard, ProjectCard, Process, FAQ, FinalCTA, NotFound } from './ui.jsx';
export function Home({
  onFilm,
  reviews = []
}) {
  const phrases = ['Digital\nTransformation &\nIT Consulting.', 'Software that\nmoves business\nforward.', 'From workflow\nto working\nsystem.'];
  const [phrase, setPhrase] = useState(0),
    [paused, setPaused] = useState(false);
  const video = useRef();
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t = setInterval(() => setPhrase(p => (p + 1) % phrases.length), 8500);
    return () => clearInterval(t);
  }, []);
  const pause = () => {
    if (paused) video.current?.play().catch(() => {});else video.current?.pause();
    setPaused(!paused);
  };
  return <><section className="home-hero wrap"><div className="home-title"><h1 key={phrase}>{phrases[phrase]}<span className="typing-caret" aria-hidden="true" /></h1></div><div className="home-intro"><p className="intro-lead">A Kigali-based technology team designing digital products, platforms, and business systems that move organisations forward.</p><p className="intro-body">From custom software, mobile apps, and websites to cloud, integrations, AI, and automation, we connect product thinking with dependable engineering. We build around the way your business works, from the first idea to launch and ongoing improvement.</p><div className="hero-proof"><div><strong>Web</strong><span>Sites & platforms</span></div><div><strong>Mobile</strong><span>Apps & experiences</span></div><div><strong>Cloud</strong><span>Hosting & support</span></div><div><strong>AI</strong><span>Workflows & data</span></div></div></div></section><section className="studio-film"><video ref={video} autoPlay muted loop playsInline preload="metadata" poster={asset('hero-poster.jpg')} aria-label="Technology and city film — temporary reference media"><source src={asset('hero-film.mp4')} type="video/mp4" /></video><div className="film-bottom"><span>IMVO SYSTEMS <i /> TECHNOLOGY IN MOTION</span><div><button onClick={pause} aria-label={paused ? 'Play background film' : 'Pause background film'}>{paused ? <Play size={18} /> : <Pause size={18} />}</button><button onClick={onFilm} aria-label="Open technology film"><Maximize2 size={19} /></button></div></div></section><ServiceTabs /><TechnologyTools /><Presence /><LogoMarquees /><Testimonials reviews={reviews} /><ProjectStories /><TeamFeature /><ConsultationBanner /><section className="insights-section section wrap"><h2 className="section-title">Insights</h2><p className="section-intro">Useful thinking for organisations building, improving,<br />and operating digital systems.</p><div className="insights-grid">{articles.map(a => <ArticleCard article={a} key={a.id} />)}</div><div className="center"><Button to="insights" outline>Explore all insights</Button></div></section><FinalCTA /></>;
}
export function ServicesPage() {
  return <><PageHero title={<>Our<br />Services</>} crumbs={[{
      name: 'Services'
    }]} description="Product strategy, digital design, software engineering, integrations, and support. A connected service offering from the first idea to the working system." /><div className="services-cover"><img src={asset('service-software.jpg')} alt="Software engineering and connected digital systems" /></div>{groups.map(g => <section className="service-overview-row section wrap" id={g.id} key={g.id}><div><h2>{g.name}</h2><p>{g.intro}</p></div><div className="overview-service-links">{g.items.map(i => <Link href={link('services/' + i[0])} key={i[0]}><span>{i[1]}</span><ArrowUpRight size={24} /></Link>)}</div></section>)}<ConsultationBanner /><Process /><FAQ /><FinalCTA /></>;
}
export function ServiceDetail({
  id
}) {
  const s = services.find(s => s.id === id);
  if (!s) return <NotFound />;
  return <><PageHero title={s.name} description={s.description} crumbs={[{
      name: 'Services',
      to: 'services'
    }, {
      name: s.groupName
    }]} image={s.image} /><section className="detail-intro section wrap"><div><p className="eyebrow">{s.groupName}</p><h2>Clear thinking.<br />Useful software.</h2></div><div><p>{s.intro}</p><p>We begin with your users, current workflow, existing tools, and the outcome you need. The scope, deliverables, ownership, and delivery stages are agreed before development starts.</p><h3>What this can include</h3><ul className="deliverables">{s.deliverables.map(t => <li key={t}><Check size={18} />{t}</li>)}</ul><Button to={'contact?topic=' + encodeURIComponent(s.name)} outline>Discuss this service</Button></div></section><section className="section wrap"><h2 className="section-title">Related capabilities</h2><div className="service-cards related-cards">{services.filter(x => x.group === s.group && x.id !== s.id).map(x => <ServiceCard service={x} key={x.id} />)}</div></section><Process /><FAQ /><FinalCTA /></>;
}
export function IndustriesPage() {
  return <><PageHero title={<>Technology for<br />your world.</>} description="Different organisations need different systems. We connect product design and engineering with the people, information, and workflows in your industry." crumbs={[{
      name: 'Industries'
    }]} /><section className="section wrap sector-card-grid">{industries.map(s => <Link className="image-card sector-card" href={link('industries/' + s.id)} key={s.id}><img src={asset(s.image)} alt="" /><div className="card-shade" /><div className="image-card-content"><h2>{s.name}</h2><p>{s.text}</p><ArrowUpRight size={28} /></div></Link>)}</section><FinalCTA /></>;
}
export function IndustryDetail({
  id
}) {
  const s = industries.find(x => x.id === id);
  if (!s) return <NotFound />;
  let related = projects.filter(p => p.category === s.name);
  if (!related.length) related = projects.slice(0, 3);
  return <><PageHero title={s.name} description={s.text} crumbs={[{
      name: 'Industries',
      to: 'industries'
    }, {
      name: s.name
    }]} image={s.image} /><section className="section wrap detail-intro"><div><h2>Understand the work.<br />Build the right system.</h2></div><div><p>{s.text}</p><ul className="deliverables">{s.needs.map(n => <li key={n}><ArrowUpRight size={20} />{n}</li>)}</ul></div></section><section className="section wrap"><h2 className="section-title">Capabilities for {s.name.toLowerCase()}</h2><div className="service-cards related-cards">{s.services.map(id => <ServiceCard service={services.find(s => s.id === id)} key={id} />)}</div></section><section className="section wrap"><h2 className="section-title">Explore the work</h2><div className="project-grid">{related.slice(0, 3).map(p => <ProjectCard project={p} key={p.id} />)}</div></section><FAQ /><FinalCTA /></>;
}
export function ProjectsPage() {
  const [filter, setFilter] = useState('All'),
    [page, setPage] = useState(1);
  let list = projects.filter(p => filter === 'All' || p.category === filter),
    pages = Math.ceil(list.length / 6);
  return <><section className="projects-hero section wrap"><h1>Our Projects</h1><p>Digital products, connected platforms, and business systems.<br />Explore selected IMVO product directions and demonstration concepts.</p><div className="filters" aria-label="Filter projects">{['All', ...new Set(projects.map(p => p.category))].map(f => <button key={f} className={filter === f ? 'selected' : ''} aria-pressed={filter === f} onClick={() => {
          setFilter(f);
          setPage(1);
        }}>{f}</button>)}</div><p className="project-filter-note">Product directions and concepts with illustrative interface imagery.</p></section><section className="project-list wrap"><p className="result-count" aria-live="polite">{list.length} {list.length === 1 ? 'project' : 'projects'}{filter !== 'All' ? ' · ' + filter : ''}</p><div className="project-grid">{list.slice((page - 1) * 6, page * 6).map(p => <ProjectCard project={p} key={p.id} />)}</div>{pages > 1 && <nav className="pagination" aria-label="Project pages"><button aria-label="Previous project page" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}><ChevronLeft size={18} /></button>{Array.from({
          length: pages
        }, (_, i) => <button aria-label={'Project page ' + (i + 1)} key={i} className={page === i + 1 ? 'selected' : ''} aria-current={page === i + 1 ? 'page' : undefined} onClick={() => setPage(i + 1)}>{i + 1}</button>)}<button aria-label="Next project page" disabled={page === pages} onClick={() => setPage(Math.min(pages, page + 1))}><ChevronRight size={18} /></button></nav>}</section><ProjectStories /><FinalCTA /></>;
}
export function ProjectDetail({
  id,
  onGallery
}) {
  const p = projects.find(p => p.id === id);
  if (!p) return <NotFound />;
  let next = projects[(projects.indexOf(p) + 1) % projects.length],
    gallery = p.gallery || [p.image, 'service-software.jpg', 'service-enterprise.jpg'];
  return <><PageHero title={p.name} description={p.description} crumbs={[{
      name: 'Projects',
      to: 'projects'
    }, {
      name: p.category
    }]} cta="Discuss a similar project" buttonTo={'contact?topic=' + encodeURIComponent(p.name)} /><div className="project-feature wrap"><button onClick={() => onGallery(gallery, 0)} aria-label={'Open ' + p.name + ' gallery'}><img src={asset(p.image)} alt={p.name + ' — illustrative reference image'} /><span><Maximize2 size={20} /> View gallery</span></button><p className="case-image-note">Illustrative interface imagery accompanying this IMVO product direction.</p></div><section className="project-meta wrap"><div><span>Industry</span><strong>{p.category}</strong></div><div><span>Context</span><strong>{p.location}</strong></div><div><span>Presentation</span><strong>Product direction · {p.year}</strong></div><div><span>Focus</span><strong>{p.focus}</strong></div></section><section className="detail-intro section wrap"><h2>A business need.<br />A connected product.</h2><div><p>{p.description}</p><p>The product direction connects the customer experience with the team, information, and decisions behind it. Discovery, interface design, engineering, and operational thinking work together around the core journey.</p><h3>Scope explored</h3><ul className="deliverables">{p.services.map(s => <li key={s}><Check size={18} />{s}</li>)}</ul></div></section><section className="wrap project-gallery-strip" aria-label="Project image gallery">{gallery.slice(1).map((im, i) => <button key={im} onClick={() => onGallery(gallery, i + 1)} aria-label={'Open project image ' + (i + 2)}><img src={asset(im)} alt={'Illustrative product image ' + (i + 2)} /></button>)}</section><section className="next-project wrap"><div><span>Next project</span><h2>{next.name}</h2></div><Link href={link('projects/' + next.id)} aria-label={'Next project: ' + next.name}><ArrowRight size={35} /></Link></section><FinalCTA /></>;
}
export function About() {
  const [tab, setTab] = useState('Mission');
  return <><section className="about-hero section wrap"><h1>About Us</h1><div><p>A Kigali-based technology team connecting product strategy, digital design, software engineering, and business operations.</p><Button to="about?section=team" outline>Meet the team</Button></div><img src={asset('/team.webp')} alt="The IMVO Group team collaborating" /></section><section className="about-values section wrap"><div className="values-tabs" role="tablist" aria-label="Our purpose">{['Mission', 'Vision'].map(t => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>{t}</button>)}</div><div role="tabpanel"><h2>{tab === 'Mission' ? 'Useful technology. Clear business outcomes.' : 'Dependable digital systems, built for the way people work.'}</h2><p>{tab === 'Mission' ? 'To connect design, engineering, and operational thinking so organisations can turn real business needs into useful digital products.' : 'To grow a connected technology practice that helps businesses build, operate, and improve the systems they depend on.'}</p></div></section><section className="about-principles section wrap"><h2 className="section-title">What guides IMVO Systems</h2><div className="principle-grid">{[['01', 'Business context first', 'Understand the people, the process, and the result the system needs to support.'], ['02', 'Engineering with care', 'Keep the experience connected to clear architecture, quality checks, and maintainable code.'], ['03', 'Visible collaboration', 'Use regular reviews, shared priorities, and explicit responsibilities.'], ['04', 'Ownership beyond launch', 'Plan access, documentation, handover, support, and future improvements.']].map(p => <article key={p[0]}><span>{p[0]}</span><h3>{p[1]}</h3><p>{p[2]}</p></article>)}</div></section><Presence /><section className="team-section section wrap" id="team"><div className="story-head"><h2>One team.<br />Connected disciplines.</h2><p>Strategy, design, engineering,<br />and delivery working together.</p></div><img className="team-panorama" src={asset('/team.webp')} alt="The IMVO Group team collaborating" /><p className="reference-people-note">Our people, connected across the IMVO Group.</p><div className="team-grid">{[['Product Strategy', 'Business discovery, product scope, and clear priorities.'], ['Design & Experience', 'User journeys, interface design, and working prototypes.'], ['Software Engineering', 'Web, mobile, backend, data, and integrations.'], ['Delivery & Support', 'Quality, release readiness, handover, and ongoing care.']].map(p => <article className="team-role-card" key={p[0]}><h3>{p[0]}</h3><p>{p[1]}</p></article>)}</div></section><Process /><FinalCTA /></>;
}
export function InsightsPage() {
  const [query, setQuery] = useState(''),
    [filter, setFilter] = useState('All');
  let list = articles.filter(a => (filter === 'All' || a.category === filter) && (a.title + ' ' + a.summary + ' ' + a.category + ' ' + a.id + ' ' + a.body.flat().join(' ')).toLowerCase().includes(query.toLowerCase()));
  return <><PageHero title={<>Our<br />Insights</>} crumbs={[{
      name: 'Insights'
    }]} description="Product thinking, software engineering, automation, and practical ideas for the systems behind a business." cta={false} /><section className="insights-index wrap"><label className="search-field"><span className="sr-only">Search insights</span><input placeholder="Search for insights" type="search" value={query} onChange={e => setQuery(e.target.value)} /><Search size={24} /></label><div className="filters" aria-label="Filter insights">{['All', ...new Set(articles.map(a => a.category))].map(t => <button key={t} className={filter === t ? 'selected' : ''} aria-pressed={filter === t} onClick={() => setFilter(t)}>{t}</button>)}</div>{!query && filter === 'All' && <div className="featured-article"><span>Featured insight</span><ArticleCard article={articles[0]} /></div>}<p className="result-count" aria-live="polite">{list.length} {list.length === 1 ? 'insight' : 'insights'}</p>{list.length ? <div className="insights-grid">{list.map(a => <ArticleCard key={a.id} article={a} />)}</div> : <div className="empty-state"><Search size={32} /><h2>No matching insights</h2><p>Try another phrase or explore all topics.</p><button className="button outline" onClick={() => {
          setQuery('');
          setFilter('All');
        }}>Clear filters<RotateCcw size={18} /></button></div>}</section><FinalCTA /></>;
}
export function ArticlePage({
  id
}) {
  const a = articles.find(a => a.id === id);
  if (!a) return <NotFound />;
  return <><PageHero title={a.title} description={a.summary} crumbs={[{
      name: 'Insights',
      to: 'insights'
    }, {
      name: a.category
    }]} cta={false} image={a.image} /><article className="article-body wrap"><aside><span>{a.category}</span><p>Systems Journal<br />IMVO Systems</p><Link href={link('insights')}><ChevronLeft size={17} />All insights</Link></aside><div>{a.body.map(p => <section key={p[0]}><h2>{p[0]}</h2><p>{p[1]}</p></section>)}<Button>Talk about your project</Button></div></article><section className="section wrap"><h2 className="section-title">Keep exploring</h2><div className="service-cards related-cards">{articles.filter(x => x.id !== a.id).slice(0, 3).map(x => <ArticleCard article={x} key={x.id} />)}</div></section><FinalCTA /></>;
}
const careerRoles = [{
  title: 'Software Engineering',
  type: 'Engineering',
  description: 'Web, mobile, backend services, integrations, and thoughtful code.'
}, {
  title: 'Product & UI/UX Design',
  type: 'Design',
  description: 'Product discovery, clear user journeys, useful interfaces, and working prototypes.'
}, {
  title: 'Cloud, Quality & Delivery',
  type: 'Delivery',
  description: 'Testing, deployment, infrastructure, documentation, and dependable operations.'
}];
export function Careers({
  onRole
}) {
  const [query, setQuery] = useState(''),
    [team, setTeam] = useState('All');
  const list = careerRoles.filter(r => (team === 'All' || r.type === team) && (r.title + ' ' + r.description).toLowerCase().includes(query.toLowerCase()));
  return <><PageHero title={<>Working at<br />IMVO Systems</>} crumbs={[{
      name: 'Careers'
    }]} description="A collaborative technology practice for curious people who care about useful products, clear communication, and dependable engineering." cta="Explore opportunities" buttonTo="careers?section=opportunities" /><section className="careers-images wrap"><img src={asset('/team.webp')} alt="The IMVO Group team collaborating" /><div><img src={asset('/imvo-contact-team.webp')} alt="The IMVO Group team collaborating" /><h2>Curious minds.<br />Shared purpose.</h2></div></section><section className="section wrap opportunities" id="opportunities"><h2>Build with IMVO Systems</h2><p>Expressions of interest for future collaboration. These are areas of work, rather than confirmed vacancies.</p><div className="careers-filters"><label className="search-field"><span className="sr-only">Search opportunities</span><input type="search" placeholder="Search for opportunities" value={query} onChange={e => setQuery(e.target.value)} /><Search size={22} /></label><label><span>Discipline</span><select value={team} onChange={e => setTeam(e.target.value)}>{['All', 'Engineering', 'Design', 'Delivery'].map(t => <option key={t}>{t}</option>)}</select></label></div><div className="role-list">{list.map(r => <button key={r.title} onClick={() => onRole(r)}><div><span>{r.type} · Kigali / Remote</span><h3>{r.title}</h3></div><ArrowUpRight size={28} /></button>)}{!list.length && <div className="empty-state"><p>No areas match this search.</p><button className="button outline" onClick={() => {
            setQuery('');
            setTeam('All');
          }}>Clear search<RotateCcw size={17} /></button></div>}</div></section><FinalCTA /></>;
}
