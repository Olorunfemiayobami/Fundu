"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "@/styles/auth.module.css";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const fullName = formData.get("fullName");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/verify-email");
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div style={{ fontWeight: "bold", fontSize: "24px" }}>Fundu</div>
        <div>
          <h1 className={styles.mainHeading}>
            Raise funds.
            <br />
            Change lives.
          </h1>
          <p style={{ fontSize: "18px", opacity: 0.9 }}>
            Join thousands of Nigerians creating campaigns.
          </p>
        </div>
        <p>© 2026 Fundu</p>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <h2
            style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}
          >
            Create account
          </h2>
          <p style={{ color: "#6B7280", marginBottom: "32px" }}>
            Start raising funds in minutes
          </p>

          <form onSubmit={handleSignup}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <input
                name="fullName"
                placeholder="Full Name"
                className={styles.input}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className={styles.input}
                required
              />
            </div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={styles.input}
              required
            />

            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className={styles.divider}>
            <span>or</span>
          </div>
          <button type="button" className={styles.btnGoogle}>
            Continue with Google
          </button>

          <p
            style={{ textAlign: "center", marginTop: "24px", color: "#6B7280" }}
          >
            Already have an account?{" "}
            <Link
              href="/signin"
              style={{ color: "#1E807F", fontWeight: "bold" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
