BEGIN;
-- Verified against the project schema on 2026-09-27. Server-only functions.
-- Storage API removes objects; never delete storage.objects rows directly.
CREATE OR REPLACE FUNCTION public.fundu_account_deletion_files(account_id uuid)
RETURNS TABLE(bucket_id text, name text)
LANGUAGE sql SECURITY DEFINER SET search_path = '' AS $$
  SELECT o.bucket_id, o.name FROM storage.objects o
  WHERE o.owner_id = account_id::text OR o.owner = account_id;
$$;

CREATE OR REPLACE FUNCTION public.fundu_delete_account_data(account_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  -- Cascades remove campaign updates, comments, metrics, bank accounts,
  -- hosting fees, donations, receipts and campaign-linked activity.
  DELETE FROM public.campaigns WHERE creator_id = account_id;
  -- The donor FK is SET NULL, which otherwise retains identifying donor data.
  -- Delete the departing person's donation history and associated receipts.
  DELETE FROM public.donation_records WHERE donor_id = account_id;
  -- Profile, payout methods, notifications/settings, stats, authored comments,
  -- updates and remaining activity cascade when the admin API deletes auth.users.
END;
$$;
REVOKE ALL ON FUNCTION public.fundu_account_deletion_files(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.fundu_delete_account_data(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.fundu_account_deletion_files(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.fundu_delete_account_data(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.fundu_account_deletion_ready() RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = '' AS $$ SELECT to_regprocedure('public.fundu_account_deletion_files(uuid)') IS NOT NULL AND to_regprocedure('public.fundu_delete_account_data(uuid)') IS NOT NULL; $$;
REVOKE ALL ON FUNCTION public.fundu_account_deletion_ready() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.fundu_account_deletion_ready() TO service_role;
COMMIT;
