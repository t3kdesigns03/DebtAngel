"use client";

import * as React from "react";
import { Plus, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  tradelineTypeOptions,
  tradelineStatusOptions,
  emptyTradeline,
} from "@/lib/application-schema";
import type { Tradeline } from "@/lib/estimator";
import { cn } from "@/lib/utils";

/**
 * Self-contained add/edit form for a single tradeline. Keeps its own local
 * state so it never fights the parent form; emits a complete Tradeline on save.
 */
export function TradelineForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Tradeline;
  onSave: (tl: Tradeline) => void;
  onCancel?: () => void;
}) {
  const [tl, setTl] = React.useState<Tradeline>(initial ?? emptyTradeline());
  const [touched, setTouched] = React.useState(false);

  const isRevolving = tl.type === "credit-card" || tl.type === "retail-card";
  const valid = tl.creditor.trim().length > 0 && tl.balance > 0;

  const set = <K extends keyof Tradeline>(key: K, value: Tradeline[K]) =>
    setTl((prev) => ({ ...prev, [key]: value }));

  const num = (v: string) => (v === "" ? 0 : Math.max(0, Number(v)));

  return (
    <div className="rounded-2xl border border-gold/30 bg-gold/[0.07] p-4 sm:p-5">
      <p className="mb-4 text-sm font-semibold">
        {initial ? "Edit account" : "Add an account"}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="tl-creditor">Creditor</Label>
          <Input
            id="tl-creditor"
            className="mt-1.5"
            placeholder="e.g. Summit Visa"
            value={tl.creditor}
            onChange={(e) => set("creditor", e.target.value)}
          />
          {touched && !tl.creditor.trim() && (
            <p className="mt-1 text-xs text-destructive">Add the creditor name</p>
          )}
        </div>

        <div>
          <Label htmlFor="tl-type">Type</Label>
          <select
            id="tl-type"
            className="mt-1.5 flex h-12 w-full rounded-xl border border-input bg-background px-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={tl.type}
            onChange={(e) => set("type", e.target.value as Tradeline["type"])}
          >
            {tradelineTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="tl-status">Status</Label>
          <select
            id="tl-status"
            className="mt-1.5 flex h-12 w-full rounded-xl border border-input bg-background px-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={tl.status}
            onChange={(e) => set("status", e.target.value as Tradeline["status"])}
          >
            {tradelineStatusOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="tl-balance">Balance ($)</Label>
          <Input
            id="tl-balance"
            className="mt-1.5"
            type="number"
            inputMode="numeric"
            min={0}
            value={tl.balance || ""}
            onChange={(e) => set("balance", num(e.target.value))}
          />
          {touched && !(tl.balance > 0) && (
            <p className="mt-1 text-xs text-destructive">Enter a balance</p>
          )}
        </div>

        {isRevolving && (
          <div>
            <Label htmlFor="tl-limit">Credit limit ($)</Label>
            <Input
              id="tl-limit"
              className="mt-1.5"
              type="number"
              inputMode="numeric"
              min={0}
              value={tl.limit || ""}
              onChange={(e) => set("limit", num(e.target.value))}
            />
          </div>
        )}

        <div>
          <Label htmlFor="tl-apr">APR (%)</Label>
          <Input
            id="tl-apr"
            className="mt-1.5"
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            value={tl.apr || ""}
            onChange={(e) => set("apr", num(e.target.value))}
          />
        </div>

        <div>
          <Label htmlFor="tl-min">Min payment ($/mo)</Label>
          <Input
            id="tl-min"
            className="mt-1.5"
            type="number"
            inputMode="numeric"
            min={0}
            value={tl.minPayment || ""}
            onChange={(e) => set("minPayment", num(e.target.value))}
          />
        </div>

        <div>
          <Label htmlFor="tl-opened">Opened (optional)</Label>
          <Input
            id="tl-opened"
            className="mt-1.5"
            type="month"
            value={tl.opened || ""}
            onChange={(e) => set("opened", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          className="sm:w-auto"
          onClick={() => {
            setTouched(true);
            if (valid) {
              onSave(tl);
              setTl(emptyTradeline());
              setTouched(false);
            }
          }}
        >
          {initial ? (
            <>
              <Check className="h-4 w-4" /> Save changes
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add account
            </>
          )}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

export function AddAccountButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card px-4 py-4 text-sm font-semibold text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground",
        className,
      )}
    >
      <Plus className="h-4 w-4" /> Add another account
    </button>
  );
}
