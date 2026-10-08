"use client";

/* Contact page form: the approved design's markup and classes, sending through
   the same Formspree submission as the Help Centre form (lib/contactMessage.js).
   "Message sent" appears only after Formspree confirms the request. */

import { useEffect, useRef, useState } from "react";
import { emptyContactMessage, sendContactMessage, validateContactMessage } from "@/lib/contactMessage";

const TOPICS = [
  "Starting or managing a page",
  "Receiving money",
  "A page I’m worried about",
  "My account",
  "Pricing",
  "Partnerships or press",
  "Something else",
];

const REQUIRED_MESSAGE = "Please add your name, a valid email, a topic and your message.";
const SEND_FAILED = "We couldn’t send your message. Everything you wrote is still here. Check your connection and try again.";
const ORDER = ["name", "email", "topic", "campaign", "message"];

/* One line under the form, as in the design: the general prompt when something
   required is missing, otherwise the specific problem. */
function summary(errors) {
  const missing = (errors.name || errors.topic || errors.email === "Enter your email address so we can reply." || errors.message === "Tell us what’s happening.");
  if (missing) return REQUIRED_MESSAGE;
  const first = ORDER.find((key) => errors[key]);
  return first ? errors[first] : "";
}

export default function ContactForm() {
  const [fields, setFields] = useState(emptyContactMessage);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | error | sent
  const inputRefs = useRef({});
  const sentHeading = useRef(null);

  useEffect(() => {
    if (status === "sent") sentHeading.current?.focus();
  }, [status]);

  function update(field, value) {
    const next = { ...fields, [field]: value };
    setFields(next);
    if (attempted) setErrors(validateContactMessage(next));
  }

  async function send(event) {
    event.preventDefault();
    if (status === "sending") return;
    setAttempted(true);
    const nextErrors = validateContactMessage(fields);
    setErrors(nextErrors);
    const firstError = ORDER.find((key) => nextErrors[key]);
    if (firstError) {
      inputRefs.current[firstError]?.focus();
      return;
    }

    setStatus("sending");
    try {
      await sendContactMessage(fields);
      setStatus("sent");
      setFields(emptyContactMessage);
      setErrors({});
      setAttempted(false);
    } catch {
      setStatus("error");
    }
  }

  const invalid = (key) => (errors[key] ? "true" : undefined);
  const note = status === "error" ? SEND_FAILED : summary(errors);
  const sending = status === "sending";

  if (status === "sent") {
    return (
      <div className="hsent" id="csent" role="status">
        <svg className="hs-ic" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
        <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
        </svg>
        <h2 ref={sentHeading} tabIndex={-1}>Message sent</h2>
        <p>Thanks for getting in touch. We’ll reply to your email as soon as we can.</p>
        <button type="button" className="fs-btn btn-ghost" id="cAgain" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form id="cform" noValidate onSubmit={send} aria-busy={sending || undefined}>
      <h2>Send us a message</h2>
      <div className="ct-row">
        <label>
          Your name
          <input ref={(node) => { inputRefs.current.name = node; }} name="name" required autoComplete="name" value={fields.name} onChange={(e) => update("name", e.target.value)} aria-invalid={invalid("name")} aria-describedby={note ? "cErr" : undefined} />
        </label>
        <label>
          Email address
          <input ref={(node) => { inputRefs.current.email = node; }} name="email" type="email" required autoComplete="email" value={fields.email} onChange={(e) => update("email", e.target.value)} aria-invalid={invalid("email")} aria-describedby={note ? "cErr" : undefined} />
        </label>
      </div>
      <label>
        What’s it about?
        <select ref={(node) => { inputRefs.current.topic = node; }} name="topic" required value={fields.topic} onChange={(e) => update("topic", e.target.value)} aria-invalid={invalid("topic")} aria-describedby={note ? "cErr" : undefined}>
          <option value="">Choose a topic</option>
          {TOPICS.map((topic) => <option key={topic}>{topic}</option>)}
        </select>
      </label>
      <label>
        <span>Page link <span className="opt">(optional)</span></span>
        <input ref={(node) => { inputRefs.current.campaign = node; }} name="link" type="url" inputMode="url" placeholder="https://" value={fields.campaign} onChange={(e) => update("campaign", e.target.value)} aria-invalid={invalid("campaign")} aria-describedby={note ? "cErr" : undefined} />
      </label>
      <label>
        Message
        <textarea ref={(node) => { inputRefs.current.message = node; }} name="msg" rows="6" required placeholder="Tell us what’s happening, and anything you’ve already tried." value={fields.message} onChange={(e) => update("message", e.target.value)} aria-invalid={invalid("message")} aria-describedby={note ? "cErr" : undefined} />
      </label>
      <p className="hf-err" id="cErr" role="alert" hidden={!note}>{note}</p>
      <div className="ct-actions">
        <button className="fs-btn btn-primary" type="submit" disabled={sending}>
          {sending ? <span className="ct-spin" aria-hidden="true" /> : (
            <svg className="b-ic" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M223.69,42.18l-58.22,192a8,8,0,0,1-14.92,1.25L108,148,20.58,105.45a8,8,0,0,1,1.25-14.92l192-58.22A8,8,0,0,1,223.69,42.18Z" opacity="0.2" />
            <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z" />
            </svg>
          )}
          {sending ? "Sending…" : status === "error" ? "Try again" : "Send message"}
        </button>
        <span className="ct-note">
          <svg className="ct-ni" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M216,96V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H208A8,8,0,0,1,216,96Z" opacity="0.2" />
          <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z" />
          </svg>
          We only use your details to reply to you.
        </span>
      </div>
    </form>
  );
}
