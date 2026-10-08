/* Fundu marketing website. Markup is the approved design's, converted to
   JSX without changes to structure, classes or copy.
   Internal links are plain <a> on purpose: each marketing page starts its own
   motion script on a fresh load, so client-side routing isn't used here. */
/* eslint-disable @next/next/no-html-link-for-pages */

export default function HowItWorksView() {
  return (
    <>
    <main className="view" data-view="how" aria-labelledby="hw-title">{" "}
      <section className="hwhero">{" "}
        <div className="fs-wrap hwhero-in">{" "}
          <div>{" "}
            <p className="label">{"How it works"}
            </p>{" "}
            <h1 id="hw-title">{"One page. One link. Money straight to you."}
            </h1>{" "}
            <p className="lede">{"Here’s everything that happens, from the moment you decide to ask for help to the moment support lands in your account."}
            </p>{" "}
            <div className="actions">
              <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
              </a>
              <a className="fs-btn btn-ghost" href="#hw-faq">{"Read the questions first"}
              </a>
            </div>{" "}
          </div>{" "}
          <nav className="hwjump" aria-label="On this page">{" "}
            <a href="#hw-org">
              <span>{"01"}
              </span>{"If you’re raising money"}
            </a>{" "}
            <a href="#hw-sup">
              <span>{"02"}
              </span>{"If you’re supporting someone"}
            </a>{" "}
            <a href="#hw-money">
              <span>{"03"}
              </span>{"Where the money goes"}
            </a>{" "}
            <a href="#hw-faq">
              <span>{"04"}
              </span>{"Common questions"}
            </a>{" "}
          </nav>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" id="hw-org" aria-labelledby="hw-org-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"If you’re raising money"}
              </p>
              <h2 id="hw-org-h">{"From idea to live page in six steps."}
              </h2>
            </div>
            <p className="lede">{"No forms to send to a bank, no wallet to set up. Most of it is writing your story, and you can save and come back any time."}
            </p>
          </div>{" "}
          <ol className="hw-steps">
            <li className="hw-step rv">{" "}
              <div className="hw-text">
                <span className="hw-num">{"01"}
                </span>
                <h3>{"Create your account"}
                </h3>
                <p>{"Sign up with your email or your Google account. It takes a minute, and you only do it once."}
                </p>
                <ul className="hw-pts">
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Must be 18 or older to organize"}
                    </span>
                  </li>
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"You can raise money for someone else with their permission"}
                    </span>
                  </li>
                </ul>
              </div>{" "}
              <div className="hw-vis" aria-hidden="true">
                <div className="mk">
                  <b className="mk-t">{"Create your Fundu account"}
                  </b>
                  <span className="mk-g">
                    <svg className="mk-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z" opacity="0.2" />
                      <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z" />
                    </svg>{"Continue with Google"}
                  </span>
                  <span className="mk-or">{"or"}
                  </span>
                  <span className="mk-in">{"you@email.com"}
                  </span>
                  <span className="mk-btn">{"Continue with email"}
                  </span>
                </div>
              </div>{" "}
            </li>
            <li className="hw-step flip rv">{" "}
              <div className="hw-text">
                <span className="hw-num">{"02"}
                </span>
                <h3>{"Add the basics"}
                </h3>
                <p>{"Give your page a clear title, choose a category, set how much you need and pick an end date. Add a cover photo that shows who or what this is for."}
                </p>
                <ul className="hw-pts">
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Your goal can be any amount"}
                    </span>
                  </li>
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"You decide how long the page runs"}
                    </span>
                  </li>
                </ul>
              </div>{" "}
              <div className="hw-vis" aria-hidden="true">
                <div className="mk">
                  <b className="mk-t">{"The basics"}
                  </b>
                  <span className="mk-l">{"Title"}
                  </span>
                  <span className="mk-in strong">{"Help Tobi Finish University"}
                    <i className="caret"></i>
                  </span>
                  <div className="mk-row">
                    <span>
                      <span className="mk-l">{"Goal"}
                      </span>
                      <span className="mk-in">{"₦1,000,000"}
                      </span>
                    </span>
                    <span>
                      <span className="mk-l">{"Category"}
                      </span>
                      <span className="mk-in">{"Education"}
                      </span>
                    </span>
                  </div>
                  <span className="mk-l">{"End date"}
                  </span>
                  <span className="mk-in">
                    <svg className="mk-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                    </svg>{"30 November 2026"}
                  </span>
                </div>
              </div>{" "}
            </li>
            <li className="hw-step rv">{" "}
              <div className="hw-text">
                <span className="hw-num">{"03"}
                </span>
                <h3>{"Tell your story"}
                </h3>
                <p>{"Explain what happened, who the money is for and how it will be used. Add photos and video links. A clear, honest story is what makes people give."}
                </p>
                <ul className="hw-pts">
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Write it in your own words"}
                    </span>
                  </li>
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Break the goal down so people see where money goes"}
                    </span>
                  </li>
                </ul>
              </div>{" "}
              <div className="hw-vis" aria-hidden="true">
                <div className="mk">
                  <b className="mk-t">{"Your story"}
                  </b>
                  <span className="mk-blk">
                    <b>{"What happened"}
                    </b>{"I got into university to study engineering, but my family can’t cover the final-year fees…"}
                  </span>
                  <span className="mk-blk ph">
                    <svg className="mk-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,56V178.06l-39.72-39.72a8,8,0,0,0-11.31,0L147.31,164,97.66,114.34a8,8,0,0,0-11.32,0L32,168.69V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z" opacity="0.2" />
                      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z" />
                    </svg>{"Photo"}
                  </span>
                  <span className="mk-add">
                    <svg className="mk-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z" opacity="0.2" />
                      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
                    </svg>{"Add a section, text, photo or video link"}
                  </span>
                </div>
              </div>{" "}
            </li>
            <li className="hw-step flip rv">{" "}
              <div className="hw-text">
                <span className="hw-num">{"04"}
                </span>
                <h3>{"Add where to receive money"}
                </h3>
                <p>{"Add the bank account supporters should send money to. These details show on your page, so people can copy them in one tap."}
                </p>
                <ul className="hw-pts">
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Money goes straight to that account"}
                    </span>
                  </li>
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Fundu never asks for your PIN, password or OTP"}
                    </span>
                  </li>
                </ul>
              </div>{" "}
              <div className="hw-vis" aria-hidden="true">
                <div className="mk">
                  <b className="mk-t">{"Where to receive support"}
                  </b>
                  <div className="mk-bank">
                    <span className="mk-l">{"Bank"}
                    </span>
                    <b>{"First Bank"}
                    </b>
                    <span className="mk-l">{"Account number"}
                    </span>
                    <b className="mono">{"0123456789"}
                    </b>
                    <span className="mk-l">{"Account name"}
                    </span>
                    <b>{"Tobi Adeyemi"}
                    </b>
                  </div>
                  <span className="mk-note">
                    <svg className="mk-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2" />
                      <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                    </svg>{"These details appear on your page so supporters can send money."}
                  </span>
                  <span className="mk-note ok">
                    <svg className="mk-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M216,96V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H208A8,8,0,0,1,216,96Z" opacity="0.2" />
                      <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z" />
                    </svg>{"We never ask for your PIN, password or OTP."}
                  </span>
                </div>
              </div>{" "}
            </li>
            <li className="hw-step rv">{" "}
              <div className="hw-text">
                <span className="hw-num">{"05"}
                </span>
                <h3>{"Choose who can find it, then publish"}
                </h3>
                <p>{"Make your page Public so anyone can find it on Explore, or Private so only people with the link can see it. Check the hosting fee and publish."}
                </p>
                <ul className="hw-pts">
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Hosting is ₦100 a day, free during early access"}
                    </span>
                  </li>
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Private hides it from Explore, but it isn’t secret"}
                    </span>
                  </li>
                </ul>
              </div>{" "}
              <div className="hw-vis" aria-hidden="true">
                <div className="mk">
                  <b className="mk-t">{"Ready to publish"}
                  </b>
                  <div className="mk-vis">
                    <span className="on">
                      <svg className="mk-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                        <path d="M213.09,172.48a96,96,0,0,1-80.41,51.41l3.17-16.44a8,8,0,0,0-2-6.95l-19.74-20.33a8,8,0,0,1-1.44-8.69l13.7-30.74a8,8,0,0,1,8.38-4.67l22.82,3.08a8.11,8.11,0,0,1,3.12,1.11ZM116.71,95,129,88.24a7.46,7.46,0,0,0,1.5-1.07l26.91-24.33A8,8,0,0,0,159,53l-10.5-18.81A96.62,96.62,0,0,0,128,32,95.61,95.61,0,0,0,67.78,53.23L56,81.08A8,8,0,0,0,55.88,87l11.5,30.67a8,8,0,0,0,5.81,5l2.69.58L89.2,100a8,8,0,0,1,6.94-4h16.71A7.9,7.9,0,0,0,116.71,95Z" opacity="0.2" />
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.62,87.62,0,0,1-6.4,32.94l-44.7-27.49a15.92,15.92,0,0,0-6.24-2.23l-22.82-3.08a16.11,16.11,0,0,0-16,7.86h-8.72l-3.8-7.86a15.91,15.91,0,0,0-11-8.67l-8-1.73L96.14,104h16.71a16.06,16.06,0,0,0,7.73-2l12.25-6.76a16.62,16.62,0,0,0,3-2.14l26.91-24.34A15.93,15.93,0,0,0,166,49.1l-.36-.65A88.11,88.11,0,0,1,216,128ZM143.31,41.34,152,56.9,125.09,81.24,112.85,88H96.14a16,16,0,0,0-13.88,8l-8.73,15.23L63.38,84.19,74.32,58.32a87.87,87.87,0,0,1,69-17ZM40,128a87.53,87.53,0,0,1,8.54-37.8l11.34,30.27a16,16,0,0,0,11.62,10l21.43,4.61L96.74,143a16.09,16.09,0,0,0,14.4,9h1.48l-7.23,16.23a16,16,0,0,0,2.86,17.37l.14.14L128,205.94l-1.94,10A88.11,88.11,0,0,1,40,128Zm102.58,86.78,1.13-5.81a16.09,16.09,0,0,0-4-13.9,1.85,1.85,0,0,1-.14-.14L120,174.74,133.7,144l22.82,3.08,45.72,28.12A88.18,88.18,0,0,1,142.58,214.78Z" />
                      </svg>
                      <b>{"Public"}
                      </b>
                      <small>{"Shown on Explore"}
                      </small>
                    </span>
                    <span>
                      <svg className="mk-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                        <path d="M216,96V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H208A8,8,0,0,1,216,96Z" opacity="0.2" />
                        <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z" />
                      </svg>
                      <b>{"Private"}
                      </b>
                      <small>{"Only people with the link"}
                      </small>
                    </span>
                  </div>
                  <div className="mk-fee">
                    <span>{"Hosting, 45 days × ₦100"}
                    </span>
                    <s>{"₦4,500"}
                    </s>
                  </div>
                  <div className="mk-fee tot">
                    <span>{"Early access"}
                    </span>
                    <b>{"₦0"}
                    </b>
                  </div>
                  <span className="mk-btn">{"Publish your page"}
                  </span>
                </div>
              </div>{" "}
            </li>
            <li className="hw-step flip rv">{" "}
              <div className="hw-text">
                <span className="hw-num">{"06"}
                </span>
                <h3>{"Share your link and keep people updated"}
                </h3>
                <p>{"Send your link to family groups, church groups, your status and anywhere people know you. When money comes in, update the amount raised and post news."}
                </p>
                <ul className="hw-pts">
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Every update is a reason to share again"}
                    </span>
                  </li>
                  <li>
                    <svg className="hw-ck" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"End your page early whenever you reach your goal"}
                    </span>
                  </li>
                </ul>
              </div>{" "}
              <div className="hw-vis" aria-hidden="true">
                <div className="mk">
                  <b className="mk-t">{"Share and keep people close"}
                  </b>
                  <span className="mk-link">
                    <svg className="mk-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M209.94,113.94l-96,96a48,48,0,0,1-67.88-67.88l96-96a48,48,0,0,1,67.88,67.88Z" opacity="0.2" />
                      <path d="M165.66,90.34a8,8,0,0,1,0,11.32l-64,64a8,8,0,0,1-11.32-11.32l64-64A8,8,0,0,1,165.66,90.34ZM215.6,40.4a56,56,0,0,0-79.2,0L106.34,70.45a8,8,0,0,0,11.32,11.32l30.06-30a40,40,0,0,1,56.57,56.56l-30.07,30.06a8,8,0,0,0,11.31,11.32L215.6,119.6a56,56,0,0,0,0-79.2ZM138.34,174.22l-30.06,30.06a40,40,0,1,1-56.56-56.57l30.05-30.05a8,8,0,0,0-11.32-11.32L40.4,136.4a56,56,0,0,0,79.2,79.2l30.06-30.07a8,8,0,0,0-11.32-11.31Z" />
                    </svg>{"Your page link"}
                    <em>{"Copied"}
                    </em>
                  </span>
                  <div className="mk-chats">
                    <span>{"Family group"}
                    </span>
                    <span>{"Church friends"}
                    </span>
                    <span>{"My status"}
                    </span>
                  </div>
                  <span className="mk-upd">
                    <b>{"Update"}
                    </b>{"Paid my second-semester fees today. Thank you!"}
                  </span>
                </div>
              </div>{" "}
            </li>
          </ol>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec tint-teal" id="hw-sup" aria-labelledby="hw-sup-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"If you’re supporting someone"}
              </p>
              <h2 id="hw-sup-h">{"Giving takes about a minute."}
              </h2>
            </div>
            <p className="lede">{"Supporters don’t need an app or an account. They read the page and send money the way they already do, from their own bank."}
            </p>
          </div>{" "}
          <ol className="hw-sups">
            <li className="hw-sup rv">
              <span className="hw-sic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z" opacity="0.2" />
                  <path d="M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </span>
              <span className="hw-sn">{"1"}
              </span>
              <h3>{"Open the link"}
              </h3>
              <p>{"A friend shares a Fundu link in a chat or on social media. Opening it needs no app and no account."}
              </p>
            </li>
            <li className="hw-sup rv">
              <span className="hw-sic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M232,56V200H160a32,32,0,0,0-32,32V88a32,32,0,0,1,32-32Z" opacity="0.2" />
                  <path d="M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64ZM160,88h40a8,8,0,0,1,0,16H160a8,8,0,0,1,0-16Zm48,40a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,128Zm0,32a8,8,0,0,1-8,8H160a8,8,0,0,1,0-16h40A8,8,0,0,1,208,160Z" />
                </svg>
              </span>
              <span className="hw-sn">{"2"}
              </span>
              <h3>{"Read the story"}
              </h3>
              <p>{"See what happened, who is organizing, how much is needed and how far they’ve come."}
              </p>
            </li>
            <li className="hw-sup rv">
              <span className="hw-sic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM204,56a28,28,0,0,0-12,2.71h0A28,28,0,1,0,176,85.29h0A28,28,0,1,0,204,56Z" opacity="0.2" />
                  <path d="M230.33,141.06a24.43,24.43,0,0,0-21.24-4.23l-41.84,9.62A28,28,0,0,0,140,112H89.94a31.82,31.82,0,0,0-22.63,9.37L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9ZM164,96a36,36,0,0,0,5.9-.48,36,36,0,1,0,28.22-47A36,36,0,1,0,164,96Zm60-12a20,20,0,1,1-20-20A20,20,0,0,1,224,84ZM164,40a20,20,0,0,1,19.25,14.61,36,36,0,0,0-15,24.93A20.42,20.42,0,0,1,164,80a20,20,0,0,1,0-40Z" />
                </svg>
              </span>
              <span className="hw-sn">{"3"}
              </span>
              <h3>{"Send money directly"}
              </h3>
              <p>{"Copy the account number and send a bank transfer from your own bank app. It goes straight to the organizer."}
              </p>
            </li>
            <li className="hw-sup rv">
              <span className="hw-sic">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M208,200a32,32,0,1,1-32-32A32,32,0,0,1,208,200ZM176,88a32,32,0,1,0-32-32A32,32,0,0,0,176,88Z" opacity="0.2" />
                  <path d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z" />
                </svg>
              </span>
              <span className="hw-sn">{"4"}
              </span>
              <h3>{"Share it on"}
              </h3>
              <p>{"Pass the link to people who might help. Sharing is support too."}
              </p>
            </li>
          </ol>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec night" id="hw-money" aria-labelledby="hw-money-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Where the money goes"}
              </p>
              <h2 id="hw-money-h">{"Fundu gives you the page. The money is all yours."}
              </h2>
            </div>
            <p className="lede">{"Being clear about what we do, and what we don’t, is how people can trust your page."}
            </p>
          </div>{" "}
          <div className="hw-dd">{" "}
            <div className="hw-col does rv">
              <h3>
                <svg className="hw-hic" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>{"What Fundu does"}
              </h3>
              <ul>
                <li>
                  <svg className="hw-yes" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Gives your goal a page and one link to share"}
                  </span>
                </li>
                <li>
                  <svg className="hw-yes" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Shows your page on Explore if you make it Public"}
                  </span>
                </li>
                <li>
                  <svg className="hw-yes" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Lets anyone report a page that looks wrong, and reviews reports"}
                  </span>
                </li>
                <li>
                  <svg className="hw-yes" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Keeps your sign-in and account details private"}
                  </span>
                </li>
              </ul>
            </div>{" "}
            <div className="hw-col doesnt rv">
              <h3>
                <svg className="hw-hic" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>{"What Fundu doesn’t do"}
              </h3>
              <ul>
                <li>
                  <svg className="hw-no" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Hold, process or touch the money"}
                  </span>
                </li>
                <li>
                  <svg className="hw-no" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Take a cut of what supporters send"}
                  </span>
                </li>
                <li>
                  <svg className="hw-no" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Check every claim or confirm the amount raised"}
                  </span>
                </li>
                <li>
                  <svg className="hw-no" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Guarantee that a page will reach its goal"}
                  </span>
                </li>
              </ul>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec faqsec" id="hw-faq" aria-labelledby="hw-faq-h">{" "}
        <div className="fs-wrap hw-faq">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Common questions"}
              </p>
              <h2 id="hw-faq-h">{"Questions before you start"}
              </h2>
            </div>
            <p className="lede">{"Quick answers to what people ask most."}
            </p>
          </div>{" "}
          <div className="hq-wrap">
            <div className="hq-list">
              <details className="hq">
                <summary>
                  <span>{"Do supporters need a Fundu account?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"No. Anyone with the link can read the page and send a transfer. They only need to sign in to leave a comment."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can I raise money for someone else?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes, as long as you have their permission. Your name shows as the organizer, and you can say who the money is for in your story."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"What happens if I don’t reach my goal?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Nothing is lost. Every transfer already went straight to your account, so you keep whatever people send, whether or not you reach the goal."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Why is the amount raised “reported by the organizer”?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Transfers go from supporters’ banks to yours, so Fundu can’t see them. You update the total yourself, and your page says so."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can I change my page after publishing?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes. You can edit your story and photos, update the amount raised, post news, and end the page early when you’re done."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"How much does it cost?"}
                  </span>
                  <svg className="hq-c" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Hosting is ₦100 for each day your page is up. During early access it’s free. Fundu never takes a percentage of what supporters send."}
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
