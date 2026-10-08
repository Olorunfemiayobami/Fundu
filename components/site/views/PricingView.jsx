/* Fundu marketing website. Markup is the approved design's, converted to
   JSX without changes to structure, classes or copy.
   Internal links are plain <a> on purpose: each marketing page starts its own
   motion script on a fresh load, so client-side routing isn't used here. */
/* eslint-disable @next/next/no-html-link-for-pages */

export default function PricingView() {
  return (
    <>
    <main className="view" data-view="pricing" aria-labelledby="pr-title">{" "}
      <section className="prhero">{" "}
        <div className="fs-wrap prhero-in">{" "}
          <div className="prhero-copy">{" "}
            <p className="label">{"Pricing"}
            </p>{" "}
            <h1 id="pr-title">{"Pay for the page. Never a cut of the money."}
            </h1>{" "}
            <p className="lede">{"Fundu charges a small daily fee to host your page. Everything supporters send goes straight to your bank account, all of it."}
            </p>{" "}
            <ul className="promises">
              <li>
                <svg className="pr-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>{"No percentage fee"}
              </li>
              <li>
                <svg className="pr-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>{"No subscription"}
              </li>
              <li>
                <svg className="pr-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>{"No card needed now"}
              </li>
            </ul>{" "}
          </div>{" "}
          <div className="prcard" aria-labelledby="pc-h">{" "}
            <span className="pr-badge">
              <svg className="pr-bi" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M194.82,151.43l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0l-20.3-55.09-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3A7.92,7.92,0,0,1,194.82,151.43Z" opacity="0.2" />
                <path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z" />
              </svg>{"Early access"}
            </span>{" "}
            <h2 id="pc-h" className="sr">{"Hosting price"}
            </h2>{" "}
            <div className="pr-now">
              <b>{"₦0"}
              </b>
              <span>{"right now"}
              </span>
            </div>{" "}
            <p className="pr-was">{"Normally "}
              <b>{"₦100"}
              </b>{" per day your page is up"}
            </p>{" "}
            <ul className="pr-inc">
              <li>
                <svg className="pr-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>
                <span>{"A page with your story, photos and video links"}
                </span>
              </li>
              <li>
                <svg className="pr-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>
                <span>{"One link to share anywhere"}
                </span>
              </li>
              <li>
                <svg className="pr-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>
                <span>{"Public or Private, your choice"}
                </span>
              </li>
              <li>
                <svg className="pr-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>
                <span>{"Updates and progress for your supporters"}
                </span>
              </li>
              <li>
                <svg className="pr-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>
                <span>{"A place on Explore if you go Public"}
                </span>
              </li>
              <li>
                <svg className="pr-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>
                <span>{"Reporting and review if something looks wrong"}
                </span>
              </li>
              <li>
                <svg className="pr-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>
                <span>{"Help Centre and support by message"}
                </span>
              </li>
            </ul>{" "}
            <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
            </a>{" "}
            <p className="pr-fine">{"No payment is collected during early access."}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" aria-labelledby="calc-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Work it out"}
              </p>
              <h2 id="calc-h">{"How much would my page cost?"}
              </h2>
            </div>
            <p className="lede">{"You choose how long your page runs. Move the slider to see what hosting will cost once early access ends."}
            </p>
          </div>{" "}
          <div className="calc">{" "}
            <div className="calc-in">{" "}
              <label htmlFor="calcDays" className="calc-l">{"How long will your page run?"}
              </label>{" "}
              <div className="calc-days">
                <b id="calcOut">{"30"}
                </b>{" days"}
              </div>{" "}
              <input type="range" id="calcDays" min="7" max="180" step="1" defaultValue="30" aria-describedby="calcHint" />{" "}
              <div className="calc-scale" aria-hidden="true">
                <span>{"1 week"}
                </span>
                <span>{"6 months"}
                </span>
              </div>{" "}
              <div className="calc-presets" role="group" aria-label="Quick choices">
                <button type="button" data-d="14">{"2 weeks"}
                </button>
                <button type="button" data-d="30" aria-pressed="true">{"1 month"}
                </button>
                <button type="button" data-d="60">{"2 months"}
                </button>
                <button type="button" data-d="90">{"3 months"}
                </button>
              </div>{" "}
              <p className="calc-hint" id="calcHint">{"Your page’s end date sets the number of days."}
              </p>{" "}
            </div>{" "}
            <div className="calc-out" aria-live="polite">{" "}
              <div className="co-row">
                <span>
                  <b id="coDays">{"30"}
                  </b>{" days × ₦100"}
                </span>
                <b id="coTotal">{"₦3,000"}
                </b>
              </div>{" "}
              <div className="co-row early">
                <span>
                  <svg className="pr-bi" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M194.82,151.43l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0l-20.3-55.09-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3A7.92,7.92,0,0,1,194.82,151.43Z" opacity="0.2" />
                    <path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z" />
                  </svg>{"During early access"}
                </span>
                <b>{"₦0"}
                </b>
              </div>{" "}
              <div className="co-cmp">
                <span className="co-l">{"For comparison"}
                </span>
                <p>{"If a platform took a "}
                  <b>{"5%"}
                  </b>{" cut of "}
                  <b>{"₦1,000,000"}
                  </b>{" raised, that would be "}
                  <b>{"₦50,000"}
                  </b>{". On Fundu, the same page for "}
                  <b id="coDays2">{"30"}
                  </b>{" days would cost "}
                  <b id="coTotal2">{"₦3,000"}
                  </b>{", and nothing extra however much you raise."}
                </p>
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec night" aria-labelledby="pr-why-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Why a daily fee"}
              </p>
              <h2 id="pr-why-h">{"Your success shouldn’t cost you more."}
              </h2>
            </div>
            <p className="lede">{"With a percentage fee, the more people give, the more the platform takes. With Fundu, the price stays the same whether you raise ₦50,000 or ₦5,000,000."}
            </p>
          </div>{" "}
          <div className="pr-why">{" "}
            <div className="pw rv">
              <svg className="pw-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM204,56a28,28,0,0,0-12,2.71h0A28,28,0,1,0,176,85.29h0A28,28,0,1,0,204,56Z" opacity="0.2" />
                <path d="M230.33,141.06a24.43,24.43,0,0,0-21.24-4.23l-41.84,9.62A28,28,0,0,0,140,112H89.94a31.82,31.82,0,0,0-22.63,9.37L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9ZM164,96a36,36,0,0,0,5.9-.48,36,36,0,1,0,28.22-47A36,36,0,1,0,164,96Zm60-12a20,20,0,1,1-20-20A20,20,0,0,1,224,84ZM164,40a20,20,0,0,1,19.25,14.61,36,36,0,0,0-15,24.93A20.42,20.42,0,0,1,164,80a20,20,0,0,1,0-40Z" />
              </svg>
              <h3>{"Every naira is yours"}
              </h3>
              <p>{"Supporters send money straight to your account. Fundu never holds it, so it can’t take a share."}
              </p>
            </div>{" "}
            <div className="pw rv">
              <svg className="pw-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M216,48V88H40V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2" />
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z" />
              </svg>
              <h3>{"You only pay for the days you need"}
              </h3>
              <p>{"A two-week emergency costs less than a six-month building project. You choose the end date."}
              </p>
            </div>{" "}
            <div className="pw rv">
              <svg className="pw-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2" />
                <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
              </svg>
              <h3>{"No surprises"}
              </h3>
              <p>{"You see the exact amount before you publish. No hidden charges, no automatic renewals."}
              </p>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec faqsec" id="pr-faq" aria-labelledby="pr-faq-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Common questions"}
              </p>
              <h2 id="pr-faq-h">{"Questions about cost"}
              </h2>
            </div>
            <p className="lede">{"Quick answers to what people ask most."}
            </p>
          </div>{" "}
          <div className="hq-wrap">
            <div className="hq-list">
              <details className="hq">
                <summary>
                  <span>{"Is it really free right now?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes. During early access, hosting costs ₦0 and no payment is collected. You don’t need a card to publish."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Do supporters pay anything to Fundu?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"No. Fundu charges supporters nothing. Their bank may charge its normal transfer fee, the same as any other transfer."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Does Fundu take a percentage of what I raise?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Never. Supporters send money straight to your bank account, so there’s nothing for Fundu to take a cut from."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"When will I pay once early access ends?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"You’ll pay for the number of days you choose when you publish, and you’ll see the exact amount before you confirm. We’ll tell you before paid hosting starts."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"What if I end my page early?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"You can end your page whenever you reach your goal. Hosting already used isn’t refunded. Any refund for unused days follows the terms shown when you pay."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"I have a discount code. Where do I use it?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Add it on the Publish step, below the hosting fee. You’ll see the discount before you publish."}
                </p>
              </details>
            </div>
            <aside className="hq-side">
              <span className="hq-si">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M231.66,213.73a8,8,0,0,1-9.93,9.93L194,215.5A72.05,72.05,0,0,1,92.06,175.89h0c1.31.07,2.62.11,3.94.11a72,72,0,0,0,67.93-95.88h0A72,72,0,0,1,223.5,186Z" opacity="0.2" />
                  <path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z" />
                </svg>
              </span>
              <b>{"Have a different question?"}
              </b>
              <p>{"Search the Help Centre, or send us a message and we’ll help."}
              </p>
              <div className="hq-sa">
                <a className="fs-btn btn-primary" href="/help">{"Visit Help Centre"}
                </a>
                <a className="hq-sl" href="/contact">{"Contact us"}
                </a>
              </div>
            </aside>
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}
