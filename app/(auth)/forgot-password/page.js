"use client";
import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "@/styles/auth.module.css";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = new FormData(e.target).get("email");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) alert(error.message);
    else setSent(true);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div style={{ fontWeight: "bold", fontSize: "24px" }}>Fundu</div>
        <h1 className={styles.mainHeading}>
          No worries,
          <br />
          we've got you.
        </h1>
        <p>© 2026 Fundu</p>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <h2
            style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}
          >
            Reset Password
          </h2>
          {sent ? (
            <p style={{ color: "#1E807F", fontWeight: "bold" }}>
              Check your email for the reset link!
            </p>
          ) : (
            <>
              <p style={{ color: "#6B7280", marginBottom: "32px" }}>
                Enter your email and we'll send you a link to reset your
                password.
              </p>
              <form onSubmit={handleReset}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className={styles.input}
                  required
                />
                <button
                  type="submit"
                  className={styles.btnPrimary}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
          <p style={{ textAlign: "center", marginTop: "24px" }}>
            <Link
              href="/signin"
              style={{ color: "#1E807F", fontWeight: "bold" }}
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
