import type { DimensionMeta } from "@/lib/types";

/**
 * 6개 측정 차원 메타데이터
 *
 * 가중치 설계 근거:
 * - Depth, Integration에 1.5배 가중: 단순 빈도보다
 *   '활용의 질'과 '일상 통합도'가 실제 AI 활용 수준의
 *   더 유의미한 판별자라는 가설에 기반.
 */

export const dimensionMetas: DimensionMeta[] = [
  {
    key: "frequency",
    label: "사용 빈도",
    description: "AI를 얼마나 자주, 최근에 사용하고 있는가",
    weight: 1.0,
  },
  {
    key: "breadth",
    label: "활용 범위",
    description: "AI를 적용하는 영역이 얼마나 다양한가",
    weight: 1.0,
  },
  {
    key: "depth",
    label: "활용 깊이",
    description: "AI를 얼마나 정교하고 복잡하게 활용하는가",
    weight: 1.5,
  },
  {
    key: "toolStack",
    label: "도구 다양성",
    description: "다양한 AI 도구를 경험하고 활용하는가",
    weight: 1.0,
  },
  {
    key: "investment",
    label: "투자 수준",
    description: "AI에 시간과 비용을 얼마나 투자하는가",
    weight: 1.0,
  },
  {
    key: "integration",
    label: "업무 통합도",
    description: "AI가 일상 업무 흐름에 얼마나 깊이 통합되었는가",
    weight: 1.5,
  },
];
