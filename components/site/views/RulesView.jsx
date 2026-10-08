/* Fundu marketing website. Markup is the approved design's, converted to
   JSX without changes to structure, classes or copy.
   Internal links are plain <a> on purpose: each marketing page starts its own
   motion script on a fresh load, so client-side routing isn't used here. */

export default function RulesView() {
  return (
    <>
    <main className="view" data-view="rules" aria-labelledby="rl-title">{" "}
      <section className="tshero">{" "}
        <div className="fs-wrap tshero-in">{" "}
          <div>{" "}
            <p className="label">{"Fundraising rules"}
            </p>{" "}
            <h1 id="rl-title">{"What you can raise money for on Fundu."}
            </h1>{" "}
            <p className="lede">{"Fundu is for real goals, explained honestly. These rules keep pages fair for organizers and safe for supporters. The full legal version is in our "}
              <a className="inl" href="/terms">{"Terms of Service"}
              </a>{"."}
            </p>{" "}
          </div>{" "}
          <nav className="hwjump" aria-label="On this page">{" "}
            <a href="#rl-can">
              <span>{"01"}
              </span>{"What you can raise for"}
            </a>{" "}
            <a href="#rl-must">
              <span>{"02"}
              </span>{"What every page must do"}
            </a>{" "}
            <a href="#rl-no">
              <span>{"03"}
              </span>{"What’s not allowed"}
            </a>{" "}
            <a href="#rl-break">
              <span>{"04"}
              </span>{"If a page breaks the rules"}
            </a>{" "}
          </nav>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" id="rl-can" aria-labelledby="rl-can-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"What you can raise for"}
              </p>
              <h2 id="rl-can-h">{"Almost any real goal that matters to you."}
              </h2>
            </div>
            <p className="lede">{"For yourself, for your family, for your church or community, or for someone else with their permission."}
            </p>
          </div>{" "}
          <ul className="rl-can">
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2" />
                <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
              </svg>
              <span>{"School fees and training"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z" opacity="0.2" />
                <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z" />
              </svg>
              <span>{"Medical bills and recovery"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M208,129v39H48V128a80,80,0,0,1,80.61-80C172.72,48.33,208,84.89,208,129Z" opacity="0.2" />
                <path d="M120,16V8a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0Zm80,32a8,8,0,0,0,5.66-2.34l8-8a8,8,0,0,0-11.32-11.32l-8,8A8,8,0,0,0,200,48ZM50.34,45.66A8,8,0,0,0,61.66,34.34l-8-8A8,8,0,0,0,42.34,37.66Zm87,26.45a8,8,0,1,0-2.64,15.78C153.67,91.08,168,108.32,168,128a8,8,0,0,0,16,0C184,100.6,163.93,76.57,137.32,72.11ZM232,176v24a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V176a16,16,0,0,1,16-16V128a88,88,0,0,1,88-88h.68c48.15.36,87.33,40.29,87.33,89v31A16,16,0,0,1,232,176ZM56,160H200V129c0-40-32.05-72.71-71.45-73H128a72,72,0,0,0-72,72Zm160,40V176H40v24H216Z" />
              </svg>
              <span>{"Emergencies, fires and floods"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,152v64H184V128ZM32,216H72V128L32,152Z" opacity="0.2" />
                <path d="M228.12,145.14,192,123.47V104a8,8,0,0,0-4-7L136,67.36V48h16a8,8,0,0,0,0-16H136V16a8,8,0,0,0-16,0V32H104a8,8,0,0,0,0,16h16V67.36L68,97.05a8,8,0,0,0-4,7v19.47L27.88,145.14A8,8,0,0,0,24,152v64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V168a8,8,0,0,1,16,0v48a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V152A8,8,0,0,0,228.12,145.14ZM40,156.53l24-14.4V208H40ZM128,144a24,24,0,0,0-24,24v40H80V108.64l48-27.43,48,27.43V208H152V168A24,24,0,0,0,128,144Zm88,64H192V142.13l24,14.4Z" />
              </svg>
              <span>{"Church and faith projects"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM192.54,40A39.12,39.12,0,0,0,156,64a39.12,39.12,0,0,0-36.54-24C97.67,40,80,58.31,80,80c0,14.56,7,27.71,16.73,40H140a20,20,0,0,1,0,40h4l37.78-8.68C203.82,135.07,232,109.23,232,80,232,58.31,214.33,40,192.54,40Z" opacity="0.2" />
                <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z" />
              </svg>
              <span>{"Community projects"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2" />
                <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
              </svg>
              <span>{"Starting or rebuilding a business"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M155.2,100.8c-23-23-55.57-27.63-72.8-10.4a34.21,34.21,0,0,0-7.61,11.66,16.23,16.23,0,0,1-14.72,10C48,112.44,37,116.61,28.8,124.8,7.6,146,13.33,186.12,41.6,214.4s68.39,34,89.6,12.8C139.39,219,143.56,208,144,195.93a16.23,16.23,0,0,1,10-14.72,34.21,34.21,0,0,0,11.66-7.61C182.83,156.37,178.17,123.78,155.2,100.8ZM112,168a24,24,0,1,1,24-24A24,24,0,0,1,112,168Z" opacity="0.2" />
                <path d="M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z" />
              </svg>
              <span>{"Films, music, books and art"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M58.89,154.89l42.22,42.22-50.63,18.4a7.79,7.79,0,0,1-10-10Zm138.82-4.72L105.83,58.29A7.79,7.79,0,0,0,93,61.14l-14.9,41,75.82,75.82,41-14.9A7.79,7.79,0,0,0,197.71,150.17Z" opacity="0.2" />
                <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
              </svg>
              <span>{"Weddings and life events"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z" opacity="0.2" />
                <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z" />
              </svg>
              <span>{"Housing and shelter"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M232,108a20,20,0,1,1-20-20A20,20,0,0,1,232,108ZM64,108a20,20,0,1,0-20,20A20,20,0,0,0,64,108ZM92,80A20,20,0,1,0,72,60,20,20,0,0,0,92,80Zm72,0a20,20,0,1,0-20-20A20,20,0,0,0,164,80Zm19.24,75.85A43.46,43.46,0,0,1,162.57,130a36,36,0,0,0-69.14,0,43.49,43.49,0,0,1-20.67,25.9,32,32,0,0,0,27.73,57.62,72.49,72.49,0,0,1,55,0,32,32,0,0,0,27.73-57.62Z" opacity="0.2" />
                <path d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z" />
              </svg>
              <span>{"Animals and the environment"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M65.17,108.08l-33,25.34c-.1-1.8-.15-3.6-.15-5.42A95.61,95.61,0,0,1,53.23,67.78ZM46.92,179.42a96.12,96.12,0,0,0,57,41.52l-14.7-41.52Zm105.21,41.52a96.12,96.12,0,0,0,57-41.52H166.83ZM202.77,67.78l-11.94,40.3,33,25.34c.1-1.8.15-3.6.15-5.42A95.61,95.61,0,0,0,202.77,67.78Zm-38.52-28.7a96.34,96.34,0,0,0-72.5,0L128,64ZM152.72,160,168,115.5,128,88,88,115.5,103.28,160Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm76.52,147.42H170.9l-9.26-12.76,12.63-36.78,15-4.89,26.24,20.13A87.38,87.38,0,0,1,204.52,171.42Zm-164-34.3L66.71,117l15,4.89,12.63,36.78L85.1,171.42H51.48A87.38,87.38,0,0,1,40.47,137.12Zm10-50.64,5.51,18.6L40.71,116.77A87.33,87.33,0,0,1,50.43,86.48ZM109,152,97.54,118.65,128,97.71l30.46,20.94L147,152Zm91.07-46.92,5.51-18.6a87.33,87.33,0,0,1,9.72,30.29Zm-6.2-35.38-9.51,32.08-15.07,4.89L136,83.79V68.21l29.09-20A88.58,88.58,0,0,1,193.86,69.7ZM146.07,41.87,128,54.29,109.93,41.87a88.24,88.24,0,0,1,36.14,0ZM90.91,48.21l29.09,20V83.79L86.72,106.67l-15.07-4.89L62.14,69.7A88.58,88.58,0,0,1,90.91,48.21ZM63.15,187.42H83.52l7.17,20.27A88.4,88.4,0,0,1,63.15,187.42ZM110,214.13,98.12,180.71,107.35,168h41.3l9.23,12.71-11.83,33.42a88,88,0,0,1-36.1,0Zm55.36-6.44,7.17-20.27h20.37A88.4,88.4,0,0,1,165.31,207.69Z" />
              </svg>
              <span>{"Sports and fitness"}
              </span>
            </li>
            <li>
              <svg className="rl-ci" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M200,48H56a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H200a8,8,0,0,0,8-8V56A8,8,0,0,0,200,48ZM152,152H104V104h48Z" opacity="0.2" />
                <path d="M152,96H104a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V104A8,8,0,0,0,152,96Zm-8,48H112V112h32Zm88,0H216V112h16a8,8,0,0,0,0-16H216V56a16,16,0,0,0-16-16H160V24a8,8,0,0,0-16,0V40H112V24a8,8,0,0,0-16,0V40H56A16,16,0,0,0,40,56V96H24a8,8,0,0,0,0,16H40v32H24a8,8,0,0,0,0,16H40v40a16,16,0,0,0,16,16H96v16a8,8,0,0,0,16,0V216h32v16a8,8,0,0,0,16,0V216h40a16,16,0,0,0,16-16V160h16a8,8,0,0,0,0-16Zm-32,56H56V56H200v95.87s0,.09,0,.13,0,.09,0,.13V200Z" />
              </svg>
              <span>{"Technology and new ideas"}
              </span>
            </li>
          </ul>{" "}
          <p className="rl-note">
            <svg className="rl-ni" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
              <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
            </svg>{"Not sure your goal fits? "}
            <a className="inl" href="/contact">{"Ask us before you start"}
            </a>{"."}
          </p>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec night" id="rl-must" aria-labelledby="rl-must-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"What every page must do"}
              </p>
              <h2 id="rl-must-h">{"Six rules every page follows."}
              </h2>
            </div>
            <p className="lede">{"They’re simple, and they’re what makes people comfortable giving to a page they found through a link."}
            </p>
          </div>{" "}
          <ul className="rl-must">
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M56,88l32,80c0,17.67-20,24-32,24s-32-6.33-32-24ZM200,56l-32,80c0,17.67,20,24,32,24s32-6.33,32-24Z" opacity="0.2" />
                  <path d="M239.43,133l-32-80h0a8,8,0,0,0-9.16-4.84L136,62V40a8,8,0,0,0-16,0V65.58L54.26,80.19A8,8,0,0,0,48.57,85h0v.06L16.57,165a7.92,7.92,0,0,0-.57,3c0,23.31,24.54,32,40,32s40-8.69,40-32a7.92,7.92,0,0,0-.57-3L66.92,93.77,120,82V208H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16H136V78.42L187,67.1,160.57,133a7.92,7.92,0,0,0-.57,3c0,23.31,24.54,32,40,32s40-8.69,40-32A7.92,7.92,0,0,0,239.43,133ZM56,184c-7.53,0-22.76-3.61-23.93-14.64L56,109.54l23.93,59.82C78.76,180.39,63.53,184,56,184Zm144-32c-7.53,0-22.76-3.61-23.93-14.64L200,77.54l23.93,59.82C222.76,148.39,207.53,152,200,152Z" />
                </svg>
              </span>
              <div>
                <b>{"Be true"}
                </b>
                <span>{"Your story, photos, goal and updates must be honest. Nothing deliberately false or misleading."}
                </span>
              </div>
            </li>
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M168,100a60,60,0,1,1-60-60A60,60,0,0,1,168,100Z" opacity="0.2" />
                  <path d="M144,157.68a68,68,0,1,0-71.9,0c-20.65,6.76-39.23,19.39-54.17,37.17a8,8,0,0,0,12.25,10.3C50.25,181.19,77.91,168,108,168s57.75,13.19,77.87,37.15a8,8,0,0,0,12.25-10.3C183.18,177.07,164.6,164.44,144,157.68ZM56,100a52,52,0,1,1,52,52A52.06,52.06,0,0,1,56,100Zm197.66,33.66-32,32a8,8,0,0,1-11.32,0l-16-16a8,8,0,0,1,11.32-11.32L216,148.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
              </span>
              <div>
                <b>{"Be yours to run"}
                </b>
                <span>{"If you’re raising for someone else, you need their permission. Never pretend to be another person or organization."}
                </span>
              </div>
            </li>
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M232,96v96a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V96Z" opacity="0.2" />
                  <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z" />
                </svg>
              </span>
              <div>
                <b>{"Use money details you’re allowed to use"}
                </b>
                <span>{"The bank account on your page must be yours, or one you have permission to use."}
                </span>
              </div>
            </li>
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M208,40H48a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8h8.69L166.34,106.34a8,8,0,0,1,11.32,0L216,144.69V48A8,8,0,0,0,208,40ZM96,112a16,16,0,1,1,16-16A16,16,0,0,1,96,112Z" opacity="0.2" />
                  <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208v77.38l-24.69-24.7a16,16,0,0,0-22.62,0L53.37,208H48ZM208,208H76l96-96,36,36v60ZM96,120A24,24,0,1,0,72,96,24,24,0,0,0,96,120Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,96,88Z" />
                </svg>
              </span>
              <div>
                <b>{"Use content you have the right to"}
                </b>
                <span>{"Only upload photos, videos and text that are yours or that you have permission to use."}
                </span>
              </div>
            </li>
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M200,32H56a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H200a8,8,0,0,0,8-8V40A8,8,0,0,0,200,32ZM128,168a32,32,0,1,1,32-32A32,32,0,0,1,128,168Z" opacity="0.2" />
                  <path d="M75.19,198.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,155,165.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,73.6,187.2,8,8,0,0,0,75.19,198.4ZM128,112a24,24,0,1,1-24,24A24,24,0,0,1,128,112Zm72-88H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm0,192H56V40H200ZM88,64a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,64Z" />
                </svg>
              </span>
              <div>
                <b>{"Be run by an adult"}
                </b>
                <span>{"You must be 18 or older to create a page. Someone under 18 can be the person it’s for."}
                </span>
              </div>
            </li>
            <li className="rv">
              <span className="rl-mi">
                <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z" opacity="0.2" />
                  <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM48,163.31l88-88L180.69,120l-88,88H48Zm144-54.62L147.32,64l24-24L216,84.69Z" />
                </svg>
              </span>
              <div>
                <b>{"Keep the total honest"}
                </b>
                <span>{"Update the amount raised with what you’ve actually received. Don’t inflate it."}
                </span>
              </div>
            </li>
          </ul>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec tint-teal" id="rl-no" aria-labelledby="rl-no-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"What’s not allowed"}
              </p>
              <h2 id="rl-no-h">{"Pages that will be removed."}
              </h2>
            </div>
            <p className="lede">{"Fundu is a place to raise money for goals, not to sell, invest or mislead. These aren’t allowed on pages, updates or comments."}
            </p>
          </div>{" "}
          <ul className="rl-no">
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Scams, fraud or fake stories"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Pretending to be someone else"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Anything illegal, or moving money from crime"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Investments: shares, equity, interest, profit or guaranteed returns"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Using someone else’s bank details without permission"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Faking or inflating the amount raised"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Threats, harassment, hate or abuse"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Sharing someone’s private information without permission"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Content you don’t have the right to use"}
              </span>
            </li>
            <li>
              <svg className="rl-x" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.56,87.56,0,0,1-20.41,56.28L71.72,60.4A88,88,0,0,1,216,128ZM40,128A87.56,87.56,0,0,1,60.41,71.72L184.28,195.6A88,88,0,0,1,40,128Z" />
              </svg>
              <span>{"Spam, or trying to break or game Fundu"}
              </span>
            </li>
          </ul>{" "}
          <div className="rl-inv">
            <span className="ts-ic">
              <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,64V208H32V48H208A16,16,0,0,1,224,64Z" opacity="0.2" />
                <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31l-56,56V200H224A8,8,0,0,1,232,208Z" />
              </svg>
            </span>
            <div>
              <h3>{"Why investments aren’t allowed"}
              </h3>
              <p>{"Fundu is for support, not investment. A page can’t offer shares, interest, profit or any promise of money back. If someone offers you a return for “supporting” them, report the page."}
              </p>
            </div>
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" id="rl-break" aria-labelledby="rl-br-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"If a page breaks the rules"}
              </p>
              <h2 id="rl-br-h">{"What happens next."}
              </h2>
            </div>
            <p className="lede">{"We look at each case fairly. A report on its own doesn’t mean someone did anything wrong."}
            </p>
          </div>{" "}
          <ol className="ts-steps">{" "}
            <li className="rv">
              <span className="ts-n">{"1"}
              </span>
              <h3>{"We review the page"}
              </h3>
              <p>{"The Fundu team looks at the page, its updates and any reports. We may ask the organizer for more information."}
              </p>
            </li>{" "}
            <li className="rv">
              <span className="ts-n">{"2"}
              </span>
              <h3>{"We take action if needed"}
              </h3>
              <p>{"Depending on what we find, we can ask for changes, remove the page, or restrict the account."}
              </p>
            </li>{" "}
            <li className="rv">
              <span className="ts-n">{"3"}
              </span>
              <h3>{"We keep records"}
              </h3>
              <p>{"In serious cases, we keep the relevant records and can work with the authorities when the law requires it."}
              </p>
            </li>{" "}
          </ol>{" "}
          <div className="ts-sent rl-end">{" "}
            <span className="ts-ic">
              <svg className="hti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,56V176c-64,55.43-112-55.43-176,0V56C112,.57,160,111.43,224,56Z" opacity="0.2" />
                <path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z" />
              </svg>
            </span>{" "}
            <div>
              <h3>{"Seen a page that breaks these rules?"}
              </h3>
              <p>{"Open the page and choose "}
                <b>{"Report campaign"}
                </b>{" at the bottom of the support card. Read more on our "}
                <a className="inl" href="/trust-and-safety">{"Trust & safety"}
                </a>{" page."}
              </p>
            </div>{" "}
            <a className="fs-btn btn-ghost" href="/terms">{"Read the Terms"}
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}
