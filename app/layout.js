import { Urbanist, Montserrat_Alternates } from "next/font/google";
import "@/app/globals.css";
import "@/styles/feedback.css";
import "@/app/(website)/marketing.css";
import "@/styles/website-typography.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-urbanist",
});

// Change the heading font here to update every shared display style.
const heading = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${heading.variable}`}
      suppressHydrationWarning
    >
      <body className={urbanist.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
