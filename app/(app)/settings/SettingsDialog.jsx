"use client";

import { useEffect, useRef } from "react";

export default function SettingsDialog({ title, description, busy = false, onClose, children, footer, className = "", icon, eyebrow }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  const busyRef = useRef(busy);
  useEffect(() => { closeRef.current = onClose; busyRef.current = busy; }, [onClose, busy]);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function controls() { return Array.from(dialogRef.current?.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href], select:not(:disabled), textarea:not(:disabled), [tabindex="0"]') || []); }
    (dialogRef.current?.querySelector("[data-initial-focus]") || controls()[0] || dialogRef.current)?.focus();
    function keydown(event) {
      if (event.key === "Escape") { event.preventDefault(); if (!busyRef.current) closeRef.current(); }
      if (event.key !== "Tab") return;
      const items = controls();
      if (!items.length) { event.preventDefault(); dialogRef.current?.focus(); return; }
      if (event.shiftKey && (document.activeElement === items[0] || document.activeElement === dialogRef.current)) { event.preventDefault(); items.at(-1).focus(); }
      else if (!event.shiftKey && (document.activeElement === items.at(-1) || document.activeElement === dialogRef.current)) { event.preventDefault(); items[0].focus(); }
    }
    function containFocus(event) { if (!dialogRef.current?.contains(event.target)) (controls()[0] || dialogRef.current)?.focus(); }
    document.addEventListener("keydown", keydown); document.addEventListener("focusin", containFocus);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", keydown); document.removeEventListener("focusin", containFocus); if (previousFocus?.isConnected) previousFocus.focus(); };
  }, []);
  return <div className="settings-dialog-overlay"><section ref={dialogRef} className={`settings-dialog ${className}`} role="dialog" aria-modal="true" aria-labelledby="settings-dialog-title" aria-describedby={description ? "settings-dialog-description" : undefined} aria-busy={busy} tabIndex={-1}><header>{icon}<div>{eyebrow && <p className="settings-dialog-eyebrow">{eyebrow}</p>}<h2 id="settings-dialog-title">{title}</h2>{description && <p id="settings-dialog-description">{description}</p>}</div></header>{children}<footer>{footer}</footer></section></div>;
}
