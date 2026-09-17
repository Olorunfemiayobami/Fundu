import Link from "next/link";
import "../marketing.css";

export const metadata = {
  title: "About Fundu",
  description: "Why Fundu exists, what we believe and what we have deliberately built around direct-to-bank crowdfunding.",
};

export default function AboutPage() {
  return (
    <div className="marketing-page">
      <section className="mk-hero mk-tint"><div className="mk-wrap mk-narrow"><span className="mk-eyebrow">About Fundu</span><h1>We build the infrastructure around a fundraiser, not a middleman for your money.</h1><p className="mk-lead">Fundu gives people raising money a proper home for their campaign, while the contributions still go straight to their own bank account. That single decision shapes everything else on this page.</p></div></section>

      <section className="mk-section"><div className="mk-wrap mk-two-col"><h2>Fundraising was never the problem. <span className="mk-teal">The way it travels was.</span></h2><div className="mk-copy"><p>Somebody writes what happened, attaches an account number and sends it to a family group. The pictures follow later. Someone asks for the account number again. By the time the message reaches a stranger, much of the context can be gone.</p><p>A conventional crowdfunding platform gives the fundraiser a proper page, but can also put the platform between the supporter and the organizer's money.</p><p><strong>Fundu sits between those two.</strong> The structure and reach of a campaign page, with the directness of the organizer's own bank account.</p></div></div></section>

      <section className="mk-section mk-soft"><div className="mk-wrap"><div className="mk-section-head"><div><span className="mk-kicker">What we believe</span><h2>A few decisions guide the product.</h2></div></div><div className="mk-grid-3"><article className="mk-card"><span className="mk-card-num">01</span><h3>The organizer should stay close to the money.</h3><p>For direct-bank campaigns, Fundu provides the campaign infrastructure without receiving or holding contributions.</p></article><article className="mk-card"><span className="mk-card-num">02</span><h3>Context helps people decide.</h3><p>A campaign should carry the story, goal, pictures, updates and contribution details together, not scatter them across messages.</p></article><article className="mk-card"><span className="mk-card-num">03</span><h3>Clear limits build better trust.</h3><p>We should say what Fundu can see and what it cannot. Direct bank transfers are outside Fundu, so organizer-maintained figures are not Fundu-verified totals.</p></article></div></div></section>

      <section className="mk-section mk-dark"><div className="mk-wrap"><div className="mk-section-head"><div><span className="mk-kicker">What exists today</span><h2>Useful crowdfunding infrastructure without pretending to be the bank.</h2></div><p>Fundu currently focuses on the parts around the contribution itself.</p></div><div className="mk-grid-3"><article className="mk-card mk-card-dark"><h3>Campaign pages</h3><p>Create a public home for the fundraiser with its story, goal, pictures and bank details.</p></article><article className="mk-card mk-card-dark"><h3>Sharing and discovery</h3><p>Share one campaign link and make public campaigns discoverable through Explore.</p></article><article className="mk-card mk-card-dark"><h3>Updates and comments</h3><p>Keep supporters informed and give people a place to engage around the campaign.</p></article></div></div></section>

      <section className="mk-section"><div className="mk-wrap mk-two-col"><div><span className="mk-kicker">Deliberately clear</span><h2>There are things Fundu does not claim to do.</h2></div><div className="mk-copy"><p>Fundu does not currently hold contributions, provide escrow or a wallet, process withdrawals or payouts, guarantee fundraising outcomes, or guarantee that a campaign is genuine.</p><p>And because direct contributions arrive in the organizer's own bank account, Fundu cannot independently know the amount actually received. The amount-raised figure is maintained by the organizer.</p></div></div></section>

      <section className="mk-section mk-cta"><div className="mk-wrap mk-cta-inner"><div><span className="mk-kicker">Build your page</span><h2>Your fundraiser deserves more than an account number in a forwarded message.</h2></div><div className="mk-actions"><Link className="mk-btn mk-btn-primary" href="/signup">Start a fundraiser</Link><Link className="mk-btn mk-btn-secondary" href="/how-it-works">See how it works</Link></div></div></section>
    </div>
  );
}
