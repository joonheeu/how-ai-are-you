export interface GradeInfo {
  level: 1 | 2 | 3 | 4 | 5;
  name: string;
  slug: string;
  description: string;
  suggestions: [string, string, string];
}

export const grades: Record<1 | 2 | 3 | 4 | 5, GradeInfo> = {
  1: {
    level: 1,
    name: "AI 구경꾼",
    slug: "ai-curious",
    description:
      "AI라는 게 있다는 건 아는데, 아직 직접 써본 건 거의 없는 단계예요. 전혀 늦지 않았습니다. 지금이 시작하기 딱 좋은 타이밍이에요.",
    suggestions: [
      "평소 구글에 검색하던 질문 하나를 ChatGPT나 Claude에 물어보세요",
      "관심 분야의 AI 도구 데모 영상을 5분만 봐보세요",
      "주변에 AI 잘 쓰는 사람한테 제일 좋아하는 기능 하나만 보여달라고 해보세요",
    ],
  },
  2: {
    level: 2,
    name: "AI 초보 탐험가",
    slug: "ai-dabbler",
    description:
      "몇 번 써보고 '오 신기하네' 하는 단계. AI가 쓸모있다는 건 알지만 아직 습관이 되진 않았어요. 이것저것 실험해보는 재미있는 시기입니다.",
    suggestions: [
      "이번 주에 반복되는 업무 하나를 AI로 해보세요",
      "지금 쓰는 도구 말고 다른 AI 도구를 하나 더 탐색해보세요",
      "프롬프트 잘 쓰는 법에 대해 10분만 공부해보세요",
    ],
  },
  3: {
    level: 3,
    name: "AI 일상러",
    slug: "ai-regular",
    description:
      "AI가 슬슬 일상에 스며든 상태. 실제 업무에 쓰고 있고, AI가 잘하는 것과 못하는 것을 구분할 줄 알아요. AI 활용의 주류에 합류한 셈입니다.",
    suggestions: [
      "자주 쓰는 작업용 프롬프트 템플릿을 하나 만들어보세요",
      "아직 안 써본 분야(코딩, 디자인, 데이터)에서 AI를 시도해보세요",
      "동료에게 유용한 AI 워크플로우를 하나 공유해보세요",
    ],
  },
  4: {
    level: 4,
    name: "AI 파워유저",
    slug: "ai-power-user",
    description:
      "단순 사용을 넘어서 AI가 생각하고 일하는 방식의 일부가 된 상태. 모델마다 특성을 알고 상황에 맞게 골라 쓸 줄 아는 수준입니다.",
    suggestions: [
      "API 접근이나 간단한 자동화를 실험해보세요",
      "여러 AI 도구를 연결한 멀티스텝 워크플로우를 만들어보세요",
      "AI 입문자에게 멘토링을 해보세요 — 가르치면서 더 배웁니다",
    ],
  },
  5: {
    level: 5,
    name: "AI 네이티브",
    slug: "ai-native",
    description:
      "AI가 도구가 아니라 인프라인 사람. AI로 만들고, AI로 생각하고, AI 없으면 좀 불안한 수준. 최전선에서 AI 활용 방식을 만들어가고 있는 사람입니다.",
    suggestions: [
      "AI 기반 도구나 워크플로우를 만들어서 공개해보세요",
      "글, 강의, 오픈소스로 AI 커뮤니티에 기여해보세요",
      "새로 나오는 모델과 패러다임을 계속 실험하며 감을 유지하세요",
    ],
  },
};
