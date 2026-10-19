'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react';
import { Button } from './ui.jsx';
function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}
const collaborators = [['Qonics Inc.', 1], ['BM Engineering', 2], ['Show Makerz', 3], ['Optimus Anchor', 4], ['Operra', 5], ['Select Foods Africa', 6], ['4D Agency', 7], ['U & E Industries Holdings', 8], ['M. Miette', 9]];
export function LogoMarquees() {
  const [paused, setPaused] = useState(false);
  return <section className={`collaborators section ${paused ? 'motion-paused' : ''}`} aria-labelledby="collaborators-heading"><div className="wrap collaborators-heading"><div><p className="eyebrow">Across the IMVO network</p><h2 id="collaborators-heading">Clients & collaborators.</h2><p>Relationships that connect ideas, businesses, and better ways of working.</p></div><button className="motion-control" aria-label={paused ? 'Play logo animation' : 'Pause logo animation'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={18} /> : <Pause size={18} />}</button></div>{[collaborators, [...collaborators.slice(4), ...collaborators.slice(0, 4)]].map((logos, row) => <div className={`logo-row ${row ? 'logo-row-right' : ''}`} key={row} aria-hidden={row ? true : undefined}><div className="logo-track">{[0, 1].map(copy => <div className="logo-sequence" key={copy} aria-hidden={copy ? true : undefined}>{logos.map(([name, number]) => <div className="collaborator-logo" key={name}><img data-light={[3, 4, 5, 6, 7, 8].includes(number) || undefined} src={`/partners/partner-${number}.png`} alt={copy || row ? '' : name} loading="lazy" width="180" height="84" /></div>)}</div>)}</div></div>)}</section>;
}
export function Testimonials({
  reviews = []
}) {
  const count = reviews.length,
    [position, setPosition] = useState(count),
    [step, setStep] = useState(0),
    [snap, setSnap] = useState(true),
    [paused, setPaused] = useState(false),
    [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false),
    [visible, setVisible] = useState(false),
    [manual, setManual] = useState(false);
  const track = useRef(null),
    section = useRef(null),
    moving = useRef(false),
    reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) moving.current = false;
  }, [reduced]);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const cards = el.querySelectorAll('.testimonial-card');
      if (cards.length > 1) setStep(cards[1].offsetLeft - cards[0].offsetLeft);
      moving.current = true;
      setSnap(true);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setSnap(false);
        moving.current = false;
      }));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, [count]);
  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: .15
    });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (count < 2 || reduced || paused || hovered || focused || !visible) return;
    const timer = setInterval(() => {
      if (moving.current) return;
      setManual(false);
      moving.current = true;
      setPosition(n => n + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [count, reduced, paused, hovered, focused, visible]);
  const finish = () => {
    if (position >= count * 2 || position < count) {
      setSnap(true);
      setPosition(count + (position % count + count) % count);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setSnap(false);
        moving.current = false;
      }));
    } else moving.current = false;
  };
  const move = direction => {
    if (moving.current) return;
    setManual(true);
    moving.current = !reduced;
    setPosition(n => {
      const next = n + direction;
      return reduced ? count + (next % count + count) % count : next;
    });
  };
  if (!count) return null;
  return <section ref={section} className="testimonials section wrap" id="testimonials" aria-labelledby="testimonials-heading" aria-roledescription="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={e => {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
  }}><div className="story-head"><div><p className="eyebrow">Client perspectives</p><h2 id="testimonials-heading">Good work starts<br />with good relationships.</h2><p>Feedback shared with IMVO Group, in our clients’ own words.</p></div><div className="circle-controls"><button aria-label="Previous testimonial" onClick={() => move(-1)}><ChevronLeft size={21} /></button><button aria-label={paused ? 'Play testimonials' : 'Pause testimonials'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={18} /> : <Pause size={18} />}</button><button aria-label="Next testimonial" onClick={() => move(1)}><ChevronRight size={21} /></button></div></div><div className="testimonial-window"><div ref={track} className="testimonial-track" data-slide={position} data-snap={snap || reduced || !step} style={{
        transform: `translate3d(${-position * step}px,0,0)`,
        transitionDuration: manual ? '650ms' : '3000ms'
      }} onTransitionEnd={e => {
        if (e.target === e.currentTarget && e.propertyName === 'transform') finish();
      }}>{[0, 1, 2].flatMap(copy => reviews.map((review, i) => <figure key={`${copy}-${i}`} className="testimonial-card" aria-hidden={copy !== 1 ? true : undefined} aria-label={`Review ${i + 1} of ${count}`}><Quote className="testimonial-quote" size={32} strokeWidth={1.2} aria-hidden="true" /><blockquote>{review.text}</blockquote><figcaption><strong>{review.author}</strong><span>{[review.role, review.company].filter(Boolean).join(' · ') || 'IMVO Group client feedback'}</span></figcaption></figure>))}</div></div><div className="review-progress" aria-label="Testimonial position">{reviews.map((review, i) => <span key={i} className={(position % count + count) % count === i ? 'current' : ''} />)}<span className="sr-only" aria-live={paused ? 'polite' : 'off'}>Review {(position % count + count) % count + 1} of {count}</span></div></section>;
}
const toolkit = [['React', 'react', 'Web & mobile', 'Interfaces', 'https://react.dev/'], ['Next.js', 'nextdotjs', 'Web & mobile', 'Web platforms', 'https://nextjs.org/'], ['TypeScript', 'typescript', 'Web & mobile', 'Typed applications', 'https://www.typescriptlang.org/'], ['Node.js', 'nodedotjs', 'Web & mobile', 'Backend services', 'https://nodejs.org/'], ['Python', 'python', 'Data & AI', 'Data & automation', 'https://www.python.org/'], ['PostgreSQL', 'postgresql', 'Data & AI', 'Relational data', 'https://www.postgresql.org/'], ['Cloudflare', 'cloudflare', 'Cloud & delivery', 'Edge & deployment', 'https://www.cloudflare.com/'], ['Docker', 'docker', 'Cloud & delivery', 'Application delivery', 'https://www.docker.com/'], ['GitHub', 'github', 'Cloud & delivery', 'Code & collaboration', 'https://github.com/'], ['Sanity', 'sanity', 'Design & content', 'Structured content', 'https://www.sanity.io/'], ['Figma', 'figma', 'Design & content', 'Design & prototypes', 'https://www.figma.com/']];
export function TechnologyTools() {
  const [filter, setFilter] = useState('All tools');
  const tools = toolkit.filter(t => filter === 'All tools' || t[2] === filter);
  return <section className="technology-tools section wrap" id="tools" aria-labelledby="tools-heading"><div className="story-head"><div><p className="eyebrow">Technology toolkit</p><h2 id="tools-heading">The right tools.<br />For the right system.</h2></div><p>Modern technology selected around<br />your product, data, and delivery needs.</p></div><div className="filters tools-filters" aria-label="Filter technology tools">{['All tools', 'Web & mobile', 'Data & AI', 'Cloud & delivery', 'Design & content'].map(c => <button key={c} aria-pressed={filter === c} className={filter === c ? 'selected' : ''} onClick={() => setFilter(c)}>{c}</button>)}</div><div className="tools-grid" aria-live="polite">{tools.map(([name, slug,, description, url]) => <a key={slug} className="tool-card" href={url} target="_blank" rel="noreferrer" aria-label={`${name} — ${description} (opens in a new tab)`}><img src={`/systems/media/tools/${slug}.svg`} alt="" loading="lazy" width="42" height="42" /><strong>{name}</strong><span>{description}</span><ArrowUpRight size={15} aria-hidden="true" /></a>)}</div></section>;
}
export function TeamFeature() {
  return <section className="team-feature section wrap"><div className="team-feature-image"><img src="/imvo-team-main.webp" alt="The IMVO Group team in Kigali" width="1500" height="1000" loading="lazy" /></div><div><p className="eyebrow">People behind the systems</p><h2>Curious minds.<br />Connected thinking.</h2><p>Part of IMVO Group, we bring design, technology, and a practical understanding of business into the same conversation.</p><p>From the first product question to the systems behind day-to-day work, we build through collaboration.</p><Button to="about?section=team" outline>Meet IMVO</Button></div></section>;
}
