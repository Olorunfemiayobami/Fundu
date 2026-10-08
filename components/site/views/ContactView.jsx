/* Fundu marketing website. Markup is the approved design's, converted to
   JSX without changes to structure, classes or copy.
   Internal links are plain <a> on purpose: each marketing page starts its own
   motion script on a fresh load, so client-side routing isn't used here. */
/* eslint-disable @next/next/no-html-link-for-pages */

import ContactForm from "@/components/site/ContactForm";

export default function ContactView() {
  return (
    <>
    <main className="view" data-view="contact" aria-labelledby="ct-title">{" "}
      <section className="tshero cthero">{" "}
        <div className="fs-wrap">{" "}
          <p className="label">{"Contact us"}
          </p>{" "}
          <h1 id="ct-title">{"Talk to the Fundu team."}
          </h1>{" "}
          <p className="lede">{"Questions, problems or ideas, we read every message. Tell us as much as you can and we’ll reply by email."}
          </p>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec ct-sec" aria-label="Ways to reach us">{" "}
        <div className="fs-wrap ct-grid">{" "}
          <div className="ct-form-wrap" id="ct-form">{" "}
            <ContactForm />
          </div>{" "}
          <aside className="ct-side">{" "}
            <div className="ct-card">
              <span className="ts-ic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,56l-96,88L32,56Z" opacity="0.2" />
                  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
                </svg>
              </span>
              <div>
                <h3>{"Email"}
                </h3>
                <p>{"Prefer email? Write to us directly."}
                </p>
                <a className="ct-mail" href="mailto:funduhelp@gmail.com">{"funduhelp@gmail.com"}
                </a>
              </div>
            </div>{" "}
            <div className="ct-card warn">
              <span className="ts-ic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,56V176c-64,55.43-112-55.43-176,0V56C112,.57,160,111.43,224,56Z" opacity="0.2" />
                  <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z" />
                </svg>
              </span>
              <div>
                <h3>{"Worried about a page?"}
                </h3>
                <p>{"The fastest way is "}
                  <b>{"Report campaign"}
                  </b>{" at the bottom of the page’s support card. "}
                  <a className="inl" href="/trust-and-safety">{"How reporting works"}
                  </a>
                </p>
              </div>
            </div>{" "}
            <div className="ct-card">
              <span className="ts-ic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M195.88,195.88l-39.6-39.6a40,40,0,0,0,0-56.56l39.6-39.6A96,96,0,0,1,195.88,195.88ZM60.12,60.12a96,96,0,0,0,0,135.76l39.6-39.6a40,40,0,0,1,0-56.56Z" opacity="0.2" />
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm39.1,131.79a47.84,47.84,0,0,0,0-55.58l28.5-28.49a87.83,87.83,0,0,1,0,112.56ZM96,128a32,32,0,1,1,32,32A32,32,0,0,1,96,128Zm88.28-67.6L155.79,88.9a47.84,47.84,0,0,0-55.58,0L71.72,60.4a87.83,87.83,0,0,1,112.56,0ZM60.4,71.72l28.5,28.49a47.84,47.84,0,0,0,0,55.58L60.4,184.28a87.83,87.83,0,0,1,0-112.56ZM71.72,195.6l28.49-28.5a47.84,47.84,0,0,0,55.58,0l28.49,28.5a87.83,87.83,0,0,1-112.56,0Z" />
                </svg>
              </span>
              <div>
                <h3>{"Quick answers"}
                </h3>
                <p>{"Many questions are already answered in the "}
                  <a className="inl" href="/help">{"Help Centre"}
                  </a>{", on "}
                  <a className="inl" href="/pricing">{"Pricing"}
                  </a>{" and in "}
                  <a className="inl" href="/how-it-works">{"How it works"}
                  </a>{"."}
                </p>
              </div>
            </div>{" "}
            <div className="ct-card">
              <span className="ts-ic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128A96,96,0,0,1,79.93,211.11h0L42.54,223.58a8,8,0,0,1-10.12-10.12l12.47-37.39h0A96,96,0,1,1,224,128Z" opacity="0.2" />
                  <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-4-1.08,7.85,7.85,0,0,0-2.53.42L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Zm40-104a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,112Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,144Z" />
                </svg>
              </span>
              <div>
                <h3>{"Follow Fundu"}
                </h3>
                <p>{"News and updates as we grow."}
                </p>
                <ul className="f-social ct-social" aria-label="Fundu on social media">
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
              </div>
            </div>{" "}
            <p className="ct-where">
              <svg className="ct-ni" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M128,24a80,80,0,0,0-80,80c0,72,80,128,80,128s80-56,80-128A80,80,0,0,0,128,24Zm0,112a32,32,0,1,1,32-32A32,32,0,0,1,128,136Z" opacity="0.2" />
                <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
              </svg>{"Fundu is built in Nigeria."}
            </p>{" "}
          </aside>{" "}
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}
