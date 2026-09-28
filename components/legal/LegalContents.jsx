"use client";

import { useEffect, useState } from "react";

export default function LegalContents({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px" },
    );
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [sections]);

  const items = <ol>{sections.map(({ id, title }) => <li key={id}><a href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setActive(id)}>{title}</a></li>)}</ol>;

  return <>
    <nav className="legal-contents-desktop" aria-label="Contents"><p>Contents</p>{items}</nav>
    <details className="legal-contents-mobile"><summary>Contents <span>{sections.length} sections</span></summary><nav aria-label="Contents">{items}</nav></details>
  </>;
}
