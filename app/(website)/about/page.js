"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const AUDIENCES = [
  {
    src: "/images/website/img-08-39254514.jpg",
    alt: "A patient with hospital staff",
    label: "Medical & emergencies",
  },
  {
    src: "/images/website/img-09-5c0ae562.jpg",
    alt: "Graduates celebrating",
    label: "School & education",
  },
  {
    src: "/images/website/img-14-58640f61.jpg",
    alt: "A family embracing",
    label: "Families & individuals",
  },
  {
    src: "/images/website/img-10-d38264c7.jpg",
    alt: "A pastor addressing a congregation",
    label: "Churches & communities",
  },
  {
    src: "/images/website/img-11-c4ffdf34.jpg",
    alt: "A shopkeeper in her store",
    label: "Small businesses",
  },
  {
    src: "/images/website/img-17-e8e9fa87.jpg",
    alt: "A carpenter working in a workshop",
    label: "Creators & projects",
  },
];

export default function AboutPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveal = Array.from(root.querySelectorAll("[data-mo]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

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

    const wash = document.getElementById("ab-bgwash");
    const tinted = Array.from(root.querySelectorAll("[data-tint]"));

    let frame = 0;

    const paint = () => {
      frame = 0;

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

      wash.style.background = value ? `rgb(${value})` : `rgb(var(${token}))`;
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
    <div className="ab" ref={rootRef}>
      <div id="ab-bgwash" aria-hidden="true" />

      {/* HERO */}
      <section className="band ab-hero" data-tint="--tint-mist">
        <div className="wrap">
          <span className="ab-hero__eyebrow" data-mo>
            About Fundu
          </span>

          <h1 data-mo>Helping people raise money, together.</h1>

          <p className="lead" data-mo>
            Fundu gives people a simple place to tell their story, rally the
            people around them and raise money for the things that matter.
          </p>
        </div>

        <div className="ab-bleed" data-mo="pop">
          <img
            src="/images/website/img-12-03b20a5c.jpg"
            alt="A family holding each other close"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* THE PROBLEM WE SAW */}
      <section className="band" data-tint="--tint-white">
        <div className="wrap">
          <div className="ab-storygrid">
            <h2 className="ab-statement" data-mo>
              People were already raising money.{" "}
              <em>They just needed a better way to do it.</em>
            </h2>

            <div data-mo>
              <p>
                Somebody needs help with hospital bills, school fees, a
                community project or an emergency. They write a long message,
                attach an account number, and start forwarding it.
              </p>

              <p>
                Soon the story is separated from the pictures. The account
                number gets buried. People keep asking for updates. And by the
                time the message reaches somebody outside the original group,
                there is nowhere they can go to understand what happened.
              </p>

              <p>
                Fundu started with one idea:{" "}
                <b>give every fundraiser a proper home.</b>
              </p>
            </div>
          </div>

          <div className="ab-merge">
            <div data-mo="left">
              <p className="ab-merge__label">
                <i />
                How it travels now
              </p>

              <div className="ab-frags">
                <div className="ab-frag ab-frag--1">
                  Good evening all &#128591; My father was admitted at UCH on
                  Sunday and the doctors are asking for &#8358;800,000 for the
                  surgery. Anything you can do will help. Please share.
                </div>

                <div className="ab-frag ab-frag--2">
                  IMG-20260914-WA0031.jpg
                </div>

                <div className="ab-frag ab-frag--3">
                  Sorry o, what was the account number again?
                </div>

                <div className="ab-frag ab-frag--4">
                  Zenith &middot; 20&middot;&middot;&middot;&middot;41 &middot;
                  A. ADEYEMI
                </div>

                <div className="ab-frag ab-frag--5">Pls forward &#128591;</div>
              </div>
            </div>

            <div data-mo="right">
              <p className="ab-merge__label ab-merge__label--now">
                <i />
                How it travels on Fundu
              </p>

              <article className="ab-campcard">
                <div className="ab-campcard__img">
                  <img
                    src="/images/website/img-03-de06bc95.jpg"
                    alt="A family at a hospital bedside"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="ab-campcard__body">
                  <h3>Surgery for my father at UCH</h3>

                  <p className="ab-campcard__by">
                    Adeyemi family &middot; Ibadan, Oyo State
                  </p>

                  <p className="ab-campcard__fig">
                    Fundraising goal: <b>&#8358;800,000</b>
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE'RE BUILDING */}
      <section className="band" data-tint="--tint-neutral">
        <div className="wrap">
          <h2 className="ab-statement" data-mo>
            A better home for fundraising.
          </h2>

          <div className="ab-principles">
            <article className="ab-principle" data-mo>
              <h3>Tell the whole story</h3>

              <p>
                One page holding the story, the pictures, the goal and the
                updates, so everything a supporter needs to understand the
                fundraiser is in the same place.
              </p>
            </article>

            <article className="ab-principle" data-mo>
              <h3>Share it anywhere</h3>

              <p>
                One link that keeps working as it moves through WhatsApp,
                Instagram, X, email, or wherever the people around you already
                are.
              </p>
            </article>

            <article className="ab-principle" data-mo>
              <h3>Receive support directly</h3>

              <p>
                Supporters send to the organiser&apos;s own bank details, so
                Fundu never has to hold the money before the organiser can reach
                it.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="band" data-tint="--tint-white">
        <div className="wrap">
          <h2 className="ab-statement ab-statement--wide" data-mo>
            Built around a few simple beliefs.
          </h2>

          <div className="ab-beliefs">
            <article className="ab-belief" data-mo>
              <h3>People already help each other</h3>

              <p>
                Technology shouldn&apos;t try to replace that. It should make
                helping easier, and stay out of the way of it.
              </p>
            </article>

            <article className="ab-belief" data-mo>
              <h3>Your fundraiser should belong to you</h3>

              <p>
                Your story, your community and your campaign shouldn&apos;t
                start to feel like they belong to the platform hosting them.
              </p>
            </article>

            <article className="ab-belief" data-mo>
              <h3>Trust starts with clarity</h3>

              <p>
                We should be exact about what Fundu knows, what the organiser
                told us, and what nobody has verified.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WHO FUNDU IS FOR */}
      <section className="band" data-tint="--tint-mist">
        <div className="wrap">
          <h2 className="ab-statement ab-statement--wide" data-mo>
            Built for all the reasons people come together.
          </h2>

          <div className="ab-whofor">
            {AUDIENCES.map((item) => (
              <article className="ab-who" data-mo="tile" key={item.label}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />

                <h3>{item.label}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDU TODAY */}
      <section className="band" data-tint="--tint-white">
        <div className="wrap">
          <div className="ab-today">
            <h2 className="ab-statement" data-mo>
              We&apos;re just getting started.
            </h2>

            <div className="ab-today__copy" data-mo>
              <p>
                Fundu is being built from Nigeria, for the way people here
                already support one another. We are starting with the simple
                part: campaign pages, one link, and contributions that go
                straight to the organiser&apos;s account.
              </p>

              <p>
                Everything after that gets built carefully, and only once we can
                do it properly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="band" data-tint="--tint-neutral">
        <div className="wrap">
          <h2 className="ab-statement ab-statement--wide" data-mo>
            Building Fundu because asking for help shouldn&apos;t be
            complicated.
          </h2>

          <div className="ab-founder">
            <div className="ab-founder__image" data-mo="pop">
              <img
                src="/images/website/ayobami-founder.png"
                alt="Ayobami, founder of Fundu"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="ab-founder__copy" data-mo>
              <p>
                <b>I&apos;m Ayobami, the person building Fundu.</b>
              </p>

              <p>
                The idea came from something I kept seeing around me. When
                people needed help, the willingness to support them was already
                there. What was missing was a simple way to bring the story,
                pictures, updates and account details together in one place. Too
                often, a fundraiser became a long message being copied from one
                group chat to another, with important details getting lost along
                the way.
              </p>

              <p>
                I&apos;m building Fundu to give those fundraisers a proper home.
                I want someone opening a Fundu link for the first time to
                quickly understand who needs help, what they are raising money
                for and how they can support them, without having to piece the
                story together from forwarded messages.
              </p>

              <a
                href="https://x.com/bharmiedesign"
                target="_blank"
                rel="noopener noreferrer"
                className="ab-founder__social"
              >
                @bharmiedesign on X
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="band--tight" data-tint="--tint-white">
        <div className="wrap">
          <div className="ab-contact" data-mo>
            <div className="stack">
              <h2>Talk to us before you need to</h2>

              <p className="lead">
                A question about a campaign, something on the platform that
                looks wrong, or an organisation that fundraises often and wants
                a hand getting set up. It all comes to one inbox, and a person
                reads it.
              </p>
            </div>

            <div className="ab-contact__rows">
              <a className="ab-contact__row" href="mailto:funduhelp@gmail.com">
                <div>
                  <b>Every question, one address</b>
                  <span>funduhelp@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="band ab-cta" data-tint="--tint-mist">
        <div className="wrap">
          <h2 className="ab-statement" data-mo>
            Start with the people who already want to help.
          </h2>

          <p className="lead" data-mo>
            Create your Fundu page, tell your story, and give people one link to
            share.
          </p>

          <div className="ab-cta__row" data-mo>
            <Link className="btn btn--primary" href="/signup">
              <span>Start a fundraiser</span>
            </Link>

            <Link className="btn btn--ghost" href="/how-it-works">
              <span>See how Fundu works</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
