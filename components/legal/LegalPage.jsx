import Link from "next/link";
import content from "@/lib/legalContent.json";
import LegalContents from "./LegalContents";
import "@/styles/legal-pages.css";

const CONTACT = "funduhelp@gmail.com";

const summaryIcons = {
  support: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  organizer: <><circle cx="12" cy="8" r="3" /><path d="M5 20c0-4 3-6 7-6s7 2 7 6" /></>,
  totals: <><circle cx="12" cy="12" r="9" /><path d="M8 12h8M12 8v8" /></>,
  hosting: <><path d="m5 12 4 4L19 6" /></>,
  public: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18" /></>,
};

function SummaryIcon({ name }) {
  return <span className="legal-summary-icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{summaryIcons[name]}</svg></span>;
}

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|funduhelp@gmail\.com)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <Link key={index} href={link[2]}>{link[1]}</Link>;
    if (part === CONTACT) return <a key={index} href={`mailto:${CONTACT}`}>{CONTACT}</a>;
    return part;
  });
}

function blocks(lines) {
  const output = [];
  for (let index = 0; index < lines.length;) {
    if (!lines[index].trim()) { index++; continue; }
    if (lines[index].startsWith("##### ")) {
      output.push({ type: "subheading", text: lines[index].slice(6) }); index++; continue;
    }
    if (lines[index].startsWith("- ")) {
      const items = [];
      while (index < lines.length && lines[index].startsWith("- ")) items.push(lines[index++].slice(2));
      output.push({ type: "list", items }); continue;
    }
    const paragraph = [];
    while (index < lines.length && lines[index].trim() && !lines[index].startsWith("##### ") && !lines[index].startsWith("- ")) paragraph.push(lines[index++]);
    output.push({ type: "paragraph", text: paragraph.join(" ") });
  }
  return output;
}

function parseDocument(markdown, prefix) {
  const lines = markdown.split(/\r?\n/);
  const date = lines.shift()?.match(/^\*\*Last updated:\*\* (.+)$/)?.[1];
  const intro = [];
  while (lines.length && !lines[0].startsWith("#### The short version")) intro.push(lines.shift());
  lines.shift();
  const summary = [];
  while (lines.length && !/^#### 1\. /.test(lines[0])) summary.push(lines.shift());
  const sections = [];
  let current;
  for (const line of lines) {
    const heading = line.match(/^#### (\d+)\. (.+)$/);
    if (heading) {
      current = { id: `${prefix}${heading[1]}`, number: heading[1], title: heading[2], lines: [] };
      sections.push(current);
    } else if (current && line !== "---") current.lines.push(line);
  }
  return { date, intro: blocks(intro), summary: blocks(summary), sections: sections.map(({ lines: body, ...section }) => ({ ...section, blocks: blocks(body) })) };
}

function renderBlocks(items, contact = false) {
  return items.map((block, index) => {
    if (block.type === "subheading") return <h3 key={index}>{block.text}</h3>;
    if (block.type === "list") return <ul key={index} className={contact ? "legal-contact-list" : undefined}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>;
    return <p key={index}>{inline(block.text)}</p>;
  });
}

export default function LegalPage({ kind }) {
  const isTerms = kind === "terms";
  const title = isTerms ? "Terms of Service" : "Privacy Policy";
  const document = parseDocument(content[kind].join("\n"), isTerms ? "t" : "p");
  const summaryList = document.summary.find((item) => item.type === "list")?.items || [];
  const summaryNote = document.summary.find((item) => item.type === "paragraph")?.text;
  const privacyMeta = !isTerms && document.intro.find((item) => item.type === "list");

  return <main className="legal-page" id="top">
    <header className="legal-intro">
      <span className="legal-eyebrow">Legal</span>
      <h1>{title}</h1>
      <p className="legal-date">Last updated: {document.date}</p>
      {renderBlocks(document.intro.filter((item) => item !== privacyMeta))}
      {privacyMeta && renderBlocks([privacyMeta], true)}
    </header>
    <aside className="legal-summary" aria-label="The short version">
      <h2>The short version</h2>
      <div className="legal-summary-grid">
        {(isTerms ? summaryList : summaryList.slice(0, 2)).map((item, index) => <div className="legal-summary-card" key={index}><SummaryIcon name={isTerms ? ["support", "organizer", "totals", "hosting"][index] : ["public", "organizer"][index]} /><p>{inline(item)}</p></div>)}
      </div>
      {!isTerms && summaryList[2] && <p className="legal-summary-private">{inline(summaryList[2])}</p>}
      {summaryNote && <p className="legal-summary-note">{inline(summaryNote)}</p>}
    </aside>
    <div className="legal-body-layout">
      <LegalContents sections={document.sections.map(({ id, number, title: heading }) => ({ id, title: `${number}. ${heading}` }))} />
      <div className="legal-sections">{document.sections.map((section) => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}>
        <h2 id={`${section.id}-heading`}><span>{section.number}.</span> {section.title}</h2>
        {renderBlocks(section.blocks, (isTerms && section.number === "22") || (!isTerms && section.number === "15"))}
      </section>)}<a className="legal-back-top" href="#top">Back to top ↑</a></div>
    </div>
  </main>;
}
