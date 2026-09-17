import Link from "next/link";
import "../marketing.css";

export const metadata = {
  title: "How Fundu works",
  description: "Create a campaign, share one link, and let supporters send straight to your own bank account.",
};

const steps = [
  ["Create your campaign", "Add what you are raising money for, your target, story, pictures and the bank account where supporters should send contributions."],
  ["Publish and get one link", "Your campaign becomes a public Fundu page you can send anywhere. Instead of rebuilding the story in every message, you share the same page."],
  ["Share it where people already are", "Send the link through WhatsApp, social media, email, communities or anywhere your supporters already spend time."],
  ["Supporters read, then send straight to you", "Your campaign page explains the need and shows your bank details. The transfer goes from the supporter to your bank account. Fundu does not receive, hold or release the money."],
  ["Keep the page current", "Post updates as things change. Because Fundu cannot see transfers into your bank account, you maintain the amount raised shown on the campaign yourself."],
  ["Close the campaign when you are done", "When the fundraiser is complete, close the campaign. Your updates remain part of the story you shared with supporters."],
];

export default function HowItWorksPage() {
  return (
    <div className="marketing-page">
      <section className="mk-hero mk-tint">
        <div className="mk-wrap mk-narrow">
          <span className="mk-eyebrow">How it works</span>
          <h1>Set it up once. Share one link. The money still comes straight to you.</h1>
          <p className="mk-lead">Six steps, and none of them involve handing your fundraiser over to anybody. Here is the whole process, including the parts we cannot do for you.</p>
          <div className="mk-actions"><Link className="mk-btn mk-btn-primary" href="/signup">Start a fundraiser</Link><a className="mk-btn mk-btn-secondary" href="#faq">Read the questions first</a></div>
        </div>
      </section>

      <section className="mk-section" id="steps">
        <div className="mk-wrap">
          <div className="mk-section-head"><div><span className="mk-kicker">From idea to one shareable page</span><h2>The whole process, step by step.</h2></div><p>Fundu gives the campaign structure. Your bank account remains the destination for contributions.</p></div>
          <div className="mk-steps">{steps.map(([title, text], i) => <article className="mk-step" key={title}><span className="mk-step-number">{String(i + 1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="mk-section mk-dark">
        <div className="mk-wrap mk-two-col"><div><span className="mk-kicker">The important difference</span><h2>Your money does not take a detour through Fundu.</h2></div><div className="mk-copy"><p>Supporters send contributions using the bank details on your campaign. Fundu is not a wallet, escrow service or payout system.</p><p>That also means Fundu cannot see your bank balance or confirm individual transfers. The amount raised on your page is maintained by you.</p></div></div>
      </section>

      <section className="mk-section mk-soft">
        <div className="mk-wrap"><div className="mk-section-head"><div><span className="mk-kicker">Before you send money</span><h2>Supporters should still make their own checks.</h2></div><p>A Fundu page gives a fundraiser context and one consistent place to share information. It is not a Fundu verification or guarantee.</p></div><div className="mk-grid-3"><article className="mk-card"><h3>Read the full story</h3><p>Understand what the organizer says the money is for and review the updates provided.</p></article><article className="mk-card"><h3>Check who is asking</h3><p>If you do not know the organizer, use the information available to make your own decision before sending money.</p></article><article className="mk-card"><h3>Confirm bank details</h3><p>Check the account information carefully before completing a transfer.</p></article></div></div>
      </section>

      <section className="mk-section" id="faq"><div className="mk-wrap"><div className="mk-section-head"><div><span className="mk-kicker">Questions</span><h2>Things worth knowing before you start.</h2></div></div><div className="mk-faq"><details><summary>Does Fundu hold the money?</summary><p>No. Contributions go directly to the bank account supplied by the campaign organizer.</p></details><details><summary>Does Fundu know when somebody transfers money?</summary><p>No. Direct bank transfers happen outside Fundu, so the organizer maintains the amount-raised figure on the campaign.</p></details><details><summary>Does Fundu verify every campaign?</summary><p>No. A campaign being published on Fundu should not be treated as a Fundu guarantee that the organizer or claim is genuine.</p></details><details><summary>How does pricing work?</summary><p>Fundu is planned around a small fixed hosting amount for each day a campaign is active, rather than taking a percentage of contributions. The public daily price has not been set yet.</p></details></div></div></section>

      <section className="mk-section mk-cta"><div className="mk-wrap mk-cta-inner"><div><span className="mk-kicker">Ready when you are</span><h2>Give your fundraiser one proper place to live.</h2></div><Link className="mk-btn mk-btn-primary" href="/signup">Start a fundraiser</Link></div></section>
    </div>
  );
}
