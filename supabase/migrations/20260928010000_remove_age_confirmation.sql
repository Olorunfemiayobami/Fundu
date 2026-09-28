-- Apply this only if the earlier legal-acceptance SQL was already run before
-- the age confirmation was removed from the product. Otherwise the current
-- 20260928000000 migration already has the final schema.
BEGIN;

ALTER TABLE public.legal_acceptances
  DROP CONSTRAINT IF EXISTS legal_acceptance_campaign_context;
ALTER TABLE public.legal_acceptances
  DROP COLUMN IF EXISTS adult_confirmed_at;
ALTER TABLE public.legal_acceptances
  ADD CONSTRAINT legal_acceptance_campaign_context CHECK (
    (acceptance_context = 'signup' AND campaign_id IS NULL) OR
    (acceptance_context = 'campaign_publish' AND campaign_id IS NOT NULL)
  );

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

COMMIT;
