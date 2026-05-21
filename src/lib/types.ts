export type Dimension =
  | "frequency"
  | "breadth"
  | "depth"
  | "toolStack"
  | "investment"
  | "integration";

export interface Option {
  label: string;
  score: number;
}

export interface Question {
  id: string;
  dimension: Dimension;
  text: string;
  options: Option[];
}

export interface DimensionMeta {
  key: Dimension;
  label: string;
  description: string;
  weight: number;
}
