import type { Question } from "@/lib/types";

/**
 * AI 활용도 진단 문항 (v2)
 *
 * 설계 원칙:
 * - 자기 평가("잘 쓰나요?")가 아닌, 구체적 행동/사실 기반 문항
 * - 응답자가 기억을 더듬어 객관적으로 답할 수 있는 구조
 * - 모든 문항 5개 선택지, 점수 0~5 범위
 * - 6개 차원(Frequency, Breadth, Depth, Tool Stack, Investment, Integration)을 측정
 *
 * 차원별 가중치: Depth(×1.5), Integration(×1.5), 나머지(×1.0)
 * 총점 범위: 0~60점
 */

export const questions: Question[] = [
  // ── Frequency (사용 빈도) ──────────────────────
  {
    id: "q1",
    dimension: "frequency",
    text: "지난 한 주 동안 AI에게 질문하거나 작업을 맡긴 횟수는?",
    options: [
      { label: "0회 — 쓸 일이 없었어요", score: 0 },
      { label: "1~2회 — 한두 번 써봤어요", score: 1 },
      { label: "3~5회 — 종종 썼어요", score: 2 },
      { label: "6~10회 — 꽤 자주 썼어요", score: 4 },
      { label: "11회 이상 — 거의 매일 여러 번", score: 5 },
    ],
  },
  {
    id: "q2",
    dimension: "frequency",
    text: "오늘 또는 어제 AI를 쓴 적이 있나요?",
    options: [
      { label: "최근 한 달 안에 쓴 기억이 없어요", score: 0 },
      { label: "이번 달에 한두 번 썼어요", score: 1 },
      { label: "이번 주에 쓴 적 있어요", score: 3 },
      { label: "어제 썼어요", score: 4 },
      { label: "오늘 이미 썼어요", score: 5 },
    ],
  },

  // ── Breadth (활용 범위) ────────────────────────
  {
    id: "q3",
    dimension: "breadth",
    text: "지난 한 달간 AI를 활용한 영역을 모두 떠올려 보세요.",
    options: [
      { label: "써본 적이 없어요", score: 0 },
      { label: "1가지 — 예: 검색, 번역, 요약 중 하나", score: 1 },
      { label: "2~3가지 — 예: 글쓰기 + 정보 검색", score: 2 },
      { label: "4~5가지 — 업무 여러 곳에서 활용", score: 4 },
      { label: "6가지 이상 — 거의 모든 작업에 활용", score: 5 },
    ],
  },

  // ── Depth (활용 깊이) ──────────────────────────
  {
    id: "q4",
    dimension: "depth",
    text: "AI를 사용할 때, 실제로 해본 것 중 가장 복잡한 것은?",
    options: [
      { label: "단순 질문 — \"이게 뭐야?\", \"번역해줘\"", score: 1 },
      { label: "작업 요청 — 이메일 초안, 요약, 자료 정리", score: 2 },
      { label: "반복 활용 — 자주 쓰는 질문 형식을 저장해 둠", score: 3 },
      { label: "맞춤 설정 — 나만의 AI 설정이나 지침을 만들어 봄", score: 4 },
      { label: "직접 개발 — AI를 연동한 프로그램이나 자동화 구축", score: 5 },
    ],
  },
  {
    id: "q5",
    dimension: "depth",
    text: "AI에게 원하는 답을 얻기 위해 어떤 노력을 하시나요?",
    options: [
      { label: "생각나는 대로 바로 입력해요", score: 1 },
      { label: "배경 상황을 한두 줄 추가해요", score: 2 },
      { label: "답이 아쉬우면 질문을 바꿔서 다시 물어봐요", score: 3 },
      { label: "원하는 형식, 길이, 톤을 구체적으로 지정해요", score: 4 },
      { label: "역할 부여, 예시 제공, 단계별 지시까지 설계해요", score: 5 },
    ],
  },

  // ── Tool Stack (도구 다양성) ───────────────────
  {
    id: "q6",
    dimension: "toolStack",
    text: "현재 한 달에 1회 이상 쓰는 AI 서비스가 몇 개인가요?",
    options: [
      { label: "0개 — 쓰고 있는 게 없어요", score: 0 },
      { label: "1개 — 하나만 쓰고 있어요", score: 1 },
      { label: "2개", score: 2 },
      { label: "3개", score: 4 },
      { label: "4개 이상", score: 5 },
    ],
  },
  {
    id: "q7",
    dimension: "toolStack",
    text: "아래 중 직접 써본 경험이 있는 것을 골라 주세요.",
    options: [
      { label: "아직 써본 게 없어요", score: 0 },
      { label: "무료 챗봇 (ChatGPT 무료, Gemini 등)", score: 1 },
      { label: "유료 AI 구독 (ChatGPT Plus, Claude Pro 등)", score: 2 },
      { label: "특화 AI (이미지 생성, 음악 생성, 영상 편집 등)", score: 3 },
      { label: "개발용 AI (코딩 도구, API 활용, 자동화 연동)", score: 5 },
    ],
  },

  // ── Investment (투자 수준) ─────────────────────
  {
    id: "q8",
    dimension: "investment",
    text: "AI 관련 서비스에 매달 지출하는 금액은?",
    options: [
      { label: "0원 — 무료만 써요", score: 0 },
      { label: "무료 체험만 해봤어요", score: 1 },
      { label: "월 1~3만원 (구독 1개 수준)", score: 3 },
      { label: "월 3~10만원 (구독 여러 개)", score: 4 },
      { label: "월 10만원 이상", score: 5 },
    ],
  },

  // ── Integration (워크플로우 통합) ──────────────
  {
    id: "q9",
    dimension: "integration",
    text: "만약 지금 쓰는 AI가 전부 사라진다면, 업무에 어떤 영향이 있을까요?",
    options: [
      { label: "아무런 영향 없어요", score: 0 },
      { label: "약간 불편하지만 금방 적응할 수 있어요", score: 1 },
      { label: "업무 속도가 눈에 띄게 느려질 거예요", score: 3 },
      { label: "일하는 방식 자체를 다시 짜야 해요", score: 4 },
      { label: "업무 대부분이 마비될 거예요", score: 5 },
    ],
  },
  {
    id: "q10",
    dimension: "integration",
    text: "처음 보는 업무나 과제를 받았을 때, 첫 번째 행동은?",
    options: [
      { label: "검색 엔진에서 찾아보거나 주변에 물어봐요", score: 0 },
      { label: "보통은 직접 하고, 막히면 AI에 물어봐요", score: 1 },
      { label: "절반은 AI를 먼저 활용해요", score: 3 },
      { label: "대부분 AI에게 먼저 물어보고 시작해요", score: 4 },
      { label: "AI 없이 시작하는 일이 거의 없어요", score: 5 },
    ],
  },
];
