alter table public.matches
  add column if not exists kickoff_at timestamptz;

update public.matches
set kickoff_at = (match_date + match_time) at time zone 'America/New_York'
where kickoff_at is null;

alter table public.matches
  alter column kickoff_at set not null;

create index if not exists matches_kickoff_at_idx
  on public.matches(kickoff_at);

create or replace function public.prevent_locked_prediction_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  deadline timestamptz;
begin
  select kickoff_at
  into deadline
  from public.matches
  where id = new.match_id and pool_id = new.pool_id;

  if deadline is null then
    raise exception 'Match deadline was not found.';
  end if;

  if now() >= deadline then
    raise exception 'Predictions are locked after kickoff.'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists predictions_lock_at_kickoff
  on public.predictions;

create trigger predictions_lock_at_kickoff
before insert or update on public.predictions
for each row execute function public.prevent_locked_prediction_changes();
