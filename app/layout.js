import { Urbanist, Bricolage_Grotesque } from "next/font/google";
import "@/app/globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-urbanist",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-bricolage",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <body className={urbanist.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
