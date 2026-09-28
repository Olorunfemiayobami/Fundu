"use client";

import { FirstLoadSplash } from "@/components/feedback/LoadingScreen";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { legalAcceptanceRequest } from "@/lib/legalAcceptanceClient";
import SideNav from "@/components/app-shell/SideNav";
import "@/styles/app-shell.css";

export default function AppLayout({ children }) {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [accessError, setAccessError] = useState("");

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

      try {
        const result = await legalAcceptanceRequest("GET");
        if (!mounted) return;
        if (!result.accepted) {
          router.replace("/accept-terms");
          return;
        }
        setAccessError("");
        setAuthenticated(true);
      } catch (cause) {
        if (!mounted) return;
        setAccessError(cause.message || "Could not check Terms acceptance.");
      } finally {
        if (mounted) setCheckingAuth(false);
      }
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

      if (event === "SIGNED_IN") {
        void legalAcceptanceRequest("GET").then((result) => {
          if (!mounted) return;
          if (!result.accepted) router.replace("/accept-terms");
          else { setAccessError(""); setAuthenticated(true); }
        }).catch((cause) => {
          if (mounted) setAccessError(cause.message || "Could not check Terms acceptance.");
        });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (checkingAuth) {
    return (
      <FirstLoadSplash />
    );
  }

  if (!authenticated) {
    return accessError ? <div role="alert" style={{ padding: 32 }}><p>{accessError}</p><button type="button" onClick={() => window.location.reload()}>Try again</button></div> : null;
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
