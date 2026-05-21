import type { Dimension } from "@/lib/questions";
import { DIMENSIONS, DIMENSION_LABELS, getDimensionMax } from "@/lib/scoring";

interface DimensionChartProps {
  byDimension: Record<Dimension, number>;
}

export function DimensionChart({ byDimension }: DimensionChartProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {DIMENSIONS.map((dim) => {
        const value = byDimension[dim];
        const max = getDimensionMax(dim);
        const percentage = max > 0 ? (value / max) * 100 : 0;

        return (
          <div key={dim} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {DIMENSION_LABELS[dim]}
              </span>
              <span className="font-medium tabular-nums">
                {value}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-foreground transition-all duration-500"
                style={{ width: `${Math.max(percentage, 2)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
