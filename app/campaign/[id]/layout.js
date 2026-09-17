"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import SideNav from "@/components/app-shell/SideNav";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "@/styles/app-shell.css";

export default function CampaignPublicLayout({ children }) {
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (error) {
        console.error("Campaign session check error:", error);
      }

      setUser(session?.user || null);

      setCheckingAuth(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) {
        return;
      }

      setUser(session?.user || null);

      setCheckingAuth(false);
    });

    return () => {
      mounted = false;

      subscription.unsubscribe();
    };
  }, []);

  /*
   * =========================================================
   * CHECKING SESSION
   * =========================================================
   */

  if (checkingAuth) {
    return (
      <div className="app-auth-loading">
        <div className="app-auth-loading__spinner" />

        <p>Loading campaign...</p>
      </div>
    );
  }

  /*
   * =========================================================
   * LOGGED-IN VIEW
   *
   * Uses the exact same shell as app/(app)/layout.js
   * =========================================================
   */

  if (user) {
    return (
      <div className="app-shell">
        <SideNav />

        <div className="app-shell__content">
          <main className="app-shell__main">{children}</main>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * NOT LOGGED-IN VIEW
   *
   * Uses the exact same navbar/footer as app/(website)
   * =========================================================
   */

  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}
