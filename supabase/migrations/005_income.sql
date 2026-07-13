-- Debt Angel — self-reported income on applications (005_income)
-- Additive and fully defaulted, so existing rows backfill cleanly as
-- `income_precision = 'declined'` with a null normalized income.
-- No RLS changes: the existing applications_insert_own / _update_own /
-- _select_own policies already cover these columns.

alter table public.applications
  add column if not exists income_precision text not null default 'declined'
    check (income_precision in ('exact', 'range', 'declined')),
  add column if not exists income_amount numeric(12, 2)
    check (income_amount is null or income_amount >= 0),
  add column if not exists income_range_id text,
  add column if not exists income_frequency text not null default 'monthly',
  add column if not exists income_type text not null default 'net'
    check (income_type in ('net', 'gross')),
  add column if not exists income_includes_household boolean not null default false,
  add column if not exists income_source text not null default 'self_reported'
    check (income_source in ('self_reported', 'verified')),
  -- Server-normalized, authoritative monthly net figure (nullable when declined).
  add column if not exists income_monthly_net numeric(12, 2)
    check (income_monthly_net is null or income_monthly_net >= 0);
