"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePublicUser } from "./usePublicUser";
import { useFooterMotion } from "./useFooterMotion";
import "./public-layout.css";

export default function Footer() {
  const footerRef = useRef(null);
  const user = usePublicUser();
  const fundraiserHref = user ? "/create-campaign" : "/signup";
  useFooterMotion(footerRef);
  return (
    <>
    <footer ref={footerRef} className="fundu-chrome fs-cfoot">{" "}
      <div className="fs-wrap">{" "}
        <div className="f-top">{" "}
          <p className="f-ask">{"Raising money for "}
            <span className="f-rot" aria-live="off">
              <span className="f-word">{"school fees?"}
              </span>
            </span>
          </p>{" "}
          <Link className="fs-btn btn-primary f-cta" href={fundraiserHref}>{"Give it a page"}
            <svg className="b-arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>{" "}
        </div>{" "}
        <div className="f-mid">{" "}
          <div className="f-note">
            <Link className="f-brand" href="/" aria-label="Fundu home">
              <svg className="foot-mark" aria-hidden="true" focusable="false" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">{" "}
                <rect width="1000" height="1000" rx="250" fill="#1E807F" />{" "}
                <path d="M106.5 604.32V406.155H223.951V445.222H145.556V478.626H210.367V517.693H145.556V604.32H106.5ZM231.569 552.514V462.773H270.625V541.756C270.625 546.758 271.804 551.287 274.163 555.345C276.615 559.308 279.87 562.47 283.927 564.828C287.983 567.187 292.417 568.367 297.229 568.367C302.134 568.367 306.615 567.187 310.672 564.828C314.728 562.47 317.935 559.308 320.295 555.345C322.653 551.287 323.832 546.758 323.832 541.756V462.773H362.888L363.03 604.32H323.974L323.832 593.562C319.115 598.092 313.549 601.63 307.134 604.178C300.813 606.726 294.116 608 287.04 608C276.852 608 267.559 605.5 259.163 600.498C250.767 595.496 244.068 588.844 239.069 580.54C234.069 572.141 231.569 562.799 231.569 552.514ZM522.911 514.296V604.32H483.855V525.054C483.855 520.052 482.629 515.57 480.176 511.607C477.818 507.55 474.609 504.34 470.553 501.982C466.591 499.623 462.157 498.443 457.251 498.443C452.346 498.443 447.864 499.623 443.808 501.982C439.752 504.34 436.544 507.55 434.186 511.607C431.828 515.57 430.648 520.052 430.648 525.054V604.32H391.592L391.45 462.773H430.506L430.648 473.248C435.365 468.718 440.884 465.18 447.204 462.632C453.62 460.084 460.365 458.81 467.44 458.81C477.722 458.81 487.016 461.31 495.317 466.312C503.714 471.314 510.411 478.013 515.411 486.412C520.411 494.715 522.911 504.011 522.911 514.296ZM652.444 392H691.5V604.32H652.444V589.316C648.105 594.789 642.727 599.272 636.312 602.763C629.897 606.254 622.586 608 614.378 608C604.096 608 594.473 606.066 585.511 602.197C576.548 598.327 568.624 592.996 561.737 586.202C554.945 579.314 549.615 571.387 545.747 562.422C541.879 553.457 539.945 543.832 539.945 533.547C539.945 523.261 541.879 513.636 545.747 504.671C549.615 495.706 554.945 487.827 561.737 481.033C568.624 474.145 576.548 468.766 585.511 464.896C594.473 461.027 604.096 459.093 614.378 459.093C622.586 459.093 629.897 460.839 636.312 464.33C642.727 467.727 648.105 472.209 652.444 477.777V392ZM614.944 570.49C621.36 570.49 627.162 568.839 632.35 565.536C637.538 562.233 641.642 557.799 644.661 552.231C647.68 546.569 649.189 540.341 649.189 533.547C649.189 526.658 647.68 520.43 644.661 514.862C641.642 509.294 637.538 504.86 632.35 501.557C627.162 498.254 621.36 496.603 614.944 496.603C608.435 496.603 602.539 498.254 597.256 501.557C591.972 504.86 587.775 509.342 584.662 515.004C581.548 520.572 579.992 526.752 579.992 533.547C579.992 540.341 581.548 546.569 584.662 552.231C587.869 557.799 592.114 562.233 597.397 565.536C602.681 568.839 608.529 570.49 614.944 570.49Z" fill="white" />{" "}
                <path d="M807.652 608C790.604 608 775.587 603.859 762.597 595.579C749.71 587.299 739.613 576.191 732.307 562.255C725.102 548.219 721.5 532.667 721.5 515.602V392H763.511V515.602C763.511 524.791 765.236 533.223 768.686 540.898C772.136 548.572 777.159 554.733 783.755 559.377C790.351 563.921 798.316 566.194 807.652 566.194C817.089 566.194 825.056 563.921 831.55 559.377C838.146 554.833 843.118 548.723 846.466 541.049C849.815 533.375 851.489 524.892 851.489 515.602V392H893.5V515.602C893.5 528.426 891.42 540.443 887.259 551.652C883.201 562.761 877.366 572.555 869.755 581.038C862.144 589.52 853.063 596.134 842.509 600.881C832.057 605.627 820.438 608 807.652 608Z" fill="#F98D2C" />{" "}
              </svg>
            </Link>
            <p>{"Fundu gives every goal a proper page and one link to share. The money goes straight to the person raising it."}
            </p>
            <ul className="f-social" aria-label="Fundu on social media">
              <li>
                <a href="https://www.instagram.com/usefundu/" target="_blank" rel="noopener" aria-label="Fundu on Instagram (opens in a new tab)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://x.com/Usefundu" target="_blank" rel="noopener" aria-label="Fundu on X (opens in a new tab)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4l16 16M20 4L4 20" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=61594806624482" target="_blank" rel="noopener" aria-label="Fundu on Facebook (opens in a new tab)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8a0 0 0 0 1 0 0z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@usefundu" target="_blank" rel="noopener" aria-label="Fundu on TikTok (opens in a new tab)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
                    <path d="M14 3c.5 2.5 2.2 4 5 4" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>{" "}
          <nav className="f-cols" aria-label="Footer">{" "}
            <div>
              <h2>{"Raise money"}
              </h2>
              <Link href="/how-it-works">{"How it works"}
              </Link>
              <Link href="/pricing">{"Pricing"}
              </Link>
              <Link href="/guides">{"Tips & guides"}
              </Link>
              <Link href="/fundraising-rules">{"Fundraising rules"}
              </Link>
            </div>{" "}
            <div>
              <h2>{"Discover"}
              </h2>
              <Link href="/webexplore">{"Explore pages"}
              </Link>
              <Link href="/#cats">{"Categories"}
              </Link>
              <Link href="/about">{"About us"}
              </Link>
            </div>{" "}
            <div>
              <h2>{"Support"}
              </h2>
              <Link href="/help">{"Help Centre"}
              </Link>
              <Link href="/trust-and-safety">{"Trust & safety"}
              </Link>
              <Link href="/contact">{"Contact us"}
              </Link>
            </div>{" "}
            <div>
              <h2>{"Legal"}
              </h2>
              <Link href="/terms">{"Terms of Service"}
              </Link>
              <Link href="/privacy">{"Privacy Policy"}
              </Link>
            </div>{" "}
          </nav>{" "}
        </div>{" "}
        <div className="f-base">
          <span>{"© 2026 Fundu. Made for people raising money together."}
          </span>
          <a className="f-up" href="#site-top" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>{"Back to top"}
          </a>
        </div>{" "}
      </div>{" "}
      <div className="f-mark" aria-hidden="true">
        <div className="fs-wrap">
          <div className="fbig-logo fbig-text">
            <span className="fb-f">{"Fund"}
            </span>
            <span className="fb-u">{"U"}
            </span>
          </div>
        </div>
      </div>{" "}
    </footer>
    </>
  );
}
