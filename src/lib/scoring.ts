import type { Dimension } from "./questions";

export const DIMENSION_WEIGHTS: Record<Dimension, number> = {
  frequency: 1.0,
  breadth: 1.0,
  depth: 1.5,
  toolStack: 1.0,
  investment: 1.0,
  integration: 1.5,
};

export const DIMENSION_LABELS: Record<Dimension, string> = {
  frequency: "사용 빈도",
  breadth: "활용 범위",
  depth: "활용 깊이",
  toolStack: "도구 다양성",
  investment: "투자 수준",
  integration: "워크플로우 통합",
};

export const DIMENSIONS: Dimension[] = [
  "frequency",
  "breadth",
  "depth",
  "toolStack",
  "investment",
  "integration",
];

/** Max raw score per dimension (sum of max option scores across questions) */
const DIMENSION_MAX_RAW: Record<Dimension, number> = {
  frequency: 10, // Q1(5) + Q2(5)
  breadth: 5, // Q3(5)
  depth: 10, // Q4(5) + Q5(5)
  toolStack: 10, // Q6(5) + Q7(5)
  investment: 5, // Q8(5)
  integration: 10, // Q9(5) + Q10(5)
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

/** Encode dimension scores as comma-separated string for URL */
export function encodeDimensions(byDimension: Record<Dimension, number>): string {
  return DIMENSIONS.map((d) => byDimension[d]).join(",");
}

/** Decode dimension scores from comma-separated string */
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
