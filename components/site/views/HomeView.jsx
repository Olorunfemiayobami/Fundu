/* Fundu marketing website. Markup is the approved design's, converted to
   JSX without changes to structure, classes or copy.
   Internal links are plain <a> on purpose: each marketing page starts its own
   motion script on a fresh load, so client-side routing isn't used here. */
/* eslint-disable @next/next/no-html-link-for-pages */

export default function HomeView() {
  return (
    <>
    <main id="main" className="view" data-view="home">{" "}
      <section className="fs-hero" aria-labelledby="h1">{" "}
        <div className="fs-wrap hero-grid">{" "}
          <div>{" "}
            <p className="label">{"For anything you’re raising money for"}
            </p>{" "}
            <h1 id="h1">{"Give every goal a place of its own."}
            </h1>{" "}
            <p className="hero-sub">{"Put your story, photos and bank details on one page, then share a single link anywhere. Supporters send money straight to your account, and Fundu never takes a cut."}
            </p>{" "}
            <div className="actions">
              <a className="fs-btn btn-primary" href="/create-campaign">{"Create your free page"}
                <svg className="b-arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="fs-btn btn-ghost" href="#journey">{"See how it works"}
              </a>
            </div>{" "}
            <ul className="promises">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5 9-10" />
                </svg>{"Free during early access"}
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5 9-10" />
                </svg>{"No cut of what you raise"}
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5 9-10" />
                </svg>{"Set up in minutes"}
              </li>
            </ul>{" "}
          </div>{" "}
          <div className="hstage" id="hstage">{" "}
            <div className="hcase" aria-hidden="true">
              <div className="hrings">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>{" "}
            <div className="hcall" id="hcall" aria-live="polite">
              <span className="hc-n">
                <b id="hcN">{"1"}
                </b>
                <span>{"of 8"}
                </span>
              </span>
              <span className="hc-t" id="hcT">{"A goal gets shared in the family group"}
              </span>
              <span className="hc-dots" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>{" "}
            <div className="hdev">
              <span className="hb hb-act"></span>
              <span className="hb hb-v1"></span>
              <span className="hb hb-v2"></span>
              <span className="hb hb-pwr"></span>{" "}
              <div className="hphone" id="hphone" data-step="0" role="img" aria-label="Animation: Ada shares a Fundu link in a family group chat. A friend opens it, reads Tobi’s fundraiser and copies the account number. The money arrives in Tobi’s own bank account.">{" "}
                <div className="hnotch" aria-hidden="true"></div>
                <div className="hstatus" aria-hidden="true">
                  <span>{"9:41"}
                  </span>
                  <span className="hs-r">
                    <svg width="17" height="11" viewBox="0 0 17 11" aria-hidden="true">
                      <rect x="0" y="7" width="3" height="4" rx="1" fill="currentColor" />
                      <rect x="4.5" y="5" width="3" height="6" rx="1" fill="currentColor" />
                      <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="currentColor" />
                      <rect x="13.5" y="0" width="3" height="11" rx="1" fill="currentColor" />
                    </svg>
                    <svg width="15" height="11" viewBox="0 0 15 11" aria-hidden="true">
                      <path d="M7.5 10.5l2-2.3a3 3 0 0 0-4 0z" fill="currentColor" />
                      <path d="M2.6 5.4a7 7 0 0 1 9.8 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                      <path d="M.6 3.1a10 10 0 0 1 13.8 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                    </svg>
                    <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true">
                      <rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke="currentColor" opacity=".45" fill="none" />
                      <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" />
                      <rect x="23" y="4" width="1.5" height="4" rx=".75" fill="currentColor" opacity=".5" />
                    </svg>
                  </span>
                </div>{" "}
                <div className="hscreen hchat">{" "}
                  <div className="hchat-head">
                    <span className="gav">{"FG"}
                    </span>
                    <div>{"Family group"}
                      <small>{"Ada, Kemi, Uncle Femi and 29 others"}
                      </small>
                    </div>
                  </div>{" "}
                  <div className="hmsg hm0">
                    <em>{"Uncle Femi"}
                    </em>{"Good morning family"}
                  </div>{" "}
                  <div className="hmsg hm1">
                    <em>{"Ada"}
                    </em>{"Please take a minute to read about Tobi. Anything helps. "}
                    <div className="hlpv">
                      <img src="/site/img-c34ea367a50f.jpg" alt="" />
                      <div>
                        <b>{"Help Tobi Finish University"}
                        </b>
                        <span>{"Fundu"}
                        </span>
                      </div>
                    </div>{" "}
                  </div>{" "}
                  <div className="htap" aria-hidden="true"></div>{" "}
                  <div className="hmsg me hm2">{"Just sent something. Go Tobi!"}
                  </div>
                  <div className="hmsg me hm3">
                    <div className="rc">
                      <div className="rc-top">
                        <svg className="rc-ok" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                          <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                          <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                        </svg>
                        <span>
                          <b>{"Transfer successful"}
                          </b>
                          <small>{"6 Oct 2026, 8:14 PM"}
                          </small>
                        </span>
                      </div>
                      <div className="rc-amt">{"₦5,000.00"}
                      </div>
                      <div className="rc-row">
                        <span>{"To"}
                        </span>
                        <b>{"TOBI ADEYEMI"}
                        </b>
                      </div>
                      <div className="rc-row">
                        <span>{"Bank"}
                        </span>
                        <b>{"First Bank"}
                        </b>
                      </div>
                      <div className="rc-row">
                        <span>{"Account"}
                        </span>
                        <b>{"0123456789"}
                        </b>
                      </div>
                      <div className="rc-row">
                        <span>{"From"}
                        </span>
                        <b>{"Kemi A."}
                        </b>
                      </div>
                    </div>
                  </div>{" "}
                </div>{" "}
                <div className="hscreen hbank" aria-hidden="true">{" "}
                  <div className="bk-bar">
                    <svg className="bk-i" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M112,56V200L40,128Z" opacity="0.2" />
                      <path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z" />
                    </svg>
                    <b>{"Transfer to bank"}
                    </b>
                  </div>{" "}
                  <div className="bk-form">{" "}
                    <span className="bk-l">{"Account number"}
                    </span>
                    <span className="bk-in">{"0123456789"}
                      <em>{"Pasted"}
                      </em>
                    </span>{" "}
                    <span className="bk-l">{"Bank"}
                    </span>
                    <span className="bk-in">{"First Bank"}
                    </span>{" "}
                    <span className="bk-name">
                      <svg className="bk-ni" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                        <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                        <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                      </svg>{"TOBI ADEYEMI"}
                    </span>{" "}
                    <span className="bk-l">{"Amount"}
                    </span>
                    <span className="bk-in bk-amt">{"₦"}
                      <i className="bk-type">{"5,000"}
                      </i>
                      <i className="caret"></i>
                    </span>{" "}
                    <span className="bk-l">{"Note"}
                    </span>
                    <span className="bk-in bk-note">{"For Tobi’s fees"}
                    </span>{" "}
                    <span className="bk-btn">{"Send ₦5,000"}
                    </span>{" "}
                  </div>{" "}
                  <div className="bk-done">{" "}
                    <span className="bk-tick">
                      <svg className="bk-ti" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                        <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2" />
                        <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                      </svg>
                    </span>{" "}
                    <b>{"Transfer successful"}
                    </b>{" "}
                    <span className="bk-sum">{"₦5,000.00"}
                    </span>{" "}
                    <span className="bk-to">{"to TOBI ADEYEMI, First Bank"}
                    </span>{" "}
                    <span className="bk-share">
                      <svg className="bk-si" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                        <path d="M208,200a32,32,0,1,1-32-32A32,32,0,0,1,208,200ZM176,88a32,32,0,1,0-32-32A32,32,0,0,0,176,88Z" opacity="0.2" />
                        <path d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z" />
                      </svg>{"Share receipt"}
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="hscreen hpage">{" "}
                  <div className="hbar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M19 12H5M11 18l-6-6 6-6" />
                    </svg>
                    <span className="hbar-logo">{"Fund"}
                      <i>{"U"}
                      </i>
                    </span>
                  </div>{" "}
                  <div className="hview">
                    <div className="hscroll">{" "}
                      <div className="hcover">
                        <img src="/site/img-c34ea367a50f.jpg" alt="" />
                      </div>{" "}
                      <div className="hbody">{" "}
                        <span className="chip">{"Education"}
                        </span>{" "}
                        <div className="cp-title">{"Help Tobi Finish University"}
                        </div>{" "}
                        <div className="cp-org">
                          <span className="av">{"TA"}
                          </span>{"Tobi Adeyemi is organizing"}
                        </div>{" "}
                        <div className="amt">
                          <b>{"₦420,000"}
                          </b>
                          <span>{"42%"}
                          </span>
                        </div>{" "}
                        <div className="fs-bar">
                          <i id="hbarFill" style={{"--p": "0%"}}></i>
                        </div>{" "}
                        <div className="meta">
                          <span>{"raised of ₦1,000,000"}
                          </span>
                          <span>{"Reported by Tobi"}
                          </span>
                        </div>{" "}
                        <div className="hways">
                          <div className="hways-h">{"Ways to give"}
                          </div>{" "}
                          <div className="hmethod">
                            <div className="hm-top">
                              <span className="ic sm">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                                </svg>
                              </span>
                              <span>
                                <b>{"Bank transfer"}
                                </b>
                                <small>{"First Bank"}
                                </small>
                              </span>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M6 15l6-6 6 6" />
                              </svg>
                            </div>{" "}
                            <div className="give">
                              <div>
                                <small>{"Account number"}
                                </small>
                                <strong>{"0123456789"}
                                </strong>
                                <small>{"Tobi Adeyemi"}
                                </small>
                              </div>
                              <span className="copy hcopy">
                                <span className="c1">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="9" y="9" width="12" height="12" rx="2" />
                                    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                                  </svg>{"Copy"}
                                </span>
                                <span className="c2">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12l5 5 9-10" />
                                  </svg>{"Copied"}
                                </span>
                              </span>
                            </div>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>
                  </div>{" "}
                  <div className="htoast" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12l5 5 9-10" />
                    </svg>{"Account number copied"}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <button type="button" className="hpause" id="hpause" aria-pressed="false" aria-label="Pause animation">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5v14M15 5v14" />
              </svg>
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="journey sec" id="journey" aria-labelledby="j-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead j-head">
            <div>
              <p className="label">{"How it works, start to finish"}
              </p>
              <h2 id="j-h">{"From “I need help” to money in your account, in five steps."}
              </h2>
            </div>
          </div>{" "}
          <div className="fs-hiw" id="hiw">{" "}
            <ol className="hiw-steps" id="hiwSteps">{" "}
              <li className="hiw-line" aria-hidden="true">
                <i></i>
              </li>{" "}
              <li className="fs-hiw-step" data-n="1">{" "}
                <span className="hiw-node" aria-hidden="true">{"1"}
                </span>{" "}
                <div className="hiw-body">
                  <span className="j-k">{"Step 1 of 5"}
                  </span>
                  <h3>
                    <span className="rv-line">
                      <span>{"There’s something you need money for."}
                      </span>
                    </span>
                  </h3>
                  <p>{"Maybe it’s urgent. Maybe it’s a dream you’ve been working on. Either way, you need people behind you."}
                  </p>
                </div>{" "}
                <div className="hiw-scene hiw-inline" aria-hidden="true">
                  <div className="v-note">
                    <span className="v-note-k">{"What I need"}
                    </span>
                    <b>{"₦1,000,000"}
                    </b>
                    <span>{"for my final year at university"}
                    </span>
                    <div className="j-words">
                      <span>{"School fees"}
                      </span>
                      <span>{"A hospital bill"}
                      </span>
                      <span>{"A new shop"}
                      </span>
                      <span>{"A church project"}
                      </span>
                    </div>
                  </div>
                </div>{" "}
              </li>{" "}
              <li className="fs-hiw-step" data-n="2">{" "}
                <span className="hiw-node" aria-hidden="true">{"2"}
                </span>{" "}
                <div className="hiw-body">
                  <span className="j-k">{"Step 2 of 5"}
                  </span>
                  <h3>
                    <span className="rv-line">
                      <span>{"You make a page for it."}
                      </span>
                    </span>
                  </h3>
                  <p>{"Say what happened in your own words. Add photos, set how much you need, and add your bank details. You can change anything later."}
                  </p>
                </div>{" "}
                <div className="hiw-scene hiw-inline" aria-hidden="true">
                  <div className="v-form">
                    <div className="v-form-top">
                      <b>{"Create your page"}
                      </b>
                      <span className="v-steps">
                        <i className="on"></i>
                        <i></i>
                        <i></i>
                        <i></i>
                      </span>
                    </div>{" "}
                    <label>{"Title"}
                      <span className="v-input">{"Help Tobi Finish University"}
                        <em className="caret"></em>
                      </span>
                    </label>{" "}
                    <div className="v-row">
                      <label>{"Goal"}
                        <span className="v-input">
                          <i>{"₦"}
                          </i>{"1,000,000"}
                        </span>
                      </label>
                      <label>{"Category"}
                        <span className="v-input">{"Education"}
                        </span>
                      </label>
                    </div>{" "}
                    <label>{"Cover image"}
                      <span className="v-cover">
                        <img src="/site/img-c34ea367a50f.jpg" alt="" />
                      </span>
                    </label>{" "}
                    <span className="v-btn">{"Continue to story"}
                    </span>
                  </div>
                </div>{" "}
              </li>{" "}
              <li className="fs-hiw-step" data-n="3">{" "}
                <span className="hiw-node" aria-hidden="true">{"3"}
                </span>{" "}
                <div className="hiw-body">
                  <span className="j-k">{"Step 3 of 5"}
                  </span>
                  <h3>
                    <span className="rv-line">
                      <span>{"You share one link."}
                      </span>
                    </span>
                  </h3>
                  <p>{"Drop it in your family group, your church group, your status, anywhere people know you."}
                  </p>
                </div>{" "}
                <div className="hiw-scene hiw-inline" aria-hidden="true">
                  <div className="v-share">
                    <div className="v-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                        <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                      </svg>
                      <span>{"fundu link to “Help Tobi Finish University”"}
                      </span>
                      <b className="v-copied">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12l5 5 9-10" />
                        </svg>{"Copied"}
                      </b>
                    </div>{" "}
                    <div className="v-chats">
                      <span className="v-chat">{"Family group"}
                      </span>
                      <span className="v-chat">{"Church friends"}
                      </span>
                      <span className="v-chat">{"Class of 2019"}
                      </span>
                      <span className="v-chat">{"My status"}
                      </span>
                    </div>
                  </div>
                </div>{" "}
              </li>{" "}
              <li className="fs-hiw-step" data-n="4">{" "}
                <span className="hiw-node" aria-hidden="true">{"4"}
                </span>{" "}
                <div className="hiw-body">
                  <span className="j-k">{"Step 4 of 5"}
                  </span>
                  <h3>
                    <span className="rv-line">
                      <span>{"People read it and send support."}
                      </span>
                    </span>
                  </h3>
                  <p>{"They see what it’s for and how far you’ve come, then copy your account number. No questions needed."}
                  </p>
                </div>{" "}
                <div className="hiw-scene hiw-inline" aria-hidden="true">
                  <div className="v-page">
                    <div className="v-cov">
                      <img src="/site/img-c34ea367a50f.jpg" alt="" />
                    </div>
                    <div className="v-pb">
                      <b className="v-t">{"Help Tobi Finish University"}
                      </b>
                      <div className="amt">
                        <b>{"₦420,000"}
                        </b>
                        <span>{"42%"}
                        </span>
                      </div>
                      <div className="fs-bar">
                        <i style={{"--p": "42%"}}></i>
                      </div>{" "}
                      <div className="give">
                        <div>
                          <small>{"Account number"}
                          </small>
                          <strong>{"0123456789"}
                          </strong>
                        </div>
                        <span className="copy">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="9" y="9" width="12" height="12" rx="2" />
                            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                          </svg>{"Copy"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </li>{" "}
              <li className="fs-hiw-step" data-n="5">{" "}
                <span className="hiw-node" aria-hidden="true">{"5"}
                </span>{" "}
                <div className="hiw-body">
                  <span className="j-k">{"Step 5 of 5"}
                  </span>
                  <h3>
                    <span className="rv-line">
                      <span>{"The money lands in your account."}
                      </span>
                    </span>
                  </h3>
                  <p>{"Straight from them to you. You’ll see it in your own bank app, not in a Fundu wallet."}
                  </p>
                  <a className="fs-btn btn-light" href="/create-campaign" style={{"alignSelf": "flex-start", "marginTop": "0.5rem"}}>{"Create your free page"}
                  </a>
                </div>{" "}
                <div className="hiw-scene hiw-inline" aria-hidden="true">
                  <div className="v-alerts">
                    <span className="v-stack-k">{"5 new notifications"}
                    </span>
                    <div className="j-alert" style={{"--i": "0"}}>
                      <span className="ha-ic">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                        </svg>
                      </span>
                      <span className="ha-tx">
                        <span className="ha-top">
                          <b>{"Your bank"}
                          </b>
                          <small>{"now"}
                          </small>
                        </span>{"Credit: ₦5,000 from Kemi A."}
                      </span>
                    </div>
                    <div className="j-alert" style={{"--i": "1"}}>
                      <span className="ha-ic">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                        </svg>
                      </span>
                      <span className="ha-tx">
                        <span className="ha-top">
                          <b>{"Your bank"}
                          </b>
                          <small>{"2m ago"}
                          </small>
                        </span>{"Credit: ₦2,000 from Uncle Femi"}
                      </span>
                    </div>
                    <div className="j-alert" style={{"--i": "2"}}>
                      <span className="ha-ic">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                        </svg>
                      </span>
                      <span className="ha-tx">
                        <span className="ha-top">
                          <b>{"Your bank"}
                          </b>
                          <small>{"9m ago"}
                          </small>
                        </span>{"Credit: ₦10,000 from Chidi O."}
                      </span>
                    </div>
                    <div className="j-alert" style={{"--i": "3"}}>
                      <span className="ha-ic">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                        </svg>
                      </span>
                      <span className="ha-tx">
                        <span className="ha-top">
                          <b>{"Your bank"}
                          </b>
                          <small>{"14m ago"}
                          </small>
                        </span>{"Credit: ₦1,500 from Ngozi E."}
                      </span>
                    </div>
                    <div className="j-alert" style={{"--i": "4"}}>
                      <span className="ha-ic">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                        </svg>
                      </span>
                      <span className="ha-tx">
                        <span className="ha-top">
                          <b>{"Your bank"}
                          </b>
                          <small>{"31m ago"}
                          </small>
                        </span>{"Credit: ₦20,000 from Aunty Bisi"}
                      </span>
                    </div>
                  </div>
                </div>{" "}
              </li>{" "}
            </ol>{" "}
            <div className="hiw-stage" aria-hidden="true">{" "}
              <div className="hiw-sticky">{" "}
                <div className="hiw-panel">{" "}
                  <div className="hiw-top">
                    <span className="hiw-count">
                      <b id="hiwNum">{"01"}
                      </b>{" / 05"}
                    </span>
                    <span className="hiw-name" id="hiwName">{"You need something"}
                    </span>
                  </div>{" "}
                  <div className="hiw-scene" data-n="1" aria-hidden="true">
                    <div className="v-note">
                      <span className="v-note-k">{"What I need"}
                      </span>
                      <b>{"₦1,000,000"}
                      </b>
                      <span>{"for my final year at university"}
                      </span>
                      <div className="j-words">
                        <span>{"School fees"}
                        </span>
                        <span>{"A hospital bill"}
                        </span>
                        <span>{"A new shop"}
                        </span>
                        <span>{"A church project"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hiw-scene" data-n="2" aria-hidden="true">
                    <div className="v-form">
                      <div className="v-form-top">
                        <b>{"Create your page"}
                        </b>
                        <span className="v-steps">
                          <i className="on"></i>
                          <i></i>
                          <i></i>
                          <i></i>
                        </span>
                      </div>{" "}
                      <label>{"Title"}
                        <span className="v-input">{"Help Tobi Finish University"}
                          <em className="caret"></em>
                        </span>
                      </label>{" "}
                      <div className="v-row">
                        <label>{"Goal"}
                          <span className="v-input">
                            <i>{"₦"}
                            </i>{"1,000,000"}
                          </span>
                        </label>
                        <label>{"Category"}
                          <span className="v-input">{"Education"}
                          </span>
                        </label>
                      </div>{" "}
                      <label>{"Cover image"}
                        <span className="v-cover">
                          <img src="/site/img-c34ea367a50f.jpg" alt="" />
                        </span>
                      </label>{" "}
                      <span className="v-btn">{"Continue to story"}
                      </span>
                    </div>
                  </div>
                  <div className="hiw-scene" data-n="3" aria-hidden="true">
                    <div className="v-share">
                      <div className="v-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                          <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                        </svg>
                        <span>{"fundu link to “Help Tobi Finish University”"}
                        </span>
                        <b className="v-copied">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12l5 5 9-10" />
                          </svg>{"Copied"}
                        </b>
                      </div>{" "}
                      <div className="v-chats">
                        <span className="v-chat">{"Family group"}
                        </span>
                        <span className="v-chat">{"Church friends"}
                        </span>
                        <span className="v-chat">{"Class of 2019"}
                        </span>
                        <span className="v-chat">{"My status"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hiw-scene" data-n="4" aria-hidden="true">
                    <div className="v-page">
                      <div className="v-cov">
                        <img src="/site/img-c34ea367a50f.jpg" alt="" />
                      </div>
                      <div className="v-pb">
                        <b className="v-t">{"Help Tobi Finish University"}
                        </b>
                        <div className="amt">
                          <b>{"₦420,000"}
                          </b>
                          <span>{"42%"}
                          </span>
                        </div>
                        <div className="fs-bar">
                          <i style={{"--p": "42%"}}></i>
                        </div>{" "}
                        <div className="give">
                          <div>
                            <small>{"Account number"}
                            </small>
                            <strong>{"0123456789"}
                            </strong>
                          </div>
                          <span className="copy">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect x="9" y="9" width="12" height="12" rx="2" />
                              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                            </svg>{"Copy"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hiw-scene" data-n="5" aria-hidden="true">
                    <div className="v-alerts">
                      <span className="v-stack-k">{"5 new notifications"}
                      </span>
                      <div className="j-alert" style={{"--i": "0"}}>
                        <span className="ha-ic">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                          </svg>
                        </span>
                        <span className="ha-tx">
                          <span className="ha-top">
                            <b>{"Your bank"}
                            </b>
                            <small>{"now"}
                            </small>
                          </span>{"Credit: ₦5,000 from Kemi A."}
                        </span>
                      </div>
                      <div className="j-alert" style={{"--i": "1"}}>
                        <span className="ha-ic">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                          </svg>
                        </span>
                        <span className="ha-tx">
                          <span className="ha-top">
                            <b>{"Your bank"}
                            </b>
                            <small>{"2m ago"}
                            </small>
                          </span>{"Credit: ₦2,000 from Uncle Femi"}
                        </span>
                      </div>
                      <div className="j-alert" style={{"--i": "2"}}>
                        <span className="ha-ic">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                          </svg>
                        </span>
                        <span className="ha-tx">
                          <span className="ha-top">
                            <b>{"Your bank"}
                            </b>
                            <small>{"9m ago"}
                            </small>
                          </span>{"Credit: ₦10,000 from Chidi O."}
                        </span>
                      </div>
                      <div className="j-alert" style={{"--i": "3"}}>
                        <span className="ha-ic">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                          </svg>
                        </span>
                        <span className="ha-tx">
                          <span className="ha-top">
                            <b>{"Your bank"}
                            </b>
                            <small>{"14m ago"}
                            </small>
                          </span>{"Credit: ₦1,500 from Ngozi E."}
                        </span>
                      </div>
                      <div className="j-alert" style={{"--i": "4"}}>
                        <span className="ha-ic">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                          </svg>
                        </span>
                        <span className="ha-tx">
                          <span className="ha-top">
                            <b>{"Your bank"}
                            </b>
                            <small>{"31m ago"}
                            </small>
                          </span>{"Credit: ₦20,000 from Aunty Bisi"}
                        </span>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="hiw-bar">
                    <i id="hiwBar"></i>
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec money" id="money" aria-labelledby="money-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Where the money goes"}
              </p>
              <h2 id="money-h">{"Every naira goes straight to you."}
              </h2>
            </div>
            <p className="lede">{"No wallet. No waiting for a payout. No percentage taken. Supporters send money directly to the bank account you choose."}
            </p>
          </div>{" "}
          <div className="fs-flow">{" "}
            <div className="node">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </span>
              <h3>{"Your supporter"}
              </h3>
              <p>{"Opens your link, reads your story and copies your account number."}
              </p>
            </div>{" "}
            <div className="arrow">
              <svg viewBox="0 0 140 40" aria-hidden="true">
                <path d="M2 20 H128 M116 8 L130 20 L116 32" />
              </svg>
              <b>{"Direct bank transfer"}
              </b>
              <span className="arrow-note">{"Fundu never holds it or takes a cut"}
              </span>
            </div>{" "}
            <div className="node">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
                </svg>
              </span>
              <h3>{"Your bank account"}
              </h3>
              <p>{"The money arrives with you, like any other transfer."}
              </p>
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="stats" aria-labelledby="stats-h">{" "}
        <div className="fs-wrap stats-in">{" "}
          <div className="stats-intro">
            <p className="label">{"Fundu so far"}
            </p>
            <h2 id="stats-h">{"Hundreds of goals already have a home here."}
            </h2>
          </div>{" "}
          <div className="stat">
            <b data-count="500">{"500+"}
            </b>
            <span>{"pages created by people raising money for something that matters to them"}
            </span>
          </div>{" "}
          <div className="stat">
            <b data-count="5000">{"5,000+"}
            </b>
            <span>{"people reached through links shared in chats, groups and statuses"}
            </span>
          </div>{" "}
        </div>{" "}
        <div className="people" aria-label="Photos of people and the goals they raise for">{" "}
          <ul className="people-track" id="peopleTrack">
            <li className="pp">
              <img src="/site/img-fbc3d062d409.jpg" alt="Kemi, a student, outside her home" loading="lazy" />
            </li>
            <li className="pp">
              <img src="/site/img-05c308c26c0e.jpg" alt="A smiling young woman at her market stall" loading="lazy" />
            </li>
            <li className="pp">
              <img src="/site/img-3c912ba44058.jpg" alt="A shopkeeper in her store" loading="lazy" />
            </li>
            <li className="pp">
              <img src="/site/img-4d7993a2d3ac.jpg" alt="A young woman smiling in traditional dress in Kaduna" loading="lazy" />
            </li>
            <li className="pp">
              <img src="/site/img-caf808b56f7d.jpg" alt="A pastor speaking to his congregation" loading="lazy" />
            </li>
            <li className="pp">
              <img src="/site/img-814644e17c12.jpg" alt="A market vendor smiling at her stall" loading="lazy" />
            </li>
            <li className="pp">
              <img src="/site/img-f4d51c285019.jpg" alt="A couple in matching teal aso-ebi" loading="lazy" />
            </li>
            <li className="pp">
              <img src="/site/img-5569084f17aa.jpg" alt="A family holding each other close" loading="lazy" />
            </li>
            <li className="pp">
              <img src="/site/img-8d1aae380b6b.jpg" alt="A carpenter at work in his workshop" loading="lazy" />
            </li>
            <li className="pp" aria-hidden="true">
              <img src="/site/img-fbc3d062d409.jpg" alt="" loading="lazy" />
            </li>
            <li className="pp" aria-hidden="true">
              <img src="/site/img-05c308c26c0e.jpg" alt="" loading="lazy" />
            </li>
            <li className="pp" aria-hidden="true">
              <img src="/site/img-3c912ba44058.jpg" alt="" loading="lazy" />
            </li>
            <li className="pp" aria-hidden="true">
              <img src="/site/img-4d7993a2d3ac.jpg" alt="" loading="lazy" />
            </li>
            <li className="pp" aria-hidden="true">
              <img src="/site/img-caf808b56f7d.jpg" alt="" loading="lazy" />
            </li>
            <li className="pp" aria-hidden="true">
              <img src="/site/img-814644e17c12.jpg" alt="" loading="lazy" />
            </li>
            <li className="pp" aria-hidden="true">
              <img src="/site/img-f4d51c285019.jpg" alt="" loading="lazy" />
            </li>
            <li className="pp" aria-hidden="true">
              <img src="/site/img-5569084f17aa.jpg" alt="" loading="lazy" />
            </li>
            <li className="pp" aria-hidden="true">
              <img src="/site/img-8d1aae380b6b.jpg" alt="" loading="lazy" />
            </li>
          </ul>{" "}
          <button type="button" className="people-pause" id="peoplePause" aria-pressed="false" aria-label="Pause moving photos">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5v14M15 5v14" />
            </svg>
          </button>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" aria-labelledby="ben-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Why people use Fundu"}
              </p>
              <h2 id="ben-h">{"Less explaining. More support."}
              </h2>
            </div>
            <p className="lede">{"Your page answers the questions, builds trust and keeps people updated, so you can focus on reaching your goal."}
            </p>
          </div>{" "}
          <div className="ben-grid">{" "}
            <div className="ben rv">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                  <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                </svg>
              </span>
              <h3>{"One link for everything"}
              </h3>
              <p>{"Your story, photos, goal and account number travel together, instead of in five separate messages that get lost in the chat."}
              </p>
              <span className="ben-link" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                  <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                </svg>{"Help Tobi Finish University"}
                <b>{"Copied"}
                </b>
              </span>
            </div>{" "}
            <div className="ben rv">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                </svg>
              </span>
              <h3>{"People can see how close you are"}
              </h3>
              <p>{"Show your goal and how much has come in, so supporters know their help is moving you forward."}
              </p>
            </div>{" "}
            <div className="ben rv">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </span>
              <h3>{"Looks trustworthy from the first tap"}
              </h3>
              <p>{"A clear page with your name on it gets taken more seriously than a forwarded flyer."}
              </p>
            </div>{" "}
            <div className="ben rv">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 11a8 8 0 0 0-14-5L4 8M4 13a8 8 0 0 0 14 5l2-2" />
                  <path d="M4 4v4h4M20 20v-4h-4" />
                </svg>
              </span>
              <h3>{"A reason to share again"}
              </h3>
              <p>{"Every update is a fresh reason to send your link around, and a gentle reminder for people who meant to give."}
              </p>
            </div>{" "}
          </div>{" "}
          <p className="swipe-hint" aria-hidden="true">{"Swipe to see more"}
          </p>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" aria-labelledby="upd-h">{" "}
        <div className="fs-wrap upd-grid">{" "}
          <div className="upd-visual" aria-hidden="true">{" "}
            <div className="ucard rv">{" "}
              <span style={{"fontSize": "0.8125rem", "fontWeight": "800", "color": "var(--muted)"}}>{"Amount raised"}
              </span>{" "}
              <div className="amt">
                <b id="countUp">{"₦420,000"}
                </b>
                <span>{"of ₦1,000,000"}
                </span>
              </div>{" "}
              <div className="fs-bar">
                <i className="fillme" style={{"--p": "0%"}} data-p="47%"></i>
              </div>{" "}
              <div className="u-note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16615F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8v.01" />
                </svg>{"Shown on your page as reported by you"}
              </div>{" "}
            </div>{" "}
            <div className="ucard rv">
              <div className="u-post">
                <b>{"Update from Tobi"}
                </b>
                <span>{"Paid my second-semester fees today. Thank you for getting me here."}
                </span>
              </div>
            </div>{" "}
          </div>{" "}
          <div>{" "}
            <p className="label">{"After you share"}
            </p>{" "}
            <h2 id="upd-h">{"Keep supporters coming back."}
            </h2>{" "}
            <p className="lede">{"Update your total when money comes in and share good news as it happens. People give again when they can see their help working."}
            </p>{" "}
            <ul className="u-list">{" "}
              <li>
                <span className="tick">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>{"Update the amount raised when money comes in."}
              </li>{" "}
              <li>
                <span className="tick">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>{"Post news, photos or receipts as things move."}
              </li>{" "}
              <li>
                <span className="tick">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>{"Say thank you where everyone can see it."}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec tint-teal" id="cats" aria-labelledby="goals-h">{" "}
        <div className="fs-wrap goals-head">{" "}
          <div>
            <p className="label">{"What people raise money for"}
            </p>
            <h2 id="goals-h">{"Whatever you’re working towards."}
            </h2>
            <p className="lede">{"Some goals are urgent. Some are hopeful. All of them deserve a proper page."}
            </p>
          </div>{" "}
          <div className="scroller-btns">
            <button className="sbtn" type="button" data-scroll="-1" aria-label="Show previous categories">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="sbtn" type="button" data-scroll="1" aria-label="Show more categories">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>{" "}
        </div>{" "}
        <div className="goals" id="goals" tabIndex="0" aria-label="Categories">{" "}
          <article data-slug="education" className="goal">
            <img src="/site/img-0e8d57872a3e.jpg" alt="A smiling student working in a university library" loading="lazy" />
            <span className="gi" aria-hidden="true">
              <svg className="gi-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2" />
                <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
              </svg>
            </span>
            <span className="g-badge" aria-hidden="true">
              <svg className="gb-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2" />
                <path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z" />
              </svg>
            </span>
            <h3>{"Education"}
            </h3>
            <p>{"School fees, exams and training"}
            </p>
            <a className="goal-link" href="/raise/education">
              <span className="sr">{"Raise money for education"}
              </span>
            </a>
          </article>{" "}
          <article data-slug="health" className="goal">
            <img src="/site/img-2fc2f14fb0b3.jpg" alt="A smiling nurse in blue scrubs with a stethoscope" loading="lazy" />
            <span className="gi" aria-hidden="true">
              <svg className="gi-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z" opacity="0.2" />
                <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z" />
              </svg>
            </span>
            <span className="g-badge" aria-hidden="true">
              <svg className="gb-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z" opacity="0.2" />
                <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z" />
              </svg>
            </span>
            <h3>{"Health and emergencies"}
            </h3>
            <p>{"Treatment, recovery, or after a fire or flood"}
            </p>
            <a className="goal-link" href="/raise/health">
              <span className="sr">{"Raise money for health and emergencies"}
              </span>
            </a>
          </article>{" "}
          <article data-slug="church" className="goal">
            <img src="/site/img-c5bffc7dc815.jpg" alt="A pastor speaking to his congregation" loading="lazy" />
            <span className="gi" aria-hidden="true">
              <svg className="gi-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,152v64H184V128ZM32,216H72V128L32,152Z" opacity="0.2" />
                <path d="M228.12,145.14,192,123.47V104a8,8,0,0,0-4-7L136,67.36V48h16a8,8,0,0,0,0-16H136V16a8,8,0,0,0-16,0V32H104a8,8,0,0,0,0,16h16V67.36L68,97.05a8,8,0,0,0-4,7v19.47L27.88,145.14A8,8,0,0,0,24,152v64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V168a8,8,0,0,1,16,0v48a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V152A8,8,0,0,0,228.12,145.14ZM40,156.53l24-14.4V208H40ZM128,144a24,24,0,0,0-24,24v40H80V108.64l48-27.43,48,27.43V208H152V168A24,24,0,0,0,128,144Zm88,64H192V142.13l24,14.4Z" />
              </svg>
            </span>
            <span className="g-badge" aria-hidden="true">
              <svg className="gb-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,152v64H184V128ZM32,216H72V128L32,152Z" opacity="0.2" />
                <path d="M228.12,145.14,192,123.47V104a8,8,0,0,0-4-7L136,67.36V48h16a8,8,0,0,0,0-16H136V16a8,8,0,0,0-16,0V32H104a8,8,0,0,0,0,16h16V67.36L68,97.05a8,8,0,0,0-4,7v19.47L27.88,145.14A8,8,0,0,0,24,152v64a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V168a8,8,0,0,1,16,0v48a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V152A8,8,0,0,0,228.12,145.14ZM40,156.53l24-14.4V208H40ZM128,144a24,24,0,0,0-24,24v40H80V108.64l48-27.43,48,27.43V208H152V168A24,24,0,0,0,128,144Zm88,64H192V142.13l24,14.4Z" />
              </svg>
            </span>
            <h3>{"Church and faith"}
            </h3>
            <p>{"Buildings, outreach and projects"}
            </p>
            <a className="goal-link" href="/raise/church">
              <span className="sr">{"Raise money for church and faith"}
              </span>
            </a>
          </article>{" "}
          <article data-slug="creators" className="goal">
            <img src="/site/img-adb892449f76.jpg" alt="A drummer in traditional dress performing at a festival" loading="lazy" />
            <span className="gi" aria-hidden="true">
              <svg className="gi-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M155.2,100.8c-23-23-55.57-27.63-72.8-10.4a34.21,34.21,0,0,0-7.61,11.66,16.23,16.23,0,0,1-14.72,10C48,112.44,37,116.61,28.8,124.8,7.6,146,13.33,186.12,41.6,214.4s68.39,34,89.6,12.8C139.39,219,143.56,208,144,195.93a16.23,16.23,0,0,1,10-14.72,34.21,34.21,0,0,0,11.66-7.61C182.83,156.37,178.17,123.78,155.2,100.8ZM112,168a24,24,0,1,1,24-24A24,24,0,0,1,112,168Z" opacity="0.2" />
                <path d="M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z" />
              </svg>
            </span>
            <span className="g-badge" aria-hidden="true">
              <svg className="gb-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M155.2,100.8c-23-23-55.57-27.63-72.8-10.4a34.21,34.21,0,0,0-7.61,11.66,16.23,16.23,0,0,1-14.72,10C48,112.44,37,116.61,28.8,124.8,7.6,146,13.33,186.12,41.6,214.4s68.39,34,89.6,12.8C139.39,219,143.56,208,144,195.93a16.23,16.23,0,0,1,10-14.72,34.21,34.21,0,0,0,11.66-7.61C182.83,156.37,178.17,123.78,155.2,100.8ZM112,168a24,24,0,1,1,24-24A24,24,0,0,1,112,168Z" opacity="0.2" />
                <path d="M249.66,46.34l-40-40a8,8,0,0,0-11.31,11.32L200.69,20,140.52,80.16C117.73,68.3,92.21,69.29,76.75,84.74a42.27,42.27,0,0,0-9.39,14.37A8.24,8.24,0,0,1,59.81,104c-14.59.49-27.26,5.72-36.65,15.11C11.08,131.22,6,148.6,8.74,168.07,11.4,186.7,21.07,205.15,36,220s33.34,24.56,52,27.22A71.13,71.13,0,0,0,98.1,248c15.32,0,28.83-5.23,38.76-15.16,9.39-9.39,14.62-22.06,15.11-36.65a8.24,8.24,0,0,1,4.92-7.55,42.12,42.12,0,0,0,14.37-9.39c15.45-15.46,16.44-41,4.58-63.77L236,55.31l2.34,2.34a8,8,0,1,0,11.32-11.31ZM160,167.93a26.12,26.12,0,0,1-8.95,5.83,24.24,24.24,0,0,0-15,21.89c-.36,10.46-4,19.41-10.43,25.88-8.44,8.43-21,11.95-35.36,9.89C75,229.25,59.73,221.19,47.27,208.73S26.75,181,24.58,165.81c-2-14.37,1.46-26.92,9.89-35.36C40.94,124,49.89,120.37,60.35,120h0a24.22,24.22,0,0,0,21.89-15,26.12,26.12,0,0,1,5.83-9c5.49-5.49,13-8.13,21.38-8.13a49.38,49.38,0,0,1,19.13,4.19L108.5,112.19a32,32,0,1,0,35.31,35.31l20.08-20.08C170.41,142.71,169.47,158.41,160,167.93Zm-10.4-61.48a72.9,72.9,0,0,1,5.93,6.75l-15.42,15.42a32.22,32.22,0,0,0-12.68-12.68l15.42-15.43A73,73,0,0,1,149.55,106.45ZM112,128a16,16,0,0,1,16,16h0a16,16,0,1,1-16-16Zm48.85-32.85a86.94,86.94,0,0,0-6.68-6L176,67.31,188.69,80l-21.83,21.82A86.94,86.94,0,0,0,160.86,95.14ZM200,68.68,187.32,56,212,31.31,224.69,44ZM93.66,194.33a8,8,0,0,1-11.31,11.32l-32-32a8,8,0,0,1,11.32-11.31Z" />
              </svg>
            </span>
            <h3>{"Creators and makers"}
            </h3>
            <p>{"Films, music, crafts and art"}
            </p>
            <a className="goal-link" href="/raise/creators">
              <span className="sr">{"Raise money for creators and makers"}
              </span>
            </a>
          </article>{" "}
          <article data-slug="community" className="goal">
            <img src="/site/img-1b1b6fc9adba.jpg" alt="Four young volunteers in Katsina, Nigeria, smiling together" />
            <span className="gi" aria-hidden="true">
              <svg className="gi-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM192.54,40A39.12,39.12,0,0,0,156,64a39.12,39.12,0,0,0-36.54-24C97.67,40,80,58.31,80,80c0,14.56,7,27.71,16.73,40H140a20,20,0,0,1,0,40h4l37.78-8.68C203.82,135.07,232,109.23,232,80,232,58.31,214.33,40,192.54,40Z" opacity="0.2" />
                <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z" />
              </svg>
            </span>
            <span className="g-badge" aria-hidden="true">
              <svg className="gb-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M16,152H48v56H16a8,8,0,0,1-8-8V160A8,8,0,0,1,16,152ZM192.54,40A39.12,39.12,0,0,0,156,64a39.12,39.12,0,0,0-36.54-24C97.67,40,80,58.31,80,80c0,14.56,7,27.71,16.73,40H140a20,20,0,0,1,0,40h4l37.78-8.68C203.82,135.07,232,109.23,232,80,232,58.31,214.33,40,192.54,40Z" opacity="0.2" />
                <path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z" />
              </svg>
            </span>
            <h3>{"Community"}
            </h3>
            <p>{"Local projects and people helping each other"}
            </p>
            <a className="goal-link" href="/raise/community">
              <span className="sr">{"Raise money for community"}
              </span>
            </a>
          </article>{" "}
          <article data-slug="business" className="goal">
            <img src="/site/img-deaecff8263d.jpg" alt="A shopkeeper standing in her store" loading="lazy" />
            <span className="gi" aria-hidden="true">
              <svg className="gi-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2" />
                <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
              </svg>
            </span>
            <span className="g-badge" aria-hidden="true">
              <svg className="gb-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z" opacity="0.2" />
                <path d="M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z" />
              </svg>
            </span>
            <h3>{"Small business"}
            </h3>
            <p>{"Starting out or getting back on your feet"}
            </p>
            <a className="goal-link" href="/raise/business">
              <span className="sr">{"Raise money for small business"}
              </span>
            </a>
          </article>{" "}
          <article data-slug="milestones" className="goal">
            <img src="/site/img-21a7aa320e5b.jpg" alt="A couple in traditional Nigerian wedding attire" loading="lazy" />
            <span className="gi" aria-hidden="true">
              <svg className="gi-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M58.89,154.89l42.22,42.22-50.63,18.4a7.79,7.79,0,0,1-10-10Zm138.82-4.72L105.83,58.29A7.79,7.79,0,0,0,93,61.14l-14.9,41,75.82,75.82,41-14.9A7.79,7.79,0,0,0,197.71,150.17Z" opacity="0.2" />
                <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
              </svg>
            </span>
            <span className="g-badge" aria-hidden="true">
              <svg className="gb-svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M58.89,154.89l42.22,42.22-50.63,18.4a7.79,7.79,0,0,1-10-10Zm138.82-4.72L105.83,58.29A7.79,7.79,0,0,0,93,61.14l-14.9,41,75.82,75.82,41-14.9A7.79,7.79,0,0,0,197.71,150.17Z" opacity="0.2" />
                <path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z" />
              </svg>
            </span>
            <h3>{"Milestones"}
            </h3>
            <p>{"Weddings, send-offs and celebrations"}
            </p>
            <a className="goal-link" href="/raise/milestones">
              <span className="sr">{"Raise money for milestones"}
              </span>
            </a>
          </article>{" "}
        </div>{" "}
        <div className="fs-wrap">
          <a className="text-link" href="/webexplore">{"See pages people have shared on Explore"}
          </a>
        </div>{" "}
      </section>{" "}
      <section className="sec tint-teal" aria-labelledby="tr-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"Trust and safety"}
              </p>
              <h2 id="tr-h">{"Built so people feel safe giving."}
              </h2>
            </div>
            <p className="lede">{"We’d rather tell you exactly how Fundu works than make it sound bigger than it is. "}
              <a className="inl" href="/trust-and-safety">{"Read more about trust & safety"}
              </a>{"."}
            </p>
          </div>{" "}
          <div className="tr-grid">{" "}
            <div className="tr rv">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </span>
              <h3>{"You can see who’s asking"}
              </h3>
              <p>{"Every page shows the person organizing it."}
              </p>
            </div>{" "}
            <div className="tr rv">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8v.01" />
                </svg>
              </span>
              <h3>{"Totals are labelled honestly"}
              </h3>
              <p>{"The amount raised is reported by the organizer, and the page says so."}
              </p>
            </div>{" "}
            <div className="tr rv">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              </span>
              <h3>{"Public or private, you choose"}
              </h3>
              <p>{"Public pages appear on Explore. Private ones don’t, but anyone with the link can still open them."}
              </p>
            </div>{" "}
            <div className="tr rv">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
                </svg>
              </span>
              <h3>{"Something look wrong? Report it"}
              </h3>
              <p>{"Anyone can report a page, and the Fundu team will review it."}
              </p>
            </div>{" "}
            <div className="tr rv">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <h3>{"No PINs, no passwords"}
              </h3>
              <p>{"We only ask for the details people use to send you money."}
              </p>
            </div>{" "}
            <div className="tr rv">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.01" />
                </svg>
              </span>
              <h3>{"Help in plain words"}
              </h3>
              <p>{"Our Help Centre explains how everything works."}
              </p>
            </div>{" "}
          </div>
          <p className="swipe-hint" aria-hidden="true">{"Swipe to see more"}
          </p>{" "}
        </div>{" "}
      </section>{" "}
      <section className="sec" aria-labelledby="ex-h">{" "}
        <div className="fs-wrap">{" "}
          <div className="shead">
            <div>
              <p className="label">{"What it costs"}
              </p>
              <h2 id="ex-h">{"Free while we’re in early access."}
              </h2>
            </div>
            <p className="lede">{"Fundu charges for hosting the page, never a percentage of what people send you. Right now, hosting is free."}
            </p>
          </div>{" "}
          <div className="ex-grid">{" "}
            <div className="panel p-cost">{" "}
              <h3>{"Pay for the page, never a cut of the money."}
              </h3>{" "}
              <div className="price">
                <b>{"₦0"}
                </b>
                <s>{"₦100 a day"}
                </s>
              </div>{" "}
              <p>{"A page normally costs ₦100 for each day it’s up. During early access, it costs nothing. Whatever people send you is yours."}
              </p>{" "}
              <a className="fs-btn btn-light" href="/create-campaign" style={{"alignSelf": "flex-start"}}>{"Create your free page"}
                <svg className="b-arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>{" "}
            </div>{" "}
            <div className="panel p-explore">{" "}
              <h3>{"Or find someone to support."}
              </h3>{" "}
              <p>{"Public pages appear on Explore, where you can find goals you care about."}
              </p>{" "}
              <a className="mini-card" href="/webexplore">
                <img src="/site/img-3a859cb18663.jpg" alt="" />
                <div>
                  <b>{"Community Solar Power Initiative"}
                  </b>
                  <span>{"Community and social"}
                  </span>
                </div>
              </a>{" "}
              <a className="fs-btn btn-ghost" href="/webexplore" style={{"alignSelf": "flex-start"}}>{"Explore pages"}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </main>
    </>
  );
}
