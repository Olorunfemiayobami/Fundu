/* Message submission for the marketing site's Contact page.

   Mirrors the working Help Centre form in components/help/HelpUI.jsx exactly:
   the same Formspree form, the same JSON payload fields, the same validation
   rules, and success only when Formspree answers with an OK response.
   The Help form itself is left unchanged; if its endpoint or rules change,
   update this file to match. */

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvkgdpjp";

export const emptyContactMessage = { name: "", email: "", topic: "", campaign: "", message: "" };

/* Same rules and wording as validateHelpMessage() on /help */
export function validateContactMessage(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Enter your name.";
  if (!fields.email.trim()) errors.email = "Enter your email address so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  if (!fields.topic) errors.topic = "Choose a topic.";
  if (fields.campaign.trim()) {
    try {
      const url = new URL(fields.campaign.trim());
      if (!/^https?:$/.test(url.protocol)) errors.campaign = "Enter a valid page link.";
    } catch {
      errors.campaign = "Enter a valid page link.";
    }
  }
  if (!fields.message.trim()) errors.message = "Tell us what’s happening.";
  else if (fields.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

/* Same request as the Help form. Resolves only when Formspree confirms. */
export async function sendContactMessage(fields) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      name: fields.name.trim(),
      email: fields.email.trim(),
      topic: fields.topic,
      campaign_link: fields.campaign.trim(),
      message: fields.message.trim(),
    }),
  });
  if (!response.ok) throw new Error("Formspree could not accept the message.");
}
