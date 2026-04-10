"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "@/styles/auth.module.css";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const password = new FormData(e.target).get("password");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      alert(error.message);
    } else {
      router.push("/reset-success");
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div style={{ fontWeight: "bold", fontSize: "24px" }}>Fundu</div>
        <h1 className={styles.mainHeading}>
          Secure your
          <br />
          account.
        </h1>
        <p>© 2026 Fundu</p>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <h2
            style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}
          >
            New Password
          </h2>
          <p style={{ color: "#6B7280", marginBottom: "32px" }}>
            Please enter your new secure password below.
          </p>

          <form onSubmit={handleUpdatePassword}>
            <input
              name="password"
              type="password"
              placeholder="New Password"
              className={styles.input}
              required
            />
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
