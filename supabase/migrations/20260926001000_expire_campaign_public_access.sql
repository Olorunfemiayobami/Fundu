-- Keep ended campaign pages and their public history visible.
-- Bank details are served from campaign_bank_accounts and stay visible publicly only while hosted.

-- The legacy payout_details column duplicates bank details on the public campaigns row.
-- Empty it once, then prevent future saves from putting bank details back there.
CREATE OR REPLACE FUNCTION public.clear_campaign_payout_details()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $function$
BEGIN
  NEW.payout_details := NULL;
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS clear_campaign_payout_details ON public.campaigns;
CREATE TRIGGER clear_campaign_payout_details
BEFORE INSERT OR UPDATE OF payout_details
ON public.campaigns
FOR EACH ROW
EXECUTE FUNCTION public.clear_campaign_payout_details();

UPDATE public.campaigns
SET payout_details = NULL
WHERE payout_details IS NOT NULL;

DROP POLICY IF EXISTS "Anyone can view active campaigns" ON public.campaigns;
DROP POLICY IF EXISTS "Enable select for all users" ON public.campaigns;
DROP POLICY IF EXISTS "Public can view currently hosted campaigns" ON public.campaigns;

CREATE POLICY "Public can view active or ended campaigns"
ON public.campaigns
FOR SELECT
TO public
USING (
  creator_id = (SELECT auth.uid())
  OR status = 'ended'::public.campaign_status
  OR (
    status = 'active'::public.campaign_status
    AND end_date IS NOT NULL
    AND end_date <= now()
  )
  OR (
    status = 'active'::public.campaign_status
    AND is_hosting_active IS TRUE
    AND hosting_expires_at IS NOT NULL
    AND hosting_expires_at > now()
    AND end_date IS NOT NULL
    AND end_date > now()
  )
);

DROP POLICY IF EXISTS "Public can view campaign updates" ON public.campaign_updates;
DROP POLICY IF EXISTS "Public can view updates for currently hosted campaigns" ON public.campaign_updates;
CREATE POLICY "Public can view updates for active or ended campaigns"
ON public.campaign_updates
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1
    FROM public.campaigns AS c
    WHERE c.id = campaign_updates.campaign_id
      AND (
        c.creator_id = (SELECT auth.uid())
        OR c.status = 'ended'::public.campaign_status
        OR (
          c.status = 'active'::public.campaign_status
          AND c.end_date IS NOT NULL
          AND c.end_date <= now()
        )
        OR (
          c.status = 'active'::public.campaign_status
          AND c.is_hosting_active IS TRUE
          AND c.hosting_expires_at IS NOT NULL
          AND c.hosting_expires_at > now()
          AND c.end_date IS NOT NULL
          AND c.end_date > now()
        )
      )
  )
);

DROP POLICY IF EXISTS "Bank accounts can be viewed for active campaigns" ON public.campaign_bank_accounts;
DROP POLICY IF EXISTS "Bank accounts visible for currently hosted campaigns" ON public.campaign_bank_accounts;
CREATE POLICY "Bank accounts visible only while campaign is hosted"
ON public.campaign_bank_accounts
FOR SELECT
TO public
USING (
  auth.uid() = user_id
  OR EXISTS (
    SELECT 1
    FROM public.campaigns AS c
    WHERE c.id = campaign_bank_accounts.campaign_id
      AND c.creator_id = (SELECT auth.uid())
  )
  OR (
    is_active IS TRUE
    AND EXISTS (
      SELECT 1
      FROM public.campaigns AS c
      WHERE c.id = campaign_bank_accounts.campaign_id
        AND c.status = 'active'::public.campaign_status
        AND c.is_hosting_active IS TRUE
        AND c.hosting_expires_at IS NOT NULL
        AND c.hosting_expires_at > now()
        AND c.end_date IS NOT NULL
        AND c.end_date > now()
    )
  )
);

DROP POLICY IF EXISTS "Anyone can view metrics for active campaigns" ON public.campaign_metrics;
DROP POLICY IF EXISTS "Public can view metrics for currently hosted campaigns" ON public.campaign_metrics;
CREATE POLICY "Public can view metrics for active or ended campaigns"
ON public.campaign_metrics
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1
    FROM public.campaigns AS c
    WHERE c.id = campaign_metrics.campaign_id
      AND (
        c.status = 'ended'::public.campaign_status
        OR (
          c.status = 'active'::public.campaign_status
          AND c.end_date IS NOT NULL
          AND c.end_date <= now()
        )
        OR (
          c.status = 'active'::public.campaign_status
          AND c.is_hosting_active IS TRUE
          AND c.hosting_expires_at IS NOT NULL
          AND c.hosting_expires_at > now()
          AND c.end_date IS NOT NULL
          AND c.end_date > now()
        )
      )
  )
);

DROP POLICY IF EXISTS "Anyone can view comments on active campaigns" ON public.comments;
DROP POLICY IF EXISTS "Public can view comments for currently hosted campaigns" ON public.comments;
CREATE POLICY "Public can view comments for active or ended campaigns"
ON public.comments
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1
    FROM public.campaigns AS c
    WHERE c.id = comments.campaign_id
      AND (
        c.creator_id = (SELECT auth.uid())
        OR c.status = 'ended'::public.campaign_status
        OR (
          c.status = 'active'::public.campaign_status
          AND c.end_date IS NOT NULL
          AND c.end_date <= now()
        )
        OR (
          c.status = 'active'::public.campaign_status
          AND c.is_hosting_active IS TRUE
          AND c.hosting_expires_at IS NOT NULL
          AND c.hosting_expires_at > now()
          AND c.end_date IS NOT NULL
          AND c.end_date > now()
        )
      )
  )
);

DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.comments;
DROP POLICY IF EXISTS "Authenticated users can comment on currently hosted campaigns" ON public.comments;
CREATE POLICY "Authenticated users can comment on active campaigns"
ON public.comments
FOR INSERT
TO public
WITH CHECK (
  auth.uid() IS NOT NULL
  AND user_id = (SELECT auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.campaigns AS c
    WHERE c.id = comments.campaign_id
      AND c.status = 'active'::public.campaign_status
      AND c.is_hosting_active IS TRUE
      AND c.hosting_expires_at IS NOT NULL
      AND c.hosting_expires_at > now()
      AND c.end_date IS NOT NULL
      AND c.end_date > now()
  )
);
