/* Fundu marketing website. Markup is the approved design's, converted to
   JSX without changes to structure, classes or copy.
   Internal links are plain <a> on purpose: each marketing page starts its own
   motion script on a fresh load, so client-side routing isn't used here. */
/* eslint-disable @next/next/no-html-link-for-pages */

export default function GuidesView() {
  return (
    <>
    <main className="view" data-view="guides" aria-labelledby="gd-title">{" "}
      <section className="tshero">{" "}
        <div className="fs-wrap">{" "}
          <p className="label">{"Tips & guides"}
          </p>{" "}
          <h1 id="gd-title">{"Raise more with a page people trust."}
          </h1>{" "}
          <p className="lede">{"Short, practical guides for every step: writing your story, sharing your link, posting updates and saying thank you."}
          </p>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" aria-labelledby="gd-list-h">{" "}
        <div className="fs-wrap">{" "}
          <h2 id="gd-list-h" className="sr">{"All guides"}
          </h2>{" "}
          <a className="gd-feature" href="/guides/story">{" "}
            <div>
              <span className="gd-start">{"Start here"}
              </span>
              <h3>{"How to write a story people want to support"}
              </h3>
              <p>{"Your story does the asking for you. Make it clear, honest and easy to share."}
              </p>
              <span className="gd-meta">
                <svg className="gd-mi" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                </svg>{"4 min read"}
              </span>
            </div>{" "}
            <span className="gd-fbtn">{"Read guide"}
              <svg className="gd-ai" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M216,128l-72,72V56Z" opacity="0.2" />
                <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
              </svg>
            </span>{" "}
            <span className="gd-fic" aria-hidden="true">
              <svg className="gd-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z" opacity="0.2" />
                <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM79.32,188,164,103.31,180.69,120,96,204.69ZM68,176.69,51.31,160,136,75.31,152.69,92Zm-20,2.62L76.69,208H48Zm144-70.62L147.32,64l24-24L216,84.69Z" />
              </svg>
            </span>{" "}
          </a>{" "}
          <div className="gd-grid">
            <a className="gd-card" href="/guides/cover">
              <span className="ts-ic">
                <svg className="gd-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M208,64H176L160,40H96L80,64H48A16,16,0,0,0,32,80V192a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V80A16,16,0,0,0,208,64ZM128,168a36,36,0,1,1,36-36A36,36,0,0,1,128,168Z" opacity="0.2" />
                  <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z" />
                </svg>
              </span>
              <h3>{"How to choose a cover photo"}
              </h3>
              <p>{"The first thing people see when your link is shared. Make it count."}
              </p>
              <span className="gd-meta">
                <svg className="gd-mi" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                </svg>{"2 min read"}
                <span className="gd-go">{"Read guide"}
                  <svg className="gd-ai" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </span>
            </a>
            <a className="gd-card" href="/guides/goal">
              <span className="ts-ic">
                <svg className="gd-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M176,128a48,48,0,1,1-48-48A48,48,0,0,1,176,128Z" opacity="0.2" />
                  <path d="M221.87,83.16A104.1,104.1,0,1,1,195.67,49l22.67-22.68a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32l27.72-27.72a40,40,0,1,0,17.87,31.09,8,8,0,1,1,16-.9,56,56,0,1,1-22.38-41.65L184.3,60.39a87.88,87.88,0,1,0,23.13,29.67,8,8,0,0,1,14.44-6.9Z" />
                </svg>
              </span>
              <h3>{"How to set a goal people trust"}
              </h3>
              <p>{"A goal people can understand is a goal people want to help reach."}
              </p>
              <span className="gd-meta">
                <svg className="gd-mi" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                </svg>{"3 min read"}
                <span className="gd-go">{"Read guide"}
                  <svg className="gd-ai" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </span>
            </a>
            <a className="gd-card" href="/guides/share">
              <span className="ts-ic">
                <svg className="gd-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M128,32A96,96,0,0,0,44.89,176.07L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47A96,96,0,1,0,128,32Zm24,152a80,80,0,0,1-80-80,32,32,0,0,1,32-32l16,32-12.32,18.47a48.19,48.19,0,0,0,25.85,25.85L152,136l32,16A32,32,0,0,1,152,184Z" opacity="0.2" />
                  <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.62-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" />
                </svg>
              </span>
              <h3>{"How to share your page on WhatsApp and beyond"}
              </h3>
              <p>{"Most support comes from people who know you. Here’s how to reach them."}
              </p>
              <span className="gd-meta">
                <svg className="gd-mi" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                </svg>{"4 min read"}
                <span className="gd-go">{"Read guide"}
                  <svg className="gd-ai" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </span>
            </a>
            <a className="gd-card" href="/guides/updates">
              <span className="ts-ic">
                <svg className="gd-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M240,120a40,40,0,0,1-40,40H160V80h40A40,40,0,0,1,240,120Z" opacity="0.2" />
                  <path d="M248,120a48.05,48.05,0,0,0-48-48H160.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,32,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,159.12,214l11,7.33A16,16,0,0,0,194.5,212l11.77-44.36A48.07,48.07,0,0,0,248,120ZM48,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C134.65,155,90.84,164.07,48,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM200,152H168V88h32a32,32,0,1,1,0,64Z" />
                </svg>
              </span>
              <h3>{"How to post updates that bring new support"}
              </h3>
              <p>{"Updates keep supporters close and give you a reason to share again."}
              </p>
              <span className="gd-meta">
                <svg className="gd-mi" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                </svg>{"3 min read"}
                <span className="gd-go">{"Read guide"}
                  <svg className="gd-ai" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </span>
            </a>
            <a className="gd-card" href="/guides/thanks">
              <span className="ts-ic">
                <svg className="gd-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M199,187.76h0A71.67,71.67,0,0,0,190.34,140l-20.2-35a18,18,0,0,0-31.55,17.26L114.71,81A18,18,0,1,0,83.54,99L77.81,89,65.1,67A18,18,0,1,1,96.28,49L102,59a18,18,0,1,1,31.17-18l24.23,42a18,18,0,0,1,31.2-18l21.11,36.57A72,72,0,0,1,199,187.76Z" opacity="0.2" />
                  <path d="M160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0ZM196.1,41a7.91,7.91,0,0,0,4.17,1.17,8,8,0,0,0,6.84-3.83l8-13.11a8,8,0,0,0-13.68-8.33l-8,13.1A8,8,0,0,0,196.1,41Zm47.51,12.59a8,8,0,0,0-10.08-5.16l-15.06,4.85a8,8,0,0,0,2.46,15.62,8.15,8.15,0,0,0,2.46-.39l15.05-4.85A8,8,0,0,0,243.61,53.55ZM217,97.58a80.22,80.22,0,0,1-10.22,94c-.34,1.73-.72,3.46-1.19,5.18A80.17,80.17,0,0,1,58.77,216L23.5,155a26,26,0,0,1,19.24-38.79l-3-5.2a26,26,0,0,1,19.2-38.78L58.24,71A26,26,0,0,1,95.47,36.53,26.06,26.06,0,0,1,140.3,37l12.26,21.2A26.07,26.07,0,0,1,195.81,61ZM109.07,55l0,0h0l25,43.17a26,26,0,0,1,17.33-10L126.42,45a10,10,0,1,0-17.35,10ZM72.12,63l6.46,11.17a26.05,26.05,0,0,1,17.32-10L89.45,53A10,10,0,1,0,72.12,63Zm111.54,81-20.22-35a10,10,0,0,0-17.74,9.25L158.3,140a8,8,0,0,1-13.87,8l-36.5-63A10,10,0,1,0,90.58,95l26.05,45a8,8,0,0,1-13.87,8L71,93h0l0,0a10,10,0,0,0-17.33,10l35.22,61A8,8,0,0,1,75,172L54.72,137a10,10,0,0,0-17.34,10l35.27,61a64.12,64.12,0,0,0,117.42-15.44A63.52,63.52,0,0,0,183.66,144Zm19.41-38.42L181.93,69A10,10,0,0,0,164.55,79l33,57.05A80.2,80.2,0,0,1,207,161.51,64.23,64.23,0,0,0,203.07,105.58Z" />
                </svg>
              </span>
              <h3>{"How to thank your supporters"}
              </h3>
              <p>{"A good thank-you turns supporters into people who’ll help again."}
              </p>
              <span className="gd-meta">
                <svg className="gd-mi" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                </svg>{"2 min read"}
                <span className="gd-go">{"Read guide"}
                  <svg className="gd-ai" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </span>
            </a>
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec night" aria-labelledby="gd-chk-h">{" "}
        <div className="fs-wrap gd-chk">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Before you publish"}
              </p>
              <h2 id="gd-chk-h">{"Your 8-point checklist"}
              </h2>
            </div>
            <p className="lede">{"Tick each one off. Pages with all eight are easier to understand and easier to trust."}
            </p>
          </div>{" "}
          <div className="ck-wrap">
            <ul className="ck-list" id="ckList">
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="ck-box">
                    <svg className="ck-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2" />
                      <path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </span>
                  <span>{"A clear title that says what this is for"}
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="ck-box">
                    <svg className="ck-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2" />
                      <path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </span>
                  <span>{"A bright, real cover photo"}
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="ck-box">
                    <svg className="ck-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2" />
                      <path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </span>
                  <span>{"A story that says what happened in the first lines"}
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="ck-box">
                    <svg className="ck-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2" />
                      <path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </span>
                  <span>{"A breakdown of what the money is for"}
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="ck-box">
                    <svg className="ck-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2" />
                      <path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </span>
                  <span>{"Bank details checked twice"}
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="ck-box">
                    <svg className="ck-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2" />
                      <path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </span>
                  <span>{"Public or Private chosen"}
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="ck-box">
                    <svg className="ck-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2" />
                      <path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </span>
                  <span>{"An end date that fits when you need the money"}
                  </span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="ck-box">
                    <svg className="ck-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2" />
                      <path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                  </span>
                  <span>{"Your first message ready to share"}
                  </span>
                </label>
              </li>
            </ul>
            <div className="ck-side">
              <div className="ck-ring" id="ckRing">
                <b id="ckNum">{"0"}
                </b>
                <span>{"of 8 done"}
                </span>
              </div>
              <p id="ckMsg">{"Start ticking as you go."}
              </p>
              <a className="fs-btn btn-light" href="/create-campaign">{"Create your free page"}
              </a>
            </div>
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}
