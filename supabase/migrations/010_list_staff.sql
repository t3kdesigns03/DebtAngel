-- Debt Angel — staff directory for assignment (010_list_staff)
-- Read-only, security-definer function that returns staff members (employee +
-- admin) with their email from auth.users. Only callable by staff; non-staff
-- callers receive an empty set. Additive — no table changes.

create or replace function public.list_staff()
returns table (id uuid, full_name text, email text)
language sql
security definer
stable
set search_path = public
as $$
  select p.id, p.full_name, u.email
  from public.profiles p
  join auth.users u on u.id = p.id
  where p.role in ('employee', 'admin')
    and public.is_staff()
  order by coalesce(p.full_name, u.email);
$$;

revoke all on function public.list_staff() from public;
grant execute on function public.list_staff() to authenticated;
