BEGIN;

CREATE TABLE IF NOT EXISTS public.legal_acceptances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  campaign_id uuid REFERENCES public.campaigns(id) ON DELETE CASCADE,
  terms_version text NOT NULL,
  acceptance_context text NOT NULL CHECK (acceptance_context IN ('signup', 'campaign_publish')),
  accepted_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT legal_acceptance_campaign_context CHECK (
    (acceptance_context = 'signup' AND campaign_id IS NULL) OR
    (acceptance_context = 'campaign_publish' AND campaign_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS legal_acceptances_user_context_idx
  ON public.legal_acceptances (user_id, acceptance_context, terms_version);
CREATE INDEX IF NOT EXISTS legal_acceptances_campaign_idx
  ON public.legal_acceptances (campaign_id, user_id, terms_version);

ALTER TABLE public.legal_acceptances ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.legal_acceptances FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON public.legal_acceptances TO service_role;

-- Email sign-up has no authenticated session until verification. Capture the
-- explicitly checked Terms version at account creation, using database time.
CREATE OR REPLACE FUNCTION public.fundu_record_signup_terms()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  IF NEW.raw_user_meta_data->>'fundu_terms_accepted' = 'true'
     AND NEW.raw_user_meta_data->>'fundu_terms_version' = '1.0' THEN
    INSERT INTO public.legal_acceptances
      (user_id, terms_version, acceptance_context)
    VALUES (NEW.id, '1.0', 'signup');
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.fundu_record_signup_terms() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS fundu_record_signup_terms ON auth.users;
CREATE TRIGGER fundu_record_signup_terms
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.fundu_record_signup_terms();

-- A campaign cannot become active without an acceptance for this campaign.
-- This also protects the direct save_campaign RPC from bypassing the UI.
CREATE OR REPLACE FUNCTION public.fundu_require_publish_terms()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  entering_active boolean;
BEGIN
  IF TG_OP = 'INSERT' THEN
    entering_active := NEW.status = 'active';
  ELSE
    entering_active := NEW.status = 'active' AND OLD.status IS DISTINCT FROM 'active';
  END IF;
  IF entering_active AND NOT EXISTS (
       SELECT 1 FROM public.legal_acceptances a
       WHERE a.user_id = NEW.creator_id
         AND a.campaign_id = NEW.id
         AND a.acceptance_context = 'campaign_publish'
         AND a.terms_version = '1.0'
     ) THEN
    RAISE EXCEPTION 'Accept the current Terms before publishing this campaign';
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.fundu_require_publish_terms() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS fundu_require_publish_terms ON public.campaigns;
CREATE TRIGGER fundu_require_publish_terms
  BEFORE INSERT OR UPDATE OF status ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION public.fundu_require_publish_terms();

COMMIT;
