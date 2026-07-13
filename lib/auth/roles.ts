import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export type Role = "client" | "employee" | "admin";

export function isStaffRole(role: Role | null | undefined): boolean {
  return role === "employee" || role === "admin";
}

export function isAdminRole(role: Role | null | undefined): boolean {
  return role === "admin";
}

type SessionWithRole = {
  supabase: SupabaseClient;
  user: User | null;
  role: Role | null;
};

/** Load the current user and their role (defaults to "client"). */
export async function getSessionWithRole(): Promise<SessionWithRole> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, role: null };

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return { supabase, user, role: (data?.role as Role) ?? "client" };
}

export type StaffMember = {
  id: string;
  full_name: string | null;
  email: string | null;
};

/**
 * List all staff (employee + admin) for assignment dropdowns.
 * Backed by the security-definer `list_staff()` RPC, which joins emails from
 * auth.users and only returns rows to staff callers.
 */
export async function getStaffMembers(): Promise<StaffMember[]> {
  const supabase = await createClient();
  const { data } = await supabase.rpc("list_staff");
  return (data as StaffMember[] | null) ?? [];
}

/** Human label for a staff member — name, then email, then a fallback. */
export function staffLabel(member: StaffMember): string {
  return member.full_name?.trim() || member.email || "Staff member";
}

type StaffSession = {
  supabase: SupabaseClient;
  user: User;
  role: Role;
};

/**
 * Gate a server component / action to staff (employee or admin).
 * Redirects unauthenticated users to login and clients to their dashboard.
 */
export async function requireStaff(nextPath = "/admin"): Promise<StaffSession> {
  const { supabase, user, role } = await getSessionWithRole();
  if (!user) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  if (!isStaffRole(role)) redirect("/dashboard");
  return { supabase, user: user!, role: role! };
}
