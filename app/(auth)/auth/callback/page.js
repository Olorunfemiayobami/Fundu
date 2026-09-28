"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { TERMS_VERSION } from "@/lib/legalVersion";
import { legalAcceptanceRequest } from "@/lib/legalAcceptanceClient";
import "@/styles/auth.css";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handled = useRef(false);
  const completed = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const finishAuth = async () => {
      /*
        With Fundu's current browser Supabase client,
        Supabase automatically reads the authentication
        information returned in the URL and creates the session.
      */

      const requestedNext = searchParams.get("next") || "/dashboard";
      const next = requestedNext.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/dashboard";
      const complete = async () => {
        if (completed.current) return;
        completed.current = true;
        if (sessionStorage.getItem("fundu-google-signup-consent") === TERMS_VERSION) {
          try {
            await legalAcceptanceRequest("POST", { context: "signup" });
            sessionStorage.removeItem("fundu-google-signup-consent");
          } catch {
            router.replace("/accept-terms");
            return;
          }
        }
        router.replace(next);
        router.refresh();
      };

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Auth callback error:", sessionError);
        setError("We couldn't finish signing you in. Please try again.");
        return;
      }

      if (session) {
        await complete();
        return;
      }

      /*
        URL session detection can finish just after the page
        initializes, so listen briefly for the auth event.
      */

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, newSession) => {
        if (
          newSession &&
          (event === "SIGNED_IN" || event === "INITIAL_SESSION")
        ) {
          subscription.unsubscribe();
          void complete();
        }
      });

      const timeout = setTimeout(async () => {
        const {
          data: { session: finalSession },
        } = await supabase.auth.getSession();

        if (finalSession) {
          subscription.unsubscribe();
          await complete();
          return;
        }

        subscription.unsubscribe();
        setError("We couldn't finish signing you in. Please try again.");
      }, 4000);

      return () => {
        clearTimeout(timeout);
        subscription.unsubscribe();
      };
    };

    finishAuth();
  }, [router, searchParams]);

  return (
    <main className="auth auth-route is-open">
      <div className="authbg" aria-hidden="true">
        <video className="authbg__video" autoPlay muted loop playsInline>
          <source src="/auth-background.mp4" type="video/mp4" />
        </video>

        <div className="authbg__fallback" />
        <div className="authbg__scrim" />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "#fff",
          fontWeight: 700,
          textAlign: "center",
          padding: "24px",
        }}
      >
        {error ? (
          <>
            <p>{error}</p>

            <button
              type="button"
              onClick={() => router.replace("/signin")}
              style={{
                marginTop: "16px",
                cursor: "pointer",
              }}
            >
              Back to sign in
            </button>
          </>
        ) : (
          <p>Signing you in...</p>
        )}
      </div>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <AuthCallbackContent />
    </Suspense>
  );
}
