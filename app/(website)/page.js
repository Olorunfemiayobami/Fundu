"use client";

/* ============================================================================
   Fundu marketing homepage

   Markup, styles and behaviour are the design artifact's, ported verbatim.
   The one script from the artifact runs here inside a single useEffect and is
   cleaned up on unmount. It drives: the sticky-state nav, the mobile menu,
   the crossfading page background, reveal-on-scroll, the scroll-linked
   feature cards, the merging message panels, the money-flow arrow, the
   converging phones, the funding bars, the campaign carousel, the count-up
   figures, photo parallax, the hero headline split and the torchlight footer.
   ============================================================================ */

import { useEffect } from "react";
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
export default function HomePage() {
  useEffect(() => {
    const cleanups = [];
    const addEvent = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };
    const observers = [];
    const timers = [];
    let rafId = 0;

    ("use strict");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    var clamp = function (v, a, b) {
      return v < a ? a : v > b ? b : v;
    };
    var ease = function (t) {
      return 1 - Math.pow(1 - t, 3);
    };

    /* ---------- background colour interpolation ---------- */
    var sections = [].slice.call(document.querySelectorAll("[data-tint]"));
    var wash = document.getElementById("bgwash");
    var tints = {};
    function readTints() {
      var cs = getComputedStyle(document.documentElement);
      sections.forEach(function (el) {
        var name = el.getAttribute("data-tint");
        if (!tints[name]) {
          var raw = cs.getPropertyValue(name).trim().split(",");
          tints[name] = [+raw[0] || 255, +raw[1] || 255, +raw[2] || 255];
        }
      });
    }
    var bounds = [];
    function measure() {
      var top = window.pageYOffset || document.documentElement.scrollTop;
      bounds = sections.map(function (el) {
        var r = el.getBoundingClientRect();
        return {
          t: r.top + top,
          h: r.height || 1,
          c: tints[el.getAttribute("data-tint")] || [255, 255, 255],
        };
      });
    }
    function paintBg(y, vh) {
      if (!bounds.length) return;
      var probe = y + vh * 0.5,
        i = 0;
      for (var k = 0; k < bounds.length; k++) {
        if (probe >= bounds[k].t) i = k;
      }
      var a = bounds[i].c,
        b = (bounds[i + 1] || bounds[i]).c;
      var t = (probe - bounds[i].t) / bounds[i].h,
        m = 0;
      if (t > 0.7) m = clamp((t - 0.7) / 0.3, 0, 1);
      var r = Math.round(a[0] + (b[0] - a[0]) * m),
        g = Math.round(a[1] + (b[1] - a[1]) * m),
        bl = Math.round(a[2] + (b[2] - a[2]) * m);
      wash.style.backgroundColor = "rgb(" + r + "," + g + "," + bl + ")";
    }

    /* ---------- scroll-linked elements ---------- */
    var cards = [].slice.call(document.querySelectorAll("[data-scale]"));
    var merge = document.querySelector("[data-merge]"),
      mL = document.querySelector("[data-merge-l]"),
      mR = document.querySelector("[data-merge-r]");
    var flow = document.querySelector("[data-flow]"),
      flowArrow = document.querySelector("[data-flow-arrow]");
    var phonesWrap = document.querySelector("[data-phones]"),
      phones = [].slice.call(document.querySelectorAll("[data-phone]"));

    function progress(rect, vh, startAt, span) {
      return clamp((vh * startAt - rect.top) / (vh * span), 0, 1);
    }

    function frame() {
      var vh = window.innerHeight || 800;
      var y = window.pageYOffset || document.documentElement.scrollTop;
      var narrow = window.innerWidth < 700;

      paintBg(y, vh);
      paintParallax();

      if (!reduce.matches) {
        /* feature cards: grow, sharpen and thicken on the way down, reverse on the way up */
        for (var i = 0; i < cards.length; i++) {
          var r = cards[i].getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 300) continue;
          var e = ease(clamp((vh - r.top) / (vh * 0.46), 0, 1));
          var st = cards[i].style;
          st.setProperty("--s", (0.9 + 0.1 * e).toFixed(4));
          st.setProperty("--b", ((narrow ? 3 : 5) * (1 - e)).toFixed(2) + "px");
          st.setProperty("--o", (0.36 + 0.64 * e).toFixed(3));
          st.setProperty("--w", Math.round(420 + 380 * e));
        }

        /* the scattered messages and the finished page slide in to meet */
        if (merge && mL && mR) {
          var mr = merge.getBoundingClientRect();
          if (mr.bottom > -300 && mr.top < vh + 400) {
            var me = ease(progress(mr, vh, 0.92, 0.6)),
              gap = 1 - me;
            if (window.innerWidth <= 900) {
              mL.style.transform =
                "translateY(" + (-gap * 26).toFixed(1) + "px)";
              mR.style.transform =
                "translateY(" + (gap * 26).toFixed(1) + "px)";
            } else {
              mL.style.transform =
                "translateX(" +
                (-gap * 20).toFixed(2) +
                "%) rotate(" +
                (-gap * 1.4).toFixed(2) +
                "deg)";
              mR.style.transform =
                "translateX(" +
                (gap * 20).toFixed(2) +
                "%) rotate(" +
                (gap * 1.4).toFixed(2) +
                "deg)";
            }
          }
        }

        /* the contribution travelling straight to the account */
        if (flow && flowArrow) {
          var fr = flow.getBoundingClientRect();
          if (fr.bottom > -200 && fr.top < vh + 300) {
            flowArrow.style.setProperty(
              "--p",
              progress(fr, vh, 0.86, 0.46).toFixed(3),
            );
          }
        }

        /* phones falling together */
        if (phonesWrap && phones.length === 3) {
          var pr = phonesWrap.getBoundingClientRect();
          if (pr.bottom > -300 && pr.top < vh + 400) {
            var pe = ease(progress(pr, vh, 0.9, 0.62)),
              sp = narrow ? 0.62 : 1;
            /* they stop short of overlapping, so no screen loses its words */
            var x1 = (-108 + 22 * pe) * sp,
              x3 = (108 - 22 * pe) * sp;
            phones[0].style.transform =
              "translate(-50%,-50%) translateX(" +
              x1.toFixed(2) +
              "%) translateY(" +
              (18 - 26 * pe).toFixed(1) +
              "px) rotate(" +
              (-7 + 3.5 * pe).toFixed(2) +
              "deg)";
            phones[1].style.transform =
              "translate(-50%,-50%) translateY(" +
              (26 - 34 * pe).toFixed(1) +
              "px) scale(" +
              (1 + 0.06 * pe).toFixed(3) +
              ")";
            phones[2].style.transform =
              "translate(-50%,-50%) translateX(" +
              x3.toFixed(2) +
              "%) translateY(" +
              (18 - 26 * pe).toFixed(1) +
              "px) rotate(" +
              (7 - 3.5 * pe).toFixed(2) +
              "deg)";
          }
        }
      }
      ticking = false;
    }

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    }

    /* ---------- section motion: stagger by position in the group ---------- */
    var moEls = [].slice.call(document.querySelectorAll("[data-mo]"));
    moEls.forEach(function (el) {
      var parent = el.parentNode;
      parent.__moIndex = parent.__moIndex || 0;
      el.style.setProperty("--i", parent.__moIndex);
      parent.__moIndex++;
    });
    if (reduce.matches || !("IntersectionObserver" in window)) {
      moEls.forEach(function (el) {
        el.classList.add("is-in");
      });
    } else {
      var moObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              moObs.unobserve(en.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
      );
      moEls.forEach(function (el) {
        moObs.observe(el);
      });
    }

    /* ---------- hero headline, word by word ---------- */
    var head = document.querySelector(".hero h1");
    if (head && head.children.length === 0 && !reduce.matches) {
      var words = head.textContent.split(" ");
      head.textContent = "";
      words.forEach(function (w, i) {
        var sp = document.createElement("span");
        sp.className = "word";
        sp.style.setProperty("--w", i);
        sp.textContent = w;
        head.appendChild(sp);
        if (i < words.length - 1)
          head.appendChild(document.createTextNode(" "));
      });
    }

    /* ---------- money figures count up when you reach them ---------- */
    function countUp(el) {
      var raw = el.getAttribute("data-count");
      if (raw === null) {
        raw = el.textContent;
        el.setAttribute("data-count", raw);
      }
      var m = raw.match(/[0-9][0-9,]+/);
      if (!m) {
        return;
      }
      var target = parseInt(m[0].replace(/,/g, ""), 10);
      if (isNaN(target)) {
        return;
      }
      if (reduce.matches) {
        el.textContent = raw;
        return;
      }
      var t0 = 0,
        dur = 1100;
      function tick(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur),
          e = 1 - Math.pow(1 - p, 3);
        el.textContent = raw.replace(
          m[0],
          Math.round(target * e).toLocaleString("en-US"),
        );
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    var figures = [].slice.call(
      document.querySelectorAll(
        ".hero__chip b,.vsrow__amt,.campcard__fig b,.ccard__fig b",
      ),
    );
    if ("IntersectionObserver" in window) {
      var figObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              countUp(en.target);
              figObs.unobserve(en.target);
            }
          });
        },
        { threshold: 0.55 },
      );
      figures.forEach(function (el) {
        figObs.observe(el);
      });
    }

    /* ---------- photographs drift as they pass ---------- */
    var parallax = [].slice.call(
      document.querySelectorAll(
        ".btile__art .slotimg,.ccard__img img,.campcard__img .slotimg",
      ),
    );
    function paintParallax() {
      if (reduce.matches) return;
      var vh = window.innerHeight || 800;
      for (var i = 0; i < parallax.length; i++) {
        var el = parallax[i],
          box = el.parentNode.getBoundingClientRect();
        if (box.bottom < -100 || box.top > vh + 100) continue;
        var centre = (box.top + box.height / 2 - vh / 2) / vh;
        var shift = Math.max(-15, Math.min(15, -centre * 17));
        el.style.transform =
          "translate3d(0," + shift.toFixed(2) + "px,0) scale(1.1)";
      }
    }

    /* ---------- the two funding bars ---------- */
    var vs = document.querySelector("[data-vs]");
    if (vs && "IntersectionObserver" in window) {
      new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              vs.classList.add("is-in");
              obs.disconnect();
            }
          });
        },
        { threshold: 0.2 },
      ).observe(vs);
    } else if (vs) {
      vs.classList.add("is-in");
    }

    /* ---------- campaign carousel ---------- */
    var cTrack = document.getElementById("cTrack");
    if (cTrack) {
      var cPrev = document.querySelector('[data-c="prev"]'),
        cNext = document.querySelector('[data-c="next"]');
      function cStep() {
        var card = cTrack.querySelector(".ccard");
        if (!card) return 300;
        var gap =
          parseFloat(
            getComputedStyle(cTrack).columnGap || getComputedStyle(cTrack).gap,
          ) || 18;
        return card.getBoundingClientRect().width + gap;
      }
      function cEnds() {
        var max = cTrack.scrollWidth - cTrack.clientWidth;
        cPrev.disabled = cTrack.scrollLeft <= 4;
        cNext.disabled = cTrack.scrollLeft >= max - 4;
      }
      cPrev.addEventListener("click", function () {
        cTrack.scrollBy({
          left: -cStep(),
          behavior: reduce.matches ? "auto" : "smooth",
        });
      });
      cNext.addEventListener("click", function () {
        cTrack.scrollBy({
          left: cStep(),
          behavior: reduce.matches ? "auto" : "smooth",
        });
      });
      cTrack.addEventListener("scroll", cEnds, { passive: true });
      window.addEventListener("resize", cEnds);
      cEnds();
    }

    /* ---------- torchlight wordmark ---------- */
    var torch = document.getElementById("torch");
    if (torch) {
      var base = torch.querySelector(".torch__base"),
        idle = null;

      /* stretch the word to the full width of the page */
      function fitTorch() {
        if (!base) return;
        torch.style.setProperty("--tfs", "100px");
        var w = base.getBoundingClientRect().width;
        if (!w) return;
        var target = torch.clientWidth * 0.985;
        torch.style.setProperty(
          "--tfs",
          ((100 * target) / w).toFixed(2) + "px",
        );
        torch.style.setProperty(
          "--r",
          Math.max(120, Math.min(300, torch.clientWidth * 0.13)).toFixed(0) +
            "px",
        );
      }
      fitTorch();
      window.addEventListener("resize", fitTorch);
      if (document.fonts && document.fonts.ready)
        document.fonts.ready.then(fitTorch);

      /* the light travels on its own, and hands over while you point at it */
      var pointed = false;
      torch.addEventListener("pointermove", function (e) {
        var r = torch.getBoundingClientRect();
        pointed = true;
        clearTimeout(idle);
        idle = setTimeout(function () {
          pointed = false;
        }, 1400);
        torch.style.setProperty("--mx", e.clientX - r.left + "px");
        torch.style.setProperty("--my", e.clientY - r.top + "px");
      });
      torch.addEventListener("pointerleave", function () {
        clearTimeout(idle);
        pointed = false;
      });

      (function drift(t) {
        if (!pointed && !reduce.matches) {
          torch.style.setProperty(
            "--mx",
            (50 + 40 * Math.sin(t / 3200)).toFixed(2) + "%",
          );
          torch.style.setProperty(
            "--my",
            (50 + 16 * Math.sin(t / 2100)).toFixed(2) + "%",
          );
        }
        requestAnimationFrame(drift);
      })(0);
    }

    /* ---------- wiring ---------- */
    function init() {
      readTints();
      measure();
      frame();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () {
      measure();
      onScroll();
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(init);
    window.addEventListener("load", init);
    init();

    return () => {
      cleanups.forEach((off) => off());
      observers.forEach((o) => o.disconnect());
      timers.forEach((t) => clearTimeout(t));
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="marketing-page">
      {/* the crossfading page background; dark sections sit out of it */}
      <div id="bgwash" aria-hidden="true" />

      <main id="main">
        <span id="top" />

        {/* ============ HERO ============ */}
        <section className="band hero" data-tint="--tint-mist">
          <div className="wrap">
            <div className="hero__grid">
              <div className="stack">
                <span className="hero__eyebrow" data-mo>
                  Contributions go straight to your bank account
                </span>
                <h1 data-mo>
                  One page for your fundraiser. One link to share.
                </h1>
                <p className="lead" data-mo>
                  Your story, your goal, your pictures and where to send money,
                  all together in one place, instead of spread across six
                  WhatsApp messages. Fundu never holds the money.
                </p>
                <div className="hero__cta" data-mo>
                  <a className="btn btn--primary" href="/signup">
                    <span>Start a fundraiser</span>
                  </a>
                  <a className="btn btn--ghost" href="#how">
                    <span>See how it works</span>
                  </a>
                </div>
                <p className="hero__note" data-mo>
                  Free to create. You only pay for the days your campaign stays
                  up.
                </p>
              </div>

              <div className="hero__art" aria-hidden="true">
                <figure className="shot shot--a" data-mo="pop">
                  <img
                    className="slotimg"
                    src="/images/website/img-01-0745084c.jpg"
                    alt="Kemi, a student, photographed outside her home"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <figure className="shot shot--b" data-mo="pop">
                  <img
                    className="slotimg"
                    src="/images/website/img-02-e90ea0a4.jpg"
                    alt="A carpenter measuring timber in a workshop while others work behind him"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="shot__cap">
                    Borehole for Ile-Tuntun<i>Community project · 9 updates</i>
                  </figcaption>
                </figure>
                <div className="hero__chip" data-mo="fade">
                  Raised so far
                  <b>₦1,340,000</b>
                  <span className="bar">
                    <i></i>
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: ".5em",
                      fontSize: ".72rem",
                      fontWeight: "500",
                    }}
                  >
                    Updated by the organiser
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MARQUEE ============ */}
        <section
          className="band--tight"
          data-tint="--tint-mist"
          style={{ paddingTop: "0", paddingBottom: "var(--bandY)" }}
        >
          <div className="wrap">
            <p className="marquee__label" data-mo>
              Today, somewhere, someone is raising for
            </p>
          </div>
          <div className="marquee">
            <div className="marquee__track">
              <span className="tag tag--teal">School fees</span>
              <span className="tag tag--mango">A surgery in Lagos</span>
              <span className="tag tag--grape">Exam registration</span>
              <span className="tag tag--berry">A funeral</span>
              <span className="tag tag--lagoon">Rebuilding a market stall</span>
              <span className="tag tag--moss">A borehole</span>
              <span className="tag tag--teal">A first short film</span>
              <span className="tag tag--mango">Rent, after a hard month</span>
              <span className="tag tag--grape">Church roof repairs</span>
              <span className="tag tag--teal">School fees</span>
              <span className="tag tag--mango">A surgery in Lagos</span>
              <span className="tag tag--grape">Exam registration</span>
              <span className="tag tag--berry">A funeral</span>
              <span className="tag tag--lagoon">Rebuilding a market stall</span>
              <span className="tag tag--moss">A borehole</span>
              <span className="tag tag--teal">A first short film</span>
              <span className="tag tag--mango">Rent, after a hard month</span>
              <span className="tag tag--grape">Church roof repairs</span>
            </div>
          </div>
          <div className="marquee" style={{ marginTop: "12px" }}>
            <div className="marquee__track marquee__track--rev">
              <span className="tag tag--berry">A wheelchair</span>
              <span className="tag tag--lagoon">Alumni scholarship fund</span>
              <span className="tag tag--moss">
                Flood relief in the compound
              </span>
              <span className="tag tag--teal">
                A farm after the harvest failed
              </span>
              <span className="tag tag--mango">Tuition abroad</span>
              <span className="tag tag--grape">Books for a village school</span>
              <span className="tag tag--berry">A generator for the clinic</span>
              <span className="tag tag--lagoon">Wedding support</span>
              <span className="tag tag--moss">A friend's medical bills</span>
              <span className="tag tag--berry">A wheelchair</span>
              <span className="tag tag--lagoon">Alumni scholarship fund</span>
              <span className="tag tag--moss">
                Flood relief in the compound
              </span>
              <span className="tag tag--teal">
                A farm after the harvest failed
              </span>
              <span className="tag tag--mango">Tuition abroad</span>
              <span className="tag tag--grape">Books for a village school</span>
              <span className="tag tag--berry">A generator for the clinic</span>
              <span className="tag tag--lagoon">Wedding support</span>
              <span className="tag tag--moss">A friend's medical bills</span>
            </div>
          </div>
        </section>

        {/* ============ THE SHIFT: fragments join into one page ============ */}
        <section className="band split" id="how" data-tint="--tint-white">
          <div className="wrap">
            <div className="splitHead bandhead">
              <h2 data-mo>
                Right now, your fundraiser lives in six different places
              </h2>
              <p className="lead" data-mo>
                The story goes out on Monday. The pictures follow. On Thursday
                somebody asks for the account number again. By the time the
                message reaches a stranger, all that's left is a number and a
                name.
              </p>
            </div>

            <div className="merge" data-merge>
              <div className="merge__panel merge__panel--l" data-merge-l>
                <p className="merge__tag merge--boxed">How it travels now</p>
                <div className="frag frag--1">
                  Good evening all 🙏 My father was admitted at UCH on Sunday
                  and the doctors are asking for ₦800,000 for the surgery.
                  Anything you can do will help. Please share.
                </div>
                <div className="frag frag--2">IMG-20260914-WA0031.jpg</div>
                <div className="frag frag--3">
                  Sorry o, what was the account number again?
                </div>
                <div className="frag frag--4">
                  Zenith · 20•••••41 · A. ADEYEMI
                </div>
                <div className="frag frag--5">Pls forward 🙏🙏</div>
              </div>

              <div className="merge__panel merge__panel--r" data-merge-r>
                <p className="merge__tag merge__tag--teal merge--boxed">
                  How it travels on Fundu
                </p>
                <div className="campcard">
                  <div className="campcard__img">
                    <img
                      className="slotimg"
                      src="/images/website/img-03-de06bc95.jpg"
                      alt="A family gathered at the bedside of the person they are raising money for"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="campcard__body">
                    <h3>Surgery for my father at UCH</h3>
                    <p className="small">Adeyemi family · Ibadan, Oyo State</p>
                    <div className="campcard__bar">
                      <i></i>
                    </div>
                    <p className="campcard__fig">
                      <b>₦512,000</b> of ₦800,000 goal
                    </p>
                    <div className="campcard__rows">
                      <span>The full story, with photos</span>
                      <span>Where to send your contribution</span>
                      <span>4 updates from the family</span>
                    </div>
                    <span className="campcard__btn">Contribute</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="lead merge__after" data-mo>
              Fundu keeps the whole thing in one place, at one link, for as long
              as you need it, so the person who opens it next month sees exactly
              what the first person saw.
            </p>
            <div className="inline-cta inline-cta--simple" data-mo>
              <div className="inline-cta__copy">
                <h3>Ready to put your fundraiser in one place?</h3>
                <p>
                  Add your story, pictures and bank details, then share one link
                  everywhere.
                </p>
              </div>

              <a className="btn btn--primary" href="/signup">
                <span>Start a fundraiser</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============ MONEY GOES STRAIGHT TO YOU ============ */}
        <section className="band straight band--dark band--deep" id="straight">
          <div className="wrap">
            <div className="straight__grid">
              <div className="stack">
                <h2 data-mo>Supporters send money to you. Not to us.</h2>
                <p className="lead" data-mo>
                  You put your own bank account on your campaign. People
                  transfer to it the way they already transfer to anybody. There
                  is no payout to wait for, because there is nothing for Fundu
                  to release.
                </p>
                <p className="small measure">
                  The flip side, said plainly: those transfers happen in your
                  bank, not on Fundu, so we can't see them. The total on your
                  page is the number <b>you</b> keep updated, and we label it
                  that way.
                </p>
              </div>

              <div className="flowbox" data-flow>
                <div className="flow flow--other">
                  <p className="flow__label">The usual route</p>
                  <div className="flow__row">
                    <span className="flow__node">Supporter</span>
                    <span className="flow__arrow"></span>
                    <span className="flow__node flow__node--mid">Platform</span>
                    <span className="flow__arrow"></span>
                    <span className="flow__node flow__node--mid">
                      Payout queue
                    </span>
                    <span className="flow__arrow"></span>
                    <span className="flow__node">You</span>
                  </div>
                </div>
                <div className="flow flow--fundu">
                  <p className="flow__label flow__label--teal">On Fundu</p>
                  <div className="flow__row">
                    <span className="flow__node flow__node--on">Supporter</span>
                    <span
                      className="flow__arrow flow__arrow--live"
                      data-flow-arrow
                    ></span>
                    <span className="flow__node flow__node--on">
                      Your bank account
                    </span>
                  </div>
                  <p className="flow__foot">
                    Nothing in between. No wallet, no escrow, no withdrawal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ WHAT YOU GET: scroll-scaled cards ============ */}
        <section className="band feats" id="features" data-tint="--tint-white">
          <div className="wrap">
            <div className="bandhead bandhead--mid">
              <h2 data-mo>What a Fundu page does that a message can't</h2>
              <p className="lead" data-mo>
                Six things, all of them boring on purpose. Money is involved, so
                clarity beats cleverness.
              </p>
            </div>

            <div className="fcar">
              <div className="fcar__track">
                <article className="fcard">
                  <span className="fcard__icon fcard__icon--teal">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 3h9l5 5v13H5z" />
                      <path d="M14 3v5h5" />
                      <path d="M9 13h6M9 17h4" />
                    </svg>
                  </span>
                  <h3>A page that explains itself</h3>
                  <p>
                    Your story, the goal, the pictures and the account details,
                    in an order that makes sense to somebody who just got the
                    link and knows nothing.
                  </p>
                </article>

                <article className="fcard">
                  <span className="fcard__icon fcard__icon--mango">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                    </svg>
                  </span>
                  <h3>One link, everywhere</h3>
                  <p>
                    The family group, your status, Instagram, X, email, the
                    alumni chat. One address that keeps working after the
                    message has been forwarded forty times.
                  </p>
                </article>

                <article className="fcard">
                  <span className="fcard__icon fcard__icon--grape">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="6" width="18" height="13" rx="2.5" />
                      <path d="M3 10h18M7 15h4" />
                    </svg>
                  </span>
                  <h3>Your account details, where people look</h3>
                  <p>
                    Laid out clearly on the page instead of buried in a message
                    from three days ago that nobody can scroll back to find.
                  </p>
                </article>

                <article className="fcard">
                  <span className="fcard__icon fcard__icon--lagoon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 3v5M12 21v-5" />
                      <circle cx="12" cy="12" r="3.2" />
                      <path d="M4.5 7.5l3.5 2M19.5 7.5l-3.5 2M4.5 16.5l3.5-2M19.5 16.5l-3.5-2" />
                    </svg>
                  </span>
                  <h3>Updates that stay attached</h3>
                  <p>
                    Post what happened: the surgery date, the receipt, the thank
                    you. It lives on the campaign, so late arrivals see the end
                    of the story too.
                  </p>
                </article>

                <article className="fcard">
                  <span className="fcard__icon fcard__icon--berry">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 12a8 8 0 1 1-3.2-6.4" />
                      <path d="M4 20l1.6-4.2" />
                      <path d="M14 4.5h6v6" />
                    </svg>
                  </span>
                  <h3>Support that isn't money</h3>
                  <p>
                    People can comment, encourage, vouch for you and share. Not
                    everybody can give ₦20,000, but a share can reach the person
                    who can.
                  </p>
                </article>

                <article className="fcard">
                  <span className="fcard__icon fcard__icon--moss">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="M16.2 16.2L21 21" />
                    </svg>
                  </span>
                  <h3>A chance at strangers</h3>
                  <p>
                    People browsing Explore can find your campaign. We won't
                    pretend that replaces sharing it yourself. That is still
                    where nearly all support comes from.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ============ BENTO: who Fundu is built for ============ */}
        <section className="band bentoband" id="who" data-tint="--tint-neutral">
          <div className="wrap">
            <div className="bandhead">
              <h2 data-mo>Built for the fundraising that already happens</h2>
              <p className="lead" data-mo>
                Not a new habit. The same one, with somewhere proper to put it.
              </p>
            </div>

            <div className="bento">
              <article className="btile btile--a" data-mo="tile">
                <div className="btile__art">
                  <img
                    className="slotimg"
                    src="/images/website/img-04-8c1dadb7.jpg"
                    alt="A patient in a hospital bed with a nurse and doctor at her side"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="btile__meta">
                  <span className="btile__pill btile__pill--light">
                    Medical &amp; emergencies
                  </span>
                  <h3>When it has to happen this week</h3>
                  <p>
                    A page up in minutes, contributions landing in the account
                    you already use, and no queue between the transfer and the
                    hospital.
                  </p>
                </div>
              </article>

              <article className="btile btile--b" data-mo="tile">
                <div className="btile__art">
                  <img
                    className="slotimg"
                    src="/images/website/img-05-ae199465.jpg"
                    alt="A shopkeeper standing in her store, arms folded, smiling"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="btile__meta">
                  <span className="btile__pill btile__pill--light">
                    Families &amp; small businesses
                  </span>
                  <h3>The fundraiser that started in a family group</h3>
                  <p>
                    A funeral, a rebuild after a fire, a stall back on its feet.
                    One place to send everybody.
                  </p>
                </div>
              </article>

              <article className="btile btile--c" data-mo="tile">
                <div className="btile__meta btile__meta--solid btile__meta--grape">
                  <span className="btile__pill">
                    Communities &amp; associations
                  </span>
                  <h3>Projects need progress, not just appeals</h3>
                  <p>
                    Post updates as the work happens so members can see where
                    the money went.
                  </p>
                </div>
              </article>

              <article className="btile btile--d" data-mo="tile">
                <div className="btile__art">
                  <img
                    className="slotimg"
                    src="/images/website/img-06-6421c9de.jpg"
                    alt="A man speaking from the pulpit to his congregation"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="btile__meta">
                  <span className="btile__pill btile__pill--light">
                    Churches &amp; faith groups
                  </span>
                  <h3>A congregation is already a network</h3>
                  <p>
                    Give the project one destination instead of an announcement
                    repeated every Sunday.
                  </p>
                </div>
              </article>

              <article className="btile btile--e" data-mo="tile">
                <div className="btile__meta btile__meta--solid btile__meta--moss">
                  <span className="btile__pill">Creators &amp; projects</span>
                  <h3>For the thing you want to make</h3>
                  <p>
                    A film, a book, an event. Less emergency, more invitation.
                  </p>
                </div>
              </article>

              <article className="btile btile--f" data-mo="tile">
                <div className="btile__art">
                  <img
                    className="slotimg"
                    src="/images/website/img-07-b58b173d.jpg"
                    alt="Graduates celebrating, caps in the air"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="btile__meta">
                  <span className="btile__pill btile__pill--light">
                    School fees
                  </span>
                  <h3>Students have more networks than anyone</h3>
                  <p>
                    Family, coursemates, the alumni group, church, the old
                    school set. One link works in every one of them.
                  </p>
                </div>
              </article>
            </div>

            <p className="small bentoband__note" data-mo>
              Photographs here stand in for real campaigns. On a live Fundu
              page, every one of these is a picture the organiser uploaded
              themselves.
            </p>
            <div className="inline-cta inline-cta--feature" data-mo>
              <div className="inline-cta__copy">
                <span className="inline-cta__eyebrow">
                  Whatever you're raising for
                </span>

                <h3>Give it a proper page.</h3>

                <p>
                  From an urgent hospital bill to school fees or a community
                  project, start with your story and the people who already
                  care.
                </p>
              </div>

              <a className="btn btn--cream" href="/signup">
                <span>Create your Fundu page</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============ LIVE CAMPAIGNS ============ */}
        {/* Each .ccard below is one campaign. Loop this block over the campaigns
             returned from the database: image, category, title, organiser, the
             raised/goal figures, the percentage on --w, and the days remaining. */}
        <section
          className="band campaigns"
          id="campaigns"
          data-tint="--tint-neutral"
        >
          <div className="wrap">
            <div className="bandhead">
              <h2 data-mo>Campaigns running on Fundu</h2>
              <p className="lead" data-mo>
                Every one of these is somebody's real situation, with a page
                anyone can read before they decide. Explore is how a campaign
                reaches people who were never on the organiser's contact list.
              </p>
            </div>

            <div className="carousel">
              <div className="carousel__nav">
                <button
                  className="cnav"
                  type="button"
                  data-c="prev"
                  aria-label="Previous campaigns"
                  aria-controls="cTrack"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 5 8 12l7 7" />
                  </svg>
                </button>
                <button
                  className="cnav"
                  type="button"
                  data-c="next"
                  aria-label="Next campaigns"
                  aria-controls="cTrack"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div
                className="ctrack"
                id="cTrack"
                tabIndex="0"
                role="region"
                aria-label="Campaigns running on Fundu"
              >
                <article className="ccard" data-mo="tile">
                  <div className="ccard__img">
                    <img
                      src="/images/website/img-08-39254514.jpg"
                      alt="A family at a hospital bedside"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="ccard__cat">Medical</span>
                  </div>
                  <div className="ccard__body">
                    <h3 className="ccard__title">
                      Surgery for my father at UCH
                    </h3>
                    <p className="ccard__by">by the Adeyemi family</p>
                    <div className="ccard__bar">
                      <i style={{ "--w": "64%" }}></i>
                    </div>
                    <p className="ccard__fig">
                      <span>
                        <b>₦512,000</b> raised
                      </span>
                      <span>of ₦800,000</span>
                    </p>
                    <div className="ccard__foot">
                      <span className="ccard__days">12 days left</span>
                      <span className="ccard__btn">Support</span>
                    </div>
                  </div>
                </article>

                <article className="ccard" data-mo="tile">
                  <div className="ccard__img">
                    <img
                      src="/images/website/img-09-5c0ae562.jpg"
                      alt="Graduates celebrating with their caps in the air"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="ccard__cat">Education</span>
                  </div>
                  <div className="ccard__body">
                    <h3 className="ccard__title">
                      Final year fees, before the deadline
                    </h3>
                    <p className="ccard__by">by Kemi Adebayo</p>
                    <div className="ccard__bar">
                      <i style={{ "--w": "72%" }}></i>
                    </div>
                    <p className="ccard__fig">
                      <span>
                        <b>₦180,000</b> raised
                      </span>
                      <span>of ₦250,000</span>
                    </p>
                    <div className="ccard__foot">
                      <span className="ccard__days">9 days left</span>
                      <span className="ccard__btn">Support</span>
                    </div>
                  </div>
                </article>

                <article className="ccard" data-mo="tile">
                  <div className="ccard__img">
                    <img
                      src="/images/website/img-10-d38264c7.jpg"
                      alt="A man speaking to his congregation"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="ccard__cat">Community</span>
                  </div>
                  <div className="ccard__body">
                    <h3 className="ccard__title">
                      A new roof for the church hall
                    </h3>
                    <p className="ccard__by">by St Andrew&#39;s, Ibadan</p>
                    <div className="ccard__bar">
                      <i style={{ "--w": "41%" }}></i>
                    </div>
                    <p className="ccard__fig">
                      <span>
                        <b>₦1,240,000</b> raised
                      </span>
                      <span>of ₦3,000,000</span>
                    </p>
                    <div className="ccard__foot">
                      <span className="ccard__days">21 days left</span>
                      <span className="ccard__btn">Support</span>
                    </div>
                  </div>
                </article>

                <article className="ccard" data-mo="tile">
                  <div className="ccard__img">
                    <img
                      src="/images/website/img-11-c4ffdf34.jpg"
                      alt="A shopkeeper standing in her store"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="ccard__cat">Business</span>
                  </div>
                  <div className="ccard__body">
                    <h3 className="ccard__title">
                      Back on our feet after the fire
                    </h3>
                    <p className="ccard__by">by Ngozi&#39;s Provisions</p>
                    <div className="ccard__bar">
                      <i style={{ "--w": "24%" }}></i>
                    </div>
                    <p className="ccard__fig">
                      <span>
                        <b>₦95,000</b> raised
                      </span>
                      <span>of ₦400,000</span>
                    </p>
                    <div className="ccard__foot">
                      <span className="ccard__days">6 days left</span>
                      <span className="ccard__btn">Support</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div className="cfoot">
              <a className="btn btn--primary" href="/explore">
                <span>Explore all campaigns</span>
              </a>
              <p className="small" data-mo>
                Examples, until the first campaigns are live. Each total is the
                figure that campaign's organiser keeps updated.
              </p>
            </div>
          </div>
        </section>

        {/* ============ FULL-BLEED PHOTOGRAPH ============ */}
        <section className="bleed" aria-label="Nothing passes through Fundu">
          <img
            src="/images/website/img-12-03b20a5c.jpg"
            alt="A family holding each other close, laughing"
            loading="lazy"
            decoding="async"
          />
          <div className="wrap bleed__in">
            <div>
              <p className="bleed__figure" data-mo>
                &#8358;0 <em>of it</em>
                <br />
                touches Fundu.
              </p>
              <p className="bleed__sub" data-mo>
                Not one naira of what your people send you passes through us,
                because there is nowhere for it to stop.{" "}
                <b>No wallet, no escrow, no payout queue.</b> You give them your
                account, and they use it.
              </p>
            </div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section className="band pricing" id="pricing" data-tint="--tint-white">
          <div className="wrap">
            <div className="bandhead">
              <h2 data-mo>You pay for the days your page is up</h2>
              <p className="lead" data-mo>
                Not a percentage of what your people gave you. A small fixed
                amount per day your campaign stays active, and that's the whole
                model.
              </p>
            </div>

            <div className="vs" data-vs>
              <div className="vsrow">
                <div className="vsrow__top">
                  <span className="vsrow__name">A student's exam fees</span>
                  <span className="vsrow__amt">&#8358;100,000 raised</span>
                </div>
                <div className="vsrow__bar">
                  <i
                    style={{ "--w": "12%", background: "rgba(var(--ink),.22)" }}
                  ></i>
                </div>
                <p className="vsrow__cost">
                  Ran for 10 days <b>Pays for 10 days</b>
                </p>
              </div>
              <div className="vsrow">
                <div className="vsrow__top">
                  <span className="vsrow__name">
                    A community health project
                  </span>
                  <span className="vsrow__amt">&#8358;5,000,000 raised</span>
                </div>
                <div className="vsrow__bar">
                  <i
                    style={{
                      "--w": "100%",
                      background: "rgba(var(--ink),.22)",
                    }}
                  ></i>
                </div>
                <p className="vsrow__cost">
                  Ran for 10 days <b>Pays for 10 days</b>
                </p>
              </div>
              <p className="vs__punch" data-mo>
                Fifty times the support. The same bill. Fundu earns from running
                your fundraiser, not from how generous your people were.
              </p>
            </div>

            <div className="pnote" data-mo>
              <p className="pnote__k">Simple, fixed daily pricing</p>
              <p className="pnote__v">
                Your hosting cost is based only on how many days you choose to
                keep your campaign active, not on how much you raise. You'll
                always see the full cost before you publish.
              </p>
            </div>
            <div className="inline-cta inline-cta--pricing" data-mo>
              <div className="inline-cta__copy">
                <span className="inline-cta__eyebrow">
                  Pay for the days you need
                </span>

                <h3>No percentage taken from what you raise.</h3>

                <p>
                  Choose how long your campaign stays active and see your total
                  hosting cost upfront before you publish.
                </p>
              </div>

              <a className="btn btn--primary" href="/signup">
                <span>Start my fundraiser</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============ SHARE: phones converge on scroll ============ */}
        <section className="band share" id="share" data-tint="--tint-mist">
          <div className="wrap">
            <div className="share__grid">
              <div className="stack">
                <h2 data-mo>It travels the way your message already travels</h2>
                <p className="lead" data-mo>
                  You know where your people are. Fundu doesn't try to move them
                  somewhere new. It just gives you one thing to paste instead of
                  four.
                </p>
                <div className="share__link">
                  <span className="share__url">
                    fundu.live/adeyemi-uch-surgery
                  </span>
                  <span className="share__tail" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="12" height="12" rx="2.5" />
                      <path d="M6 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V6" />
                    </svg>
                    One link
                  </span>
                </div>
                <p className="small">
                  Most people's first sight of Fundu isn't our homepage. It's a
                  campaign link somebody sent them at 11pm. We build for that
                  visitor first.
                </p>
              </div>

              <div className="phones__wrap">
                <div className="phones" data-phones aria-hidden="true">
                  <div className="phone phone--1" data-phone>
                    <div className="phone__screen phone__screen--wa">
                      <span className="phone__top">
                        Family group · 48 members
                      </span>
                      <span className="bub bub--in">
                        Has anyone sent something yet?
                      </span>
                      <span className="bub bub--out">
                        Everything is on this page now 👇
                      </span>
                      <span className="bub bub--link">
                        fundu.live/adeyemi-uch-surgery
                      </span>
                    </div>
                  </div>
                  <div className="phone phone--2" data-phone>
                    <div className="phone__screen phone__screen--ig">
                      <span className="phone__top">Your story</span>
                      <img
                        className="igart"
                        src="/images/website/img-13-ab0f4497.jpg"
                        alt="A couple in matching teal aso-ebi, photographed from behind"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="bub bub--link bub--tight">
                        Link in bio → fundu.live
                      </span>
                    </div>
                  </div>
                  <div className="phone phone--3" data-phone>
                    <div className="phone__screen phone__screen--x">
                      <span className="phone__top">Post</span>
                      <span className="bub bub--plain">
                        My father needs surgery on Friday. The full story, the
                        goal and where to send anything you can spare:
                      </span>
                      <span className="bub bub--link">
                        fundu.live/adeyemi-uch-surgery
                      </span>
                      <span className="phone__stats">
                        412 reposts · 1.9k likes
                      </span>
                    </div>
                  </div>
                </div>
                <div className="phones__legend">
                  <span>
                    <i style={{ background: "rgb(var(--moss))" }}></i>In the
                    family WhatsApp group
                  </span>
                  <span>
                    <i style={{ background: "rgb(var(--berry))" }}></i>On an
                    Instagram story
                  </span>
                  <span>
                    <i style={{ background: "rgb(var(--lagoon))" }}></i>In a
                    post on X
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TRUST / HONESTY ============ */}
        <section className="band trust band--dark band--inkbg" id="trust">
          <div className="wrap">
            <div className="bandhead bandhead--mid">
              <h2 data-mo>What Fundu does, and what it doesn't</h2>
              <p className="lead" data-mo>
                You're asking people for money. The least we can do is be exact
                about our part in it.
              </p>
            </div>

            <div className="trust__grid">
              <div className="tcol tcol--yes">
                <span className="tcol__k">Yes</span>
                <h3>Fundu does</h3>
                <ul className="tlist">
                  <li data-mo="left">
                    Give your fundraiser a page, a goal, a story and a permanent
                    link
                  </li>
                  <li data-mo="left">
                    Hold your campaign's pictures, updates and comments in one
                    place
                  </li>
                  <li data-mo="left">
                    Show your bank details clearly to the people you send there
                  </li>
                  <li data-mo="left">
                    Let people report a campaign, and let us take one down
                  </li>
                  <li data-mo="left">
                    List your campaign in Explore where others can come across
                    it
                  </li>
                </ul>
              </div>
              <div className="tcol tcol--no">
                <span className="tcol__k">No</span>
                <h3>Fundu does not</h3>
                <ul className="tlist tlist--no">
                  <li data-mo="right">
                    Receive, hold or release your contributions. No wallet, no
                    escrow, no payout
                  </li>
                  <li data-mo="right">
                    See a transfer happen, or confirm that one did
                  </li>
                  <li data-mo="right">
                    Verify every claim on every campaign for you
                  </li>
                  <li data-mo="right">
                    Guarantee that a campaign is genuine, or that you'll reach
                    your goal
                  </li>
                  <li data-mo="right">
                    Promise to bring you supporters. Sharing is still your job
                  </li>
                </ul>
              </div>
            </div>

            <div className="trust__next" data-mo>
              <p className="k">Being built next</p>
              <p>
                Identity checks, verified organisation profiles, campaign
                history for repeat organisers, and clearer marks separating what
                we've checked from what an organiser told us. Until those exist,
                we won't imply they do.
              </p>
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section
          className="band--tight start"
          id="start"
          data-tint="--tint-mist"
        >
          <div className="wrap">
            <div className="start__inner">
              <div className="start__blob" aria-hidden="true"></div>
              <div className="stack start__text">
                <h2 data-mo>Somebody is already willing to help you</h2>
                <p className="lead" data-mo>
                  Give them one place to go, and one thing to forward. It takes
                  just a few minutes to get your fundraiser ready to share.
                </p>
                <div className="hero__cta" data-mo>
                  <a className="btn btn--cream" href="/signup">
                    <span>Start a fundraiser</span>
                  </a>
                  <a className="btn btn--ghost" href="/explore">
                    <span>Look through Explore</span>
                  </a>
                </div>
              </div>
              <div className="start__art" data-mo="pop">
                <img
                  className="slotimg"
                  src="/images/website/img-14-58640f61.jpg"
                  alt="A family holding each other close, laughing"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="band home-faq" id="faq" data-tint="--tint-neutral">
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
      </main>
    </div>
  );
}
