"use client";

import { useState } from "react";
import type { Dimension } from "@/lib/types";
import { RadarChart } from "./radar-chart";
import { DimensionChart } from "./dimension-chart";

interface ResultTabsProps {
  byDimension: Record<Dimension, number>;
}

type Tab = "chart" | "detail";

export function ResultTabs({ byDimension }: ResultTabsProps) {
  const [tab, setTab] = useState<Tab>("chart");

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Tab switcher with sliding indicator */}
      <div className="relative flex justify-center">
        <div className="relative flex rounded-full bg-muted p-1">
          {/* Sliding background */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-background shadow-sm transition-all duration-200 ease-out"
            style={{
              width: "calc(50% - 4px)",
              left: tab === "chart" ? "4px" : "calc(50%)",
            }}
          />
          <button
            type="button"
            onClick={() => setTab("chart")}
            className={`relative z-10 rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
              tab === "chart"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            차트
          </button>
          <button
            type="button"
            onClick={() => setTab("detail")}
            className={`relative z-10 rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
              tab === "detail"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            상세
          </button>
        </div>
      </div>

      {/* Tab content with fade */}
      <div
        key={tab}
        className="animate-in fade-in duration-300"
      >
        {tab === "chart" ? (
          <RadarChart byDimension={byDimension} />
        ) : (
          <DimensionChart byDimension={byDimension} />
        )}
      </div>
    </div>
  );
}
