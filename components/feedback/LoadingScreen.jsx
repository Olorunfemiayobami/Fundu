import Link from "next/link";
import Image from "next/image";

function Block({ className = "", style }) {
  return <span className={`fundu-skeleton-block ${className}`} style={style} />;
}

function Card() {
  return <div className="fundu-skeleton-card">
    <Block className="fundu-skeleton-cover" />
    <Block style={{ width: "70%", height: 16 }} />
    <Block style={{ width: "45%", height: 12 }} />
    <Block style={{ width: "55%", height: 20 }} />
    <Block style={{ height: 6 }} />
    <Block style={{ width: "80%", height: 12 }} />
    <div className="fundu-skeleton-actions"><Block /><Block /></div>
  </div>;
}

export function FirstLoadSplash() {
  return <div className="fundu-splash" role="status" aria-live="polite" aria-label="Loading Fundu">
    <div aria-hidden="true">
      <Image src="/logo.svg" width={120} height={35} alt="" priority />
      <div className="fundu-splash-track"><span /></div>
      <p>Give every goal a place of its own.</p>
    </div>
    <span className="fundu-feedback-sr">Loading Fundu…</span>
  </div>;
}

export default function LoadingScreen({ variant = "dashboard", label = "Loading content", compact = false }) {
  const cards = variant === "cards" || variant === "dashboard";
  return <section className={`fundu-loading fundu-loading--${variant}${compact ? " fundu-loading--compact" : ""}`} aria-busy="true" aria-label={label}>
    <span className="fundu-feedback-sr" role="status">{label}…</span>
    <div className="fundu-loading-bar" aria-hidden="true"><span /></div>
    <div aria-hidden="true" className="fundu-loading-body">
      {!compact && <div className="fundu-skeleton-heading"><div><Block className="fundu-skeleton-title" /><Block className="fundu-skeleton-subtitle" /></div><Block className="fundu-skeleton-header-button" /></div>}
      {variant === "dashboard" && <>
        <Block className="fundu-skeleton-section-title" />
        <div className="fundu-skeleton-stats">{[0, 1, 2, 3].map(n => <div key={n}><Block style={{ width: "55%", height: 12 }} /><Block style={{ width: "75%", height: 28 }} /><Block style={{ width: "65%", height: 12 }} /></div>)}</div>
        <Block className="fundu-skeleton-banner" /><div className="fundu-skeleton-mobile-stats"><Block /><Block /></div>
        <Block className="fundu-skeleton-section-title" />
      </>}
      {cards ? <div className="fundu-skeleton-grid">{[0, 1, 2].map(n => <Card key={n} />)}</div> : variant === "detail" ? <div className="fundu-skeleton-detail"><div><Block className="fundu-skeleton-detail-cover" /><Block className="fundu-skeleton-banner" /><Block style={{ width: "80%", height: 16 }} /><Block style={{ width: "90%", height: 16 }} /><Block style={{ width: "65%", height: 16 }} /></div><div><Block style={{ height: 280 }} /><Block style={{ height: 150 }} /></div></div> : <div className="fundu-skeleton-list">{[0, 1, 2, 3, 4].map(n => <div key={n}><Block style={{ width: 36, height: 36 }} /><div><Block style={{ width: "75%", height: 16 }} /><Block style={{ width: "45%", height: 12 }} /></div></div>)}</div>}
    </div>
  </section>;
}

export function NotFoundScreen({ chrome = false, homeHref = "/", exploreHref = "/webexplore" }) {
  return <div className={`fundu-not-found${chrome ? " fundu-not-found--full" : ""}`}>
    {chrome && <header className="fundu-error-header"><Link href="/" aria-label="Fundu home"><Image src="/logo.svg" width={60} height={18} alt="Fundu" /></Link><nav aria-label="Public navigation"><Link href="/webexplore">Explore campaigns</Link><Link href="/how-it-works">How it works</Link></nav><Link className="fundu-error-button fundu-error-button--primary" href="/create-campaign">Start a fundraiser</Link></header>}
    <div className="fundu-error-content">
      <div className="fundu-error-number" aria-hidden="true">4<span>0</span>4</div>
      <h1><span className="fundu-feedback-sr">404: </span>This page doesn’t have a place here</h1>
      <p>The link may be mistyped, or the page may have moved. If you followed a campaign link, the campaign may have been removed or been made private by its organizer.</p>
      <div className="fundu-error-actions"><Link className="fundu-error-button fundu-error-button--primary" href={homeHref}>Go to homepage</Link><Link className="fundu-error-button" href={exploreHref}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></svg>Explore campaigns</Link></div>
      <p className="fundu-error-help">Still stuck? <Link href="/how-it-works">Visit Help</Link></p>
    </div>
    {chrome && <footer className="fundu-error-footer"><div><Image src="/logo.svg" width={60} height={18} alt="Fundu" /><p>Give every goal a place of its own.</p></div><nav aria-label="Footer navigation"><Link href="/webexplore">Explore</Link><Link href="/create-campaign">Start a fundraiser</Link><Link href="/how-it-works">Help</Link></nav></footer>}
  </div>;
}
