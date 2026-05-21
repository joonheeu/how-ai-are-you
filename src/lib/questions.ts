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

export const questions: Question[] = [
  {
    id: "q1",
    dimension: "frequency",
    text: "AI 도구를 얼마나 자주 쓰시나요?",
    options: [
      { label: "거의 안 씀", score: 0 },
      { label: "한 달에 몇 번", score: 1 },
      { label: "일주일에 한 번 정도", score: 2 },
      { label: "매일", score: 4 },
      { label: "하루에도 여러 번", score: 5 },
    ],
  },
  {
    id: "q2",
    dimension: "frequency",
    text: "마지막으로 AI 도구를 쓴 게 언제인가요?",
    options: [
      { label: "기억이 안 남", score: 0 },
      { label: "일주일도 더 됐음", score: 1 },
      { label: "이번 주에 씀", score: 3 },
      { label: "어제", score: 4 },
      { label: "오늘", score: 5 },
    ],
  },
  {
    id: "q3",
    dimension: "breadth",
    text: "AI를 어디에 쓰고 있나요?",
    options: [
      { label: "딱히 안 씀", score: 0 },
      { label: "번역이나 검색 하나 정도", score: 1 },
      { label: "여러 가지에 조금씩", score: 3 },
      { label: "하는 일 대부분에 활용 중", score: 5 },
    ],
  },
  {
    id: "q4",
    dimension: "depth",
    text: "AI로 해본 것 중 가장 고급진 건?",
    options: [
      { label: "간단한 질문 정도", score: 1 },
      { label: "글쓰기나 자료 조사에 활용", score: 2 },
      { label: "반복 사용 가능한 프롬프트나 워크플로우 구축", score: 3 },
      { label: "커스텀 GPT, 프로젝트, 시스템 프롬프트 세팅", score: 4 },
      { label: "API, 에이전트, 자동화 직접 구축", score: 5 },
    ],
  },
  {
    id: "q5",
    dimension: "depth",
    text: "프롬프트는 어떻게 쓰시나요?",
    options: [
      { label: "그냥 구글 검색하듯이 던짐", score: 1 },
      { label: "맥락을 좀 추가해서 씀", score: 2 },
      { label: "결과 보고 반복해서 다듬음", score: 3 },
      { label: "역할, 예시, 제약조건까지 구조적으로 설계", score: 5 },
    ],
  },
  {
    id: "q6",
    dimension: "toolStack",
    text: "실제로 쓰고 있는 AI 도구가 몇 개인가요?",
    options: [
      { label: "없음", score: 0 },
      { label: "1개", score: 1 },
      { label: "2~3개", score: 3 },
      { label: "4개 이상", score: 5 },
    ],
  },
  {
    id: "q7",
    dimension: "toolStack",
    text: "써본 것 중 가장 고급 도구는?",
    options: [
      { label: "이 중에 없음", score: 0 },
      { label: "ChatGPT나 Gemini (무료)", score: 1 },
      { label: "Claude, Perplexity 등 유료 도구", score: 2 },
      { label: "이미지/영상 생성 AI", score: 3 },
      { label: "Cursor, Copilot, Claude Code 같은 코딩 AI", score: 4 },
      { label: "API로 직접 뭔가 만들어 봄", score: 5 },
    ],
  },
  {
    id: "q8",
    dimension: "investment",
    text: "AI에 매달 얼마나 쓰고 있나요?",
    options: [
      { label: "0원", score: 0 },
      { label: "무료 체험만 해봄", score: 1 },
      { label: "구독 하나 정도 (2~3만원)", score: 3 },
      { label: "구독 여러 개 또는 API 사용", score: 4 },
      { label: "월 10만원 이상", score: 5 },
    ],
  },
  {
    id: "q9",
    dimension: "integration",
    text: "내일부터 AI 도구가 전부 사라지면?",
    options: [
      { label: "아무 상관없음", score: 0 },
      { label: "좀 불편하겠지만 괜찮음", score: 1 },
      { label: "눈에 띄게 느려질 듯", score: 3 },
      { label: "업무 방식을 다시 짜야 함", score: 4 },
      { label: "재앙 수준", score: 5 },
    ],
  },
  {
    id: "q10",
    dimension: "integration",
    text: "새로운 일이 생기면 제일 먼저 뭐 하시나요?",
    options: [
      { label: "구글 검색하거나 주변에 물어봄", score: 1 },
      { label: "가끔 AI한테 아이디어를 물어봄", score: 2 },
      { label: "보통 AI부터 켜봄", score: 3 },
      { label: "AI 없이 시작하는 일이 없음", score: 5 },
    ],
  },
];
