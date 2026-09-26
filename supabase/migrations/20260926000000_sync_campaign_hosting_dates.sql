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
