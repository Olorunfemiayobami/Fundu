/* Fundu marketing website. Markup is the approved design's, converted to
   JSX without changes to structure, classes or copy.
   Internal links are plain <a> on purpose: each marketing page starts its own
   motion script on a fresh load, so client-side routing isn't used here. */

export default function AboutView() {
  return (
    <>
    <main className="view" data-view="about" aria-labelledby="ab-title">{" "}
      <section className="abhero">{" "}
        <div className="fs-wrap abhero-in">{" "}
          <div>{" "}
            <p className="label">{"About us"}
            </p>{" "}
            <h1 id="ab-title">{"Give every goal a place of its own."}
            </h1>{" "}
            <p className="lede">{"Raising money often starts with a WhatsApp message, a flyer or an account number shared with friends and family. Fundu gives that goal one proper page, and one link to share, so the people who care about it can understand it and help."}
            </p>{" "}
          </div>{" "}
          <div className="ab-stamp" aria-hidden="true">
            <span>{"Made in"}
            </span>
            <b>{"Nigeria"}
            </b>
            <span>{"for goals everywhere"}
            </span>
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" aria-labelledby="ab-why-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Why Fundu exists"}
              </p>
              <h2 id="ab-why-h">{"Fundraising works. Keeping it together doesn’t."}
              </h2>
            </div>
            <p className="lede">{"The story ends up in one place, the account number in another, the updates somewhere else. Supporters keep asking the same questions, and the person raising money keeps answering them."}
            </p>
          </div>{" "}
          <div className="ab-vs">{" "}
            <div className="ab-before rv">
              <span className="ab-tag">{"Without Fundu"}
              </span>
              <ul className="ab-mess">
                <li style={{"--r": "1deg"}}>{"A flyer on your status"}
                </li>
                <li style={{"--r": "-2deg"}}>{"Your account number in another message"}
                </li>
                <li style={{"--r": "3deg"}}>{"“What happened?” in every group"}
                </li>
                <li style={{"--r": "-1deg"}}>{"“Which account again?”"}
                </li>
                <li style={{"--r": "2deg"}}>{"“How much is left?”"}
                </li>
                <li style={{"--r": "-3deg"}}>{"An update nobody sees"}
                </li>
              </ul>
            </div>{" "}
            <span className="ab-arrow" aria-hidden="true">
              <svg className="ab-ai" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M216,128l-72,72V56Z" opacity="0.2" />
                <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
              </svg>
            </span>{" "}
            <div className="ab-after rv">
              <span className="ab-tag on">{"With Fundu"}
              </span>
              <div className="ab-page">
                <b>{"One page"}
                </b>
                <span>{"Your story, photos, goal, progress, bank details and updates, together."}
                </span>
                <div className="ab-pill">
                  <svg className="ab-li" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M209.94,113.94l-96,96a48,48,0,0,1-67.88-67.88l96-96a48,48,0,0,1,67.88,67.88Z" opacity="0.2" />
                    <path d="M165.66,90.34a8,8,0,0,1,0,11.32l-64,64a8,8,0,0,1-11.32-11.32l64-64A8,8,0,0,1,165.66,90.34ZM215.6,40.4a56,56,0,0,0-79.2,0L106.34,70.45a8,8,0,0,0,11.32,11.32l30.06-30a40,40,0,0,1,56.57,56.56l-30.07,30.06a8,8,0,0,0,11.31,11.32L215.6,119.6a56,56,0,0,0,0-79.2ZM138.34,174.22l-30.06,30.06a40,40,0,1,1-56.56-56.57l30.05-30.05a8,8,0,0,0-11.32-11.32L40.4,136.4a56,56,0,0,0,79.2,79.2l30.06-30.07a8,8,0,0,0-11.32-11.31Z" />
                  </svg>{"One link to share"}
                </div>
              </div>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec night" aria-labelledby="ab-bel-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"What we believe"}
              </p>
              <h2 id="ab-bel-h">{"Five beliefs behind every page."}
              </h2>
            </div>
            <p className="lede">{"They shape what we build, and what we refuse to build."}
            </p>
          </div>{" "}
          <ul className="rl-must ab-vals">
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128A96,96,0,0,1,79.93,211.11h0L42.54,223.58a8,8,0,0,1-10.12-10.12l12.47-37.39h0A96,96,0,1,1,224,128Z" opacity="0.2" />
                  <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-4-1.08,7.85,7.85,0,0,0-2.53.42L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Zm12-88a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm-44,0a12,12,0,1,1-12-12A12,12,0,0,1,96,128Zm88,0a12,12,0,1,1-12-12A12,12,0,0,1,184,128Z" />
                </svg>
              </span>
              <div>
                <b>{"People already raise money. We make it clearer."}
                </b>
                <span>{"Fundraising already happens in group chats, churches and families. Fundu doesn’t ask you to change that. It gives what you’re already doing a proper home."}
                </span>
              </div>
            </li>
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z" opacity="0.2" />
                  <path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" />
                </svg>
              </span>
              <div>
                <b>{"Asking for help should feel dignified"}
                </b>
                <span>{"Asking for money can feel uncomfortable. Your page should help you explain your situation with dignity, never make it feel like begging."}
                </span>
              </div>
            </li>
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M56,88l32,80c0,17.67-20,24-32,24s-32-6.33-32-24ZM200,56l-32,80c0,17.67,20,24,32,24s32-6.33,32-24Z" opacity="0.2" />
                  <path d="M239.43,133l-32-80h0a8,8,0,0,0-9.16-4.84L136,62V40a8,8,0,0,0-16,0V65.58L54.26,80.19A8,8,0,0,0,48.57,85h0v.06L16.57,165a7.92,7.92,0,0,0-.57,3c0,23.31,24.54,32,40,32s40-8.69,40-32a7.92,7.92,0,0,0-.57-3L66.92,93.77,120,82V208H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16H136V78.42L187,67.1,160.57,133a7.92,7.92,0,0,0-.57,3c0,23.31,24.54,32,40,32s40-8.69,40-32A7.92,7.92,0,0,0,239.43,133ZM56,184c-7.53,0-22.76-3.61-23.93-14.64L56,109.54l23.93,59.82C78.76,180.39,63.53,184,56,184Zm144-32c-7.53,0-22.76-3.61-23.93-14.64L200,77.54l23.93,59.82C222.76,148.39,207.53,152,200,152Z" />
                </svg>
              </span>
              <div>
                <b>{"Trust comes from clarity"}
                </b>
                <span>{"Who’s asking, what it’s for, how far you’ve come and where money goes. When all of that is clear, people feel safe to give."}
                </span>
              </div>
            </li>
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M184,128a56,56,0,1,1-56-56A56,56,0,0,1,184,128Z" opacity="0.2" />
                  <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
                </svg>
              </span>
              <div>
                <b>{"Not every goal is a hard one"}
                </b>
                <span>{"Some goals are urgent. Many are hopeful: school, a first album, a new shop, a wedding. Every one of them deserves a page."}
                </span>
              </div>
            </li>
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M216,96V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H208A8,8,0,0,1,216,96Z" opacity="0.2" />
                  <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z" />
                </svg>
              </span>
              <div>
                <b>{"Your money is yours"}
                </b>
                <span>{"Support goes straight to your account. Fundu doesn’t hold it, delay it or take a cut of it."}
                </span>
              </div>
            </li>
          </ul>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec tint-teal" aria-labelledby="ab-nev-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Our promises"}
              </p>
              <h2 id="ab-nev-h">{"Things Fundu will never do."}
              </h2>
            </div>
            <p className="lede">{"It would be easy to look bigger or sound safer than we are. We’d rather earn trust the slow way."}
            </p>
          </div>{" "}
          <ul className="rl-no">
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Hold your money or pretend to be a bank or wallet"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Take a percentage of what your supporters send"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Say a total is verified when the organizer reported it"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Promise that a page will reach its goal"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Make up numbers, reviews or partners to look bigger"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Publish anything on your page without your say-so"}
              </span>
            </li>
          </ul>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" aria-labelledby="ab-who-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Who’s building Fundu"}
              </p>
              <h2 id="ab-who-h">{"Built in Nigeria, step by step."}
              </h2>
            </div>
            <p className="lede">{"Fundu is in early access. We’re starting in Nigeria, listening closely, and improving it with the people who use it."}
            </p>
          </div>{" "}
          <div className="fs-ab-who">{" "}
            <article className="fs-ab-founder rv">{" "}
              <img className="ab-av" src="/site/img-b4f63d3fa5c0.jpg" alt="Ayobami Joshua Olorunfemi, founder of Fundu" />{" "}
              <div>
                <h3>{"Ayobami Joshua Olorunfemi"}
                </h3>
                <p className="ab-role">{"Founder"}
                </p>
                <p>{"A product designer and design engineer based in Nigeria. Ayobami designs and builds Fundu, from the first sketch to the code behind every page."}
                </p>
              </div>{" "}
            </article>{" "}
            <article className="ab-next rv">{" "}
              <h3>
                <svg className="ab-ni" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M128,32a96,96,0,1,0,96,96A96,96,0,0,0,128,32Zm16,112L80,176l32-64,64-32Z" opacity="0.2" />
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z" />
                </svg>{"Where we’re going"}
              </h3>{" "}
              <ul className="ts-list">{" "}
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  <span>{"Now: early access in Nigeria, with bank transfers"}
                  </span>
                </li>{" "}
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M160,72V216L96,184V40Z" opacity="0.2" />
                    <path d="M228.92,49.69a8,8,0,0,0-6.86-1.45L160.93,63.52,99.58,32.84a8,8,0,0,0-5.52-.6l-64,16A8,8,0,0,0,24,56V200a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8.15,8.15,0,0,0,160,224a8,8,0,0,0,1.94-.24l64-16A8,8,0,0,0,232,200V56A8,8,0,0,0,228.92,49.69ZM104,52.94l48,24V203.06l-48-24ZM40,62.25l48-12v127.5l-48,12Zm176,131.5-48,12V78.25l48-12Z" />
                  </svg>
                  <span>{"Next: more African countries, starting with our neighbours"}
                  </span>
                </li>{" "}
                <li>
                  <svg className="ts-tick" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM204,56a28,28,0,0,0-12,2.71h0A28,28,0,1,0,176,85.29h0A28,28,0,1,0,204,56Z" opacity="0.2" />
                    <path d="M230.33,141.06a24.43,24.43,0,0,0-21.24-4.23l-41.84,9.62A28,28,0,0,0,140,112H89.94a31.82,31.82,0,0,0-22.63,9.37L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9ZM164,96a36,36,0,0,0,5.9-.48,36,36,0,1,0,28.22-47A36,36,0,1,0,164,96Zm60-12a20,20,0,1,1-20-20A20,20,0,0,1,224,84ZM164,40a20,20,0,0,1,19.25,14.61,36,36,0,0,0-15,24.93A20.42,20.42,0,0,1,164,80a20,20,0,0,1,0-40Z" />
                  </svg>
                  <span>{"Later: more ways to receive money, like mobile money"}
                  </span>
                </li>{" "}
              </ul>{" "}
              <p className="ab-fine">{"These are plans, not promises. We’ll share news here as it happens."}
              </p>{" "}
            </article>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}
