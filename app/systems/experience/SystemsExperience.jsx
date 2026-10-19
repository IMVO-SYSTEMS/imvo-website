"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { asset } from './data.js';
import { Header, Footer, PageHero, ProjectStories, FinalCTA, NotFound, Button } from './ui.jsx';
import { Home, ServicesPage, ServiceDetail, IndustriesPage, IndustryDetail, ProjectsPage, ProjectDetail, About, InsightsPage, ArticlePage, Careers } from './pages.jsx';
import { Contact } from './contact.jsx';
import { Testimonials } from './motion.jsx';
function Dialog({
  modal,
  onClose
}) {
  const ref = useRef(),
    [slide, setSlide] = useState(modal.index || 0);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  useEffect(() => {
    const fn = e => {
      if (modal?.type === 'gallery' && ['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        setSlide(n => (n + (e.key === 'ArrowRight' ? 1 : modal.images.length - 1)) % modal.images.length);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [modal]);
  return <dialog ref={ref} className={`modal ${modal?.type || ''}`} onCancel={onClose} onClick={e => {
    if (e.target === e.currentTarget) onClose();
  }} aria-label={modal?.type === 'film' ? 'IMVO Systems film' : modal?.type === 'role' ? 'Systems collaboration' : 'Systems project gallery'}><button className="modal-close" onClick={onClose} aria-label="Close dialog"><X size={25} /></button>{modal?.type === 'film' && <video controls autoPlay playsInline src={asset('hero-film.mp4')} />} {modal?.type === 'gallery' && <><img src={asset(modal.images[slide])} alt={'IMVO product preview, image ' + (slide + 1)} /><div className="gallery-controls"><button aria-label="Previous gallery image" onClick={() => setSlide((slide + modal.images.length - 1) % modal.images.length)}><ChevronLeft /></button><span>{slide + 1} / {modal.images.length}</span><button aria-label="Next gallery image" onClick={() => setSlide((slide + 1) % modal.images.length)}><ChevronRight /></button></div></>}{modal?.type === 'role' && <div className="role-modal"><span className="eyebrow">Expressions of interest</span><h2>{modal.role.title}</h2><p>{modal.role.description}</p><p>Introduce your experience, interests, and the type of collaboration you have in mind. Specific opportunities and engagement terms are discussed with the team.</p><Button to={'contact?topic=' + encodeURIComponent('Working with IMVO · ' + modal.role.title)} onClick={onClose}>Introduce yourself</Button></div>}</dialog>;
}

/** @param {{route?:string,query?:string,reviews?:Array<{text?:string,author?:string,role?:string,company?:string}>}} props */
export default function SystemsExperience({
  route = '',
  query = '',
  reviews = []
}) {
  const params = new URLSearchParams(query);
  const [modal, setModal] = useState(null),
    [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const search = new URLSearchParams(query);
    const id = search.get('section') || search.get('group') || location.hash.slice(1);
    const frame = requestAnimationFrame(() => {
      if (id) document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth'
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [route, query]);
  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 900);
    update();
    window.addEventListener('scroll', update, {
      passive: true
    });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const page = route === '' ? <Home reviews={reviews} onFilm={() => setModal({
    type: 'film'
  })} /> : route === 'services' ? <ServicesPage /> : route.startsWith('services/') ? <ServiceDetail id={route.split('/')[1]} /> : route === 'industries' ? <IndustriesPage /> : route.startsWith('industries/') ? <IndustryDetail id={route.split('/')[1]} /> : route === 'projects' ? <ProjectsPage /> : route.startsWith('projects/') ? <ProjectDetail id={route.split('/')[1]} onGallery={(images, index) => setModal({
    type: 'gallery',
    images,
    index
  })} /> : route === 'about' ? <About /> : route === 'insights' ? <InsightsPage /> : route.startsWith('insights/') ? <ArticlePage id={route.split('/')[1]} /> : route === 'stories' ? <><PageHero title={<>Project<br />Stories</>} description="The business problem, the experience, and the system behind our product directions." crumbs={[{
      name: 'Project stories'
    }]} cta={false} /><ProjectStories full /><FinalCTA /></> : route === 'testimonials' ? <><PageHero title={<>Client<br />Perspectives</>} description="Feedback shared with IMVO Group, in our clients’ own words." crumbs={[{
      name: 'Testimonials'
    }]} cta={false} /><Testimonials reviews={reviews} /><FinalCTA /></> : route === 'careers' ? <Careers onRole={role => setModal({
    type: 'role',
    role
  })} /> : route === 'contact' ? <Contact params={params} /> : <NotFound />;
  return <div className="systems-site"><a className="skip-link" href="#systems-main" onClick={e => {
      e.preventDefault();
      document.getElementById('systems-main')?.focus();
      document.getElementById('systems-main')?.scrollIntoView();
    }}>Skip to content</a><Header route={route} /><main id="systems-main" tabIndex="-1" key={route}>{page}</main><Footer />{modal && <Dialog modal={modal} onClose={() => setModal(null)} />} {showTop && <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })}><ArrowUp size={21} /></button>}</div>;
}
