-- Debt Angel — internal application notes (009_application_notes)
-- Staff-only internal notes on an application. Clients never see these.

create table if not exists public.application_notes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications (id) on delete cascade,
  author_id uuid references auth.users (id) on delete set null,
  body text not null check (char_length(trim(body)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists application_notes_application_id_idx
  on public.application_notes (application_id, created_at desc);

alter table public.application_notes enable row level security;

-- Only staff can read internal notes.
drop policy if exists "notes_select_staff" on public.application_notes;
create policy "notes_select_staff"
  on public.application_notes for select
  using (public.is_staff());

-- Staff can add notes authored as themselves.
drop policy if exists "notes_insert_staff" on public.application_notes;
create policy "notes_insert_staff"
  on public.application_notes for insert
  with check (public.is_staff() and author_id = auth.uid());
