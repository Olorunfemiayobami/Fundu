"use client";

import { useEffect, useId, useRef } from "react";
import "@/styles/action-dialog.css";

export function ActionIcon({ name, className = "" }) {
  return <span aria-hidden="true" className={`action-icon action-icon--${name} ${className}`} />;
}

export default function ActionDialog({ title, description, icon = "trash", tone = "danger", open, busy = false, error, safeLabel = "Cancel", actionLabel, busyLabel, onClose, onAction, actionDisabled = false, children, success = false }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const safeRef = useRef(null);
  const openerRef = useRef(null);
  const closeRef = useRef(onClose);
  const busyRef = useRef(busy);
  useEffect(() => { closeRef.current = onClose; busyRef.current = busy; }, [onClose, busy]);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => safeRef.current?.focus());
    function onKeyDown(event) {
      if (event.key === "Escape") {
        if (!busyRef.current) { event.preventDefault(); closeRef.current?.(); }
        return;
      }
      if (event.key !== "Tab") return;
      const items = [...(dialogRef.current?.querySelectorAll('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href]') || [])];
      if (!items.length) { event.preventDefault(); dialogRef.current?.focus(); return; }
      const first = items[0], last = items[items.length - 1];
      if (!dialogRef.current?.contains(document.activeElement)) { event.preventDefault(); (event.shiftKey ? last : first).focus(); return; }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); openerRef.current?.focus?.(); };
  }, [open]);

  if (!open) return null;
  return <div className="action-dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget && !busy) onClose?.(); }}>
    <div className="action-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={dialogRef} tabIndex={-1}>
      <div className="action-dialog-grab" aria-hidden="true" />
      <div className="action-dialog-main">
        <div className="action-dialog-heading"><span className={`action-dialog-chip action-dialog-chip--${tone}`}><ActionIcon name={icon} /></span><div><h2 id={titleId}>{title}</h2>{description && <p>{description}</p>}</div><button type="button" className="action-dialog-close" aria-label="Close" disabled={busy} onClick={onClose}><ActionIcon name="x" /></button></div>
        {error && <p className="action-dialog-error" role="alert"><ActionIcon name="alert" />{error}</p>}
        {children}
      </div>
      <div className="action-dialog-actions">
        {!success && <button type="button" className="action-dialog-safe" ref={safeRef} disabled={busy} onClick={onClose}>{safeLabel}</button>}
        <button type="button" className={`action-dialog-action action-dialog-action--${tone}`} ref={success ? safeRef : undefined} disabled={busy || actionDisabled} onClick={onAction}>{busy && <span className="action-dialog-spinner" aria-hidden="true" />}{busy ? busyLabel : actionLabel}</button>
      </div>
    </div>
  </div>;
}
