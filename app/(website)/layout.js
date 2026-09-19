import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./marketing.css";

export default function WebsiteLayout({ children }) {
  return (
    <div className="marketing-shell">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
