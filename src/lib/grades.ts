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
      "AI가 뭔지는 아는데, 아직 직접 써본 건 거의 없는 단계예요. 전혀 늦지 않았어요! 지금이 시작하기 딱 좋은 타이밍입니다.",
    suggestions: [
      "평소 검색하던 궁금증 하나를 ChatGPT에 물어보세요",
      "\"AI 이렇게 쓰면 편하다\" 같은 짧은 영상을 하나 찾아보세요",
      "AI 잘 쓰는 친구한테 재밌는 기능 하나만 보여달라고 해보세요",
    ],
  },
  2: {
    level: 2,
    name: "AI 초보 탐험가",
    slug: "ai-dabbler",
    description:
      "몇 번 써보고 '오 신기하네!' 하는 단계예요. AI가 도움이 된다는 건 알지만 아직 습관은 안 됐어요. 재밌는 실험기라고 할 수 있죠.",
    suggestions: [
      "이번 주에 반복하는 일 하나를 AI로 해보세요",
      "지금 쓰는 AI 말고 다른 거 하나를 더 써보세요",
      "AI한테 질문 잘 하는 법을 10분만 찾아보세요",
    ],
  },
  3: {
    level: 3,
    name: "AI 일상러",
    slug: "ai-regular",
    description:
      "AI가 슬슬 생활에 스며든 상태예요. 실제로 일할 때 쓰고 있고, AI가 잘하는 것과 못하는 것도 어느 정도 감이 와요. AI 활용의 주류에 합류했습니다!",
    suggestions: [
      "자주 쓰는 질문을 저장해두고 재활용해 보세요",
      "아직 안 써본 분야에서 AI를 한번 시도해 보세요",
      "동료한테 \"나 이렇게 쓰는데\" 하고 공유해 보세요",
    ],
  },
  4: {
    level: 4,
    name: "AI 파워유저",
    slug: "ai-power-user",
    description:
      "단순히 쓰는 걸 넘어서, AI가 생각하고 일하는 방식의 일부가 된 상태예요. AI마다 특징을 알고 상황에 맞게 골라 쓸 줄 아는 수준입니다.",
    suggestions: [
      "AI를 연결해서 자동으로 일이 돌아가게 만들어 보세요",
      "여러 AI를 조합한 나만의 작업 흐름을 설계해 보세요",
      "AI 처음 쓰는 사람한테 알려주세요 — 가르치면서 더 배워요",
    ],
  },
  5: {
    level: 5,
    name: "AI 네이티브",
    slug: "ai-native",
    description:
      "AI가 도구가 아니라 공기 같은 존재. AI로 만들고, AI로 생각하고, AI 없으면 좀 허전한 수준이에요. 최전선에서 AI 활용법을 만들어가는 사람입니다.",
    suggestions: [
      "AI 활용한 도구나 꿀팁을 만들어서 공개해 보세요",
      "글, 영상, 커뮤니티 활동으로 다른 사람들과 나눠 보세요",
      "새로 나오는 AI 서비스를 계속 실험하며 감각을 유지하세요",
    ],
  },
};
