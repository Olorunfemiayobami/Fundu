-- Reports are written through /api/reports using the server's service role.
-- Campaign deletion keeps the report for moderation/audit, but clears the FK.
CREATE TABLE IF NOT EXISTS public.campaign_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES public.campaigns(id) ON DELETE SET NULL,
  campaign_title text NOT NULL,
  reporter_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reason text NOT NULL CHECK (reason IN ('Misleading or false information', 'Fraud or scam', 'Impersonation', 'Inappropriate content', 'Receiving information issue', 'Other')),
  details text NOT NULL DEFAULT '' CHECK (char_length(details) <= 2000),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  resolved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  resolution text,
  reporter_fingerprint text NOT NULL,
  rate_window_start timestamptz NOT NULL,
  CONSTRAINT campaign_reports_resolution_state CHECK ((status = 'open' AND resolved_at IS NULL) OR (status = 'resolved' AND resolved_at IS NOT NULL))
);

CREATE INDEX IF NOT EXISTS campaign_reports_status_created_idx ON public.campaign_reports (status, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS campaign_reports_rate_limit_idx ON public.campaign_reports (campaign_id, reporter_fingerprint, rate_window_start) WHERE campaign_id IS NOT NULL;
ALTER TABLE public.campaign_reports ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.campaign_reports FROM anon, authenticated;
GRANT ALL ON public.campaign_reports TO service_role;
