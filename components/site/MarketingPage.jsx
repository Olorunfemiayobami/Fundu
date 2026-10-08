import SiteScripts from "./SiteScripts";
import { SITE_ROOT_CSS } from "./rootCss";
import "@/app/(website)/site.css";

// Only the new marketing content uses the design's styles and motion.
// The shared public layout owns the navbar and footer.
export default function MarketingPage({ children }) {
  return (
    <div className="fundu-site">
      <style dangerouslySetInnerHTML={{ __html: SITE_ROOT_CSS }} />
      {children}
      <SiteScripts />
    </div>
  );
}
