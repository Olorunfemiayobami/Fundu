"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import "@/styles/auth.css";

const TESTIMONIALS = [
  {
    quote:
      "We were raising for a new roof and I was tired of reading the same account number out after every service. Now I project one link, the ushers share it, and anybody who joined us last week can still read the whole story.",
    initials: "TO",
    name: "Pastor Tunde Olaniyan",
    role: "Redeemed Hope Assembly, Ibadan",
  },
  {
    quote:
      "I sent one link to my course group, my aunties and my church WhatsApp. Nobody had to ask me what it was for, and nobody had to ask for my account number twice.",
    initials: "AA",
    name: "Amarachi Anyanwu",
    role: "Final year, University of Nigeria, Nsukka",
  },
  {
    quote:
      "Our families are spread across three states. Instead of forwarding a flyer that kept losing its caption, we sent one page with our story, our pictures and where to send a gift.",
    initials: "KI",
    name: "Kunle and Ifeoma Bakare",
    role: "Married in Abeokuta, March",
  },
  {
    quote:
      "After the fire I needed money in the account that pays my suppliers, not in a wallet I have to apply to withdraw from. People transferred straight to me and I was buying stock the same week.",
    initials: "NE",
    name: "Ngozi Eze",
    role: "Founder, Ngozi's Provisions, Aba",
  },
  {
    quote:
      "Committee fundraising is really record keeping. Every contribution came straight to the set account, and the updates page meant I stopped answering the same question from thirty people.",
    initials: "OA",
    name: "Olumide Adeyinka",
    role: "Class of '04 Alumni Set, Lagos",
  },
  {
    quote:
      "When you are standing in a hospital corridor you cannot be explaining your situation over and over. I wrote it once, properly, and just kept sending the link.",
    initials: "BM",
    name: "Blessing Mark",
    role: "Her father's surgery, Enugu",
  },
  {
    quote:
      "For a first film nobody is giving you a grant. I put the idea, the budget and the pictures on one page, and the people who wanted to see it made sent what they could.",
    initials: "SO",
    name: "Seyi Ogunleye",
    role: "Filmmaker, Lagos",
  },
  {
    quote:
      "We run several appeals a year and donors always ask what happened to the last one. Now the updates live on the campaign, so the answer is a link instead of a phone call.",
    initials: "FI",
    name: "Dr Fatima Ibrahim",
    role: "Northern Light Outreach, Kaduna",
  },
];

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotePaused, setQuotePaused] = useState(false);

  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (quotePaused) return;

    const timer = setInterval(() => {
      setQuoteIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [quotePaused]);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((current) => {
        if (current <= 1) {
          clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email || resending || cooldown > 0) return;

    setResending(true);
    setMessage("");
    setError("");

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setResending(false);

    if (resendError) {
      setError(resendError.message);
      return;
    }

    setMessage("A new verification email has been sent.");
    setCooldown(60);
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <main className="auth auth-route is-open">
      <div className="authbg" aria-hidden="true">
        <video className="authbg__video" autoPlay muted loop playsInline>
          <source src="/auth-background.mp4" type="video/mp4" />
        </video>

        <div className="authbg__fallback" />
        <div className="authbg__scrim" />
      </div>

      <div className="authpanel">
        <button
          className="authclose"
          type="button"
          aria-label="Close"
          onClick={handleClose}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <aside
          className="authside"
          onMouseEnter={() => setQuotePaused(true)}
          onMouseLeave={() => setQuotePaused(false)}
        >
          <Link href="/" className="authside__logo" aria-label="Fundu home">
            <Image
              src="/logo.svg"
              alt="Fundu"
              width={110}
              height={32}
              priority
            />
          </Link>

          <div className="authside__stage">
            {TESTIMONIALS.map((testimonial, index) => {
              const active = index === quoteIndex;

              return (
                <figure
                  key={`${testimonial.name}-${index}`}
                  className={`quote ${active ? "is-live" : ""}`}
                  aria-hidden={!active}
                >
                  <span className="quote__mark" aria-hidden="true">
                    &ldquo;
                  </span>

                  <blockquote>
                    <p>{testimonial.quote}</p>
                  </blockquote>

                  <figcaption className="quote__who">
                    <span className="quote__badge" aria-hidden="true">
                      {testimonial.initials}
                    </span>

                    <span>
                      <span className="quote__name">{testimonial.name}</span>
                      <br />
                      <span className="quote__role">{testimonial.role}</span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="authdots" role="tablist" aria-label="Testimonials">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                key={`${testimonial.initials}-dot-${index}`}
                type="button"
                aria-label={`Testimonial ${index + 1}`}
                aria-current={index === quoteIndex ? "true" : undefined}
                onClick={() => setQuoteIndex(index)}
              />
            ))}
          </div>
        </aside>

        <div className="authform">
          <div className="authform__inner">
            <section className="authview is-active">
              <div className="authdone">
                <span className="authdone__tick" aria-hidden="true">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 7.5 12 13l9-5.5" />
                    <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  </svg>
                </span>

                <h2>Check your email</h2>

                <p className="small" style={{ marginInline: "auto" }}>
                  We sent you a verification link. Open the email and follow the
                  link to finish creating your Fundu account.
                </p>

                {email && (
                  <p className="authnote">
                    We sent the link to <strong>{email}</strong>.
                  </p>
                )}

                {message && (
                  <p className="authnote" role="status">
                    {message}
                  </p>
                )}

                {error && (
                  <div className="auth-server-error" role="alert">
                    {error}
                  </div>
                )}

                {email && (
                  <button
                    type="button"
                    className="btn btn--primary authsubmit"
                    onClick={handleResend}
                    disabled={resending || cooldown > 0}
                  >
                    <span>
                      {resending
                        ? "One moment"
                        : cooldown > 0
                          ? `Resend in ${cooldown}s`
                          : "Resend verification email"}
                    </span>
                  </button>
                )}

                <p className="authswap">
                  <Link className="authlink" href="/signin">
                    Back to sign in
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
