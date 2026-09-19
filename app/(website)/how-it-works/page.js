"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "Create the campaign",
    body: "Write what happened and what the money is for, set a goal, add your photos, and enter the bank account contributions should be sent to.",
    list: [
      "Your story, in your own words",
      "A goal you set yourself",
      "Photos of the situation",
      "The account details supporters will use",
    ],
  },
  {
    n: "02",
    title: "Publish it and get your link",
    body: "Your campaign gets one page and one link. Anyone who opens it can see the story, pictures, goal, updates and payment details together in one place.",
    list: [
      "One Fundu campaign link",
      "Live when you publish",
      "Update it whenever you need to",
    ],
  },
  {
    n: "03",
    title: "Share it where your people already are",
    body: "The family group, your status, the alumni set, the church WhatsApp, Instagram, X. One link instead of a story on Monday, photos on Tuesday and an account number on Thursday.",
    list: [
      "One thing to paste and forward",
      "Everything stays together as it travels",
      "Anyone can share the link onward",
    ],
  },
  {
    n: "04",
    title: "Supporters read it, then send straight to you",
    body: "Someone reads the page, decides for themselves, and transfers to the account you provided. Fundu is not in the middle of that transfer, so there is no Fundu balance or payout to wait for.",
    list: [
      "Supporter to your bank account",
      "No Fundu wallet or escrow",
      "No Fundu withdrawal or payout",
    ],
  },
  {
    n: "05",
    title: "Post updates and keep the total current",
    body: "Share what happened next and keep people following the campaign informed. You enter the amount raised yourself because transfers happen in your bank, where Fundu cannot see them.",
    list: [
      "Post updates on the campaign",
      "Keep supporters informed",
      "The amount raised is yours to maintain",
    ],
  },
  {
    n: "06",
    title: "Close it when you are done",
    body: "When the fundraiser is finished or the need has been met, you can bring the campaign to an end and leave the story and updates together.",
    list: [
      "End the campaign when you are done",
      "Keep the story together",
      "Give supporters a final update",
    ],
  },
];

const CHECKS = [
  {
    q: "Does the story explain itself?",
    a: "Look for enough information to understand what happened, what the money is for and who is organising the fundraiser.",
  },
  {
    q: "Who is organising it, and how do you know them?",
    a: "If the campaign came through someone you know, you can ask them how they know the organiser.",
  },
  {
    q: "Do the account details make sense?",
    a: "Check the bank details shown on the campaign carefully before you transfer.",
  },
  {
    q: "Are there updates?",
    a: "Campaign updates can give you more context about what has happened since the fundraiser started.",
  },
  {
    q: "Something feels wrong?",
    a: "Do not send money until you are comfortable with the information you have.",
  },
];

const FAQS = [
  {
    q: "Does Fundu hold my money?",
    a: "No. Supporters transfer to the bank account you put on your campaign, so the money goes directly to that account. Fundu does not hold a balance for you to withdraw.",
  },
  {
    q: "How does Fundu know how much I have raised?",
    a: "It does not automatically know. Those transfers happen in your bank, where Fundu cannot see them, so the amount shown on your campaign is the figure you keep updated.",
  },
  {
    q: "Is my campaign verified?",
    a: "Fundu does not currently verify that a campaign, organiser or amount raised is genuine. Supporters should read the campaign information carefully and make their own decision before sending money.",
  },
  {
    q: "What does it cost?",
    a: "Fundu uses a fixed daily hosting fee rather than taking a percentage of what you raise. Choose how long your campaign stays active and you will see the total hosting cost before you publish.",
  },
  {
    q: "Can I edit my campaign after publishing?",
    a: "Yes. You can update your campaign information while it is active without needing to create a new campaign link.",
  },
  {
    q: "Will Fundu bring supporters to my campaign?",
    a: "Fundu can make eligible public campaigns discoverable through Explore, but you should still share your campaign directly with your own community. Fundu does not guarantee that a campaign will receive contributions.",
  },
];

export default function HowItWorksPage() {
  const rootRef = useRef(null);
  const railRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reveal = Array.from(root.querySelectorAll("[data-mo]"));

    let observer;

    if (reduce.matches || !("IntersectionObserver" in window)) {
      reveal.forEach((el) => el.classList.add("is-in"));
    } else {
      const counts = new Map();

      reveal.forEach((el) => {
        const parent = el.parentNode;
        const i = counts.get(parent) || 0;

        el.style.setProperty("--i", i);
        counts.set(parent, i + 1);
      });

      observer = new IntersectionObserver(
        (entries, self) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              self.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.14,
          rootMargin: "0px 0px -7% 0px",
        },
      );

      reveal.forEach((el) => observer.observe(el));
    }

    const wash = document.getElementById("hiw-bgwash");
    const tinted = Array.from(root.querySelectorAll("[data-tint]"));
    const steps = Array.from(root.querySelectorAll("[data-step]"));

    let frame = 0;

    const paintBg = () => {
      if (!wash || tinted.length === 0) return;

      const middle = window.innerHeight * 0.45;
      let current = tinted[0];

      tinted.forEach((section) => {
        if (section.getBoundingClientRect().top <= middle) {
          current = section;
        }
      });

      const token = current.getAttribute("data-tint");

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(token)
        .trim();

      if (value) {
        wash.style.background = `rgb(${value})`;
      }
    };

    const paintRail = () => {
      const rail = railRef.current;

      if (!rail || reduce.matches) return;

      const box = rail.getBoundingClientRect();
      const mark = window.innerHeight * 0.55;

      const travelled = Math.max(0, Math.min(box.height, mark - box.top));

      if (fillRef.current) {
        fillRef.current.style.height = `${travelled}px`;
      }

      steps.forEach((step) => {
        const rect = step.getBoundingClientRect();

        step.classList.toggle("is-live", rect.top < mark && rect.bottom > 0);
      });
    };

    const paint = () => {
      frame = 0;
      paintBg();
      paintRail();
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(paint);
      }
    };

    paint();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (observer) observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="hiw" ref={rootRef}>
      <div id="hiw-bgwash" aria-hidden="true" />

      {/* HERO */}
      <section className="band hiw-hero" data-tint="--tint-mist">
        <div className="wrap hiw-hero__grid">
          <div className="stack">
            <span className="hiw-eyebrow" data-mo>
              <b />
              How it works
            </span>

            <h1 data-mo>
              Set it up once. Share one link. The money still comes straight to
              you.
            </h1>

            <p className="lead" data-mo>
              Six steps, and none of them involve handing your fundraiser over
              to anybody. Here is the whole process, including the parts Fundu
              cannot do for you.
            </p>

            <div className="hiw-hero__cta" data-mo>
              <Link className="btn btn--primary" href="/signup">
                <span>Start a fundraiser</span>
              </Link>

              <a className="btn btn--ghost" href="#faq">
                <span>Read the questions first</span>
              </a>
            </div>
          </div>

          <div className="hiw-hero__art" data-mo="pop">
            <img
              src="/images/website/img-15-c1d2e2ce.jpg"
              alt="A family holding each other close, laughing"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="band" id="steps" data-tint="--tint-white">
        <div className="wrap">
          <div className="bandhead">
            <h2 data-mo>
              From an idea in your head to a campaign you can share
            </h2>

            <p className="lead" data-mo>
              Put the story, pictures, goal and payment details together once,
              then give people one place to understand and support it.
            </p>
          </div>

          <div className="hiw-rail" ref={railRef}>
            <div className="hiw-rail__fill" ref={fillRef} aria-hidden="true" />

            {STEPS.map((step) => (
              <article className="hiw-step" data-step key={step.n}>
                <div className="hiw-step__num">
                  <span>{step.n}</span>
                </div>

                <div className="hiw-step__body" data-mo>
                  <h3>{step.title}</h3>

                  <p>{step.body}</p>

                  <ul className="hiw-step__list">
                    {step.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MONEY */}
      <section className="band--tight" data-tint="--tint-apricot">
        <div className="wrap">
          <div className="hiw-moneybox" data-mo>
            <div className="stack">
              <h2>The part people always ask about</h2>

              <p className="lead">
                Contributions made using the bank details on your campaign go
                directly to that account. Fundu does not hold the money first.
              </p>
            </div>

            <div className="hiw-mrail">
              <div className="hiw-mrail__item hiw-mrail__item--yes">
                <u aria-hidden="true">&#10003;</u>
                <span>Supporter to your bank account</span>
              </div>

              <div className="hiw-mrail__item hiw-mrail__item--no">
                <u aria-hidden="true">&#10005;</u>
                <span>Supporter to a Fundu wallet to you</span>
              </div>

              <div className="hiw-mrail__item hiw-mrail__item--no">
                <u aria-hidden="true">&#10005;</u>
                <span>Request a payout and wait</span>
              </div>

              <p className="hiw-mrail__note">
                Because Fundu cannot see a direct bank transfer, the amount
                shown as raised on the campaign is maintained by the organiser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTERS */}
      <section className="band" data-tint="--tint-violet">
        <div className="wrap hiw-supp">
          <div className="hiw-supp__art" data-mo="pop">
            <img
              src="/images/website/img-16-f8892aa9.jpg"
              alt="A person viewing a campaign on a phone"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="stack">
            <h2 data-mo>Somebody sent you a campaign. What now?</h2>

            <p className="lead" data-mo>
              Read the campaign carefully before you decide to send money. Fundu
              gives the organiser one place to put the information you need, but
              the decision to contribute is still yours.
            </p>

            <ul className="hiw-checks" data-mo>
              {CHECKS.map((check) => (
                <li key={check.q}>
                  <b>{check.q}</b>
                  {check.a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COST */}
      <section className="band--tight" data-tint="--tint-white">
        <div className="wrap">
          <div className="bandhead">
            <h2 data-mo>What it costs you</h2>

            <p className="lead" data-mo>
              Fundu earns from hosting your fundraiser, not from how much your
              supporters send.
            </p>
          </div>

          <div className="hiw-cost" data-mo>
            <div>
              <p className="hiw-cost__k">
                A fixed amount for each day your campaign is active.
              </p>

              <span className="hiw-cost__tag">
                Never a percentage of what you raise
              </span>
            </div>

            <div>
              <p>
                Your hosting cost depends on how many days you choose to keep
                the campaign active, not how much you raise. You will see the
                total hosting cost before you publish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="band" id="faq" data-tint="--tint-neutral">
        <div className="wrap">
          <div className="bandhead">
            <h2 data-mo>Questions people actually ask</h2>

            <p className="lead" data-mo>
              The important things to know before you create or support a
              campaign.
            </p>
          </div>

          <div className="hiw-faqs">
            {FAQS.map((item) => (
              <details className="hiw-faq" data-mo key={item.q}>
                <summary>
                  <span>{item.q}</span>
                  <i aria-hidden="true" />
                </summary>

                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="band--tight" data-tint="--tint-mist">
        <div className="wrap">
          <div className="hiw-start" data-mo>
            <h2>Your fundraiser deserves better than a forwarded message</h2>

            <p className="lead">
              Set it up once, share the link, and keep the people supporting you
              in the loop.
            </p>

            <div className="hiw-hero__cta">
              <Link className="btn btn--mango" href="/signup">
                <span>Start a fundraiser</span>
              </Link>

              <Link className="btn btn--ghost" href="/explore">
                <span>Look through Explore</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
