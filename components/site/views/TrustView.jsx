/* Fundu marketing website. Markup is the approved design's, converted to
   JSX without changes to structure, classes or copy.
   Internal links are plain <a> on purpose: each marketing page starts its own
   motion script on a fresh load, so client-side routing isn't used here. */

export default function TrustView() {
  return (
    <>
    <main className="view" data-view="trust" aria-labelledby="ts-title">{" "}
      <section className="tshero">{" "}
        <div className="fs-wrap tshero-in">{" "}
          <div>{" "}
            <p className="label">{"Trust & safety"}
            </p>{" "}
            <h1 id="ts-title">{"Built so people can give with confidence."}
            </h1>{" "}
            <p className="lede">{"Money moves directly between people on Fundu, so we keep things clear and honest. Here’s what we do to keep pages trustworthy, what we can’t do, and how you can stay safe."}
            </p>{" "}
          </div>{" "}
          <nav className="hwjump" aria-label="On this page">{" "}
            <a href="#ts-do">
              <span>{"01"}
              </span>{"What Fundu does"}
            </a>{" "}
            <a href="#ts-limits">
              <span>{"02"}
              </span>{"What Fundu can’t do"}
            </a>{" "}
            <a href="#ts-safe">
              <span>{"03"}
              </span>{"Giving and raising safely"}
            </a>{" "}
            <a href="#ts-report">
              <span>{"04"}
              </span>{"If something looks wrong"}
            </a>{" "}
          </nav>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" id="ts-do" aria-labelledby="ts-do-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"What Fundu does"}
              </p>
              <h2 id="ts-do-h">{"Six things that keep pages honest."}
              </h2>
            </div>
            <p className="lede">{"Trust comes from being clear about who’s asking, what’s been raised and what happens when something isn’t right."}
            </p>
          </div>{" "}
          <div className="ts-grid">
            <div className="ts-card rv">
              <span className="ts-ic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M216,48H40a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48ZM96,144a24,24,0,1,1,24-24A24,24,0,0,1,96,144Z" opacity="0.2" />
                  <path d="M200,112a8,8,0,0,1-8,8H152a8,8,0,0,1,0-16h40A8,8,0,0,1,200,112Zm-8,24H152a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm40-80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Zm-80.26-34a8,8,0,1,1-15.5,4c-2.63-10.26-13.06-18-24.25-18s-21.61,7.74-24.25,18a8,8,0,1,1-15.5-4,39.84,39.84,0,0,1,17.19-23.34,32,32,0,1,1,45.12,0A39.76,39.76,0,0,1,135.75,166ZM96,136a16,16,0,1,0-16-16A16,16,0,0,0,96,136Z" />
                </svg>
              </span>
              <h3>{"You can see who’s asking"}
              </h3>
              <p>{"Every page shows the person organizing it, so supporters know who they’re dealing with."}
              </p>
            </div>
            <div className="ts-card rv">
              <span className="ts-ic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M56,88l32,80c0,17.67-20,24-32,24s-32-6.33-32-24ZM200,56l-32,80c0,17.67,20,24,32,24s32-6.33,32-24Z" opacity="0.2" />
                  <path d="M239.43,133l-32-80h0a8,8,0,0,0-9.16-4.84L136,62V40a8,8,0,0,0-16,0V65.58L54.26,80.19A8,8,0,0,0,48.57,85h0v.06L16.57,165a7.92,7.92,0,0,0-.57,3c0,23.31,24.54,32,40,32s40-8.69,40-32a7.92,7.92,0,0,0-.57-3L66.92,93.77,120,82V208H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16H136V78.42L187,67.1,160.57,133a7.92,7.92,0,0,0-.57,3c0,23.31,24.54,32,40,32s40-8.69,40-32A7.92,7.92,0,0,0,239.43,133ZM56,184c-7.53,0-22.76-3.61-23.93-14.64L56,109.54l23.93,59.82C78.76,180.39,63.53,184,56,184Zm144-32c-7.53,0-22.76-3.61-23.93-14.64L200,77.54l23.93,59.82C222.76,148.39,207.53,152,200,152Z" />
                </svg>
              </span>
              <h3>{"Totals are labelled honestly"}
              </h3>
              <p>{"The amount raised is reported by the organizer, and every page says so."}
              </p>
            </div>
            <div className="ts-card rv">
              <span className="ts-ic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,56V176c-64,55.43-112-55.43-176,0V56C112,.57,160,111.43,224,56Z" opacity="0.2" />
                  <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z" />
                </svg>
              </span>
              <h3>{"Anyone can report a page"}
              </h3>
              <p>{"A Report campaign button sits on every page, for anyone who spots something wrong."}
              </p>
            </div>
            <div className="ts-card rv">
              <span className="ts-ic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M168,100a60,60,0,1,1-60-60A60,60,0,0,1,168,100Z" opacity="0.2" />
                  <path d="M144,157.68a68,68,0,1,0-71.9,0c-20.65,6.76-39.23,19.39-54.17,37.17a8,8,0,0,0,12.25,10.3C50.25,181.19,77.91,168,108,168s57.75,13.19,77.87,37.15a8,8,0,0,0,12.25-10.3C183.18,177.07,164.6,164.44,144,157.68ZM56,100a52,52,0,1,1,52,52A52.06,52.06,0,0,1,56,100Zm197.66,33.66-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L216,148.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
              </span>
              <h3>{"People review every report"}
              </h3>
              <p>{"The Fundu team looks at each report and can remove pages or restrict accounts that break our rules."}
              </p>
            </div>
            <div className="ts-card rv">
              <span className="ts-ic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M208,88H48a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V96A8,8,0,0,0,208,88Zm-80,72a20,20,0,1,1,20-20A20,20,0,0,1,128,160Z" opacity="0.2" />
                  <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-96a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Z" />
                </svg>
              </span>
              <h3>{"No PINs, no passwords"}
              </h3>
              <p>{"Fundu never asks for your bank PIN, password or one-time code. Not to set up a page, not ever."}
              </p>
            </div>
            <div className="ts-card rv">
              <span className="ts-ic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2" />
                  <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z" />
                </svg>
              </span>
              <h3>{"Your private details stay private"}
              </h3>
              <p>{"Your email, password and unpublished drafts are never shown on your page."}
              </p>
            </div>
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec night" id="ts-limits" aria-labelledby="ts-lim-h">{" "}
        <div className="fs-wrap ts-lim">{" "}
          <div className="shead">
            <div>
              <p className="label">{"What Fundu can’t do"}
              </p>
              <h2 id="ts-lim-h">{"We’d rather be honest about our limits."}
              </h2>
            </div>
            <p className="lede">{"Fundu gives your goal a page. It doesn’t sit in the middle of the money. That keeps giving simple, and it means a few things are out of our hands."}
            </p>
          </div>{" "}
          <ul className="ts-limits">
            <li className="rv">
              <svg className="ts-li" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
              </svg>
              <div>
                <b>{"Fundu doesn’t check every claim"}
                </b>
                <span>{"We review pages that are reported, but we can’t confirm every story before it goes live."}
                </span>
              </div>
            </li>
            <li className="rv">
              <svg className="ts-li" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
              </svg>
              <div>
                <b>{"Fundu can’t see or confirm transfers"}
                </b>
                <span>{"Money goes from your bank to the organizer’s. That’s why the total is reported by the organizer."}
                </span>
              </div>
            </li>
            <li className="rv">
              <svg className="ts-li" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
              </svg>
              <div>
                <b>{"Fundu can’t reverse a transfer"}
                </b>
                <span>{"Because we never hold the money, we can’t refund it. Your bank and the organizer can."}
                </span>
              </div>
            </li>
            <li className="rv">
              <svg className="ts-li" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
              </svg>
              <div>
                <b>{"No page is guaranteed to reach its goal"}
                </b>
                <span>{"We give every goal a proper page. Whether people give is up to them."}
                </span>
              </div>
            </li>
          </ul>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec tint-teal" id="ts-safe" aria-labelledby="ts-safe-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Giving and raising safely"}
              </p>
              <h2 id="ts-safe-h">{"A few habits that keep everyone safe."}
              </h2>
            </div>
            <p className="lede">{"Most pages are exactly what they say. These checks take a minute and help you spot the ones that aren’t."}
            </p>
          </div>{" "}
          <div className="ts-safe">{" "}
            <div className="ts-panel rv">
              <h3>
                <svg className="ts-hi ok" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>{"Before you give, check that"}
              </h3>
              <ul className="ts-list">
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"You know the organizer, or someone you trust does"}
                  </span>
                </li>
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"The story makes sense and includes real details"}
                  </span>
                </li>
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"The account name matches the organizer or the person it’s for"}
                  </span>
                </li>
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"The organizer posts updates as things move"}
                  </span>
                </li>
              </ul>
            </div>{" "}
            <div className="ts-panel warn rv">
              <h3>
                <svg className="ts-hi bad" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22c6.3-11,22.52-11,28.82,0l87.46,151.87C236,202.79,228.08,216,215.46,216Z" opacity="0.2" />
                  <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z" />
                </svg>{"Warning signs"}
              </h3>
              <ul className="ts-list">
                <li>
                  <svg className="ts-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                  </svg>
                  <span>{"Pressure to send money right now, or outside the page"}
                  </span>
                </li>
                <li>
                  <svg className="ts-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                  </svg>
                  <span>{"An account name that doesn’t match the organizer"}
                  </span>
                </li>
                <li>
                  <svg className="ts-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                  </svg>
                  <span>{"Anyone asking for your card details, PIN or one-time code"}
                  </span>
                </li>
                <li>
                  <svg className="ts-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                  </svg>
                  <span>{"Promises of profit, interest or returns. That’s never allowed on Fundu"}
                  </span>
                </li>
              </ul>
            </div>{" "}
            <div className="ts-panel rv">
              <h3>
                <svg className="ts-hi ok" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M216,56v56c0,96-88,120-88,120S40,208,40,112V56a8,8,0,0,1,8-8H208A8,8,0,0,1,216,56Z" opacity="0.2" />
                  <path d="M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z" />
                </svg>{"If you’re raising money"}
              </h3>
              <ul className="ts-list">
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Never share your sign-in details with anyone"}
                  </span>
                </li>
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Only add bank details you’re happy for your audience to see"}
                  </span>
                </li>
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Use Private if you only want people with the link to find it. It isn’t secret"}
                  </span>
                </li>
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Post updates and receipts so people can see their help working"}
                  </span>
                </li>
              </ul>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" id="ts-report" aria-labelledby="ts-rep-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"If something looks wrong"}
              </p>
              <h2 id="ts-rep-h">{"Report it. We’ll take a look."}
              </h2>
            </div>
            <p className="lede">{"You don’t need to be sure something is wrong. If it doesn’t feel right, tell us."}
            </p>
          </div>{" "}
          <ol className="ts-steps">{" "}
            <li className="rv">
              <span className="ts-n">{"1"}
              </span>
              <h3>{"Report the page"}
              </h3>
              <p>{"Open the page and choose "}
                <b>{"Report campaign"}
                </b>{" at the bottom of the support card. Pick a reason and tell us what you noticed."}
              </p>
            </li>{" "}
            <li className="rv">
              <span className="ts-n">{"2"}
              </span>
              <h3>{"We review it"}
              </h3>
              <p>{"The Fundu team looks at the page and the report. A report doesn’t mean the organizer did anything wrong, so we check first."}
              </p>
            </li>{" "}
            <li className="rv">
              <span className="ts-n">{"3"}
              </span>
              <h3>{"We act if needed"}
              </h3>
              <p>{"If a page breaks our rules, we can remove it and restrict the account. Removed pages can no longer be opened."}
              </p>
            </li>{" "}
          </ol>{" "}
          <div className="ts-sent">{" "}
            <span className="ts-ic">
              <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M232,96H24L128,32Z" opacity="0.2" />
                <path d="M24,104H48v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16H208V104h24a8,8,0,0,0,4.19-14.81l-104-64a8,8,0,0,0-8.38,0l-104,64A8,8,0,0,0,24,104Zm40,0H96v64H64Zm80,0v64H112V104Zm48,64H160V104h32ZM128,41.39,203.74,88H52.26ZM248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H240A8,8,0,0,1,248,208Z" />
              </svg>
            </span>{" "}
            <div>
              <h3>{"Already sent money to a page that worries you?"}
              </h3>
              <p>{"Contact the organizer first. If that doesn’t resolve it, contact your bank as soon as possible, since only your bank can look into a transfer. Then report the page so we can review it."}
              </p>
            </div>{" "}
            <a className="fs-btn btn-ghost" href="/contact">{"Contact us"}
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}
