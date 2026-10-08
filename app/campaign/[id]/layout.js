"use client";

import { FirstLoadSplash } from "@/components/feedback/LoadingScreen";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import SideNav from "@/components/app-shell/SideNav";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "@/styles/app-shell.css";
import "./campaign-public.css";

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
      <FirstLoadSplash />
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
      <div className="app-shell pc-app-shell">
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
    <div className="pc-website">
      <Navbar />

      <main id="main-content" tabIndex={-1}>{children}</main>

      <Footer />
    </div>
  );
}
