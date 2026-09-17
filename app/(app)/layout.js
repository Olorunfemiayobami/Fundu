"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SideNav from "@/components/app-shell/SideNav";
import "@/styles/app-shell.css";

export default function AppLayout({ children }) {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Session check error:", error);
      }

      if (!session) {
        setAuthenticated(false);
        setCheckingAuth(false);

        router.replace("/signin");
        return;
      }

      setAuthenticated(true);
      setCheckingAuth(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "SIGNED_OUT" || !session) {
        setAuthenticated(false);
        router.replace("/signin");
        return;
      }

      setAuthenticated(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="app-auth-loading">
        <div className="app-auth-loading__spinner" />
        <p>Loading your Fundu account...</p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="app-shell">
      <SideNav />

      <div className="app-shell__content">
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  );
}
