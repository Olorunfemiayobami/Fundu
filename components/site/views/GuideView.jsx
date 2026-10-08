/* Fundu marketing website. Markup is the approved design's, converted to
   JSX without changes to structure, classes or copy.
   Internal links are plain <a> on purpose: each marketing page starts its own
   motion script on a fresh load, so client-side routing isn't used here. */
/* eslint-disable @next/next/no-html-link-for-pages */

function GuideViewStory() {
  return (
    <>
    <main aria-labelledby="ga-title" className="view" data-view="guide">{" "}
      <section className="tshero gahero">{" "}
        <div className="fs-wrap">{" "}
          <a className="cat-back" href="/guides">
            <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M112,56V200L40,128Z" opacity="0.2" />
              <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
            </svg>{"All guides"}
          </a>{" "}
          <p className="label">{"Guide"}
          </p>{" "}
          <h1 id="ga-title">{"How to write a story people want to support"}
          </h1>{" "}
          <p className="lede" id="gaLede">{"Your story does the asking for you. Make it clear, honest and easy to share."}
          </p>{" "}
          <span className="gd-meta" id="gaMeta">
            <svg aria-hidden="true" className="gd-mi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
            </svg>{"4 min read"}
          </span>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec">{" "}
        <div className="fs-wrap ga-grid">{" "}
          <article className="ga-body" id="gaBody">
            <h2 id="ga-s1">{"Start with what happened"}
            </h2>
            <p>{"In the first two or three sentences, say who this is for, what happened and what you need. Most people decide in a few seconds whether to keep reading."}
            </p>
            <div className="ga-ex">
              <b>
                <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                  <path d="M108,72v72H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8h60A8,8,0,0,1,108,72Zm108-8H156a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8h68V72A8,8,0,0,0,216,64Z" opacity="0.2" />
                  <path d="M100,56H40A16,16,0,0,0,24,72v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,100,56Zm0,80H40V72h60ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Zm0,80H156V72h60Z" />
                </svg>{"A strong opening"}
              </b>
              <p>{"I’m Tobi, a final-year engineering student at the University of Lagos. My family has paid my fees for four years, but after my father lost his job we can’t cover my last year. I need ₦1,000,000 to finish my degree."}
              </p>
            </div>
            <h2 id="ga-s2">{"Explain what the money will do"}
            </h2>
            <p>{"Break your goal into parts. When people can see where each naira goes, they trust the goal and give with confidence."}
            </p>
            <ul className="ga-l">
              <li>{"Final-year tuition: ₦650,000"}
              </li>
              <li>{"Books and a laptop: ₦250,000"}
              </li>
              <li>{"Accommodation: ₦100,000"}
              </li>
            </ul>
            <h2 id="ga-s3">{"Write in your own voice"}
            </h2>
            <p>{"Write the way you’d explain it to a friend. Short paragraphs are easier to read on a phone. You don’t need perfect English, just honest words."}
            </p>
            <h2 id="ga-s4">{"Add photos"}
            </h2>
            <p>{"A few real photos make your story feel close. Show the person, the place or the project. Ask permission before sharing photos of other people."}
            </p>
            <h2 id="ga-s5">{"Do and don’t"}
            </h2>
            <div className="ga-dd">
              <div className="do">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,104V208H32a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                  </svg>{"Do"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Be specific about who, what and how much"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Be honest about the situation"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Say what you’ll do if plans change"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="dont">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,48V152H32a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                  </svg>{"Don’t"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Exaggerate to make it sound worse"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Share documents with ID or account numbers visible"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Promise profit or money back"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>{" "}
          <aside className="ga-side">{" "}
            <nav aria-label="In this guide" className="ga-toc">
              <b>{"In this guide"}
              </b>
              <ol id="gaToc">
                <li>
                  <a data-ga="ga-s1" href="#ga-s1">{"Start with what happened"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s2" href="#ga-s2">{"Explain what the money will do"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s3" href="#ga-s3">{"Write in your own voice"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s4" href="#ga-s4">{"Add photos"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s5" href="#ga-s5">{"Do and don’t"}
                  </a>
                </li>
              </ol>
            </nav>{" "}
            <div className="hq-side ga-cta">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                  <path d="M208,104a79.86,79.86,0,0,1-30.59,62.92A24.29,24.29,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6a24.11,24.11,0,0,0-9.3-19A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24A80,80,0,0,1,208,104Z" opacity="0.2" />
                  <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z" />
                </svg>
              </span>
              <b>{"Ready to try it?"}
              </b>
              <p>{"Put these tips into practice on your own page. It’s free during early access."}
              </p>
              <div className="hq-sa">
                <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
                </a>
              </div>
            </div>{" "}
          </aside>{" "}
        </div>{" "}
        <div className="fs-wrap">
          <a className="ga-next" href="/guides/cover" id="gaNext">
            <span>
              <small>{"Next guide"}
              </small>
              <b>{"How to choose a cover photo"}
              </b>
            </span>
            <svg aria-hidden="true" className="gd-ai" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M216,128l-72,72V56Z" opacity="0.2" />
              <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
            </svg>
          </a>
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}

function GuideViewCover() {
  return (
    <>
    <main aria-labelledby="ga-title" className="view" data-view="guide">{" "}
      <section className="tshero gahero">{" "}
        <div className="fs-wrap">{" "}
          <a className="cat-back" href="/guides">
            <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M112,56V200L40,128Z" opacity="0.2" />
              <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
            </svg>{"All guides"}
          </a>{" "}
          <p className="label">{"Guide"}
          </p>{" "}
          <h1 id="ga-title">{"How to choose a cover photo"}
          </h1>{" "}
          <p className="lede" id="gaLede">{"The first thing people see when your link is shared. Make it count."}
          </p>{" "}
          <span className="gd-meta" id="gaMeta">
            <svg aria-hidden="true" className="gd-mi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
            </svg>{"2 min read"}
          </span>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec">{" "}
        <div className="fs-wrap ga-grid">{" "}
          <article className="ga-body" id="gaBody">
            <h2 id="ga-s1">{"Use a real photo"}
            </h2>
            <p>{"A real photo of the person or project works better than a flyer or a stock image. People give to people."}
            </p>
            <h2 id="ga-s2">{"Make faces clear and the photo bright"}
            </h2>
            <p>{"Choose a photo taken in daylight, where faces are easy to see. Avoid blurry or very dark photos."}
            </p>
            <h2 id="ga-s3">{"Think wide"}
            </h2>
            <p>{"Your cover is shown as a wide banner. Pick a photo with the important part in the middle, so nothing gets cut off."}
            </p>
            <h2 id="ga-s4">{"Do and don’t"}
            </h2>
            <div className="ga-dd">
              <div className="do">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,104V208H32a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                  </svg>{"Do"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Use a clear, bright, real photo"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Keep the main subject in the middle"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Get permission from people in the photo"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="dont">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,48V152H32a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                  </svg>{"Don’t"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Use a flyer full of text as the cover"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Use photos you found online"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Use distressing images to shock people"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>{" "}
          <aside className="ga-side">{" "}
            <nav aria-label="In this guide" className="ga-toc">
              <b>{"In this guide"}
              </b>
              <ol id="gaToc">
                <li>
                  <a data-ga="ga-s1" href="#ga-s1">{"Use a real photo"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s2" href="#ga-s2">{"Make faces clear and the photo bright"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s3" href="#ga-s3">{"Think wide"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s4" href="#ga-s4">{"Do and don’t"}
                  </a>
                </li>
              </ol>
            </nav>{" "}
            <div className="hq-side ga-cta">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                  <path d="M208,104a79.86,79.86,0,0,1-30.59,62.92A24.29,24.29,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6a24.11,24.11,0,0,0-9.3-19A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24A80,80,0,0,1,208,104Z" opacity="0.2" />
                  <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z" />
                </svg>
              </span>
              <b>{"Ready to try it?"}
              </b>
              <p>{"Put these tips into practice on your own page. It’s free during early access."}
              </p>
              <div className="hq-sa">
                <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
                </a>
              </div>
            </div>{" "}
          </aside>{" "}
        </div>{" "}
        <div className="fs-wrap">
          <a className="ga-next" href="/guides/goal" id="gaNext">
            <span>
              <small>{"Next guide"}
              </small>
              <b>{"How to set a goal people trust"}
              </b>
            </span>
            <svg aria-hidden="true" className="gd-ai" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M216,128l-72,72V56Z" opacity="0.2" />
              <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
            </svg>
          </a>
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}

function GuideViewGoal() {
  return (
    <>
    <main aria-labelledby="ga-title" className="view" data-view="guide">{" "}
      <section className="tshero gahero">{" "}
        <div className="fs-wrap">{" "}
          <a className="cat-back" href="/guides">
            <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M112,56V200L40,128Z" opacity="0.2" />
              <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
            </svg>{"All guides"}
          </a>{" "}
          <p className="label">{"Guide"}
          </p>{" "}
          <h1 id="ga-title">{"How to set a goal people trust"}
          </h1>{" "}
          <p className="lede" id="gaLede">{"A goal people can understand is a goal people want to help reach."}
          </p>{" "}
          <span className="gd-meta" id="gaMeta">
            <svg aria-hidden="true" className="gd-mi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
            </svg>{"3 min read"}
          </span>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec">{" "}
        <div className="fs-wrap ga-grid">{" "}
          <article className="ga-body" id="gaBody">
            <h2 id="ga-s1">{"Base it on real costs"}
            </h2>
            <p>{"Add up what you actually need: fees, bills, quotes or prices. If you have an invoice or estimate, use it to set your number."}
            </p>
            <h2 id="ga-s2">{"Break it down on your page"}
            </h2>
            <p>{"Show the parts that make up your goal. A clear breakdown answers “why this much?” before anyone asks."}
            </p>
            <h2 id="ga-s3">{"Choose a sensible end date"}
            </h2>
            <p>{"Pick an end date that matches when you need the money. Shorter pages create urgency, and you only pay hosting for the days you choose."}
            </p>
            <h2 id="ga-s4">{"If the cost changes, say so"}
            </h2>
            <p>{"Update your goal and post an update explaining why. Being open about changes keeps people’s trust."}
            </p>
            <h2 id="ga-s5">{"Do and don’t"}
            </h2>
            <div className="ga-dd">
              <div className="do">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,104V208H32a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                  </svg>{"Do"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Use real numbers from invoices or quotes"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Explain each part of the goal"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Update the goal openly if costs change"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="dont">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,48V152H32a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                  </svg>{"Don’t"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Pick a big round number without a reason"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Hide extra costs to make the goal look smaller"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Change the goal without telling supporters"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>{" "}
          <aside className="ga-side">{" "}
            <nav aria-label="In this guide" className="ga-toc">
              <b>{"In this guide"}
              </b>
              <ol id="gaToc">
                <li>
                  <a data-ga="ga-s1" href="#ga-s1">{"Base it on real costs"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s2" href="#ga-s2">{"Break it down on your page"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s3" href="#ga-s3">{"Choose a sensible end date"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s4" href="#ga-s4">{"If the cost changes, say so"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s5" href="#ga-s5">{"Do and don’t"}
                  </a>
                </li>
              </ol>
            </nav>{" "}
            <div className="hq-side ga-cta">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                  <path d="M208,104a79.86,79.86,0,0,1-30.59,62.92A24.29,24.29,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6a24.11,24.11,0,0,0-9.3-19A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24A80,80,0,0,1,208,104Z" opacity="0.2" />
                  <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z" />
                </svg>
              </span>
              <b>{"Ready to try it?"}
              </b>
              <p>{"Put these tips into practice on your own page. It’s free during early access."}
              </p>
              <div className="hq-sa">
                <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
                </a>
              </div>
            </div>{" "}
          </aside>{" "}
        </div>{" "}
        <div className="fs-wrap">
          <a className="ga-next" href="/guides/share" id="gaNext">
            <span>
              <small>{"Next guide"}
              </small>
              <b>{"How to share your page on WhatsApp and beyond"}
              </b>
            </span>
            <svg aria-hidden="true" className="gd-ai" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M216,128l-72,72V56Z" opacity="0.2" />
              <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
            </svg>
          </a>
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}

function GuideViewShare() {
  return (
    <>
    <main aria-labelledby="ga-title" className="view" data-view="guide">{" "}
      <section className="tshero gahero">{" "}
        <div className="fs-wrap">{" "}
          <a className="cat-back" href="/guides">
            <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M112,56V200L40,128Z" opacity="0.2" />
              <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
            </svg>{"All guides"}
          </a>{" "}
          <p className="label">{"Guide"}
          </p>{" "}
          <h1 id="ga-title">{"How to share your page on WhatsApp and beyond"}
          </h1>{" "}
          <p className="lede" id="gaLede">{"Most support comes from people who know you. Here’s how to reach them."}
          </p>{" "}
          <span className="gd-meta" id="gaMeta">
            <svg aria-hidden="true" className="gd-mi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
            </svg>{"4 min read"}
          </span>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec">{" "}
        <div className="fs-wrap ga-grid">{" "}
          <article className="ga-body" id="gaBody">
            <h2 id="ga-s1">{"Start with people who know you"}
            </h2>
            <p>{"Send your link to close family and friends first, one by one. A personal message works better than a forward, and early support encourages others."}
            </p>
            <div className="ga-tpl">
              <div className="ga-tpl-h">
                <span>{"A personal message"}
                </span>
                <button className="tpl-copy" data-t="Hi Aunty, I hope you’re well. I’ve started a page to raise money for my final-year fees. It explains everything, and any support or a share would mean a lot: [your Fundu link]" type="button">
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,40V168H168V88H88V40Z" opacity="0.2" />
                    <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
                  </svg>{"Copy"}
                </button>
              </div>
              <p>{"Hi Aunty, I hope you’re well. I’ve started a page to raise money for my final-year fees. It explains everything, and any support or a share would mean a lot: [your Fundu link]"}
              </p>
            </div>
            <h2 id="ga-s2">{"Then share in groups"}
            </h2>
            <p>{"Share in family, church, school and work groups. Keep it short and let the page do the explaining. Check the group’s rules first."}
            </p>
            <div className="ga-tpl">
              <div className="ga-tpl-h">
                <span>{"A group message"}
                </span>
                <button className="tpl-copy" data-t="Good evening everyone. I’m raising money for my final-year university fees. The full story, my goal and how to support are on this page: [your Fundu link]. Thank you for reading and sharing." type="button">
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,40V168H168V88H88V40Z" opacity="0.2" />
                    <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
                  </svg>{"Copy"}
                </button>
              </div>
              <p>{"Good evening everyone. I’m raising money for my final-year university fees. The full story, my goal and how to support are on this page: [your Fundu link]. Thank you for reading and sharing."}
              </p>
            </div>
            <h2 id="ga-s3">{"Post on your status and social media"}
            </h2>
            <p>{"Post on your WhatsApp status, Instagram, Facebook and X. Share again each time you post an update."}
            </p>
            <div className="ga-tpl">
              <div className="ga-tpl-h">
                <span>{"A status post"}
                </span>
                <button className="tpl-copy" data-t="Help me finish university 🎓 Everything is here: [your Fundu link]" type="button">
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,40V168H168V88H88V40Z" opacity="0.2" />
                    <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
                  </svg>{"Copy"}
                </button>
              </div>
              <p>{"Help me finish university 🎓 Everything is here: [your Fundu link]"}
              </p>
            </div>
            <h2 id="ga-s4">{"Do and don’t"}
            </h2>
            <div className="ga-dd">
              <div className="do">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,104V208H32a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                  </svg>{"Do"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Send personal messages first"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Share again when you post an update"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Thank people who share your link"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="dont">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,48V152H32a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                  </svg>{"Don’t"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Spam the same group many times a day"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Add people to groups without asking"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Pressure anyone to give"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>{" "}
          <aside className="ga-side">{" "}
            <nav aria-label="In this guide" className="ga-toc">
              <b>{"In this guide"}
              </b>
              <ol id="gaToc">
                <li>
                  <a data-ga="ga-s1" href="#ga-s1">{"Start with people who know you"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s2" href="#ga-s2">{"Then share in groups"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s3" href="#ga-s3">{"Post on your status and social media"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s4" href="#ga-s4">{"Do and don’t"}
                  </a>
                </li>
              </ol>
            </nav>{" "}
            <div className="hq-side ga-cta">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                  <path d="M208,104a79.86,79.86,0,0,1-30.59,62.92A24.29,24.29,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6a24.11,24.11,0,0,0-9.3-19A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24A80,80,0,0,1,208,104Z" opacity="0.2" />
                  <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z" />
                </svg>
              </span>
              <b>{"Ready to try it?"}
              </b>
              <p>{"Put these tips into practice on your own page. It’s free during early access."}
              </p>
              <div className="hq-sa">
                <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
                </a>
              </div>
            </div>{" "}
          </aside>{" "}
        </div>{" "}
        <div className="fs-wrap">
          <a className="ga-next" href="/guides/updates" id="gaNext">
            <span>
              <small>{"Next guide"}
              </small>
              <b>{"How to post updates that bring new support"}
              </b>
            </span>
            <svg aria-hidden="true" className="gd-ai" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M216,128l-72,72V56Z" opacity="0.2" />
              <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
            </svg>
          </a>
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}

function GuideViewUpdates() {
  return (
    <>
    <main aria-labelledby="ga-title" className="view" data-view="guide">{" "}
      <section className="tshero gahero">{" "}
        <div className="fs-wrap">{" "}
          <a className="cat-back" href="/guides">
            <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M112,56V200L40,128Z" opacity="0.2" />
              <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
            </svg>{"All guides"}
          </a>{" "}
          <p className="label">{"Guide"}
          </p>{" "}
          <h1 id="ga-title">{"How to post updates that bring new support"}
          </h1>{" "}
          <p className="lede" id="gaLede">{"Updates keep supporters close and give you a reason to share again."}
          </p>{" "}
          <span className="gd-meta" id="gaMeta">
            <svg aria-hidden="true" className="gd-mi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
            </svg>{"3 min read"}
          </span>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec">{" "}
        <div className="fs-wrap ga-grid">{" "}
          <article className="ga-body" id="gaBody">
            <h2 id="ga-s1">{"When to post an update"}
            </h2>
            <ul className="ga-l">
              <li>{"When new money comes in"}
              </li>
              <li>{"When you reach part of your goal"}
              </li>
              <li>{"When you pay a bill or buy what you raised for"}
              </li>
              <li>{"When plans change"}
              </li>
            </ul>
            <h2 id="ga-s2">{"What to include"}
            </h2>
            <p>{"Say what happened, show a photo or receipt if you can, and say what’s next. Two or three sentences is enough."}
            </p>
            <div className="ga-tpl">
              <div className="ga-tpl-h">
                <span>{"An example update"}
                </span>
                <button className="tpl-copy" data-t="Thank you! We’ve raised ₦420,000 so far. Today I paid the first part of my fees (receipt attached). We still need ₦580,000 for books and accommodation." type="button">
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,40V168H168V88H88V40Z" opacity="0.2" />
                    <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
                  </svg>{"Copy"}
                </button>
              </div>
              <p>{"Thank you! We’ve raised ₦420,000 so far. Today I paid the first part of my fees (receipt attached). We still need ₦580,000 for books and accommodation."}
              </p>
            </div>
            <h2 id="ga-s3">{"Update the amount raised"}
            </h2>
            <p>{"When money arrives, update your total so people can see the progress. Remember your page shows it as reported by you, so keep it accurate."}
            </p>
            <h2 id="ga-s4">{"Do and don’t"}
            </h2>
            <div className="ga-dd">
              <div className="do">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,104V208H32a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                  </svg>{"Do"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Post when something real happens"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Show receipts or photos where you can"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Share each update with your link"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="dont">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,48V152H32a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                  </svg>{"Don’t"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Let your page go quiet for weeks"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Inflate the amount raised"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Share private details of supporters"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>{" "}
          <aside className="ga-side">{" "}
            <nav aria-label="In this guide" className="ga-toc">
              <b>{"In this guide"}
              </b>
              <ol id="gaToc">
                <li>
                  <a data-ga="ga-s1" href="#ga-s1">{"When to post an update"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s2" href="#ga-s2">{"What to include"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s3" href="#ga-s3">{"Update the amount raised"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s4" href="#ga-s4">{"Do and don’t"}
                  </a>
                </li>
              </ol>
            </nav>{" "}
            <div className="hq-side ga-cta">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                  <path d="M208,104a79.86,79.86,0,0,1-30.59,62.92A24.29,24.29,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6a24.11,24.11,0,0,0-9.3-19A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24A80,80,0,0,1,208,104Z" opacity="0.2" />
                  <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z" />
                </svg>
              </span>
              <b>{"Ready to try it?"}
              </b>
              <p>{"Put these tips into practice on your own page. It’s free during early access."}
              </p>
              <div className="hq-sa">
                <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
                </a>
              </div>
            </div>{" "}
          </aside>{" "}
        </div>{" "}
        <div className="fs-wrap">
          <a className="ga-next" href="/guides/thanks" id="gaNext">
            <span>
              <small>{"Next guide"}
              </small>
              <b>{"How to thank your supporters"}
              </b>
            </span>
            <svg aria-hidden="true" className="gd-ai" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M216,128l-72,72V56Z" opacity="0.2" />
              <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
            </svg>
          </a>
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}

function GuideViewThanks() {
  return (
    <>
    <main aria-labelledby="ga-title" className="view" data-view="guide">{" "}
      <section className="tshero gahero">{" "}
        <div className="fs-wrap">{" "}
          <a className="cat-back" href="/guides">
            <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M112,56V200L40,128Z" opacity="0.2" />
              <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
            </svg>{"All guides"}
          </a>{" "}
          <p className="label">{"Guide"}
          </p>{" "}
          <h1 id="ga-title">{"How to thank your supporters"}
          </h1>{" "}
          <p className="lede" id="gaLede">{"A good thank-you turns supporters into people who’ll help again."}
          </p>{" "}
          <span className="gd-meta" id="gaMeta">
            <svg aria-hidden="true" className="gd-mi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
            </svg>{"2 min read"}
          </span>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec">{" "}
        <div className="fs-wrap ga-grid">{" "}
          <article className="ga-body" id="gaBody">
            <h2 id="ga-s1">{"Thank people as you go"}
            </h2>
            <p>{"Send a quick personal thank-you when someone gives or shares. It doesn’t need to be long to mean a lot."}
            </p>
            <h2 id="ga-s2">{"Thank everyone publicly"}
            </h2>
            <p>{"Post a thank-you update on your page. It shows the support is real and encourages others to join."}
            </p>
            <div className="ga-tpl">
              <div className="ga-tpl-h">
                <span>{"A thank-you update"}
                </span>
                <button className="tpl-copy" data-t="We did it! Thank you to everyone who gave, prayed and shared. My fees are fully paid, and I start my final year next week. I’ll post photos from graduation. You made this possible." type="button">
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,40V168H168V88H88V40Z" opacity="0.2" />
                    <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
                  </svg>{"Copy"}
                </button>
              </div>
              <p>{"We did it! Thank you to everyone who gave, prayed and shared. My fees are fully paid, and I start my final year next week. I’ll post photos from graduation. You made this possible."}
              </p>
            </div>
            <h2 id="ga-s3">{"Close the loop"}
            </h2>
            <p>{"When you reach your goal or the event has happened, post a final update and end your page. People love knowing how the story ends."}
            </p>
            <h2 id="ga-s4">{"Do and don’t"}
            </h2>
            <div className="ga-dd">
              <div className="do">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,104V208H32a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z" />
                  </svg>{"Do"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Thank people personally and publicly"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"Share the outcome"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                    </svg>
                    <span>{"End your page when you’re done"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="dont">
                <b>
                  <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M80,48V152H32a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8Z" opacity="0.2" />
                    <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z" />
                  </svg>{"Don’t"}
                </b>
                <ul>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Name supporters who might want to stay private"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Disappear after the goal is reached"}
                    </span>
                  </li>
                  <li>
                    <svg aria-hidden="true" className="" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
                    </svg>
                    <span>{"Forget the people who shared, not just gave"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>{" "}
          <aside className="ga-side">{" "}
            <nav aria-label="In this guide" className="ga-toc">
              <b>{"In this guide"}
              </b>
              <ol id="gaToc">
                <li>
                  <a data-ga="ga-s1" href="#ga-s1">{"Thank people as you go"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s2" href="#ga-s2">{"Thank everyone publicly"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s3" href="#ga-s3">{"Close the loop"}
                  </a>
                </li>
                <li>
                  <a data-ga="ga-s4" href="#ga-s4">{"Do and don’t"}
                  </a>
                </li>
              </ol>
            </nav>{" "}
            <div className="hq-side ga-cta">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                  <path d="M208,104a79.86,79.86,0,0,1-30.59,62.92A24.29,24.29,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6a24.11,24.11,0,0,0-9.3-19A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24A80,80,0,0,1,208,104Z" opacity="0.2" />
                  <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z" />
                </svg>
              </span>
              <b>{"Ready to try it?"}
              </b>
              <p>{"Put these tips into practice on your own page. It’s free during early access."}
              </p>
              <div className="hq-sa">
                <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
                </a>
              </div>
            </div>{" "}
          </aside>{" "}
        </div>{" "}
        <div className="fs-wrap">
          <a className="ga-next" href="/guides/story" id="gaNext">
            <span>
              <small>{"Next guide"}
              </small>
              <b>{"How to write a story people want to support"}
              </b>
            </span>
            <svg aria-hidden="true" className="gd-ai" fill="currentColor" focusable="false" viewBox="0 0 256 256">
              <path d="M216,128l-72,72V56Z" opacity="0.2" />
              <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
            </svg>
          </a>
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}

const VIEWS = {
  "story": GuideViewStory,
  "cover": GuideViewCover,
  "goal": GuideViewGoal,
  "share": GuideViewShare,
  "updates": GuideViewUpdates,
  "thanks": GuideViewThanks,
};

export const SLUGS = Object.keys(VIEWS);

export default function GuideView({ slug }) {
  const View = VIEWS[slug];
  return View ? <View /> : null;
}
