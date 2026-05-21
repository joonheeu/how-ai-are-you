"use client";

import { useState, useEffect } from "react";
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
  const [animated, setAnimated] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const step = 360 / DIMENSIONS.length;

  const values = DIMENSIONS.map((dim) => {
    const max = getDimensionMax(dim);
    return max > 0 ? byDimension[dim] / max : 0;
  });

  const animatedValues = animated ? values : values.map(() => 0);

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
    const pos = polarToCartesian(i * step, RADIUS + 28);
    const pct = Math.round(values[i] * 100);
    return { dim, x: pos.x, y: pos.y, label: DIMENSION_LABELS[dim], pct };
  });

  // Data polygon
  const dataPoints = getPolygonPoints(animatedValues, RADIUS);

  return (
    <div className="flex w-full justify-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[300px]"
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

        {/* Data area with transition */}
        <polygon
          points={dataPoints}
          className="fill-sky-500/20 stroke-sky-500"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        />

        {/* Data points */}
        {animatedValues.map((v, i) => {
          const pos = polarToCartesian(i * step, v * RADIUS);
          const isHovered = hoveredIndex === i;
          return (
            <circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r={isHovered ? 6 : 4}
              className={isHovered ? "fill-sky-600" : "fill-sky-500"}
              style={{
                transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), r 0.15s ease",
              }}
            />
          );
        })}

        {/* Interactive hit areas + labels */}
        {labels.map(({ dim, x, y, label, pct }, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <g
              key={dim}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              {/* Invisible hit area */}
              <circle
                cx={x}
                cy={y}
                r="20"
                fill="transparent"
              />
              <text
                x={x}
                y={y - 6}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[9px] transition-colors ${
                  isHovered ? "fill-foreground font-medium" : "fill-muted-foreground"
                }`}
              >
                {label}
              </text>
              <text
                x={x}
                y={y + 6}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[10px] font-semibold transition-all ${
                  isHovered ? "fill-sky-600" : "fill-muted-foreground/60"
                }`}
              >
                {pct}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
