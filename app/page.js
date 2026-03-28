import Link from "next/link";
import Footer from "../components/layout/Footer";
import "./globals.css"; // Fixed path: globals.css is in the same folder as this file

export default function LandingPage() {
  return (
    <div
      className="landing-page"
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "800",
            color: "#111",
            maxWidth: "800px",
            marginBottom: "24px",
          }}
        >
          Simple, efficient solution to campaign hosting
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#666",
            maxWidth: "600px",
            marginBottom: "40px",
          }}
        >
          Fundu helps you manage your crowdfunding campaigns with transparency
          and ease.
        </p>

        <Link href="/dashboard">
          <button
            className="nav-btn-primary"
            style={{
              padding: "16px 32px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Enter Webapp
          </button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
