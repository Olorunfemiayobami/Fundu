"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; //
import styles from "@/styles/auth.module.css";

export default function SigninPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard"); // Redirect to your Fundu dashboard
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div style={{ fontWeight: "bold", fontSize: "24px" }}>Fundu</div>
        <div>
          <h1 className={styles.mainHeading}>Welcome back.</h1>
          <p style={{ fontSize: "18px", opacity: 0.8 }}>
            Continue your journey in making an impact.
          </p>
        </div>
        <p>© 2026 Fundu</p>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <h2
            style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}
          >
            Sign In
          </h2>
          <p style={{ color: "#6B7280", marginBottom: "32px" }}>
            Enter your details to access your account
          </p>

          <form onSubmit={handleSignin}>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className={styles.input}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={styles.input}
              required
            />

            <div style={{ textAlign: "right", marginBottom: "20px" }}>
              <Link
                href="/forgot-password"
                style={{
                  color: "#1E807F",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
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
            Don't have an account?{" "}
            <Link
              href="/signup"
              style={{ color: "#1E807F", fontWeight: "bold" }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
