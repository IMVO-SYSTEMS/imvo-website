import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, MapPin, Users, Layers, CheckCircle2, Download } from 'lucide-react';
import { groups } from './data.js';
import { PUBLIC_ENQUIRY_ACCESS_KEY } from '../../lib/enquiryConfig';
import { PageHero } from './ui.jsx';
export function Contact({
  params
}) {
  const topic = params.get('topic') || '';
  const [v, setV] = useState({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: topic,
      location: '',
      stage: '',
      budget: '',
      message: '',
      method: 'Email',
      consent: false
    }),
    [review, setReview] = useState(false),
    [downloaded, setDownloaded] = useState(false),
    [sending, setSending] = useState(false),
    [sent, setSent] = useState(false),
    [error, setError] = useState('');
  const field = k => ({
    value: v[k],
    onChange: e => setV({
      ...v,
      [k]: e.target.value
    })
  });
  useEffect(() => {
    if (topic) setV(x => ({
      ...x,
      service: topic
    }));
  }, [topic]);
  const download = () => {
    const text = `IMVO SYSTEMS — PROJECT ENQUIRY\n\nName: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone}\nCompany: ${v.company}\nService: ${v.service}\nProject location: ${v.location}\nCurrent stage: ${v.stage}\nIndicative budget: ${v.budget}\nPreferred contact: ${v.method}\n\nPROJECT BRIEF\n${v.message}\n\nPrepared on the IMVO Systems website.\n`;
    let u = URL.createObjectURL(new Blob([text], {
        type: 'text/plain;charset=utf-8'
      })),
      a = document.createElement('a');
    a.href = u;
    a.download = 'IMVO-Systems-Project-Enquiry.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1000);
    setDownloaded(true);
  };
  const submit = async () => {
    if (sending) return;
    setSending(true);
    setError('');
    const payload = new FormData();
    payload.set('access_key', PUBLIC_ENQUIRY_ACCESS_KEY);
    payload.set('subject', 'New Systems Project Enquiry — IMVO');
    payload.set('from_name', 'IMVO Systems Website');
    payload.set('name', v.name);
    payload.set('email', v.email);
    payload.set('phone', v.phone);
    payload.set('message', v.message);
    payload.set('Division', 'IMVO Systems');
    for (const [key, value] of [['Company / Organisation', v.company], ['Service', v.service], ['Project Location', v.location], ['Current Project Stage', v.stage], ['Indicative Budget', v.budget], ['Preferred Contact Method', v.method], ['Privacy Consent', 'Provided'], ['Source Page', window.location.href]]) payload.set(key, value);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Your enquiry could not be sent. Please try again or contact projects@imvogroup.com.');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Your enquiry could not be sent. Please try again.');
    } finally {
      setSending(false);
    }
  };
  return <><PageHero title={<>Get in touch<br />with IMVO.</>} description="Tell us about your business, workflow, or product. We’ll help define the right system and next step." crumbs={[{
      name: 'Contact us'
    }]} cta="Prepare an enquiry" buttonTo="contact?section=enquiry" /><section className="contact-details wrap"><div><span>Our base</span><strong>Kigali, Rwanda</strong><p>Rwanda · East Africa · Remote collaboration</p></div><div><span>For our services</span><a href="mailto:projects@imvogroup.com">projects@imvogroup.com<ArrowUpRight size={16} /></a></div><div><span>General enquiries</span><a href="mailto:info@imvogroup.com">info@imvogroup.com<ArrowUpRight size={16} /></a></div><div><span>WhatsApp</span><a href="https://wa.me/250787349257" target="_blank" rel="noreferrer">+250 787 349 257<ArrowUpRight size={16} /></a></div></section><section className="contact-section section wrap" id="enquiry"><aside><p className="eyebrow">Contact us</p><h2>Ready to start<br />your project?</h2><p>Web and mobile products, business systems, integrations, and automation — starting with a clear brief.</p><div className="contact-points"><p><MapPin size={20} />Kigali-based. Regionally connected.</p><p><Users size={20} />A collaborative project approach.</p><p><Layers size={20} />Product. Engineering. Long-term support.</p></div></aside><div className="inquiry-panel">{sent ? <div className="enquiry-success" role="status"><CheckCircle2 size={42} /><h2>Thank you.<br />Your enquiry is with us.</h2><p>IMVO Systems has received your project brief. Our team will follow up using your contact details.</p><Link className="button outline" href="/systems">Back to Systems<ArrowRight size={18} /></Link></div> : review ? <div className="enquiry-review" role="status"><CheckCircle2 size={39} /><h2>Your project brief,<br />ready to review.</h2><p className="preview-note">Check your details, then send your enquiry to IMVO Systems.</p><dl>{[['Name', v.name], ['Email', v.email], ['Phone', v.phone || 'Not provided'], ['Service', v.service || 'To be discussed'], ['Location', v.location], ['Stage', v.stage], ['Budget', v.budget || 'To be discussed'], ['Preferred contact', v.method]].map(([k, x]) => <div key={k}><dt>{k}</dt><dd>{x}</dd></div>)}</dl><h3>Project brief</h3><p className="review-message">{v.message}</p>{error && <p className="form-error" role="alert">{error}</p>}<div className="review-actions"><button className="button" disabled={sending} onClick={submit}>{sending ? 'Sending…' : 'Send enquiry'}<ArrowRight size={18} /></button><button className="button outline" onClick={download}><Download size={18} />{downloaded ? 'Download again' : 'Download enquiry'}</button><button className="button outline" onClick={() => setReview(false)}>Edit enquiry<ArrowRight size={18} /></button></div>{downloaded && <p className="download-success">Your enquiry file is ready to keep for your records.</p>}</div> : <form onSubmit={e => {
          e.preventDefault();
          setReview(true);
          document.getElementById('enquiry')?.scrollIntoView({
            behavior: 'smooth'
          });
        }}><div className="form-top"><h3>Tell us about your project</h3><p>Tell us what you have in mind. Review your details before sending.</p></div><div className="form-grid"><label>Full name <span>*</span><input autoComplete="name" required placeholder="Your full name" {...field('name')} /></label><label>Email address <span>*</span><input autoComplete="email" type="email" required placeholder="you@example.com" {...field('email')} /></label><label>Phone / WhatsApp<input type="tel" autoComplete="tel" placeholder="+250" {...field('phone')} /></label><label>Company / Organisation<input autoComplete="organization" placeholder="If applicable" {...field('company')} /></label><label className="full-field">What can we help you with?<select {...field('service')}><option value="">Select a service</option>{topic && !groups.some(g => g.name === topic) && <option value={topic}>{topic}</option>}{groups.map(g => <option key={g.id}>{g.name}</option>)}<option>Working with IMVO</option><option>Other / Let’s discuss</option></select></label><label>Project location <span>*</span><input required placeholder="City, country" {...field('location')} /></label><label>Current project stage <span>*</span><select required {...field('stage')}><option value="">Select a stage</option>{['Initial idea', 'Product discovery', 'Design or prototype', 'Ready for development', 'Existing system to improve', 'Launch preparation', 'Support and maintenance'].map(t => <option key={t}>{t}</option>)}</select></label><label>Indicative project budget<select {...field('budget')}><option value="">To be discussed</option>{['Below RWF 5 million', 'RWF 5–15 million', 'RWF 15–40 million', 'Above RWF 40 million', 'Not yet determined'].map(t => <option key={t}>{t}</option>)}</select></label><label>Preferred contact method<select {...field('method')}><option>Email</option><option>WhatsApp</option><option>Phone call</option></select></label><label className="full-field">Your project brief <span>*</span><textarea required rows="5" placeholder="The business problem, users, current tools, features, integrations, and timeline you have in mind…" {...field('message')} /></label></div><label className="consent"><input type="checkbox" checked={v.consent} onChange={e => setV({
              ...v,
              consent: e.target.checked
            })} required /><span>I agree to the <Link href="/privacy" target="_blank" rel="noreferrer">IMVO Group privacy policy</Link> and consent to being contacted about this enquiry.</span></label><button type="submit" className="button">Review enquiry<ArrowRight size={20} /></button><p className="form-footnote">Fields marked * are required.</p></form>}</div></section></>;
}
