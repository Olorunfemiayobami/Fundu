"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import HelpIcon from "@/components/help/HelpIcon";
import { useRouter } from "next/navigation";
import { helpArticles, helpArticleUrl, helpFaqs, helpTopics } from "@/lib/helpContent";

export function TopicIcon({ topic }) {
  return <span className="help-topic-icon" aria-hidden="true"><HelpIcon name={topic.icon} /></span>;
}

export function TopicCards() {
  return <div className="help-topic-cards">{helpTopics.map(topic => <Link className="help-topic-card" href={`/help/${topic.slug}`} key={topic.slug}><TopicIcon topic={topic} /><span><strong>{topic.name}</strong><small>{topic.short}</small></span><HelpIcon name="chevr" className="help-card-arrow" /></Link>)}</div>;
}

export function SearchBox({ value, onChange, placeholder = "Search help, for example ‘bank details’" }) {
  return <label className="help-search"><HelpIcon name="search" /><span className="sr-only">Search help articles</span><input type="search" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} /></label>;
}

function SearchResults({ query, onClear }) {
  const hits = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return helpArticles.filter(item => `${item.title} ${item.summary} ${item.paragraphs.join(" ")} ${helpTopics.find(topic => topic.slug === item.topic)?.name || ""}`.toLowerCase().includes(needle));
  }, [query]);
  if (!query.trim()) return null;
  if (!hits.length) return <div className="help-no-results"><span className="help-topic-icon"><HelpIcon name="search" /></span><h2>No help topics match “{query.trim()}”</h2><p>Try a different word, like “bank” or “share”, or browse the topics below. You can also send us a message.</p><div className="help-actions"><button type="button" className="help-button help-button-outline" onClick={onClear}>Clear search</button><Link className="help-button" href="/help#contact">Contact us</Link></div></div>;
  return <section className="help-search-results" aria-live="polite"><h2>{hits.length} {hits.length === 1 ? "result" : "results"} for “{query.trim()}”</h2><div className="help-article-list">{hits.map(item => <ArticleRow item={item} key={`${item.topic}/${item.slug}`} />)}</div></section>;
}

export function ArticleRow({ item }) {
  const minutes = Math.max(1, Math.ceil(`${item.intro} ${item.paragraphs.join(" ")}`.split(/\s+/).length / 200));
  return <Link className="help-article-row" href={helpArticleUrl(item)}><span><strong>{item.title}</strong><small>{item.summary}</small></span><span className="help-row-time"><HelpIcon name="clock" />{minutes} min</span><HelpIcon name="chevr" className="help-row-arrow" /></Link>;
}

export function ContactCard() {
  return <aside className="help-contact-card"><div><strong>Didn’t find what you need?</strong><p>Send us a message from the Help page and tell us what’s happening.</p></div><Link className="help-button" href="/help#contact">Contact us</Link></aside>;
}

const emptyHelpMessage = { name: "", email: "", topic: "", campaign: "", message: "" };

function validateHelpMessage(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Enter your name.";
  if (!fields.email.trim()) errors.email = "Enter your email address so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  if (!fields.topic) errors.topic = "Choose a topic.";
  if (fields.campaign.trim()) {
    try {
      const url = new URL(fields.campaign.trim());
      if (!/^https?:$/.test(url.protocol)) errors.campaign = "Enter a valid campaign link.";
    } catch { errors.campaign = "Enter a valid campaign link."; }
  }
  if (!fields.message.trim()) errors.message = "Tell us what’s happening.";
  else if (fields.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

function ContactForm() {
  const [fields, setFields] = useState(emptyHelpMessage);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState("idle");
  const inputRefs = useRef({});
  const sentHeading = useRef(null);

  useEffect(() => { if (status === "sent") sentHeading.current?.focus(); }, [status]);

  function update(field, value) {
    const next = { ...fields, [field]: value };
    setFields(next);
    if (attempted) setErrors(validateHelpMessage(next));
  }

  async function send(event) {
    event.preventDefault();
    if (status === "sending") return;
    setAttempted(true);
    const nextErrors = validateHelpMessage(fields);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) { inputRefs.current[firstError]?.focus(); return; }

    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/mvkgdpjp", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name: fields.name.trim(), email: fields.email.trim(), topic: fields.topic, campaign_link: fields.campaign.trim(), message: fields.message.trim() }),
      });
      if (!response.ok) throw new Error("Formspree could not accept the message.");
      setStatus("sent");
      setFields(emptyHelpMessage);
      setErrors({});
      setAttempted(false);
    } catch {
      setStatus("error");
    }
  }

  const fieldError = key => errors[key] && <span className="help-field-error" id={`help-${key}-error`}><HelpIcon name="alert" />{errors[key]}</span>;

  if (status === "sent") return <section id="contact" className="help-contact-form help-contact-sent"><span className="help-topic-icon"><HelpIcon name="ccircle" /></span><h2 ref={sentHeading} tabIndex={-1}>Message sent</h2><p>Thanks, we’ve received your message. We’ll reply to the email address you gave us.</p><button className="help-button help-button-outline" type="button" onClick={() => setStatus("idle")}>Send another message</button></section>;

  return <section id="contact" className="help-contact-form">
    <h2>Still need help?</h2>
    <p>Send us a message and tell us as much as you can.</p>
    {status === "error" && <div className="help-form-banner" role="alert"><HelpIcon name="alert" /><span>We couldn’t send your message. Everything you wrote is still here. Check your connection and try again.</span></div>}
    <form onSubmit={send} noValidate>
      <div className="help-form-grid">
        <label>Name<input ref={node => { inputRefs.current.name = node; }} value={fields.name} onChange={e => update("name", e.target.value)} placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "help-name-error" : undefined} />{fieldError("name")}</label>
        <label>Email address<input ref={node => { inputRefs.current.email = node; }} type="email" value={fields.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "help-email-error" : undefined} />{fieldError("email")}</label>
        <label>Topic<select ref={node => { inputRefs.current.topic = node; }} value={fields.topic} onChange={e => update("topic", e.target.value)} aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? "help-topic-error" : undefined}><option value="">Choose a topic</option>{helpTopics.map(item => <option key={item.slug}>{item.name}</option>)}<option>Other</option></select>{fieldError("topic")}</label>
        <label><span>Campaign link <span className="help-optional">(optional)</span></span><input ref={node => { inputRefs.current.campaign = node; }} type="url" value={fields.campaign} onChange={e => update("campaign", e.target.value)} placeholder="Paste the link if it’s about a campaign" aria-invalid={Boolean(errors.campaign)} aria-describedby={errors.campaign ? "help-campaign-error" : undefined} />{fieldError("campaign")}</label>
      </div>
      <label>Message<textarea ref={node => { inputRefs.current.message = node; }} value={fields.message} onChange={e => update("message", e.target.value)} placeholder="What’s happening?" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "help-message-error" : undefined} />{fieldError("message")}</label>
      <div className="help-form-footer"><button className="help-button" type="submit" disabled={status === "sending"}>{status === "sending" && <span className="help-spinner" aria-hidden="true" />}{status === "sending" ? "Sending…" : status === "error" ? "Try again" : "Send message"}</button></div>
    </form>
  </section>;
}

export function HelpLanding() {
  const [query, setQuery] = useState("");
  return <main className="help-page"><section className="help-hero"><h1>How can we help?</h1><p>Answers for organizers and supporters.</p><SearchBox value={query} onChange={setQuery} /></section><div className="help-container">{query.trim() && <SearchResults query={query} onClear={() => setQuery("")} />}<TopicCards />{!query.trim() && <section className="help-faqs"><h2>Common questions</h2><div className="help-faq-list">{helpFaqs.map(([question, answer, target]) => <details key={question}><summary>{question}<HelpIcon name="chev" /></summary><div><p>{answer}</p><Link href={`/help/${target}`}>Read the full article →</Link></div></details>)}</div></section>}<ContactForm /></div></main>;
}

export function TopicContent({ topic }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const items = helpArticles.filter(item => item.topic === topic.slug);
  return <main className="help-page help-inner"><nav className="help-breadcrumb" aria-label="Breadcrumb"><Link href="/help">Help</Link><span>/</span><strong aria-current="page">{topic.name}</strong></nav><div className="help-topic-layout"><aside className="help-topic-sidebar"><span>Help topics</span>{helpTopics.map(item => <Link key={item.slug} href={`/help/${item.slug}`} aria-current={item.slug === topic.slug ? "page" : undefined} className={item.slug === topic.slug ? "active" : ""}><TopicIcon topic={item} />{item.name}</Link>)}</aside><div className="help-topic-main"><header className="help-topic-heading"><TopicIcon topic={topic} /><div><h1>{topic.name}</h1><p>{topic.description}</p></div></header><SearchBox value={query} onChange={setQuery} placeholder="Search help" /><label className="help-topic-select">Topic<select value={topic.slug} onChange={e => router.push(`/help/${e.target.value}`)}>{helpTopics.map(item => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label>{query.trim() ? <SearchResults query={query} onClear={() => setQuery("")} /> : <><h2 className="help-article-count">{items.length} articles</h2><div className="help-article-list">{items.map(item => <ArticleRow item={item} key={item.slug} />)}</div><ContactCard /></>}</div></div></main>;
}

export function ArticleFeedback() {
  const [choice, setChoice] = useState(null);
  return <section className="help-feedback" aria-label="Article feedback"><strong>Was this article helpful?</strong>{choice ? <span role="status">Thanks for your feedback.</span> : <div><button type="button" onClick={() => setChoice("yes")}>Yes</button><button type="button" onClick={() => setChoice("no")}>No</button></div>}</section>;
}
