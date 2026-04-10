import "../globals.css"; // This goes up one level from (auth) to find the file in app/
export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-urbanist bg-white">
        <main>{children}</main>
      </body>
    </html>
  );
}
