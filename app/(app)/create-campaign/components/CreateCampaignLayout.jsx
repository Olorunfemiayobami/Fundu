"use client";

import { ActionIcon } from "@/components/feedback/ActionDialog";

const STEPS = ["Basics", "Story", "Preview", "Publish"];
const TIPS = [
  ["Good to know", "You can edit everything after publishing.", "Campaigns with a clear photo get more clicks.", "Pick a goal you can explain in your story."],
  ["What makes a strong story", "Start with what happened, in your own words.", "Say exactly what the money will pay for.", "Break the goal into amounts, like your Fund Allocation.", "Add real photos of the people or project.", "Keep paragraphs short. Most people read on a phone."],
  ["Read it like a supporter", "Is it clear what the money is for?", "Would a stranger trust this page?", "Does the cover look good small, on Explore?"],
  ["Before your page goes live", "Review your campaign details and story.", "Supporters send money straight to the bank account you add.", "Fundu never receives or holds campaign contributions."],
];

function Check() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m5 12 4 4 10-10" /></svg>;
}

export default function CreateCampaignLayout({ children, sidebarPreview, storyBlocks = [], step, saveStatus, isSaving, isUploading = false, editId, isRestarting, isDraft = true, onSaveAndExit, onRetry, onStepChange, onBack }) {
  const title = isRestarting ? "Restart campaign" : editId ? "Edit campaign" : "Create campaign";
  const saving = isSaving || saveStatus === "saving";
  const busy = saving || isUploading;
  const status = isUploading ? "Uploading images…" : saving ? "Saving…" : saveStatus === "saved" ? isDraft ? "Draft saved" : "Changes saved" : saveStatus === "error" ? "Couldn't save" : saveStatus === "pending" ? "Unsaved changes" : editId ? "Campaign loaded" : "Not saved yet";
  const tips = TIPS[step - 1];

  return <div className={`create-campaign-page cw-page cw-page--step-${step}`}>
    <button type="button" className="cw-back" onClick={onBack} disabled={busy}><span aria-hidden="true">←</span> Back to campaigns</button>
    <header className="cw-header">
      <button type="button" className="cw-close" aria-label="Save and return to campaigns" onClick={onSaveAndExit} disabled={busy}>×</button>
      <div className="cw-heading"><h1>{title}</h1><p>Set up your fundraiser in four short steps.</p></div>
      <div className={`cw-save-status${saveStatus === "error" ? " cw-save-status--error" : ""}`} role="status" aria-live="polite">
        {saveStatus === "saved" && !busy && <Check />}
        {busy && <span className="cw-saving-spinner" aria-hidden="true" />}
        {saveStatus === "error" && !busy && <ActionIcon name="alert" />}
        <span>{status}</span>
        {saveStatus === "error" && !busy && <><span className="cw-save-explainer">Your latest changes aren&apos;t saved yet.</span><button type="button" onClick={onRetry}><ActionIcon name="refresh" />Retry</button></>}
      </div>
      <button type="button" className="cw-save-exit" onClick={onSaveAndExit} disabled={busy}>Save and exit</button>
    </header>
    <nav className="cw-stepper" aria-label="Campaign creation steps"><ol>
      {STEPS.map((name, index) => {
        const number = index + 1;
        const done = number < step;
        return <li key={name} className={`${done ? "cw-step--done" : number === step ? "cw-step--current" : "cw-step--upcoming"}`}>
          {done ? <button type="button" onClick={() => onStepChange(number)} disabled={busy}><span className="cw-step-circle"><Check /></span><span>{name}</span></button> : <span className="cw-step-label" aria-current={number === step ? "step" : undefined}><span className="cw-step-circle">{number}</span><span>{name}</span></span>}
          {index < STEPS.length - 1 && <span className="cw-step-line" aria-hidden="true" />}
        </li>;
      })}
    </ol></nav>
    <div className="cw-mobile-progress"><div><strong>Step {step} of 4: {STEPS[step - 1]}</strong><span>{step < 4 ? `Next: ${STEPS[step]}` : "Last step"}</span></div><div className="cw-progress-segments" role="progressbar" aria-label="Campaign creation progress" aria-valuemin={0} aria-valuemax={4} aria-valuenow={step} aria-valuetext={`Step ${step} of 4: ${STEPS[step - 1]}`}>
      {STEPS.map((name, index) => <span key={name} className={index < step ? "cw-progress-filled" : ""} />)}
    </div></div>
    <div className="cw-columns"><div className="cw-main">{children}</div><aside className="cw-side">{sidebarPreview}<div className="cw-tips"><h2>{tips[0]}</h2><ul>{tips.slice(1).map(tip => <li key={tip}><Check /><span>{tip}</span></li>)}</ul></div>{step === 2 && <StorySummary blocks={storyBlocks} />}</aside></div>
  </div>;
}


export function StoryTips() {
  return <details className="cw-story-mobile-tips"><summary>Tips for a strong story</summary><ul>{TIPS[1].slice(1).map(tip=><li key={tip}><Check /><span>{tip}</span></li>)}</ul></details>;
}
function StorySummary({blocks}) {
  const photos=blocks.reduce((count,block)=>count+(Array.isArray(block.media)?block.media.length:0),0);
  const words=blocks.map(block=>[block.title,block.content].filter(Boolean).join(" ")).join(" ").trim().split(/\s+/).filter(Boolean).length;
  const minutes=Math.ceil(words/200);
  return <section className="cw-story-summary"><h2>Your story so far</h2><strong>{blocks.length} {blocks.length===1?"block":"blocks"}, {photos} {photos===1?"photo":"photos"}</strong><p>{minutes ? "About "+minutes+" "+(minutes===1?"minute":"minutes")+" to read." : "Add text to tell your story."}</p></section>;
}


export function PreviewTips() { return <div className="cw-tips"><h2>{TIPS[2][0]}</h2><ul>{TIPS[2].slice(1).map(tip => <li key={tip}><Check /><span>{tip}</span></li>)}</ul></div>; }
