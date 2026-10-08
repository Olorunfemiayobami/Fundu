/* Fundu marketing website. Markup is the approved design's, converted to
   JSX without changes to structure, classes or copy.
   Internal links are plain <a> on purpose: each marketing page starts its own
   motion script on a fresh load, so client-side routing isn't used here. */
/* eslint-disable @next/next/no-html-link-for-pages */

function CategoryViewEducation() {
  return (
    <>
    <main aria-labelledby="cat-title" className="view" data-view="category">{" "}
      <section className="cathero">
        <div className="fs-wrap cathero-in">{" "}
          <div className="cat-copy">{" "}
            <a className="cat-back" href="/#cats">
              <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M112,56V200L40,128Z" opacity="0.2" />
                <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
              </svg>{"All categories"}
            </a>{" "}
            <p className="label" id="catLabel">{"Education"}
            </p>{" "}
            <h1 id="cat-title">{"Raise money for school fees and learning."}
            </h1>{" "}
            <p className="lede" id="catLede">{"School and university fees, exams, books or training. Give your education goal a page your family, church and alumni can share."}
            </p>{" "}
            <div className="actions">
              <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
              </a>
              <a className="fs-btn btn-ghost" href="/webexplore" id="catExplore">{"See pages like this"}
              </a>
            </div>{" "}
          </div>{" "}
          <div className="cat-photo">
            <img alt="A smiling student working in a university library" id="catImg" src="/site/img-0e8d57872a3e.jpg" />
            <span className="cat-badge" id="catBadge">
              <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2" />
                <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
              </svg>
            </span>
          </div>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-ideas-h" className="sec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Ideas"}
              </p>
              <h2 id="cat-ideas-h">{"What people raise money for"}
              </h2>
            </div>
            <p className="lede">{"Some of the goals people give a page to. Yours doesn’t have to be on the list."}
            </p>
          </div>{" "}
          <ul className="cat-ideas" id="catIdeas">
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"School and university fees"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Exam and registration fees"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Books, a laptop or supplies"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Training and certifications"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Accommodation and transport"}
              </span>
            </li>
          </ul>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-tips-h" className="sec night">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Tips"}
              </p>
              <h2 id="cat-tips-h">{"How to make your page stand out"}
              </h2>
            </div>
            <p className="lede">{"Four things that help people understand your goal and feel confident giving."}
            </p>
          </div>{" "}
          <ol className="cat-tips" id="catTips">
            <li>
              <span className="tn">{"01"}
              </span>
              <b>{"Say exactly what it’s for"}
              </b>
              <span>{"Name the school or course and what year you’re in. Specific goals feel real."}
              </span>
            </li>
            <li>
              <span className="tn">{"02"}
              </span>
              <b>{"Break down the cost"}
              </b>
              <span>{"Show the fees, books and other costs. People give more when they can see where money goes."}
              </span>
            </li>
            <li>
              <span className="tn">{"03"}
              </span>
              <b>{"Show what it unlocks"}
              </b>
              <span>{"Explain what finishing means for you or your family. Hope is a strong reason to give."}
              </span>
            </li>
            <li>
              <span className="tn">{"04"}
              </span>
              <b>{"Post receipts as you pay"}
              </b>
              <span>{"Share an update when fees are paid. It thanks supporters and brings new ones."}
              </span>
            </li>
          </ol>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-faq-h" className="sec faqsec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Common questions"}
              </p>
              <h2 id="cat-faq-h">{"Questions about education goals"}
              </h2>
            </div>
            <p className="lede">{"Quick answers to what people ask most."}
            </p>
          </div>{" "}
          <div className="hq-wrap">
            <div className="hq-list cat-faq" id="catFaq">
              <details className="hq">
                <summary>
                  <span>{"Can a parent raise money for a child’s fees?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes. The page must be run by an adult, and the child can be the person it’s for."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can I raise money for someone else’s school fees?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes, with their permission. Say who the money is for in your story."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can supporters pay the school directly?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Supporters send money to the account on your page. Only use a school’s account if you’re allowed to."}
                </p>
              </details>
            </div>
            <aside className="hq-side">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
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
          <div className="cat-others">
            <h3>{"Other things people raise money for"}
            </h3>
            <div className="oc-grid" id="catOthers">
              <a className="oc" href="/raise/health">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-2fc2f14fb0b3.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z" opacity="0.2" />
                      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Health and emergencies"}
                  </b>
                  <span>{"Treatment, recovery, or after a fire or flood"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/church">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-c5bffc7dc815.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,152v64H184V128ZM32,216H72V128L32,152Z" opacity="0.2" />
                      <path d="M228.12,145.14,192,123.47V104a8,8,0,0,0-4-7L136,67.36V48h16a8,8,0,0,0,0-16H136V16a8,8,0,0,0-16,0V32H104a8,8,0,0,0,0,16h16V67.36L68,97.05a8,8,0,0,0-4,7v19.47L27.88,145.14A8,8,0,0,0,24,152v64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V168a8,8,0,0,1,16,0v48a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V152A8,8,0,0,0,228.12,145.14ZM40,156.53l24-14.4V208H40ZM128,144a24,24,0,0,0-24,24v40H80V108.64l48-27.43,48,27.43V208H152V168A24,24,0,0,0,128,144Zm88,64H192V142.13l24,14.4Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Church and faith"}
                  </b>
                  <span>{"Buildings, outreach and projects"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/creators">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-adb892449f76.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M155.2,100.8c-23-23-55.57-27.63-72.8-10.4a34.21,34.21,0,0,0-7.61,11.66,16.23,16.23,0,0,1-14.72,10C48,112.44,37,116.61,28.8,124.8,7.6,146,13.33,186.12,41.6,214.4s68.39,34,89.6,12.8C139.39,219,143.56,208,144,195.93a16.23,16.23,0,0,1,10-14.72,34.21,34.21,0,0,0,11.66-7.61C182.83,156.37,178.17,123.78,155.2,100.8ZM112,168a24,24,0,1,1,24-24A24,24,0,0,1,112,168Z" opacity="0.2" />
                      <path d="M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Creators and makers"}
                  </b>
                  <span>{"Films, music, crafts and art"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/community">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-1b1b6fc9adba.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM192.54,40A39.12,39.12,0,0,0,156,64a39.12,39.12,0,0,0-36.54-24C97.67,40,80,58.31,80,80c0,14.56,7,27.71,16.73,40H140a20,20,0,0,1,0,40h4l37.78-8.68C203.82,135.07,232,109.23,232,80,232,58.31,214.33,40,192.54,40Z" opacity="0.2" />
                      <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Community"}
                  </b>
                  <span>{"Local projects and people helping each other"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/business">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-deaecff8263d.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2" />
                      <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Small business"}
                  </b>
                  <span>{"Starting out or getting back on your feet"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/milestones">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-21a7aa320e5b.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M58.89,154.89l42.22,42.22-50.63,18.4a7.79,7.79,0,0,1-10-10Zm138.82-4.72L105.83,58.29A7.79,7.79,0,0,0,93,61.14l-14.9,41,75.82,75.82,41-14.9A7.79,7.79,0,0,0,197.71,150.17Z" opacity="0.2" />
                      <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Milestones"}
                  </b>
                  <span>{"Weddings, send-offs and celebrations"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>{" "}
        </div>
      </section>{" "}
    </main>
    </>
  );
}

function CategoryViewHealth() {
  return (
    <>
    <main aria-labelledby="cat-title" className="view" data-view="category">{" "}
      <section className="cathero">
        <div className="fs-wrap cathero-in">{" "}
          <div className="cat-copy">{" "}
            <a className="cat-back" href="/#cats">
              <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M112,56V200L40,128Z" opacity="0.2" />
                <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
              </svg>{"All categories"}
            </a>{" "}
            <p className="label" id="catLabel">{"Health and emergencies"}
            </p>{" "}
            <h1 id="cat-title">{"Raise money for medical bills and emergencies."}
            </h1>{" "}
            <p className="lede" id="catLede">{"Surgery, treatment, hospital bills, or getting back on your feet after an accident, fire or flood. Get help quickly from the people who care."}
            </p>{" "}
            <div className="actions">
              <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
              </a>
              <a className="fs-btn btn-ghost" href="/webexplore" id="catExplore">{"See pages like this"}
              </a>
            </div>{" "}
          </div>{" "}
          <div className="cat-photo">
            <img alt="A smiling nurse in blue scrubs with a stethoscope" id="catImg" src="/site/img-2fc2f14fb0b3.jpg" />
            <span className="cat-badge" id="catBadge">
              <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z" opacity="0.2" />
                <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z" />
              </svg>
            </span>
          </div>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-ideas-h" className="sec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Ideas"}
              </p>
              <h2 id="cat-ideas-h">{"What people raise money for"}
              </h2>
            </div>
            <p className="lede">{"Some of the goals people give a page to. Yours doesn’t have to be on the list."}
            </p>
          </div>{" "}
          <ul className="cat-ideas" id="catIdeas">
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Surgery and treatment"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Hospital bills and medication"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Recovery and therapy"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"After an accident"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"After a fire or flood"}
              </span>
            </li>
          </ul>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-tips-h" className="sec night">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Tips"}
              </p>
              <h2 id="cat-tips-h">{"How to make your page stand out"}
              </h2>
            </div>
            <p className="lede">{"Four things that help people understand your goal and feel confident giving."}
            </p>
          </div>{" "}
          <ol className="cat-tips" id="catTips">
            <li>
              <span className="tn">{"01"}
              </span>
              <b>{"Explain what happened, with dignity"}
              </b>
              <span>{"Say what happened and what’s needed in plain words. You don’t need to share every detail."}
              </span>
            </li>
            <li>
              <span className="tn">{"02"}
              </span>
              <b>{"Show the estimate"}
              </b>
              <span>{"Share the hospital’s estimate or a cost breakdown, without private medical details."}
              </span>
            </li>
            <li>
              <span className="tn">{"03"}
              </span>
              <b>{"Protect personal information"}
              </b>
              <span>{"Cover names, ID numbers and record numbers on any document you upload."}
              </span>
            </li>
            <li>
              <span className="tn">{"04"}
              </span>
              <b>{"Update often"}
              </b>
              <span>{"In an emergency, quick updates keep people close and remind those who meant to help."}
              </span>
            </li>
          </ol>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-faq-h" className="sec faqsec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Common questions"}
              </p>
              <h2 id="cat-faq-h">{"Questions about medical and emergency goals"}
              </h2>
            </div>
            <p className="lede">{"Quick answers to what people ask most."}
            </p>
          </div>{" "}
          <div className="hq-wrap">
            <div className="hq-list cat-faq" id="catFaq">
              <details className="hq">
                <summary>
                  <span>{"Can I raise money for a family member?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes, with their permission or their family’s. Your name shows as the organizer."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"How fast can my page go live?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"As soon as you publish. You get a link to share straight away."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"What if the cost changes?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Update your goal and post an update explaining why. Honesty keeps people’s trust."}
                </p>
              </details>
            </div>
            <aside className="hq-side">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
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
          <div className="cat-others">
            <h3>{"Other things people raise money for"}
            </h3>
            <div className="oc-grid" id="catOthers">
              <a className="oc" href="/raise/education">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-0e8d57872a3e.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2" />
                      <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Education"}
                  </b>
                  <span>{"School fees, exams and training"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/church">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-c5bffc7dc815.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,152v64H184V128ZM32,216H72V128L32,152Z" opacity="0.2" />
                      <path d="M228.12,145.14,192,123.47V104a8,8,0,0,0-4-7L136,67.36V48h16a8,8,0,0,0,0-16H136V16a8,8,0,0,0-16,0V32H104a8,8,0,0,0,0,16h16V67.36L68,97.05a8,8,0,0,0-4,7v19.47L27.88,145.14A8,8,0,0,0,24,152v64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V168a8,8,0,0,1,16,0v48a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V152A8,8,0,0,0,228.12,145.14ZM40,156.53l24-14.4V208H40ZM128,144a24,24,0,0,0-24,24v40H80V108.64l48-27.43,48,27.43V208H152V168A24,24,0,0,0,128,144Zm88,64H192V142.13l24,14.4Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Church and faith"}
                  </b>
                  <span>{"Buildings, outreach and projects"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/creators">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-adb892449f76.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M155.2,100.8c-23-23-55.57-27.63-72.8-10.4a34.21,34.21,0,0,0-7.61,11.66,16.23,16.23,0,0,1-14.72,10C48,112.44,37,116.61,28.8,124.8,7.6,146,13.33,186.12,41.6,214.4s68.39,34,89.6,12.8C139.39,219,143.56,208,144,195.93a16.23,16.23,0,0,1,10-14.72,34.21,34.21,0,0,0,11.66-7.61C182.83,156.37,178.17,123.78,155.2,100.8ZM112,168a24,24,0,1,1,24-24A24,24,0,0,1,112,168Z" opacity="0.2" />
                      <path d="M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Creators and makers"}
                  </b>
                  <span>{"Films, music, crafts and art"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/community">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-1b1b6fc9adba.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM192.54,40A39.12,39.12,0,0,0,156,64a39.12,39.12,0,0,0-36.54-24C97.67,40,80,58.31,80,80c0,14.56,7,27.71,16.73,40H140a20,20,0,0,1,0,40h4l37.78-8.68C203.82,135.07,232,109.23,232,80,232,58.31,214.33,40,192.54,40Z" opacity="0.2" />
                      <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Community"}
                  </b>
                  <span>{"Local projects and people helping each other"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/business">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-deaecff8263d.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2" />
                      <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Small business"}
                  </b>
                  <span>{"Starting out or getting back on your feet"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/milestones">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-21a7aa320e5b.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M58.89,154.89l42.22,42.22-50.63,18.4a7.79,7.79,0,0,1-10-10Zm138.82-4.72L105.83,58.29A7.79,7.79,0,0,0,93,61.14l-14.9,41,75.82,75.82,41-14.9A7.79,7.79,0,0,0,197.71,150.17Z" opacity="0.2" />
                      <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Milestones"}
                  </b>
                  <span>{"Weddings, send-offs and celebrations"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>{" "}
        </div>
      </section>{" "}
    </main>
    </>
  );
}

function CategoryViewChurch() {
  return (
    <>
    <main aria-labelledby="cat-title" className="view" data-view="category">{" "}
      <section className="cathero">
        <div className="fs-wrap cathero-in">{" "}
          <div className="cat-copy">{" "}
            <a className="cat-back" href="/#cats">
              <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M112,56V200L40,128Z" opacity="0.2" />
                <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
              </svg>{"All categories"}
            </a>{" "}
            <p className="label" id="catLabel">{"Church and faith"}
            </p>{" "}
            <h1 id="cat-title">{"Raise money for church and faith projects."}
            </h1>{" "}
            <p className="lede" id="catLede">{"A new building, renovations, equipment, outreach or a special programme. Give your congregation one link to rally around."}
            </p>{" "}
            <div className="actions">
              <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
              </a>
              <a className="fs-btn btn-ghost" href="/webexplore" id="catExplore">{"See pages like this"}
              </a>
            </div>{" "}
          </div>{" "}
          <div className="cat-photo">
            <img alt="A pastor speaking to his congregation" id="catImg" src="/site/img-c5bffc7dc815.jpg" />
            <span className="cat-badge" id="catBadge">
              <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,152v64H184V128ZM32,216H72V128L32,152Z" opacity="0.2" />
                <path d="M228.12,145.14,192,123.47V104a8,8,0,0,0-4-7L136,67.36V48h16a8,8,0,0,0,0-16H136V16a8,8,0,0,0-16,0V32H104a8,8,0,0,0,0,16h16V67.36L68,97.05a8,8,0,0,0-4,7v19.47L27.88,145.14A8,8,0,0,0,24,152v64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V168a8,8,0,0,1,16,0v48a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V152A8,8,0,0,0,228.12,145.14ZM40,156.53l24-14.4V208H40ZM128,144a24,24,0,0,0-24,24v40H80V108.64l48-27.43,48,27.43V208H152V168A24,24,0,0,0,128,144Zm88,64H192V142.13l24,14.4Z" />
              </svg>
            </span>
          </div>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-ideas-h" className="sec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Ideas"}
              </p>
              <h2 id="cat-ideas-h">{"What people raise money for"}
              </h2>
            </div>
            <p className="lede">{"Some of the goals people give a page to. Yours doesn’t have to be on the list."}
            </p>
          </div>{" "}
          <ul className="cat-ideas" id="catIdeas">
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Buildings and renovations"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Sound, chairs and equipment"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Outreach and welfare"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Programmes and events"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Missions"}
              </span>
            </li>
          </ul>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-tips-h" className="sec night">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Tips"}
              </p>
              <h2 id="cat-tips-h">{"How to make your page stand out"}
              </h2>
            </div>
            <p className="lede">{"Four things that help people understand your goal and feel confident giving."}
            </p>
          </div>{" "}
          <ol className="cat-tips" id="catTips">
            <li>
              <span className="tn">{"01"}
              </span>
              <b>{"Say who’s organizing"}
              </b>
              <span>{"Name the church and the person or committee leading the project."}
              </span>
            </li>
            <li>
              <span className="tn">{"02"}
              </span>
              <b>{"Share the budget"}
              </b>
              <span>{"Show what each part costs, from blocks to roofing to equipment."}
              </span>
            </li>
            <li>
              <span className="tn">{"03"}
              </span>
              <b>{"Show progress with photos"}
              </b>
              <span>{"Post photos as work moves. People love seeing their gift become something real."}
              </span>
            </li>
            <li>
              <span className="tn">{"04"}
              </span>
              <b>{"Thank people publicly"}
              </b>
              <span>{"A thank-you update encourages others to join in."}
              </span>
            </li>
          </ol>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-faq-h" className="sec faqsec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Common questions"}
              </p>
              <h2 id="cat-faq-h">{"Questions about church projects"}
              </h2>
            </div>
            <p className="lede">{"Quick answers to what people ask most."}
            </p>
          </div>{" "}
          <div className="hq-wrap">
            <div className="hq-list cat-faq" id="catFaq">
              <details className="hq">
                <summary>
                  <span>{"Can a church member set up the page?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes, with the church’s permission. The organizer must be an adult."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can money go to the church’s account?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes, if you’re allowed to use it. The account shows on the page."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can we share it in church groups?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes. One link works in WhatsApp groups, bulletins and announcements."}
                </p>
              </details>
            </div>
            <aside className="hq-side">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
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
          <div className="cat-others">
            <h3>{"Other things people raise money for"}
            </h3>
            <div className="oc-grid" id="catOthers">
              <a className="oc" href="/raise/education">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-0e8d57872a3e.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2" />
                      <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Education"}
                  </b>
                  <span>{"School fees, exams and training"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/health">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-2fc2f14fb0b3.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z" opacity="0.2" />
                      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Health and emergencies"}
                  </b>
                  <span>{"Treatment, recovery, or after a fire or flood"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/creators">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-adb892449f76.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M155.2,100.8c-23-23-55.57-27.63-72.8-10.4a34.21,34.21,0,0,0-7.61,11.66,16.23,16.23,0,0,1-14.72,10C48,112.44,37,116.61,28.8,124.8,7.6,146,13.33,186.12,41.6,214.4s68.39,34,89.6,12.8C139.39,219,143.56,208,144,195.93a16.23,16.23,0,0,1,10-14.72,34.21,34.21,0,0,0,11.66-7.61C182.83,156.37,178.17,123.78,155.2,100.8ZM112,168a24,24,0,1,1,24-24A24,24,0,0,1,112,168Z" opacity="0.2" />
                      <path d="M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Creators and makers"}
                  </b>
                  <span>{"Films, music, crafts and art"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/community">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-1b1b6fc9adba.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM192.54,40A39.12,39.12,0,0,0,156,64a39.12,39.12,0,0,0-36.54-24C97.67,40,80,58.31,80,80c0,14.56,7,27.71,16.73,40H140a20,20,0,0,1,0,40h4l37.78-8.68C203.82,135.07,232,109.23,232,80,232,58.31,214.33,40,192.54,40Z" opacity="0.2" />
                      <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Community"}
                  </b>
                  <span>{"Local projects and people helping each other"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/business">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-deaecff8263d.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2" />
                      <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Small business"}
                  </b>
                  <span>{"Starting out or getting back on your feet"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/milestones">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-21a7aa320e5b.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M58.89,154.89l42.22,42.22-50.63,18.4a7.79,7.79,0,0,1-10-10Zm138.82-4.72L105.83,58.29A7.79,7.79,0,0,0,93,61.14l-14.9,41,75.82,75.82,41-14.9A7.79,7.79,0,0,0,197.71,150.17Z" opacity="0.2" />
                      <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Milestones"}
                  </b>
                  <span>{"Weddings, send-offs and celebrations"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>{" "}
        </div>
      </section>{" "}
    </main>
    </>
  );
}

function CategoryViewCreators() {
  return (
    <>
    <main aria-labelledby="cat-title" className="view" data-view="category">{" "}
      <section className="cathero">
        <div className="fs-wrap cathero-in">{" "}
          <div className="cat-copy">{" "}
            <a className="cat-back" href="/#cats">
              <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M112,56V200L40,128Z" opacity="0.2" />
                <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
              </svg>{"All categories"}
            </a>{" "}
            <p className="label" id="catLabel">{"Creators and makers"}
            </p>{" "}
            <h1 id="cat-title">{"Raise money for your film, music, book or craft."}
            </h1>{" "}
            <p className="lede" id="catLede">{"Your first album, a short film, a book, an exhibition or the tools to make your craft. Let the people who believe in you back you."}
            </p>{" "}
            <div className="actions">
              <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
              </a>
              <a className="fs-btn btn-ghost" href="/webexplore" id="catExplore">{"See pages like this"}
              </a>
            </div>{" "}
          </div>{" "}
          <div className="cat-photo">
            <img alt="A drummer in traditional dress performing at a festival" id="catImg" src="/site/img-adb892449f76.jpg" />
            <span className="cat-badge" id="catBadge">
              <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M155.2,100.8c-23-23-55.57-27.63-72.8-10.4a34.21,34.21,0,0,0-7.61,11.66,16.23,16.23,0,0,1-14.72,10C48,112.44,37,116.61,28.8,124.8,7.6,146,13.33,186.12,41.6,214.4s68.39,34,89.6,12.8C139.39,219,143.56,208,144,195.93a16.23,16.23,0,0,1,10-14.72,34.21,34.21,0,0,0,11.66-7.61C182.83,156.37,178.17,123.78,155.2,100.8ZM112,168a24,24,0,1,1,24-24A24,24,0,0,1,112,168Z" opacity="0.2" />
                <path d="M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z" />
              </svg>
            </span>
          </div>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-ideas-h" className="sec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Ideas"}
              </p>
              <h2 id="cat-ideas-h">{"What people raise money for"}
              </h2>
            </div>
            <p className="lede">{"Some of the goals people give a page to. Yours doesn’t have to be on the list."}
            </p>
          </div>{" "}
          <ul className="cat-ideas" id="catIdeas">
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Recording an album or single"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"A short film or documentary"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Publishing a book"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"An exhibition or show"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Tools, equipment or materials"}
              </span>
            </li>
          </ul>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-tips-h" className="sec night">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Tips"}
              </p>
              <h2 id="cat-tips-h">{"How to make your page stand out"}
              </h2>
            </div>
            <p className="lede">{"Four things that help people understand your goal and feel confident giving."}
            </p>
          </div>{" "}
          <ol className="cat-tips" id="catTips">
            <li>
              <span className="tn">{"01"}
              </span>
              <b>{"Show your work"}
              </b>
              <span>{"Add photos, a video link or samples so people can see what you make."}
              </span>
            </li>
            <li>
              <span className="tn">{"02"}
              </span>
              <b>{"Explain the budget"}
              </b>
              <span>{"Studio time, printing, equipment. Show where the money goes."}
              </span>
            </li>
            <li>
              <span className="tn">{"03"}
              </span>
              <b>{"Share the journey"}
              </b>
              <span>{"Post behind-the-scenes updates as you make it."}
              </span>
            </li>
            <li>
              <span className="tn">{"04"}
              </span>
              <b>{"Keep it support, not investment"}
              </b>
              <span>{"You can thank supporters, but you can’t offer profit, shares or money back."}
              </span>
            </li>
          </ol>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-faq-h" className="sec faqsec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Common questions"}
              </p>
              <h2 id="cat-faq-h">{"Questions about creative projects"}
              </h2>
            </div>
            <p className="lede">{"Quick answers to what people ask most."}
            </p>
          </div>{" "}
          <div className="hq-wrap">
            <div className="hq-list cat-faq" id="catFaq">
              <details className="hq">
                <summary>
                  <span>{"Can I offer something in return?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"You can thank people and share what you make. You can’t promise profit, shares, interest or money back."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can a group or band raise together?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes. One adult runs the page, and the story can explain who’s involved."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can I use music or images I don’t own?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Only if you have permission. Use your own work wherever you can."}
                </p>
              </details>
            </div>
            <aside className="hq-side">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
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
          <div className="cat-others">
            <h3>{"Other things people raise money for"}
            </h3>
            <div className="oc-grid" id="catOthers">
              <a className="oc" href="/raise/education">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-0e8d57872a3e.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2" />
                      <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Education"}
                  </b>
                  <span>{"School fees, exams and training"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/health">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-2fc2f14fb0b3.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z" opacity="0.2" />
                      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Health and emergencies"}
                  </b>
                  <span>{"Treatment, recovery, or after a fire or flood"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/church">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-c5bffc7dc815.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,152v64H184V128ZM32,216H72V128L32,152Z" opacity="0.2" />
                      <path d="M228.12,145.14,192,123.47V104a8,8,0,0,0-4-7L136,67.36V48h16a8,8,0,0,0,0-16H136V16a8,8,0,0,0-16,0V32H104a8,8,0,0,0,0,16h16V67.36L68,97.05a8,8,0,0,0-4,7v19.47L27.88,145.14A8,8,0,0,0,24,152v64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V168a8,8,0,0,1,16,0v48a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V152A8,8,0,0,0,228.12,145.14ZM40,156.53l24-14.4V208H40ZM128,144a24,24,0,0,0-24,24v40H80V108.64l48-27.43,48,27.43V208H152V168A24,24,0,0,0,128,144Zm88,64H192V142.13l24,14.4Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Church and faith"}
                  </b>
                  <span>{"Buildings, outreach and projects"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/community">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-1b1b6fc9adba.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM192.54,40A39.12,39.12,0,0,0,156,64a39.12,39.12,0,0,0-36.54-24C97.67,40,80,58.31,80,80c0,14.56,7,27.71,16.73,40H140a20,20,0,0,1,0,40h4l37.78-8.68C203.82,135.07,232,109.23,232,80,232,58.31,214.33,40,192.54,40Z" opacity="0.2" />
                      <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Community"}
                  </b>
                  <span>{"Local projects and people helping each other"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/business">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-deaecff8263d.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2" />
                      <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Small business"}
                  </b>
                  <span>{"Starting out or getting back on your feet"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/milestones">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-21a7aa320e5b.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M58.89,154.89l42.22,42.22-50.63,18.4a7.79,7.79,0,0,1-10-10Zm138.82-4.72L105.83,58.29A7.79,7.79,0,0,0,93,61.14l-14.9,41,75.82,75.82,41-14.9A7.79,7.79,0,0,0,197.71,150.17Z" opacity="0.2" />
                      <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Milestones"}
                  </b>
                  <span>{"Weddings, send-offs and celebrations"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>{" "}
        </div>
      </section>{" "}
    </main>
    </>
  );
}

function CategoryViewCommunity() {
  return (
    <>
    <main aria-labelledby="cat-title" className="view" data-view="category">{" "}
      <section className="cathero">
        <div className="fs-wrap cathero-in">{" "}
          <div className="cat-copy">{" "}
            <a className="cat-back" href="/#cats">
              <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M112,56V200L40,128Z" opacity="0.2" />
                <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
              </svg>{"All categories"}
            </a>{" "}
            <p className="label" id="catLabel">{"Community"}
            </p>{" "}
            <h1 id="cat-title">{"Raise money for your community."}
            </h1>{" "}
            <p className="lede" id="catLede">{"A borehole, repairs to a school, solar power, a clean-up or support for neighbours. Bring everyone behind one goal."}
            </p>{" "}
            <div className="actions">
              <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
              </a>
              <a className="fs-btn btn-ghost" href="/webexplore" id="catExplore">{"See pages like this"}
              </a>
            </div>{" "}
          </div>{" "}
          <div className="cat-photo">
            <img alt="Four young volunteers in Katsina, Nigeria, smiling together" id="catImg" src="/site/img-1b1b6fc9adba.jpg" />
            <span className="cat-badge" id="catBadge">
              <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM192.54,40A39.12,39.12,0,0,0,156,64a39.12,39.12,0,0,0-36.54-24C97.67,40,80,58.31,80,80c0,14.56,7,27.71,16.73,40H140a20,20,0,0,1,0,40h4l37.78-8.68C203.82,135.07,232,109.23,232,80,232,58.31,214.33,40,192.54,40Z" opacity="0.2" />
                <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z" />
              </svg>
            </span>
          </div>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-ideas-h" className="sec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Ideas"}
              </p>
              <h2 id="cat-ideas-h">{"What people raise money for"}
              </h2>
            </div>
            <p className="lede">{"Some of the goals people give a page to. Yours doesn’t have to be on the list."}
            </p>
          </div>{" "}
          <ul className="cat-ideas" id="catIdeas">
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"A borehole or clean water"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Solar power for a shared space"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Repairs to a school or clinic"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Clean-ups and local projects"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Support for families in need"}
              </span>
            </li>
          </ul>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-tips-h" className="sec night">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Tips"}
              </p>
              <h2 id="cat-tips-h">{"How to make your page stand out"}
              </h2>
            </div>
            <p className="lede">{"Four things that help people understand your goal and feel confident giving."}
            </p>
          </div>{" "}
          <ol className="cat-tips" id="catTips">
            <li>
              <span className="tn">{"01"}
              </span>
              <b>{"Name the community"}
              </b>
              <span>{"Say where the project is and who it will help."}
              </span>
            </li>
            <li>
              <span className="tn">{"02"}
              </span>
              <b>{"Say who’s coordinating"}
              </b>
              <span>{"Introduce the person or group managing the money."}
              </span>
            </li>
            <li>
              <span className="tn">{"03"}
              </span>
              <b>{"Share quotes and costs"}
              </b>
              <span>{"Show quotes from builders or suppliers so people trust the goal."}
              </span>
            </li>
            <li>
              <span className="tn">{"04"}
              </span>
              <b>{"Post progress photos"}
              </b>
              <span>{"Before, during and after photos are the best update you can share."}
              </span>
            </li>
          </ol>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-faq-h" className="sec faqsec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Common questions"}
              </p>
              <h2 id="cat-faq-h">{"Questions about community projects"}
              </h2>
            </div>
            <p className="lede">{"Quick answers to what people ask most."}
            </p>
          </div>{" "}
          <div className="hq-wrap">
            <div className="hq-list cat-faq" id="catFaq">
              <details className="hq">
                <summary>
                  <span>{"Can a group raise money together?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes. One adult organizes the page on behalf of the group."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Whose account should the money go to?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"An account the organizer owns or is allowed to use, such as the group’s account."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can people outside the community help?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes. Make the page Public so it can be found on Explore."}
                </p>
              </details>
            </div>
            <aside className="hq-side">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
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
          <div className="cat-others">
            <h3>{"Other things people raise money for"}
            </h3>
            <div className="oc-grid" id="catOthers">
              <a className="oc" href="/raise/education">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-0e8d57872a3e.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2" />
                      <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Education"}
                  </b>
                  <span>{"School fees, exams and training"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/health">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-2fc2f14fb0b3.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z" opacity="0.2" />
                      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Health and emergencies"}
                  </b>
                  <span>{"Treatment, recovery, or after a fire or flood"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/church">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-c5bffc7dc815.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,152v64H184V128ZM32,216H72V128L32,152Z" opacity="0.2" />
                      <path d="M228.12,145.14,192,123.47V104a8,8,0,0,0-4-7L136,67.36V48h16a8,8,0,0,0,0-16H136V16a8,8,0,0,0-16,0V32H104a8,8,0,0,0,0,16h16V67.36L68,97.05a8,8,0,0,0-4,7v19.47L27.88,145.14A8,8,0,0,0,24,152v64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V168a8,8,0,0,1,16,0v48a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V152A8,8,0,0,0,228.12,145.14ZM40,156.53l24-14.4V208H40ZM128,144a24,24,0,0,0-24,24v40H80V108.64l48-27.43,48,27.43V208H152V168A24,24,0,0,0,128,144Zm88,64H192V142.13l24,14.4Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Church and faith"}
                  </b>
                  <span>{"Buildings, outreach and projects"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/creators">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-adb892449f76.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M155.2,100.8c-23-23-55.57-27.63-72.8-10.4a34.21,34.21,0,0,0-7.61,11.66,16.23,16.23,0,0,1-14.72,10C48,112.44,37,116.61,28.8,124.8,7.6,146,13.33,186.12,41.6,214.4s68.39,34,89.6,12.8C139.39,219,143.56,208,144,195.93a16.23,16.23,0,0,1,10-14.72,34.21,34.21,0,0,0,11.66-7.61C182.83,156.37,178.17,123.78,155.2,100.8ZM112,168a24,24,0,1,1,24-24A24,24,0,0,1,112,168Z" opacity="0.2" />
                      <path d="M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Creators and makers"}
                  </b>
                  <span>{"Films, music, crafts and art"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/business">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-deaecff8263d.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2" />
                      <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Small business"}
                  </b>
                  <span>{"Starting out or getting back on your feet"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/milestones">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-21a7aa320e5b.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M58.89,154.89l42.22,42.22-50.63,18.4a7.79,7.79,0,0,1-10-10Zm138.82-4.72L105.83,58.29A7.79,7.79,0,0,0,93,61.14l-14.9,41,75.82,75.82,41-14.9A7.79,7.79,0,0,0,197.71,150.17Z" opacity="0.2" />
                      <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Milestones"}
                  </b>
                  <span>{"Weddings, send-offs and celebrations"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>{" "}
        </div>
      </section>{" "}
    </main>
    </>
  );
}

function CategoryViewBusiness() {
  return (
    <>
    <main aria-labelledby="cat-title" className="view" data-view="category">{" "}
      <section className="cathero">
        <div className="fs-wrap cathero-in">{" "}
          <div className="cat-copy">{" "}
            <a className="cat-back" href="/#cats">
              <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M112,56V200L40,128Z" opacity="0.2" />
                <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
              </svg>{"All categories"}
            </a>{" "}
            <p className="label" id="catLabel">{"Small business"}
            </p>{" "}
            <h1 id="cat-title">{"Raise money for your small business."}
            </h1>{" "}
            <p className="lede" id="catLede">{"Starting out, restocking after a loss, new equipment or repairs to your shop. Let your customers and community help you grow."}
            </p>{" "}
            <div className="actions">
              <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
              </a>
              <a className="fs-btn btn-ghost" href="/webexplore" id="catExplore">{"See pages like this"}
              </a>
            </div>{" "}
          </div>{" "}
          <div className="cat-photo">
            <img alt="A shopkeeper standing in her store" id="catImg" src="/site/img-deaecff8263d.jpg" />
            <span className="cat-badge" id="catBadge">
              <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2" />
                <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
              </svg>
            </span>
          </div>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-ideas-h" className="sec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Ideas"}
              </p>
              <h2 id="cat-ideas-h">{"What people raise money for"}
              </h2>
            </div>
            <p className="lede">{"Some of the goals people give a page to. Yours doesn’t have to be on the list."}
            </p>
          </div>{" "}
          <ul className="cat-ideas" id="catIdeas">
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Stock to start or restart"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Equipment or tools"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Shop repairs"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Recovering after a loss"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Training to grow your skills"}
              </span>
            </li>
          </ul>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-tips-h" className="sec night">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Tips"}
              </p>
              <h2 id="cat-tips-h">{"How to make your page stand out"}
              </h2>
            </div>
            <p className="lede">{"Four things that help people understand your goal and feel confident giving."}
            </p>
          </div>{" "}
          <ol className="cat-tips" id="catTips">
            <li>
              <span className="tn">{"01"}
              </span>
              <b>{"Tell your business story"}
              </b>
              <span>{"Who you are, what you sell and who you serve."}
              </span>
            </li>
            <li>
              <span className="tn">{"02"}
              </span>
              <b>{"Explain the plan"}
              </b>
              <span>{"Say what you’ll buy and how it helps you keep going."}
              </span>
            </li>
            <li>
              <span className="tn">{"03"}
              </span>
              <b>{"Be clear it’s support"}
              </b>
              <span>{"Supporters are helping you, not investing. No shares, profit or interest."}
              </span>
            </li>
            <li>
              <span className="tn">{"04"}
              </span>
              <b>{"Show the result"}
              </b>
              <span>{"Post photos of the new stock or equipment when it arrives."}
              </span>
            </li>
          </ol>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-faq-h" className="sec faqsec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Common questions"}
              </p>
              <h2 id="cat-faq-h">{"Questions about business goals"}
              </h2>
            </div>
            <p className="lede">{"Quick answers to what people ask most."}
            </p>
          </div>{" "}
          <div className="hq-wrap">
            <div className="hq-list cat-faq" id="catFaq">
              <details className="hq">
                <summary>
                  <span>{"Can I offer supporters a share or interest?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"No. Fundu doesn’t allow investments of any kind. Pages offering returns will be removed."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can I offer discounts to supporters?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"You can thank supporters however you like, as long as you don’t promise profit or money back."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can I use my business account?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes, if it’s yours or you’re allowed to use it."}
                </p>
              </details>
            </div>
            <aside className="hq-side">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
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
          <div className="cat-others">
            <h3>{"Other things people raise money for"}
            </h3>
            <div className="oc-grid" id="catOthers">
              <a className="oc" href="/raise/education">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-0e8d57872a3e.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2" />
                      <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Education"}
                  </b>
                  <span>{"School fees, exams and training"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/health">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-2fc2f14fb0b3.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z" opacity="0.2" />
                      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Health and emergencies"}
                  </b>
                  <span>{"Treatment, recovery, or after a fire or flood"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/church">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-c5bffc7dc815.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,152v64H184V128ZM32,216H72V128L32,152Z" opacity="0.2" />
                      <path d="M228.12,145.14,192,123.47V104a8,8,0,0,0-4-7L136,67.36V48h16a8,8,0,0,0,0-16H136V16a8,8,0,0,0-16,0V32H104a8,8,0,0,0,0,16h16V67.36L68,97.05a8,8,0,0,0-4,7v19.47L27.88,145.14A8,8,0,0,0,24,152v64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V168a8,8,0,0,1,16,0v48a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V152A8,8,0,0,0,228.12,145.14ZM40,156.53l24-14.4V208H40ZM128,144a24,24,0,0,0-24,24v40H80V108.64l48-27.43,48,27.43V208H152V168A24,24,0,0,0,128,144Zm88,64H192V142.13l24,14.4Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Church and faith"}
                  </b>
                  <span>{"Buildings, outreach and projects"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/creators">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-adb892449f76.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M155.2,100.8c-23-23-55.57-27.63-72.8-10.4a34.21,34.21,0,0,0-7.61,11.66,16.23,16.23,0,0,1-14.72,10C48,112.44,37,116.61,28.8,124.8,7.6,146,13.33,186.12,41.6,214.4s68.39,34,89.6,12.8C139.39,219,143.56,208,144,195.93a16.23,16.23,0,0,1,10-14.72,34.21,34.21,0,0,0,11.66-7.61C182.83,156.37,178.17,123.78,155.2,100.8ZM112,168a24,24,0,1,1,24-24A24,24,0,0,1,112,168Z" opacity="0.2" />
                      <path d="M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Creators and makers"}
                  </b>
                  <span>{"Films, music, crafts and art"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/community">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-1b1b6fc9adba.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM192.54,40A39.12,39.12,0,0,0,156,64a39.12,39.12,0,0,0-36.54-24C97.67,40,80,58.31,80,80c0,14.56,7,27.71,16.73,40H140a20,20,0,0,1,0,40h4l37.78-8.68C203.82,135.07,232,109.23,232,80,232,58.31,214.33,40,192.54,40Z" opacity="0.2" />
                      <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Community"}
                  </b>
                  <span>{"Local projects and people helping each other"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/milestones">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-21a7aa320e5b.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M58.89,154.89l42.22,42.22-50.63,18.4a7.79,7.79,0,0,1-10-10Zm138.82-4.72L105.83,58.29A7.79,7.79,0,0,0,93,61.14l-14.9,41,75.82,75.82,41-14.9A7.79,7.79,0,0,0,197.71,150.17Z" opacity="0.2" />
                      <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Milestones"}
                  </b>
                  <span>{"Weddings, send-offs and celebrations"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>{" "}
        </div>
      </section>{" "}
    </main>
    </>
  );
}

function CategoryViewMilestones() {
  return (
    <>
    <main aria-labelledby="cat-title" className="view" data-view="category">{" "}
      <section className="cathero">
        <div className="fs-wrap cathero-in">{" "}
          <div className="cat-copy">{" "}
            <a className="cat-back" href="/#cats">
              <svg aria-hidden="true" className="cat-bi" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M112,56V200L40,128Z" opacity="0.2" />
                <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
              </svg>{"All categories"}
            </a>{" "}
            <p className="label" id="catLabel">{"Milestones"}
            </p>{" "}
            <h1 id="cat-title">{"Raise money for weddings and life’s big moments."}
            </h1>{" "}
            <p className="lede" id="catLede">{"Weddings, send-offs, memorials, naming ceremonies and graduations. Give friends and family near and far one place to join in."}
            </p>{" "}
            <div className="actions">
              <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
              </a>
              <a className="fs-btn btn-ghost" href="/webexplore" id="catExplore">{"See pages like this"}
              </a>
            </div>{" "}
          </div>{" "}
          <div className="cat-photo">
            <img alt="A couple in traditional Nigerian wedding attire" id="catImg" src="/site/img-21a7aa320e5b.jpg" />
            <span className="cat-badge" id="catBadge">
              <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M58.89,154.89l42.22,42.22-50.63,18.4a7.79,7.79,0,0,1-10-10Zm138.82-4.72L105.83,58.29A7.79,7.79,0,0,0,93,61.14l-14.9,41,75.82,75.82,41-14.9A7.79,7.79,0,0,0,197.71,150.17Z" opacity="0.2" />
                <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
              </svg>
            </span>
          </div>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-ideas-h" className="sec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Ideas"}
              </p>
              <h2 id="cat-ideas-h">{"What people raise money for"}
              </h2>
            </div>
            <p className="lede">{"Some of the goals people give a page to. Yours doesn’t have to be on the list."}
            </p>
          </div>{" "}
          <ul className="cat-ideas" id="catIdeas">
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Weddings and introductions"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Send-offs and memorials"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Naming ceremonies"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Graduations and birthdays"}
              </span>
            </li>
            <li>
              <svg aria-hidden="true" className="ct-tick" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              <span>{"Family reunions"}
              </span>
            </li>
          </ul>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-tips-h" className="sec night">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Tips"}
              </p>
              <h2 id="cat-tips-h">{"How to make your page stand out"}
              </h2>
            </div>
            <p className="lede">{"Four things that help people understand your goal and feel confident giving."}
            </p>
          </div>{" "}
          <ol className="cat-tips" id="catTips">
            <li>
              <span className="tn">{"01"}
              </span>
              <b>{"Make it personal"}
              </b>
              <span>{"Share your story, photos and why the day matters."}
              </span>
            </li>
            <li>
              <span className="tn">{"02"}
              </span>
              <b>{"Say what it covers"}
              </b>
              <span>{"Venue, food, travel or costs for a memorial. Be clear and simple."}
              </span>
            </li>
            <li>
              <span className="tn">{"03"}
              </span>
              <b>{"Share early"}
              </b>
              <span>{"Give people time, especially family abroad."}
              </span>
            </li>
            <li>
              <span className="tn">{"04"}
              </span>
              <b>{"Say thank you after"}
              </b>
              <span>{"Post photos from the day as a thank-you update, then end your page."}
              </span>
            </li>
          </ol>{" "}
        </div>
      </section>{" "}
      <section aria-labelledby="cat-faq-h" className="sec faqsec">
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Common questions"}
              </p>
              <h2 id="cat-faq-h">{"Questions about life events"}
              </h2>
            </div>
            <p className="lede">{"Quick answers to what people ask most."}
            </p>
          </div>{" "}
          <div className="hq-wrap">
            <div className="hq-list cat-faq" id="catFaq">
              <details className="hq">
                <summary>
                  <span>{"Can I raise money for a funeral or memorial?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Yes. Many families use a page to share arrangements and gather support."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"Can family abroad support?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"Anyone who can send a transfer to the account on your page can support."}
                </p>
              </details>
              <details className="hq">
                <summary>
                  <span>{"When should I end my page?"}
                  </span>
                  <svg aria-hidden="true" className="hq-c" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M208,96l-80,80L48,96Z" opacity="0.2" />
                    <path d="M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" />
                  </svg>
                </summary>
                <p>{"After the event, once you’ve thanked everyone. You can end it early at any time."}
                </p>
              </details>
            </div>
            <aside className="hq-side">
              <span className="hq-si">
                <svg aria-hidden="true" className="hti" fill="currentColor" focusable="false" viewBox="0 0 256 256">
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
          <div className="cat-others">
            <h3>{"Other things people raise money for"}
            </h3>
            <div className="oc-grid" id="catOthers">
              <a className="oc" href="/raise/education">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-0e8d57872a3e.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2" />
                      <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Education"}
                  </b>
                  <span>{"School fees, exams and training"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/health">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-2fc2f14fb0b3.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z" opacity="0.2" />
                      <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Health and emergencies"}
                  </b>
                  <span>{"Treatment, recovery, or after a fire or flood"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/church">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-c5bffc7dc815.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,152v64H184V128ZM32,216H72V128L32,152Z" opacity="0.2" />
                      <path d="M228.12,145.14,192,123.47V104a8,8,0,0,0-4-7L136,67.36V48h16a8,8,0,0,0,0-16H136V16a8,8,0,0,0-16,0V32H104a8,8,0,0,0,0,16h16V67.36L68,97.05a8,8,0,0,0-4,7v19.47L27.88,145.14A8,8,0,0,0,24,152v64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V168a8,8,0,0,1,16,0v48a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V152A8,8,0,0,0,228.12,145.14ZM40,156.53l24-14.4V208H40ZM128,144a24,24,0,0,0-24,24v40H80V108.64l48-27.43,48,27.43V208H152V168A24,24,0,0,0,128,144Zm88,64H192V142.13l24,14.4Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Church and faith"}
                  </b>
                  <span>{"Buildings, outreach and projects"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/creators">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-adb892449f76.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M155.2,100.8c-23-23-55.57-27.63-72.8-10.4a34.21,34.21,0,0,0-7.61,11.66,16.23,16.23,0,0,1-14.72,10C48,112.44,37,116.61,28.8,124.8,7.6,146,13.33,186.12,41.6,214.4s68.39,34,89.6,12.8C139.39,219,143.56,208,144,195.93a16.23,16.23,0,0,1,10-14.72,34.21,34.21,0,0,0,11.66-7.61C182.83,156.37,178.17,123.78,155.2,100.8ZM112,168a24,24,0,1,1,24-24A24,24,0,0,1,112,168Z" opacity="0.2" />
                      <path d="M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Creators and makers"}
                  </b>
                  <span>{"Films, music, crafts and art"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/community">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-1b1b6fc9adba.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM192.54,40A39.12,39.12,0,0,0,156,64a39.12,39.12,0,0,0-36.54-24C97.67,40,80,58.31,80,80c0,14.56,7,27.71,16.73,40H140a20,20,0,0,1,0,40h4l37.78-8.68C203.82,135.07,232,109.23,232,80,232,58.31,214.33,40,192.54,40Z" opacity="0.2" />
                      <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Community"}
                  </b>
                  <span>{"Local projects and people helping each other"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
              <a className="oc" href="/raise/business">
                <span className="oc-ph">
                  <img alt="" loading="lazy" src="/site/img-deaecff8263d.jpg" />
                  <span className="oc-ic">
                    <svg aria-hidden="true" className="cat-svg" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                      <path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2" />
                      <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
                    </svg>
                  </span>
                </span>
                <span className="oc-tx">
                  <b>{"Small business"}
                  </b>
                  <span>{"Starting out or getting back on your feet"}
                  </span>
                </span>
                <span className="oc-go">
                  <svg aria-hidden="true" className="cat-ar" fill="currentColor" focusable="false" viewBox="0 0 256 256">
                    <path d="M216,128l-72,72V56Z" opacity="0.2" />
                    <path d="M221.66,122.34l-72-72A8,8,0,0,0,136,56v64H40a8,8,0,0,0,0,16h96v64a8,8,0,0,0,13.66,5.66l72-72A8,8,0,0,0,221.66,122.34ZM152,180.69V75.31L204.69,128Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>{" "}
        </div>
      </section>{" "}
    </main>
    </>
  );
}

const VIEWS = {
  "education": CategoryViewEducation,
  "health": CategoryViewHealth,
  "church": CategoryViewChurch,
  "creators": CategoryViewCreators,
  "community": CategoryViewCommunity,
  "business": CategoryViewBusiness,
  "milestones": CategoryViewMilestones,
};

export const SLUGS = Object.keys(VIEWS);

export default function CategoryView({ slug }) {
  const View = VIEWS[slug];
  return View ? <View /> : null;
}
