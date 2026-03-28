import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"; //

// We initialize the font here
const urbanist = Urbanist({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // All weights from your Figma
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <Navbar />
        <main>{children}</main>
        {/* Global Footer appears on every page */}
        <Footer /> 
      </body>
    </html>
  );
}