-- RUN THIS ONLY AFTER THE UPDATED FUNDU WEBSITE CODE IS LIVE.
-- This keeps ended campaign pages, stories, updates, comments, and images public.
-- It hides bank details from the public after a campaign ends.
-- Campaign creators keep private access to their campaign and bank details.

-- ========================================
-- 20260926000000_sync_campaign_hosting_dates.sql
-- ========================================
-- Keep the hosting entitlement in step with the campaign period.
-- A complimentary early-access period is not recorded as a payment.

create or replace function public.sync_campaign_hosting_period()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $function$
begin
  if new.status = 'active'::public.campaign_status
     and new.end_date is not null
     and new.end_date > now() then
    new.hosting_expires_at := new.end_date;
    new.is_hosting_active := true;
  else
    new.is_hosting_active := false;
  end if;

  return new;
end;
$function$;

drop trigger if exists sync_campaign_hosting_period
  on public.campaigns;

create trigger sync_campaign_hosting_period
before insert or update of status, end_date
on public.campaigns
for each row
execute function public.sync_campaign_hosting_period();


-- ========================================
-- 20260926001000_expire_campaign_public_access.sql
-- ========================================
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


-- ========================================
-- 20260926002000_private_campaign_images.sql
-- ========================================
-- Make campaign images private while preserving signed access for live campaigns
-- and private access for their owners.

-- Reconcile campaigns created before the hosting-period trigger existed.
UPDATE public.campaigns
SET hosting_expires_at = end_date,
    is_hosting_active = true
WHERE status = 'active'::public.campaign_status
  AND end_date IS NOT NULL
  AND end_date > now();

UPDATE public.campaigns
SET is_hosting_active = false
WHERE status <> 'active'::public.campaign_status
   OR end_date IS NULL
   OR end_date <= now();

DROP POLICY IF EXISTS "campaign_images_live_or_owner_read" ON storage.objects;
DROP POLICY IF EXISTS "campaign_images_live_or_owner_read_restrict" ON storage.objects;

CREATE POLICY "campaign_images_live_or_owner_read"
ON storage.objects
AS PERMISSIVE
FOR SELECT
TO public
USING (
  bucket_id = 'campaign-images'
  AND (
    -- A creator can preview their own uploaded story images before saving the draft.
    (auth.uid() IS NOT NULL AND split_part(name, '/', 1) = auth.uid()::text)
    OR EXISTS (
      SELECT 1
      FROM public.campaigns AS c
      WHERE (
        position(name in coalesce(c.cover_image, '') || ' ' || coalesce(c.image_url, '') || ' ' || coalesce(c.preview_image, '')) > 0
        OR position(name in coalesce(c.story_blocks::text, '')) > 0
        OR EXISTS (
          SELECT 1
          FROM public.campaign_updates AS u
          WHERE u.campaign_id = c.id
            AND position(name in coalesce(u.image_urls::text, '')) > 0
        )
      )
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
  )
);

-- A restrictive policy narrows any older broad SELECT policy on storage.objects
-- to this same campaign-specific rule without changing other buckets.
CREATE POLICY "campaign_images_live_or_owner_read_restrict"
ON storage.objects
AS RESTRICTIVE
FOR SELECT
TO public
USING (
  bucket_id <> 'campaign-images'
  OR (
    (auth.uid() IS NOT NULL AND split_part(name, '/', 1) = auth.uid()::text)
    OR EXISTS (
      SELECT 1
      FROM public.campaigns AS c
      WHERE (
        position(name in coalesce(c.cover_image, '') || ' ' || coalesce(c.image_url, '') || ' ' || coalesce(c.preview_image, '')) > 0
        OR position(name in coalesce(c.story_blocks::text, '')) > 0
        OR EXISTS (
          SELECT 1
          FROM public.campaign_updates AS u
          WHERE u.campaign_id = c.id
            AND position(name in coalesce(u.image_urls::text, '')) > 0
        )
      )
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
  )
);

UPDATE storage.buckets
SET public = false
WHERE id = 'campaign-images';
