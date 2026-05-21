"use client";

import { useState, useEffect, useMemo } from "react";
import type { Dimension } from "@/lib/types";
import { DIMENSIONS, DIMENSION_LABELS, getDimensionMax } from "@/lib/scoring";

interface RadarChartProps {
  byDimension: Record<Dimension, number>;
}

const SIZE = 340;
const CENTER = SIZE / 2;
const RADIUS = 110;
const LEVELS = 4;
const LABEL_OFFSET = 32;

function polarToCartesian(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function buildPath(values: number[], maxRadius: number): string {
  const step = 360 / values.length;
  const points = values.map((v, i) => {
    const p = polarToCartesian(i * step, v * maxRadius);
    return `${p.x},${p.y}`;
  });
  return `M${points.join("L")}Z`;
}

export function RadarChart({ byDimension }: RadarChartProps) {
  const [progress, setProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // Animate from 0 to 1 over 600ms with easeOut
    let start: number | null = null;
    let raf: number;
    const duration = 600;

    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const step = 360 / DIMENSIONS.length;

  const targetValues = useMemo(
    () =>
      DIMENSIONS.map((dim) => {
        const max = getDimensionMax(dim);
        return max > 0 ? byDimension[dim] / max : 0;
      }),
    [byDimension]
  );

  const animatedValues = targetValues.map((v) => v * progress);

  // Grid rings
  const rings = useMemo(
    () =>
      Array.from({ length: LEVELS }, (_, i) => {
        const r = (RADIUS / LEVELS) * (i + 1);
        return buildPath(
          DIMENSIONS.map(() => 1),
          r
        ).replace(/M|Z/g, (m) => (m === "M" ? "" : "")).split("L").map((p) => {
          // Recalculate for grid
          const pp = polarToCartesian(
            (DIMENSIONS.indexOf(DIMENSIONS[0]) + 0) * step,
            r
          );
          return pp;
        });
      }),
    []
  );

  // Build ring paths properly
  const ringPaths = useMemo(
    () =>
      Array.from({ length: LEVELS }, (_, i) => {
        const r = (RADIUS / LEVELS) * (i + 1);
        const points = DIMENSIONS.map((_, j) => {
          const p = polarToCartesian(j * step, r);
          return `${p.x},${p.y}`;
        });
        return `M${points.join("L")}Z`;
      }),
    [step]
  );

  // Axis lines
  const axes = DIMENSIONS.map((_, i) => {
    const end = polarToCartesian(i * step, RADIUS);
    return { x2: end.x, y2: end.y };
  });

  // Labels
  const labels = DIMENSIONS.map((dim, i) => {
    const pos = polarToCartesian(i * step, RADIUS + LABEL_OFFSET);
    const pct = Math.round(targetValues[i] * 100);
    return { dim, x: pos.x, y: pos.y, label: DIMENSION_LABELS[dim], pct };
  });

  // Animated data path
  const dataPath = buildPath(animatedValues, RADIUS);

  return (
    <div className="flex w-full justify-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[340px]"
        role="img"
        aria-label="AI 활용도 레이더 차트"
      >
        {/* Grid rings */}
        {ringPaths.map((d, i) => (
          <path
            key={i}
            d={d}
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

        {/* Data area — animated via path d */}
        <path
          d={dataPath}
          className="fill-sky-500/20 stroke-sky-500"
          strokeWidth="2"
          strokeLinejoin="round"
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
              style={{ transition: "r 0.15s ease" }}
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
              onTouchStart={() => setHoveredIndex(i)}
              onTouchEnd={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              <circle cx={x} cy={y} r="24" fill="transparent" />
              <text
                x={x}
                y={y - 7}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[10px] transition-colors ${
                  isHovered
                    ? "fill-foreground font-medium"
                    : "fill-muted-foreground"
                }`}
              >
                {label}
              </text>
              <text
                x={x}
                y={y + 7}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[11px] font-semibold transition-all ${
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
