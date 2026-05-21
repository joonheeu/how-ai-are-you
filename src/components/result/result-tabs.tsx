"use client";

import { useState } from "react";
import type { Dimension } from "@/lib/types";
import { RadarChart } from "./radar-chart";
import { DimensionChart } from "./dimension-chart";
import { cn } from "@/lib/utils";

interface ResultTabsProps {
  byDimension: Record<Dimension, number>;
}

type Tab = "chart" | "detail";

export function ResultTabs({ byDimension }: ResultTabsProps) {
  const [tab, setTab] = useState<Tab>("chart");

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-center gap-1 rounded-lg bg-muted p-1">
        <button
          type="button"
          onClick={() => setTab("chart")}
          className={cn(
            "rounded-md px-4 py-1.5 text-sm font-medium transition-all",
            tab === "chart"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          차트
        </button>
        <button
          type="button"
          onClick={() => setTab("detail")}
          className={cn(
            "rounded-md px-4 py-1.5 text-sm font-medium transition-all",
            tab === "detail"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          상세
        </button>
      </div>

      {tab === "chart" ? (
        <RadarChart byDimension={byDimension} />
      ) : (
        <DimensionChart byDimension={byDimension} />
      )}
    </div>
  );
}
