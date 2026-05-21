import type { Dimension } from "@/lib/types";
import { DIMENSIONS, DIMENSION_LABELS, getDimensionMax } from "@/lib/scoring";

interface RadarChartProps {
  byDimension: Record<Dimension, number>;
}

const SIZE = 280;
const CENTER = SIZE / 2;
const RADIUS = 110;
const LEVELS = 4;

function polarToCartesian(angle: number, radius: number) {
  // Start from top (-90°), go clockwise
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function getPolygonPoints(values: number[], maxRadius: number): string {
  const step = 360 / values.length;
  return values
    .map((v, i) => {
      const point = polarToCartesian(i * step, v * maxRadius);
      return `${point.x},${point.y}`;
    })
    .join(" ");
}

export function RadarChart({ byDimension }: RadarChartProps) {
  const step = 360 / DIMENSIONS.length;

  // Normalized values (0~1) for each dimension
  const values = DIMENSIONS.map((dim) => {
    const max = getDimensionMax(dim);
    return max > 0 ? byDimension[dim] / max : 0;
  });

  // Grid rings
  const rings = Array.from({ length: LEVELS }, (_, i) => {
    const r = (RADIUS / LEVELS) * (i + 1);
    const points = DIMENSIONS.map((_, j) => {
      const p = polarToCartesian(j * step, r);
      return `${p.x},${p.y}`;
    }).join(" ");
    return points;
  });

  // Axis lines
  const axes = DIMENSIONS.map((_, i) => {
    const end = polarToCartesian(i * step, RADIUS);
    return { x2: end.x, y2: end.y };
  });

  // Labels
  const labels = DIMENSIONS.map((dim, i) => {
    const pos = polarToCartesian(i * step, RADIUS + 24);
    return { dim, x: pos.x, y: pos.y, label: DIMENSION_LABELS[dim] };
  });

  // Data polygon
  const dataPoints = getPolygonPoints(values, RADIUS);

  return (
    <div className="flex w-full justify-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[280px]"
        role="img"
        aria-label="AI 활용도 레이더 차트"
      >
        {/* Grid rings */}
        {rings.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-border"
          />
        ))}

        {/* Axis lines */}
        {axes.map((axis, i) => (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={axis.x2}
            y2={axis.y2}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-border"
          />
        ))}

        {/* Data area */}
        <polygon
          points={dataPoints}
          className="fill-sky-500/20 stroke-sky-500"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {values.map((v, i) => {
          const pos = polarToCartesian(i * step, v * RADIUS);
          return (
            <circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r="3.5"
              className="fill-sky-500"
            />
          );
        })}

        {/* Labels */}
        {labels.map(({ dim, x, y, label }) => (
          <text
            key={dim}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-muted-foreground text-[9px]"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
