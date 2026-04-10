"use client";
import styles from "@/styles/auth.module.css";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div
      className={styles.container}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <div className={styles.formWrapper} style={{ textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>✉️</div>
        <h2
          style={{ fontSize: "32px", fontWeight: "800", marginBottom: "12px" }}
        >
          Check your email
        </h2>
        <p
          style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "32px" }}
        >
          We've sent a verification link to your email address. Please click the
          link to activate your account.
        </p>
        <Link
          href="/signin"
          className={styles.btnPrimary}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          Return to Sign In
        </Link>
      </div>
    </div>
  );
}
