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

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
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

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
      general: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {
      name: "",
      email: "",
      password: "",
      general: "",
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (form.name.trim().length < 2) {
      nextErrors.name = "Please tell us your name.";
    }

    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "That email doesn't look right.";
    }

    if (form.password.length < 8) {
      nextErrors.password = "Use at least 8 characters.";
    }

    setErrors(nextErrors);

    return !nextErrors.name && !nextErrors.email && !nextErrors.password;
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setErrors({
      name: "",
      email: "",
      password: "",
      general: "",
    });

    const email = form.email.trim();
    const fullName = form.name.trim();

    const { error: signupError } = await supabase.auth.signUp({
      email,
      password: form.password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signupError) {
      const message = signupError.message.toLowerCase();

      if (
        message.includes("already") ||
        message.includes("registered") ||
        message.includes("exists")
      ) {
        setErrors((current) => ({
          ...current,
          email: "That email is already registered.",
        }));
      } else if (message.includes("password")) {
        setErrors((current) => ({
          ...current,
          password: signupError.message,
        }));
      } else {
        setErrors((current) => ({
          ...current,
          general: signupError.message,
        }));
      }

      setLoading(false);
      return;
    }

    setLoading(false);

    router.push(`/verify-email?email=${encodeURIComponent(email)}`);
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);

    setErrors((current) => ({
      ...current,
      general: "",
    }));

    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (googleError) {
      setErrors((current) => ({
        ...current,
        general: googleError.message,
      }));

      setGoogleLoading(false);
    }
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
              <h2>Start your fundraiser</h2>

              <p className="small">
                One page, one link, and contributions that go straight to your
                own bank account.
              </p>

              {errors.general && (
                <div className="auth-server-error" role="alert">
                  {errors.general}
                </div>
              )}

              <button
                type="button"
                className="gbtn"
                onClick={handleGoogleSignup}
                disabled={googleLoading || loading}
              >
                <span aria-hidden="true">
                  <svg viewBox="0 0 48 48">
                    <path
                      fill="#4285F4"
                      d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.8-2 5.1-4.4 6.7v5.6h7.1c4.2-3.8 6.6-9.5 6.6-16.3z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 46c6 0 11-2 14.6-5.4l-7.1-5.6c-2 1.3-4.5 2.1-7.5 2.1-5.8 0-10.7-3.9-12.4-9.1H4.3v5.8C7.9 41.1 15.4 46 24 46z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M11.6 28c-.4-1.3-.7-2.6-.7-4s.3-2.7.7-4v-5.8H4.3C2.8 17.1 2 20.4 2 24s.8 6.9 2.3 9.8L11.6 28z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 10.8c3.3 0 6.2 1.1 8.5 3.3l6.3-6.3C35 4.1 30 2 24 2 15.4 2 7.9 6.9 4.3 14.2l7.3 5.8c1.7-5.2 6.6-9.2 12.4-9.2z"
                    />
                  </svg>
                </span>

                {googleLoading ? "One moment" : "Continue with Google"}
              </button>

              <p className="author">or</p>

              <form noValidate onSubmit={handleSignup}>
                <div className="field">
                  <label htmlFor="suName">Full name</label>

                  <div className="field__wrap">
                    <input
                      id="suName"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Amarachi Anyanwu"
                      value={form.name}
                      onChange={updateField}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                  </div>

                  <p className={`field__err ${errors.name ? "is-shown" : ""}`}>
                    {errors.name || "Please tell us your name."}
                  </p>
                </div>

                <div className="field">
                  <label htmlFor="suEmail">Email</label>

                  <div className="field__wrap">
                    <input
                      id="suEmail"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={updateField}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  </div>

                  <p className={`field__err ${errors.email ? "is-shown" : ""}`}>
                    {errors.email || "That email doesn't look right."}
                  </p>
                </div>

                <div className="field">
                  <label htmlFor="suPass">Password</label>

                  <div className="field__wrap">
                    <input
                      id="suPass"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      value={form.password}
                      onChange={updateField}
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

                <button
                  className="btn btn--primary authsubmit"
                  type="submit"
                  disabled={loading || googleLoading}
                >
                  <span>{loading ? "One moment" : "Create my account"}</span>
                </button>

                <p className="authterms">
                  By creating an account you agree to Fundu&apos;s terms and
                  privacy policy, and to the rules about what campaigns are
                  allowed.
                </p>
              </form>

              <p className="authswap">
                Already have an account?{" "}
                <Link className="authlink" href="/signin">
                  Sign in
                </Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
