"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSessionWithRole, isStaffRole } from "@/lib/auth/roles";
import { APPLICATION_STATUSES } from "@/lib/admin/status";

export type ActionResult = { ok: true } | { ok: false; error: string };

const NOT_STAFF = "You don't have access to this action.";
const GENERIC = "Something went wrong. Please try again.";

const statusSchema = z.object({
  applicationId: z.string().uuid(),
  status: z.enum(APPLICATION_STATUSES),
});

/** Update an application's pipeline status. Staff only; RLS also enforces. */
export async function updateApplicationStatus(
  input: z.infer<typeof statusSchema>,
): Promise<ActionResult> {
  const parsed = statusSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid status." };

  const { supabase, user, role } = await getSessionWithRole();
  if (!user || !isStaffRole(role)) return { ok: false, error: NOT_STAFF };

  const patch: Record<string, unknown> = { status: parsed.data.status };
  // Convenience: stamp the contact time the first time a lead is marked contacted.
  if (parsed.data.status === "contacted") {
    patch.last_contacted_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("applications")
    .update(patch)
    .eq("id", parsed.data.applicationId);

  if (error) {
    console.error("updateApplicationStatus failed:", error);
    return { ok: false, error: GENERIC };
  }

  revalidatePath(`/admin/applications/${parsed.data.applicationId}`);
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
  return { ok: true };
}

const noteSchema = z.object({
  applicationId: z.string().uuid(),
  body: z.string().trim().min(1, "Write a note first.").max(5000),
});

/** Add an internal note to an application. Staff only. */
export async function addApplicationNote(
  input: z.infer<typeof noteSchema>,
): Promise<ActionResult> {
  const parsed = noteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid note." };
  }

  const { supabase, user, role } = await getSessionWithRole();
  if (!user || !isStaffRole(role)) return { ok: false, error: NOT_STAFF };

  const { error } = await supabase.from("application_notes").insert({
    application_id: parsed.data.applicationId,
    author_id: user.id,
    body: parsed.data.body,
  });

  if (error) {
    console.error("addApplicationNote failed:", error);
    return { ok: false, error: GENERIC };
  }

  revalidatePath(`/admin/applications/${parsed.data.applicationId}`);
  return { ok: true };
}

const assignSchema = z.object({
  applicationId: z.string().uuid(),
  /** null unassigns; otherwise must equal the caller (self-assign in Phase 1). */
  assigneeId: z.string().uuid().nullable(),
});

/** Assign (or unassign) an application. Phase 1: self-assign / clear only. */
export async function assignApplication(
  input: z.infer<typeof assignSchema>,
): Promise<ActionResult> {
  const parsed = assignSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid assignment." };

  const { supabase, user, role } = await getSessionWithRole();
  if (!user || !isStaffRole(role)) return { ok: false, error: NOT_STAFF };

  // Phase 1 keeps this simple: a staffer can claim a lead or clear it.
  const assignee =
    parsed.data.assigneeId === null ? null : user.id;

  const { error } = await supabase
    .from("applications")
    .update({ assigned_to: assignee })
    .eq("id", parsed.data.applicationId);

  if (error) {
    console.error("assignApplication failed:", error);
    return { ok: false, error: GENERIC };
  }

  revalidatePath(`/admin/applications/${parsed.data.applicationId}`);
  revalidatePath("/admin/applications");
  return { ok: true };
}
