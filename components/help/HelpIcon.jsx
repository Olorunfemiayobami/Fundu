const iconNames = new Set(["alert", "back", "bank", "bulb", "ccircle", "chev", "chevr", "clock", "folder", "info", "plus", "search", "share", "user"]);

export default function HelpIcon({ name, className = "" }) {
  if (!iconNames.has(name)) return null;
  const path = `/icons/help/${name}.svg`;
  return <span aria-hidden="true" className={`help-icon ${className}`} style={{ maskImage: `url(${path})`, WebkitMaskImage: `url(${path})` }} />;
}
