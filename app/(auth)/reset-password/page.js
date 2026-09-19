"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quotePaused, setQuotePaused] = useState(false);

  useEffect(() => {
    if (quotePaused) return;

    const timer = setInterval(() => {
      setQuoteIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [quotePaused]);

  const validateForm = () => {
    const nextErrors = {
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (password.length < 8) {
      nextErrors.password = "Use at least 8 characters.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your new password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "The passwords don't match.";
    }

    setErrors(nextErrors);

    return !nextErrors.password && !nextErrors.confirmPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setErrors({
      password: "",
      confirmPassword: "",
      general: "",
    });

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setErrors((current) => ({
        ...current,
        general: error.message,
      }));

      return;
    }

    setComplete(true);
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <main className="auth auth-route is-open">
      {/* Background video */}
      <div className="authbg" aria-hidden="true">
        <video className="authbg__video" autoPlay muted loop playsInline>
          <source src="/auth-background.mp4" type="video/mp4" />
        </video>

        <div className="authbg__fallback" />
        <div className="authbg__scrim" />
      </div>

      <div className="authpanel">
        {/* Close */}
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

        {/* Left testimonial panel */}
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

        {/* Right panel */}
        <div className="authform">
          <div className="authform__inner">
            <section className="authview is-active">
              {!complete ? (
                <>
                  <h2>Set a new password</h2>

                  <p className="small">
                    Choose a new password for your Fundu account.
                  </p>

                  {errors.general && (
                    <div className="auth-server-error" role="alert">
                      {errors.general}
                    </div>
                  )}

                  <form noValidate onSubmit={handleSubmit}>
                    {/* New password */}
                    <div className="field">
                      <label htmlFor="newPassword">New password</label>

                      <div className="field__wrap">
                        <input
                          id="newPassword"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="At least 8 characters"
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);

                            setErrors((current) => ({
                              ...current,
                              password: "",
                              general: "",
                            }));
                          }}
                          aria-invalid={errors.password ? "true" : "false"}
                        />

                        <button
                          type="button"
                          className="field__peek"
                          onClick={() => setShowPassword((current) => !current)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>

                      <p
                        className={`field__err ${
                          errors.password ? "is-shown" : ""
                        }`}
                      >
                        {errors.password || "Use at least 8 characters."}
                      </p>

                      <p className="field__hint">
                        Mix in a number or a symbol to make it harder to guess.
                      </p>
                    </div>

                    {/* Confirm password */}
                    <div className="field">
                      <label htmlFor="confirmPassword">
                        Confirm new password
                      </label>

                      <div className="field__wrap">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="Enter your password again"
                          value={confirmPassword}
                          onChange={(event) => {
                            setConfirmPassword(event.target.value);

                            setErrors((current) => ({
                              ...current,
                              confirmPassword: "",
                              general: "",
                            }));
                          }}
                          aria-invalid={
                            errors.confirmPassword ? "true" : "false"
                          }
                        />

                        <button
                          type="button"
                          className="field__peek"
                          onClick={() =>
                            setShowConfirmPassword((current) => !current)
                          }
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </div>

                      <p
                        className={`field__err ${
                          errors.confirmPassword ? "is-shown" : ""
                        }`}
                      >
                        {errors.confirmPassword || "The passwords don't match."}
                      </p>
                    </div>

                    <button
                      className="btn btn--primary authsubmit"
                      type="submit"
                      disabled={loading}
                    >
                      <span>{loading ? "One moment" : "Update password"}</span>
                    </button>
                  </form>

                  <p className="authswap">
                    <Link className="authlink" href="/signin">
                      Back to sign in
                    </Link>
                  </p>
                </>
              ) : (
                <div className="authdone">
                  <span className="authdone__tick" aria-hidden="true">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>

                  <h2>Password updated</h2>

                  <p className="small" style={{ marginInline: "auto" }}>
                    Your password has been changed. You can now sign in with
                    your new password.
                  </p>

                  <Link href="/signin" className="btn btn--primary authsubmit">
                    <span>Sign in</span>
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
