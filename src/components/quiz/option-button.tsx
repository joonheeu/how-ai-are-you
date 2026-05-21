"use client";

import { cn } from "@/lib/utils";

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border px-4 py-3 text-left text-sm transition-all",
        "hover:border-foreground/30 hover:bg-muted/50",
        selected
          ? "border-foreground bg-foreground/5 font-medium"
          : "border-border"
      )}
    >
      {label}
    </button>
  );
}
