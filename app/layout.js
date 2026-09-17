import { Urbanist } from "next/font/google";
import "@/app/globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={urbanist.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
