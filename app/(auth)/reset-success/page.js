"use client";

import Link from "next/link";

export default function ResetSuccessPage() {
  return (
    <main className="auth auth-route is-open">
      <div className="authbg" aria-hidden="true">
        <div className="authbg__fallback" />

        <video className="authbg__video" autoPlay muted loop playsInline>
          <source src="/auth-background.mp4" type="video/mp4" />
        </video>

        <div className="authbg__scrim" />
      </div>

      <section className="authpanel">
        <aside className="authside">
          <Link href="/" className="authside__logo" aria-label="Fundu home">
            <span
              style={{
                fontFamily: "var(--display)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.03em",
              }}
            >
              fund<span style={{ color: "rgb(var(--mango))" }}>u</span>
            </span>
          </Link>

          <div className="authside__stage">
            <figure className="quote is-live">
              <div className="quote__mark" aria-hidden="true">
                “
              </div>

              <blockquote>
                <p>
                  Your fundraiser, your story, and support that goes directly to
                  you.
                </p>
              </blockquote>
            </figure>
          </div>
        </aside>

        <div className="authform">
          <div className="authform__inner">
            <div className="authview is-active">
              <div className="authdone">
                <div className="authdone__tick" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h2>Password reset</h2>

                <p className="small">
                  Your password has been successfully updated. You can now sign
                  in with your new password.
                </p>

                <Link href="/signin" className="btn btn--primary authsubmit">
                  <span>Go to sign in</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
