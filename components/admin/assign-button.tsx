"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assignApplication } from "@/lib/actions/admin";

export function AssignButton({
  applicationId,
  assignedToMe,
  userId,
}: {
  applicationId: string;
  assignedToMe: boolean;
  userId: string;
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  const toggle = async () => {
    setPending(true);
    const result = await assignApplication({
      applicationId,
      assigneeId: assignedToMe ? null : userId,
    });
    setPending(false);
    if (result.ok) router.refresh();
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggle}
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : assignedToMe ? (
        <>
          <UserMinus className="h-4 w-4" /> Unassign
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" /> Assign to me
        </>
      )}
    </Button>
  );
}
