import type { Dimension } from "./types";
import { dimensionMetas } from "@/data/dimensions";
import { questions } from "@/data/questions";

export const DIMENSIONS: Dimension[] = dimensionMetas.map((d) => d.key);

export const DIMENSION_WEIGHTS: Record<Dimension, number> =
  Object.fromEntries(dimensionMetas.map((d) => [d.key, d.weight])) as Record<
    Dimension,
    number
  >;

export const DIMENSION_LABELS: Record<Dimension, string> =
  Object.fromEntries(dimensionMetas.map((d) => [d.key, d.label])) as Record<
    Dimension,
    string
  >;

export const DIMENSION_DESCRIPTIONS: Record<Dimension, string> =
  Object.fromEntries(
    dimensionMetas.map((d) => [d.key, d.description])
  ) as Record<Dimension, string>;

/** Compute max raw score per dimension from actual question data */
function computeMaxRaw(): Record<Dimension, number> {
  const maxRaw = {} as Record<Dimension, number>;
  for (const dim of DIMENSIONS) maxRaw[dim] = 0;

  for (const q of questions) {
    const maxOption = Math.max(...q.options.map((o) => o.score));
    maxRaw[q.dimension] += maxOption;
  }
  return maxRaw;
}

const DIMENSION_MAX_RAW = computeMaxRaw();

/** Max weighted score for a single dimension */
export function getDimensionMax(dimension: Dimension): number {
  return DIMENSION_MAX_RAW[dimension] * DIMENSION_WEIGHTS[dimension];
}

/** Total max weighted score across all dimensions */
function getTotalMax(): number {
  return DIMENSIONS.reduce((sum, dim) => sum + getDimensionMax(dim), 0);
}

const TOTAL_MAX = getTotalMax();

export interface ScoreResult {
  total: number;
  grade: 1 | 2 | 3 | 4 | 5;
  byDimension: Record<Dimension, number>;
}

export function calculateScore(
  rawScores: Record<Dimension, number>
): ScoreResult {
  const byDimension = {} as Record<Dimension, number>;
  let weightedSum = 0;

  for (const dim of DIMENSIONS) {
    const weighted = rawScores[dim] * DIMENSION_WEIGHTS[dim];
    byDimension[dim] = weighted;
    weightedSum += weighted;
  }

  // Normalize to 0-100
  const total = Math.round((weightedSum / TOTAL_MAX) * 100);

  return {
    total,
    grade: getGrade(total),
    byDimension,
  };
}

export function getGrade(total: number): 1 | 2 | 3 | 4 | 5 {
  if (total <= 20) return 1;
  if (total <= 40) return 2;
  if (total <= 60) return 3;
  if (total <= 80) return 4;
  return 5;
}

export function encodeDimensions(
  byDimension: Record<Dimension, number>
): string {
  return DIMENSIONS.map((d) => byDimension[d]).join(",");
}

export function decodeDimensions(
  encoded: string
): Record<Dimension, number> | null {
  const parts = encoded.split(",").map(Number);
  if (parts.length !== 6 || parts.some(isNaN)) return null;

  const result = {} as Record<Dimension, number>;
  DIMENSIONS.forEach((dim, i) => {
    result[dim] = parts[i];
  });
  return result;
}
