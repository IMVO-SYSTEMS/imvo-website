import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X, Plus, ChevronLeft, ChevronRight, MapPin, Check, Minus, RotateCcw } from 'lucide-react';
import { asset, groups, services, industries, projects, process, faqs } from './data.js';
export const link = (to = 'contact') => `/systems${to ? '/' + to : ''}`;
export function Button({
  to = 'contact',
  children = 'Talk to us',
  outline = false,
  className = '',
  ...props
}) {
  return <Link className={`button ${outline ? 'outline' : ''} ${className}`} href={link(to)} {...props}>{children}<ArrowRight size={21} strokeWidth={1.6} /></Link>;
}
export function Logo({
  light = false
}) {
  return <img className={`studio-logo ${light ? 'light-logo' : ''}`} src={asset('systems.svg')} alt="IMVO Systems" />;
}
export function Breadcrumb({
  items = []
}) {
  return <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={link('')}>Home</Link>{items.map((x, i) => <React.Fragment key={i}><span>/</span>{x.to ? <Link href={link(x.to)}>{x.name}</Link> : <span aria-current="page">{x.name || x}</span>}</React.Fragment>)}</nav>;
}
export function PageHero({
  title,
  description,
  crumbs = [],
  cta = 'Talk to us',
  image,
  buttonTo = 'contact'
}) {
  return <><section className="page-hero wrap"><Breadcrumb items={crumbs} /><div className="page-hero-grid"><h1 tabIndex="-1">{title}</h1><div><p>{description}</p>{cta && <Button to={buttonTo}>{cta}</Button>}</div></div></section>{image && <div className="page-cover"><img src={asset(image)} alt={typeof title === 'string' ? title : 'IMVO Systems project'} /></div>}</>;
}
export function Header({
  route
}) {
  const [open, setOpen] = useState(null),
    [category, setCategory] = useState(0),
    [aboutTab, setAboutTab] = useState(0),
    [mobile, setMobile] = useState(false),
    [mobileGroup, setMobileGroup] = useState(null),
    [scrolled, setScrolled] = useState(false);
  const root = useRef();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    fn();
    window.addEventListener('scroll', fn, {
      passive: true
    });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape') {
        setOpen(null);
        setMobile(false);
      }
      if (e.type === 'pointerdown' && !root.current?.contains(e.target)) setOpen(null);
    };
    document.addEventListener('keydown', fn);
    document.addEventListener('pointerdown', fn);
    return () => {
      document.removeEventListener('keydown', fn);
      document.removeEventListener('pointerdown', fn);
    };
  }, []);
  useEffect(() => {
    if (mobile) {
      const old = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = old;
      };
    }
  }, [mobile]);
  const toggle = m => setOpen(open === m ? null : m);
  return <header className={`header ${scrolled ? 'scrolled' : ''}`} ref={root}><div className="header-row wrap"><Link className="brand" href={link('')} aria-label="IMVO Systems home"><Logo /></Link><nav className="desktop-nav" aria-label="Main navigation">
 <div className={`nav-parent ${route.startsWith('services') ? 'active' : ''}`}><Link onMouseEnter={() => setOpen('services')} href={link('services')}>Services</Link><button aria-label="Open services menu" aria-expanded={open === 'services'} onClick={() => toggle('services')}><ChevronDown size={14} /></button></div>
 <div className={`nav-parent ${route.startsWith('industries') ? 'active' : ''}`}><Link onMouseEnter={() => setOpen('industries')} href={link('industries')}>Industries</Link><button aria-label="Open industries menu" aria-expanded={open === 'industries'} onClick={() => toggle('industries')}><ChevronDown size={14} /></button></div>
 <Link className={route.startsWith('projects') ? 'active' : ''} href={link('projects')} onMouseEnter={() => setOpen(null)}>Projects</Link><div className={`nav-parent ${route.startsWith('about') ? 'active' : ''}`}><Link onMouseEnter={() => setOpen('about')} href={link('about')}>About us</Link><button aria-label="Open about menu" aria-expanded={open === 'about'} onClick={() => toggle('about')}><ChevronDown size={14} /></button></div><Link href={link('testimonials')} onMouseEnter={() => setOpen(null)}>Testimonials</Link><Link href={link('careers')} onMouseEnter={() => setOpen(null)}>Careers</Link><Link href={link('insights')} onMouseEnter={() => setOpen(null)}>Insights</Link></nav><Button className="header-contact">Contact us</Button><button className="mobile-toggle" aria-label={mobile ? 'Close navigation' : 'Open navigation'} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>{mobile ? <X size={30} /> : <Menu size={30} />}</button></div>
 {open && <div className={`mega-menu ${open === 'industries' ? 'industries-menu' : ''}`} onMouseLeave={() => setOpen(null)}>{open === 'services' && <><div className="mega-categories"><Link href={link('services')} className="overview">Overview <ArrowRight size={18} /></Link><div role="tablist" aria-label="Service categories">{groups.map((g, i) => <button key={g.id} role="tab" aria-selected={category === i} className={category === i ? 'selected' : ''} onClick={() => setCategory(i)} onMouseEnter={() => setCategory(i)} onFocus={() => setCategory(i)}>{g.name}</button>)}</div></div><div className="mega-content" role="tabpanel" aria-label={groups[category].name}><div className="mega-links">{groups[category].items.map(x => <Link key={x[0]} href={link('services/' + x[0])}>{x[1]}<ArrowUpRight size={16} /></Link>)}</div><img src={asset(groups[category].image)} alt={groups[category].name} /></div></>}{open === 'industries' && <div className="sector-links wrap">{industries.map(s => <Link href={link('industries/' + s.id)} key={s.id}>{s.name}<ArrowUpRight size={18} /></Link>)}</div>}{open === 'about' && <><div className="mega-categories" role="tablist" aria-label="About Systems">{['About Systems', 'Our people', 'Our process'].map((t, i) => <button role="tab" aria-selected={aboutTab === i} className={aboutTab === i ? 'selected' : ''} key={t} onMouseEnter={() => setAboutTab(i)} onClick={() => setAboutTab(i)}>{t}</button>)}</div><div className="mega-content about-mega" role="tabpanel"><div><p>{['A Kigali-based technology team connecting product strategy, design, software engineering, and operations.', 'A collaborative team shaped by product thinking, engineering care, and clear responsibilities.', 'A connected process, from the first discovery conversation to launch and ongoing improvement.'][aboutTab]}</p><Link href={link(['about', 'about?section=team', 'about?section=process'][aboutTab])}>Explore {['our team', 'our people', 'our process'][aboutTab]}<ArrowRight size={20} /></Link></div><img src={asset(aboutTab === 0 ? 'about-3.png' : '/imvo-team-main.webp')} alt="Technology and collaboration" /></div></>}</div>}
 {mobile && <div className="mobile-drawer" aria-label="Mobile navigation"><nav><div className="mobile-nav-item"><Link href={link('services')}>Services</Link><button aria-label="Expand services" aria-expanded={mobileGroup === 'services'} onClick={() => setMobileGroup(mobileGroup === 'services' ? null : 'services')}><ChevronDown /></button></div>{mobileGroup === 'services' && <div className="mobile-submenu">{groups.map(g => <details key={g.id}><summary>{g.name}<Plus size={17} /></summary>{g.items.map(x => <Link href={link('services/' + x[0])} key={x[0]}>{x[1]}<ArrowUpRight size={14} /></Link>)}</details>)}</div>}<div className="mobile-nav-item"><Link href={link('industries')}>Industries</Link><button aria-label="Expand industries" aria-expanded={mobileGroup === 'industries'} onClick={() => setMobileGroup(mobileGroup === 'industries' ? null : 'industries')}><ChevronDown /></button></div>{mobileGroup === 'industries' && <div className="mobile-submenu">{industries.map(s => <Link key={s.id} href={link('industries/' + s.id)}>{s.name}<ArrowUpRight size={15} /></Link>)}</div>}<Link href={link('projects')}>Projects</Link><div className="mobile-nav-item"><Link href={link('about')}>About us</Link><button aria-label="Expand about us" aria-expanded={mobileGroup === 'about'} onClick={() => setMobileGroup(mobileGroup === 'about' ? null : 'about')}><ChevronDown /></button></div>{mobileGroup === 'about' && <div className="mobile-submenu"><Link href={link('about')}>The company</Link><Link href={link('about?section=team')}>Our people</Link><Link href={link('about?section=process')}>How we work</Link></div>}<Link href={link('testimonials')}>Testimonials</Link><Link href={link('careers')}>Careers</Link><Link href={link('insights')}>Insights</Link></nav><div className="mobile-contact"><span>Email us</span><a href="mailto:projects@imvogroup.com">projects@imvogroup.com</a><span>Our base</span><p>Kigali, Rwanda<br />Rwanda & East Africa</p><Button>Start a conversation</Button></div></div>}
 </header>;
}
export function ServiceCard({
  service: s
}) {
  return <Link className="image-card service-card" href={link('services/' + s.id)}><img src={asset(s.image)} alt="" loading="lazy" /><div className="card-shade" /><div className="image-card-content"><h3>{s.name}</h3><p>{s.description}</p><ArrowUpRight className="card-arrow" size={27} strokeWidth={1.5} /></div></Link>;
}
export function ArticleCard({
  article: a
}) {
  return <Link className="image-card insight-card" href={link('insights/' + a.id)}><img src={asset(a.image)} alt="" loading="lazy" /><div className="card-shade" /><div className="image-card-content"><span>{a.category}</span><h3>{a.title}</h3><p>{a.summary}</p><ArrowUpRight className="card-arrow" size={26} /></div></Link>;
}
export function ProjectCard({
  project: p
}) {
  return <article className="project-card"><Link className="project-image" href={link('projects/' + p.id)}><img src={asset(p.image)} alt={p.name} loading="lazy" /><span>View project<ArrowUpRight size={22} /></span></Link><div><h3><Link href={link('projects/' + p.id)}>{p.name}</Link></h3><p>{p.category} <span>·</span> {p.location}</p></div></article>;
}
export function ServiceTabs() {
  const [tab, setTab] = useState(0);
  const refs = useRef([]);
  const select = i => {
    setTab(i);
    refs.current[i]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  };
  return <section className="services-section section wrap" id="services"><h2 className="section-title">Our Services</h2><div className="service-tabs" role="tablist" aria-label="Explore our services">{groups.map((g, i) => <button key={g.id} ref={e => refs.current[i] = e} role="tab" id={'tab-' + g.id} aria-controls={'panel-' + g.id} aria-selected={tab === i} tabIndex={tab === i ? 0 : -1} onClick={() => select(i)} onKeyDown={e => {
        if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
          e.preventDefault();
          let n = e.key === 'Home' ? 0 : e.key === 'End' ? 6 : (i + (e.key === 'ArrowRight' ? 1 : 6)) % 7;
          select(n);
          refs.current[n]?.focus();
        }
      }}>{g.name}</button>)}</div><div className="service-cards" role="tabpanel" id={'panel-' + groups[tab].id} aria-labelledby={'tab-' + groups[tab].id} key={tab}>{services.filter(s => s.group === groups[tab].id).map(s => <ServiceCard service={s} key={s.id} />)}</div></section>;
}
const countries = ['Rwanda', 'Uganda', 'Kenya', 'Tanzania', 'Burundi', 'DRC', 'Zambia', 'Angola', 'Mozambique'];
export function Presence() {
  const [country, setCountry] = useState('Rwanda');
  return <section className="presence section wrap"><h2 className="section-title">Our Presence</h2><div className="presence-meta"><p><span className="tag">Our base</span><strong>Kigali, Rwanda</strong></p><p><span className="tag">Regional focus</span>Rwanda & East Africa</p><p><span className="tag">Connected delivery</span>Design · Develop · Support</p></div><div className="presence-map"><img src={asset('world-map.svg')} alt="World map showing IMVO Systems’ Kigali base" loading="lazy" /><div className="map-base"><MapPin size={27} fill="currentColor" stroke="white" /><div><span className="tag">KIGALI BASE</span><strong>Rwanda</strong></div></div><div className="map-country" aria-live="polite"><span>{country === 'Rwanda' ? 'Our home. Our starting point.' : 'Regional collaboration'}</span><strong>{country}</strong><p>{country === 'Rwanda' ? 'Product design and software engineering, from Kigali.' : 'Product delivery through clear communication, shared reviews, and agreed responsibilities.'}</p><Link href={link('contact?topic=' + encodeURIComponent('Project in ' + country))}>Discuss a project<ArrowUpRight size={17} /></Link></div></div><div className="countries" aria-label="Explore our regional focus">{countries.map(c => <button className={country === c ? 'selected' : ''} key={c} onClick={() => setCountry(c)} aria-pressed={country === c}>{c}</button>)}</div></section>;
}
export function ProjectStories({
  full = false
}) {
  const [index, setIndex] = useState(0);
  let data = full ? projects : projects.slice(0, 3);
  return <section className={`stories-section section wrap ${full ? 'full-stories' : ''}`}><div className="story-head"><div><h2>{full ? 'Behind the products.' : 'Different products. A shared way of thinking.'}</h2><p>Business context, clear product thinking, and dependable engineering.</p></div>{!full && <div className="circle-controls"><button aria-label="Previous project stories" onClick={() => setIndex((index + 2) % 3)}><ChevronLeft size={21} /></button><button aria-label="Next project stories" onClick={() => setIndex((index + 1) % 3)}><ChevronRight size={21} /></button></div>}</div><div className="story-grid">{data.map((_, i) => {
        const p = data[(i + index) % data.length];
        return <article key={p.id}><span className="story-category">{p.category} · {p.location}</span><h3>{p.focus}</h3><p>{p.description}</p><Link href={link('projects/' + p.id)}>{p.name}<ArrowUpRight size={18} /></Link></article>;
      })}</div>{full && <p className="quiet">Explore selected IMVO product directions and demonstration concepts. Project interface imagery is illustrative.</p>}</section>;
}
export function ConsultationBanner() {
  return <section className="consultation"><div className="wrap consultation-grid"><div><p>Maximise the value of your digital investment.</p><h2>Give your business an edge with customised technology.</h2></div><div><p>Bring the business problem, workflow, or product.<br />Let’s define the right system together.</p><Button>Get your consultation</Button></div></div></section>;
}
export function FinalCTA() {
  return <section className="final-cta wrap"><div className="final-cta-inner"><img className="cta-photo" src={asset('/imvo-contact-team.webp')} alt="The IMVO Group team collaborating" loading="lazy" /><div className="cta-overlay" /><div className="cta-copy"><h2>Your Technology<br />Partner is Here.</h2><p>Product strategy, software engineering, and practical support.<br />Let’s build a system that moves your business forward.</p><Button>Talk to us</Button></div><img className="cta-wordmark" src={asset('systems.svg')} alt="" /></div></section>;
}
export function Process() {
  const [open, setOpen] = useState(null);
  return <section className="process section wrap" id="process"><div className="process-head"><p>How we work</p><h2>From the first idea.<br />To a working system.</h2></div><div>{process.map((p, i) => <div className="process-row" key={p[0]}><button className="process-trigger" aria-expanded={open === i} aria-controls={'process-' + i} onClick={() => setOpen(open === i ? null : i)}><span className="process-number">{String(i + 1).padStart(2, '0')}</span><span><strong>{p[0]}</strong><small>{p[1]}</small></span>{open === i ? <Minus size={32} strokeWidth={1.4} /> : <Plus size={32} strokeWidth={1.4} />}</button>{open === i && <p className="process-detail" id={'process-' + i}>{p[2]}</p>}</div>)}</div></section>;
}
export function FAQ({
  items = faqs
}) {
  const [open, setOpen] = useState(null);
  return <section className="faq section wrap"><div><p className="eyebrow">Help center</p><h2>Frequently asked<br />questions.</h2></div><div>{items.map((f, i) => <div className="faq-row" key={f[0]}><button aria-expanded={open === i} aria-controls={'faq-' + i} onClick={() => setOpen(open === i ? null : i)}><ArrowUpRight size={19} /><span>{f[0]}</span>{open === i ? <Minus size={17} /> : <Plus size={17} />}</button>{open === i && <p id={'faq-' + i}>{f[1]}</p>}</div>)}</div></section>;
}
export function Footer() {
  return <footer><div className="footer-main wrap"><div className="footer-address"><Link href={link('')}><Logo light /></Link><p><span>Kigali Base</span>Kigali, Rwanda<br />Rwanda & East Africa</p><p><span>Project conversations</span><a href="mailto:projects@imvogroup.com">projects@imvogroup.com</a></p><p><span>General enquiries</span><a href="mailto:info@imvogroup.com">info@imvogroup.com</a></p><p><span>WhatsApp</span><a href="https://wa.me/250787349257" target="_blank" rel="noreferrer">+250 787 349 257</a></p><small>Digital products and<br />business systems.</small></div><div><h3>Services</h3>{groups.map(g => <Link key={g.id} href={link('services?group=' + g.id)}>{g.name}</Link>)}</div><div><h3>Industries</h3>{industries.map(s => <Link key={s.id} href={link('industries/' + s.id)}>{s.name}</Link>)}</div><div><h3>About us</h3><Link href={link('about')}>The company</Link><Link href={link('about?section=team')}>Our people</Link><Link href={link('about?section=process')}>Our process</Link><Link href={link('projects')}>Our projects</Link><Link href={link('stories')}>Project stories</Link><Link href={link('testimonials')}>Testimonials</Link><Link href={link('careers')}>Careers</Link></div><div><h3>Insights</h3><Link href={link('insights')}>Technology insights</Link><Link href={link('contact')}>Start a conversation</Link><h3 className="footer-extra">IMVO Group</h3><a href="https://www.imvogroup.com/" target="_blank" rel="noreferrer">IMVO Studio<ArrowUpRight size={12} /></a><a href="https://www.imvogroup.com/domicile" target="_blank" rel="noreferrer">DŌMICILE<ArrowUpRight size={12} /></a></div></div><div className="footer-bottom wrap"><div><p>© 2026 IMVO Group. Intellectu · Mens · Visio · Origo.</p><p className="footer-regulated">IMVO Systems · A division of IMVO Group · Kigali, Rwanda.</p><div className="legal-links"><Link href="/terms">Terms & conditions</Link><span> | </span><Link href="/privacy">Privacy policy</Link><span> | </span><Link href="/cookies">Cookies</Link></div></div><div className="socials"><a href="https://www.linkedin.com/company/imvo-design-group" target="_blank" rel="noreferrer" aria-label="IMVO on LinkedIn"><img src={asset('linkedin.svg')} alt="" aria-hidden="true" /></a><a href="https://www.instagram.com/imvo_group/" target="_blank" rel="noreferrer" aria-label="IMVO on Instagram"><img src={asset('instagram.svg')} alt="" aria-hidden="true" /></a></div></div></footer>;
}
export function NotFound() {
  return <section className="section empty-state wrap"><h1>Let’s find your way.</h1><p>This Systems page could not be found.</p><Button to="">Back to Systems</Button></section>;
}
