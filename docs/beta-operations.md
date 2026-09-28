# Fundu beta operational checks

This is an internal checklist. It does not replace the public Terms or Privacy Policy.

## Before deploying the legal-acceptance code

1. Apply `supabase/migrations/20260928000000_legal_acceptances.sql` in the matching Supabase project. It creates the acceptance table and blocks campaigns from becoming active without a campaign-specific Terms acceptance. If you already applied the earlier age-confirmation version of this SQL, run `supabase/migrations/20260928010000_remove_age_confirmation.sql` instead to update the existing table and trigger. Deploy the application only after the applicable SQL succeeds.
2. Verify that the public Terms show version 1.0 and that the displayed date is the actual effective date. If the version changes, update `lib/legalVersion.js`, the legal page, and the migration's publish guard together.
3. Test email sign-up and Google sign-up with disposable accounts. Confirm that neither can enter the authenticated app without accepting the current Terms. Confirm the sign-up acceptance row records the Terms version and timestamp.
4. Publish a disposable campaign and confirm a `legal_acceptances` row exists with `acceptance_context = 'campaign_publish'`, that campaign's ID, version 1.0, and a database timestamp. Confirm a direct `save_campaign` call cannot activate an unaccepted draft.
5. Test deletion of both email/password and Google accounts in a test Supabase project. Check public links, storage, receiving details, and related data after deletion. Confirm what records actually remain.

## Support and reports

- Assign an owner to monitor `funduhelp@gmail.com`; verify the mailbox can receive and send messages. Check it regularly during beta.
- For each campaign report, record the message date, campaign link, concern, reviewer, decision and action. Acknowledge receipt without promising a response time the team cannot maintain.
- Test a manual moderator procedure to restrict or unpublish a campaign in Supabase. The organizer's own End campaign control is not a moderator tool. Limit dashboard access to authorized staff and document each action.
- For privacy requests, record receipt, verify the requester appropriately, identify the relevant data, complete or explain the request, and record the response. Do not ask for unnecessary identity documents.

## Technical and policy verification

- Inspect production browser storage, network requests, and scripts, including a public campaign with YouTube and Vimeo embeds. The public page currently loads video iframes when it renders; verify the providers' requests and cookies before deciding whether click-to-load is needed.
- Verify production Supabase, Vercel and Google configurations and maintain an internal inventory of each provider's purpose, data categories, processing location, retention, security controls, contractual terms and subprocessors. Do not infer these from package names alone.
- Confirm public receiving details and private-link behavior using an unauthenticated browser. Confirm unlisted campaigns do not appear in Explore or search results.
- Verify Fundu does not route contributions through itself or load undisclosed analytics or advertising trackers.
- Check the Terms and Privacy Policy dates and contact address at launch. Finalize the operating identity and paid-hosting cancellation, refund, receipt and support process before accepting a real hosting payment.

## Open work

- A deletion confirmation email is not implemented; the current success screen confirms deletion in the browser. Add an email service and deliverability/error handling before claiming an email was sent.
- The report route is currently `mailto:`. Build the approved in-product report form when ready.
- Formalize data-retention periods and a vendor register as the beta matures.
