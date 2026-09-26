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
