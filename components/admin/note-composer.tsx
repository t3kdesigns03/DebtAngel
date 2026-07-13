"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addApplicationNote } from "@/lib/actions/admin";

export function NoteComposer({ applicationId }: { applicationId: string }) {
  const router = useRouter();
  const [body, setBody] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async () => {
    const trimmed = body.trim();
    if (!trimmed) return;
    setError(null);
    setPending(true);
    const result = await addApplicationNote({ applicationId, body: trimmed });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setBody("");
    router.refresh();
  };

  return (
    <div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add an internal note… (visible to staff only)"
        rows={3}
        className="w-full resize-y rounded-2xl border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
        }}
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {error ? (
            <span className="text-destructive">{error}</span>
          ) : (
            "Notes are internal and never shown to the client."
          )}
        </p>
        <Button
          type="button"
          size="sm"
          onClick={submit}
          disabled={pending || body.trim().length === 0}
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Adding…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Add note
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
