-- Debt Angel — allow users to update their own plans + edit their accounts (004)
-- Adds UPDATE (applications) and DELETE (tradelines) RLS policies so a verified
-- user can recompute and edit a plan they already own.

-- Applications: owners may update their own rows.
drop policy if exists "applications_update_own" on public.applications;
create policy "applications_update_own"
  on public.applications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Tradelines: owners may delete their own rows (edit = delete + re-insert).
drop policy if exists "tradelines_delete_own" on public.application_tradelines;
create policy "tradelines_delete_own"
  on public.application_tradelines for delete
  using (auth.uid() = user_id);
