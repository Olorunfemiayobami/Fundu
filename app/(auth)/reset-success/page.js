"use client";
import Link from "next/link";
import styles from "@/styles/auth.module.css";

export default function ResetSuccessPage() {
  return (
    <div
      className={styles.container}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <div className={styles.formWrapper} style={{ textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
        <h2
          style={{ fontSize: "32px", fontWeight: "800", marginBottom: "12px" }}
        >
          Password Reset
        </h2>
        <p
          style={{ color: "#6B7280", lineHeight: "1.6", marginBottom: "32px" }}
        >
          Your password has been successfully updated. you can now sign in with
          your new credentials.
        </p>
        <Link
          href="/signin"
          className={styles.btnPrimary}
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            textDecoration: "none",
          }}
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  );
}
