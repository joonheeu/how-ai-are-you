import type { Dimension } from "./types";
import { dimensionMetas } from "@/data/dimensions";

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

/** Max raw score per dimension (sum of max option scores across questions) */
const DIMENSION_MAX_RAW: Record<Dimension, number> = {
  frequency: 10,
  breadth: 5,
  depth: 10,
  toolStack: 10,
  investment: 5,
  integration: 10,
};

export function getDimensionMax(dimension: Dimension): number {
  return DIMENSION_MAX_RAW[dimension] * DIMENSION_WEIGHTS[dimension];
}

export interface ScoreResult {
  total: number;
  grade: 1 | 2 | 3 | 4 | 5;
  byDimension: Record<Dimension, number>;
}

export function calculateScore(
  rawScores: Record<Dimension, number>
): ScoreResult {
  const byDimension = {} as Record<Dimension, number>;
  let total = 0;

  for (const dim of DIMENSIONS) {
    const weighted = rawScores[dim] * DIMENSION_WEIGHTS[dim];
    byDimension[dim] = weighted;
    total += weighted;
  }

  return {
    total: Math.round(total),
    grade: getGrade(Math.round(total)),
    byDimension,
  };
}

export function getGrade(total: number): 1 | 2 | 3 | 4 | 5 {
  if (total <= 12) return 1;
  if (total <= 24) return 2;
  if (total <= 36) return 3;
  if (total <= 48) return 4;
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
