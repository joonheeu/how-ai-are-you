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
    text: "ChatGPT 같은 AI를 얼마나 자주 쓰세요?",
    options: [
      { label: "거의 안 써봤어요", score: 0 },
      { label: "한 달에 몇 번 정도", score: 1 },
      { label: "일주일에 한 번쯤", score: 2 },
      { label: "거의 매일 써요", score: 4 },
      { label: "하루에도 여러 번!", score: 5 },
    ],
  },
  {
    id: "q2",
    dimension: "frequency",
    text: "마지막으로 AI를 쓴 게 언제예요?",
    options: [
      { label: "기억이 안 나요", score: 0 },
      { label: "일주일도 넘은 것 같아요", score: 1 },
      { label: "이번 주에 썼어요", score: 3 },
      { label: "어제요", score: 4 },
      { label: "오늘이요", score: 5 },
    ],
  },
  {
    id: "q3",
    dimension: "breadth",
    text: "AI를 주로 어디에 쓰고 있나요?",
    options: [
      { label: "딱히 쓸 일이 없어요", score: 0 },
      { label: "번역이나 검색 하나 정도", score: 1 },
      { label: "두세 가지 용도로 쓰고 있어요", score: 2 },
      { label: "이것저것 다양하게 활용해요", score: 4 },
      { label: "하는 일 대부분에 쓰고 있어요", score: 5 },
    ],
  },
  {
    id: "q4",
    dimension: "depth",
    text: "AI로 해본 것 중 가장 어려운 건?",
    options: [
      { label: "궁금한 거 물어보기", score: 1 },
      { label: "글쓰기나 자료 찾기", score: 2 },
      { label: "자주 쓰는 질문 틀을 만들어 둠", score: 3 },
      { label: "나만의 AI 설정을 커스텀해 봄", score: 4 },
      { label: "AI를 활용한 프로그램을 직접 만들어 봄", score: 5 },
    ],
  },
  {
    id: "q5",
    dimension: "depth",
    text: "AI한테 질문할 때, 어떻게 하세요?",
    options: [
      { label: "그냥 궁금한 걸 바로 물어봐요", score: 1 },
      { label: "배경 설명을 좀 붙여서 물어봐요", score: 2 },
      { label: "답이 맘에 안 들면 다시 물어봐요", score: 3 },
      { label: "상황과 조건을 꼼꼼히 정리해서 물어봐요", score: 4 },
      { label: "역할, 예시, 조건까지 세세하게 짜서 물어봐요", score: 5 },
    ],
  },
  {
    id: "q6",
    dimension: "toolStack",
    text: "지금 쓰고 있는 AI 서비스가 몇 개예요?",
    options: [
      { label: "하나도 없어요", score: 0 },
      { label: "1개", score: 1 },
      { label: "2개", score: 2 },
      { label: "3개", score: 4 },
      { label: "4개 이상", score: 5 },
    ],
  },
  {
    id: "q7",
    dimension: "toolStack",
    text: "아래 중 써본 것 중 가장 고급인 건?",
    options: [
      { label: "써본 게 없어요", score: 0 },
      { label: "ChatGPT, Gemini 같은 무료 AI", score: 1 },
      { label: "Claude, Perplexity 같은 유료 AI", score: 2 },
      { label: "AI로 이미지나 영상 만들기", score: 3 },
      { label: "AI 코딩 도구 사용 또는 직접 개발", score: 5 },
    ],
  },
  {
    id: "q8",
    dimension: "investment",
    text: "AI에 매달 돈을 쓰고 있나요?",
    options: [
      { label: "한 푼도 안 써요", score: 0 },
      { label: "무료 체험만 해봤어요", score: 1 },
      { label: "하나 구독 중 (2~3만원쯤)", score: 3 },
      { label: "여러 개 구독하고 있어요", score: 4 },
      { label: "월 10만원 이상 쓰고 있어요", score: 5 },
    ],
  },
  {
    id: "q9",
    dimension: "integration",
    text: "만약 내일부터 AI가 전부 사라진다면?",
    options: [
      { label: "아무 상관없어요", score: 0 },
      { label: "좀 불편하겠지만 괜찮아요", score: 1 },
      { label: "확실히 일이 느려질 거예요", score: 3 },
      { label: "일하는 방식을 완전히 바꿔야 해요", score: 4 },
      { label: "상상만 해도 끔찍해요", score: 5 },
    ],
  },
  {
    id: "q10",
    dimension: "integration",
    text: "새로운 일을 시작할 때, 제일 먼저?",
    options: [
      { label: "검색하거나 주변에 물어봐요", score: 0 },
      { label: "가끔 AI한테 물어볼 때도 있어요", score: 1 },
      { label: "반반이에요, 상황에 따라 달라요", score: 3 },
      { label: "보통 AI부터 열어봐요", score: 4 },
      { label: "AI 없이 시작하는 일이 없어요", score: 5 },
    ],
  },
];
