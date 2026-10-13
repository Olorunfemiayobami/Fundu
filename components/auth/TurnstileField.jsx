"use client";

import { useEffect, useRef, useState } from "react";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
let scriptPromise;

function loadScript() {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Could not load verification."));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export default function TurnstileField({ onToken, resetKey = 0 }) {
  const host = useRef(null);
  const callback = useRef(onToken);
  const widget = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => { callback.current = onToken; }, [onToken]);

  useEffect(() => {
    if (!siteKey) return;
    let live = true;
    loadScript().then(() => {
      if (!live || !host.current || !window.turnstile) return;
      widget.current = window.turnstile.render(host.current, {
        sitekey: siteKey,
        size: "flexible",
        theme: "auto",
        callback: (token) => { setError(""); callback.current?.(token); },
        "expired-callback": () => callback.current?.(""),
        "error-callback": () => { callback.current?.(""); setError("Verification could not load. Try again."); },
      });
    }).catch(() => { if (live) setError("Verification could not load. Refresh and try again."); });
    return () => {
      live = false;
      if (widget.current !== null && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, []);

  useEffect(() => {
    if (resetKey && widget.current !== null && window.turnstile) {
      callback.current?.("");
      window.turnstile.reset(widget.current);
    }
  }, [resetKey]);

  if (!siteKey) return null;
  return <div className="fundu-turnstile"><div ref={host} />{error && <p role="alert" className="fundu-turnstile-error">{error}</p>}</div>;
}
