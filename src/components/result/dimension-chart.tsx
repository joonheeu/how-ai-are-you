import type { Dimension } from "@/lib/types";
import {
  DIMENSIONS,
  DIMENSION_LABELS,
  DIMENSION_DESCRIPTIONS,
  getDimensionMax,
} from "@/lib/scoring";

interface DimensionChartProps {
  byDimension: Record<Dimension, number>;
}

function getBarColor(percentage: number): string {
  if (percentage >= 80) return "bg-emerald-500";
  if (percentage >= 60) return "bg-sky-500";
  if (percentage >= 40) return "bg-amber-400";
  if (percentage >= 20) return "bg-orange-400";
  return "bg-stone-300";
}

function getPercentageLabel(percentage: number): string {
  if (percentage >= 80) return "높음";
  if (percentage >= 60) return "양호";
  if (percentage >= 40) return "보통";
  if (percentage >= 20) return "낮음";
  return "시작";
}

export function DimensionChart({ byDimension }: DimensionChartProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      {DIMENSIONS.map((dim) => {
        const value = byDimension[dim];
        const max = getDimensionMax(dim);
        const percentage = max > 0 ? (value / max) * 100 : 0;
        const barColor = getBarColor(percentage);
        const label = getPercentageLabel(percentage);

        return (
          <div key={dim} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {DIMENSION_LABELS[dim]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {DIMENSION_DESCRIPTIONS[dim]}
                </span>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {label} · {Math.round(percentage)}%
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${barColor} transition-all duration-700 ease-out`}
                style={{ width: `${Math.max(percentage, 3)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
