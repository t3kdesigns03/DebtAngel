-- Debt Angel — application admin fields + pipeline status + staff RLS (008)
-- Additive and safe. Adds CRM-style columns, migrates the status set to the
-- sales/servicing pipeline, and lets staff read/update all applications.

-- ── New CRM columns ──────────────────────────────────────────────────────────
alter table public.applications
  add column if not exists assigned_to uuid references auth.users (id) on delete set null,
  add column if not exists source text,
  add column if not exists last_contacted_at timestamptz;

-- ── Migrate status → pipeline set ────────────────────────────────────────────
-- Old set: submitted | reviewing | accepted | declined | withdrawn
-- New set: new | contacted | qualified | enrolled | active | completed | cancelled | nurture
alter table public.applications alter column status drop default;

update public.applications set status = case status
  when 'submitted' then 'new'
  when 'reviewing' then 'contacted'
  when 'accepted'  then 'enrolled'
  when 'declined'  then 'cancelled'
  when 'withdrawn' then 'cancelled'
  else status
end;

alter table public.applications drop constraint if exists applications_status_check;
alter table public.applications
  add constraint applications_status_check
  check (status in (
    'new', 'contacted', 'qualified', 'enrolled',
    'active', 'completed', 'cancelled', 'nurture'
  ));

alter table public.applications alter column status set default 'new';

create index if not exists applications_status_idx on public.applications (status);
create index if not exists applications_assigned_to_idx on public.applications (assigned_to);

-- ── Staff RLS (in addition to the existing owner policies) ────────────────────
drop policy if exists "applications_select_staff" on public.applications;
create policy "applications_select_staff"
  on public.applications for select
  using (public.is_staff());

drop policy if exists "applications_update_staff" on public.applications;
create policy "applications_update_staff"
  on public.applications for update
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "tradelines_select_staff" on public.application_tradelines;
create policy "tradelines_select_staff"
  on public.application_tradelines for select
  using (public.is_staff());
