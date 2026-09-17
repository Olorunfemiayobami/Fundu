import Link from "next/link";
import "@/styles/website.css";

const features = [
  ["01", "Your story has one home", "Put your story, goal, pictures and account details together on a page that explains itself."],
  ["02", "One link to share", "Share the same campaign page on WhatsApp, Instagram, X, email or anywhere your supporters already are."],
  ["03", "Money goes straight to you", "Supporters send contributions to the bank account you provide. Fundu never holds the money."],
  ["04", "Keep people updated", "Post campaign updates so supporters can follow what is happening after they contribute."],
  ["05", "Be discovered", "Public campaigns can appear in Explore, giving people outside your contact list a way to find your fundraiser."],
  ["06", "Keep the page current", "Edit your campaign while it is live and maintain the amount raised as contributions reach your bank."],
];

export const metadata = {
  title: "Fundu | One page for your fundraiser",
  description: "Create one campaign page, share one link, and receive contributions directly in your bank account.",
};

export default function LandingPage() {
  return (
    <div className="fundu-site">
      <section className="fundu-hero">
        <div className="fundu-wrap fundu-hero-grid">
          <div>
            <span className="fundu-eyebrow">Contributions go straight to your bank account</span>
            <h1>One page for your fundraiser. One link to share.</h1>
            <p className="fundu-lead">Your story, your goal, your pictures and where to send money, all together in one place instead of spread across six WhatsApp messages. Fundu never holds the money.</p>
            <div className="fundu-actions">
              <Link className="fundu-btn fundu-btn-primary" href="/signup">Start a fundraiser</Link>
              <Link className="fundu-btn fundu-btn-ghost" href="/how-it-works">See how it works</Link>
            </div>
            <p className="fundu-note">Free to create. You only pay for the days your campaign stays up.</p>
          </div>
          <div className="fundu-hero-art" aria-hidden="true">
            <div className="fundu-photo-card fundu-photo-a" />
            <div className="fundu-photo-card fundu-photo-b" />
            <div className="fundu-chip">Raised so far <strong>₦640,000</strong></div>
          </div>
        </div>
      </section>

      <div className="fundu-marquee"><div className="fundu-wrap fundu-tags">{["Medical", "Education", "Community", "Emergency", "Business", "Faith", "Creative projects"].map(x => <span className="fundu-tag" key={x}>{x}</span>)}</div></div>

      <section className="fundu-band">
        <div className="fundu-wrap fundu-center">
          <h2>A fundraiser should not live in six different places.</h2>
          <p className="fundu-lead">The story in one message. Pictures somewhere else. An account number buried in a group chat. Fundu brings the important parts together into one campaign page.</p>
          <div className="fundu-grid">
            <article className="fundu-card"><div className="fundu-card-num">THE STORY</div><h3>Why you are raising</h3><p>Explain what happened and what the money will help you do.</p></article>
            <article className="fundu-card"><div className="fundu-card-num">THE PROOF</div><h3>Pictures and updates</h3><p>Give people the context they need before deciding to support.</p></article>
            <article className="fundu-card"><div className="fundu-card-num">THE ROUTE</div><h3>Where to send money</h3><p>Your bank details sit on the same page as the story, ready when someone decides to help.</p></article>
          </div>
        </div>
      </section>

      <section className="fundu-band fundu-dark">
        <div className="fundu-wrap fundu-split">
          <div><span className="fundu-eyebrow">No wallet. No payout wait.</span><div className="fundu-money">Straight to <span>you.</span></div></div>
          <div><h2>The money does not stop at Fundu.</h2><p className="fundu-lead">A supporter reads your campaign, copies the account details you provided and transfers directly to your bank. Fundu does not receive, hold or release that contribution.</p></div>
        </div>
      </section>

      <section className="fundu-band">
        <div className="fundu-wrap">
          <div className="fundu-center"><h2>What a Fundu page does for you</h2><p className="fundu-lead">A proper home for the fundraiser, without putting Fundu between you and the contribution.</p></div>
          <div className="fundu-grid">{features.map(([n,t,d]) => <article className="fundu-card" key={n}><div className="fundu-card-num">{n}</div><h3>{t}</h3><p>{d}</p></article>)}</div>
        </div>
      </section>

      <section className="fundu-band" style={{background:"#f4eee8"}}>
        <div className="fundu-wrap">
          <div className="fundu-center"><h2>Built for the reasons people actually raise money.</h2></div>
          <div className="fundu-bento">
            <article className="fundu-card"><div className="fundu-card-num">PERSONAL</div><h3>When life happens quickly</h3><p>Medical bills, emergencies, school fees and the moments when your people want one trustworthy place to understand what is needed.</p></article>
            <article className="fundu-card"><h3>Community</h3><p>Bring a neighbourhood, association or local project around one clear goal.</p></article>
            <article className="fundu-card"><h3>Faith</h3><p>Raise for church projects, outreach and community support.</p></article>
            <article className="fundu-card"><h3>Ideas & business</h3><p>Show people what you are building and what their support helps unlock.</p></article>
            <article className="fundu-card"><h3>Education</h3><p>Tuition, training, research and opportunities worth showing up for.</p></article>
          </div>
        </div>
      </section>

      <section className="fundu-band fundu-campaigns" id="campaigns">
        <div className="fundu-wrap">
          <div className="fundu-split"><div><h2>Fundraisers people can understand at a glance.</h2></div><div><p className="fundu-lead">Explore public campaigns, read their stories and decide for yourself who you want to support.</p><div className="fundu-actions"><Link href="/explore" className="fundu-btn fundu-btn-ghost">Explore campaigns</Link></div></div></div>
          <div className="fundu-campaign-row">{["Help Ada complete her final year", "Support a community borehole", "Help rebuild after a fire"].map((title,i)=><article className="fundu-campaign" key={title}><div className="fundu-campaign-img"/><div className="fundu-campaign-body"><h3>{title}</h3><p>Organizer-maintained amount raised</p><div className="fundu-progress"><i style={{width:`${55+i*12}%`}}/></div><strong>View campaign</strong></div></article>)}</div>
        </div>
      </section>

      <section className="fundu-band fundu-pricing">
        <div className="fundu-wrap"><div className="fundu-price-box"><div><span className="fundu-eyebrow">Simple pricing</span><h2>Pay for the days your campaign stays live.</h2></div><div><p className="fundu-lead">Fundu is designed around a small fixed hosting amount per active day, not a percentage of the money supporters send you. The final daily price will be published before charging begins.</p></div></div></div>
      </section>

      <section className="fundu-band fundu-dark">
        <div className="fundu-wrap"><div className="fundu-center"><h2>Clear about what Fundu does, and what it does not.</h2></div><div className="fundu-truth"><div className="fundu-truth-box"><h3>Fundu gives you</h3><ul><li>A campaign page</li><li>A shareable link</li><li>Direct bank contribution details</li><li>Updates, comments and discovery</li></ul></div><div className="fundu-truth-box"><h3>Fundu does not</h3><ul><li>Hold contributions</li><li>Provide a wallet or escrow</li><li>Process withdrawals or payouts</li><li>Guarantee or verify a fundraiser</li></ul></div></div></div>
      </section>

      <section className="fundu-band fundu-cta"><div className="fundu-wrap"><h2>Give your fundraiser one place people can come back to.</h2><p className="fundu-lead">Tell the story properly. Share one link. Let the contribution go straight to you.</p><div className="fundu-actions"><Link href="/signup" className="fundu-btn fundu-btn-primary">Start a fundraiser</Link><Link href="/how-it-works" className="fundu-btn fundu-btn-ghost">How Fundu works</Link></div></div></section>
    </div>
  );
}
