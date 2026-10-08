import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function WebsiteLayout({ children }) {
  return (
    <div className="marketing-shell">
      <Navbar />
      <div id="main-content" tabIndex={-1}>{children}</div>
      <Footer />
    </div>
  );
}
