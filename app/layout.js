import { Urbanist } from "next/font/google";
import "@/app/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    /* Added suppressHydrationWarning here to handle attributes injected by extensions */
    <html lang="en" suppressHydrationWarning={true}>
      <body className={urbanist.className} suppressHydrationWarning={true}>
        <Navbar />
        {/* Added wrapper to handle global padding and max-width */}
        <div className="main-page-wrapper">
          <main className="content-container">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
