import type { Question } from "@/lib/types";

/**
 * AI 활용도 진단 문항 (v3 — 30문항)
 *
 * 설계 원칙:
 * - 6차원 × 5문항 = 30문항, 차원별 그룹 순서 배치
 * - 행동/사실 기반 문항 (자기 평가 최소화)
 * - 초보자도 이해할 수 있는 쉬운 문구
 * - 모든 문항 5개 선택지, score 0~5
 *
 * 차원별 가중치: Depth(×1.5), Integration(×1.5), 나머지(×1.0)
 * 총점: 0~100으로 정규화
 */

export const questions: Question[] = [
  // ═══════════════════════════════════════════════
  // Section 1: 사용 빈도 (Frequency)
  // ═══════════════════════════════════════════════
  {
    id: "f1",
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
    id: "f2",
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
  {
    id: "f3",
    dimension: "frequency",
    text: "지난 주말(토·일)에 AI를 쓴 적이 있나요?",
    options: [
      { label: "주말에는 AI를 쓸 일이 없어요", score: 0 },
      { label: "가끔 주말에도 써요", score: 1 },
      { label: "주말에도 종종 써요", score: 3 },
      { label: "주말에도 거의 매번 써요", score: 4 },
      { label: "주말이든 평일이든 항상 써요", score: 5 },
    ],
  },
  {
    id: "f4",
    dimension: "frequency",
    text: "AI를 안 쓰고 하루를 보낸 적이 최근에 있나요?",
    options: [
      { label: "매일 안 써요 — 쓸 일이 없으니까", score: 0 },
      { label: "대부분의 날은 안 써요", score: 1 },
      { label: "며칠에 한 번은 안 쓰는 날이 있어요", score: 3 },
      { label: "안 쓰는 날이 드물어요", score: 4 },
      { label: "기억이 안 나요, 매일 쓰니까", score: 5 },
    ],
  },
  {
    id: "f5",
    dimension: "frequency",
    text: "하루 중 AI를 가장 많이 쓰는 시간대는?",
    options: [
      { label: "AI를 쓰는 시간대가 딱히 없어요", score: 0 },
      { label: "필요할 때 가끔 — 정해진 시간은 없어요", score: 1 },
      { label: "업무 시간 중 특정 상황에서 씀", score: 3 },
      { label: "업무 시간 내내 수시로 씀", score: 4 },
      { label: "아침부터 밤까지 수시로 씀", score: 5 },
    ],
  },

  // ═══════════════════════════════════════════════
  // Section 2: 활용 범위 (Breadth)
  // ═══════════════════════════════════════════════
  {
    id: "b1",
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
  {
    id: "b2",
    dimension: "breadth",
    text: "AI를 개인 생활(업무 외)에서도 쓰고 있나요?",
    options: [
      { label: "개인 생활에서는 안 써요", score: 0 },
      { label: "가끔 궁금한 것 물어볼 때만", score: 1 },
      { label: "요리, 여행, 취미 등에 가끔 활용", score: 2 },
      { label: "쇼핑, 건강, 학습 등 여러 분야에서 활용", score: 4 },
      { label: "일상 전반에서 늘 쓰고 있어요", score: 5 },
    ],
  },
  {
    id: "b3",
    dimension: "breadth",
    text: "AI로 글을 쓰거나 편집해 본 적이 있나요?",
    options: [
      { label: "해본 적 없어요", score: 0 },
      { label: "간단한 문장 수정 정도", score: 1 },
      { label: "이메일이나 메시지 초안 작성", score: 2 },
      { label: "보고서, 블로그, 기획서 작성에 활용", score: 4 },
      { label: "거의 모든 글쓰기에 AI를 활용해요", score: 5 },
    ],
  },
  {
    id: "b4",
    dimension: "breadth",
    text: "AI로 이미지, 영상, 음악 등을 만들어 본 적이 있나요?",
    options: [
      { label: "해본 적 없어요", score: 0 },
      { label: "한두 번 재미로 해봤어요", score: 1 },
      { label: "가끔 필요할 때 만들어요", score: 2 },
      { label: "업무나 프로젝트에서 정기적으로 활용", score: 4 },
      { label: "콘텐츠 제작의 핵심 도구로 쓰고 있어요", score: 5 },
    ],
  },
  {
    id: "b5",
    dimension: "breadth",
    text: "AI를 데이터 분석이나 숫자 관련 작업에 써본 적이 있나요?",
    options: [
      { label: "해본 적 없어요", score: 0 },
      { label: "간단한 계산이나 변환 정도", score: 1 },
      { label: "표나 데이터 정리에 활용", score: 2 },
      { label: "차트 만들기, 트렌드 분석에 활용", score: 4 },
      { label: "복잡한 데이터 분석의 핵심 도구로 사용", score: 5 },
    ],
  },

  // ═══════════════════════════════════════════════
  // Section 3: 활용 깊이 (Depth)
  // ═══════════════════════════════════════════════
  {
    id: "d1",
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
    id: "d2",
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
  {
    id: "d3",
    dimension: "depth",
    text: "AI의 답변이 틀렸을 때 어떻게 하시나요?",
    options: [
      { label: "그냥 포기하거나 다른 방법을 찾아요", score: 0 },
      { label: "\"다시 해줘\"라고 한 번 더 물어봐요", score: 1 },
      { label: "어디가 틀렸는지 짚어주고 수정을 요청해요", score: 3 },
      { label: "추가 정보를 주거나 질문 방식을 바꿔서 유도해요", score: 4 },
      { label: "대화 흐름 전체를 조정해서 원하는 방향으로 이끌어요", score: 5 },
    ],
  },
  {
    id: "d4",
    dimension: "depth",
    text: "AI에게 한 번에 여러 단계의 작업을 시켜본 적이 있나요?",
    options: [
      { label: "한 번에 하나만 물어봐요", score: 0 },
      { label: "가끔 두 가지를 한꺼번에 부탁해요", score: 1 },
      { label: "여러 단계를 순서대로 요청해 본 적 있어요", score: 3 },
      { label: "복잡한 작업을 단계별로 나눠서 시켜요", score: 4 },
      { label: "전체 작업 흐름을 설계해서 AI에게 맡겨요", score: 5 },
    ],
  },
  {
    id: "d5",
    dimension: "depth",
    text: "AI에게 준 지시를 저장해두고 재활용하고 있나요?",
    options: [
      { label: "저장한 적 없어요", score: 0 },
      { label: "가끔 좋은 질문을 기억해두려고 해요", score: 1 },
      { label: "자주 쓰는 질문을 메모해두고 있어요", score: 3 },
      { label: "나만의 질문 템플릿 모음이 있어요", score: 4 },
      { label: "체계적으로 관리하며 상황별로 꺼내 써요", score: 5 },
    ],
  },

  // ═══════════════════════════════════════════════
  // Section 4: 도구 다양성 (Tool Stack)
  // ═══════════════════════════════════════════════
  {
    id: "t1",
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
    id: "t2",
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
  {
    id: "t3",
    dimension: "toolStack",
    text: "새로운 AI 서비스가 나오면 어떻게 하시나요?",
    options: [
      { label: "잘 모르겠어요, 관심이 없어요", score: 0 },
      { label: "뉴스나 SNS에서 보면 \"이런 게 있구나\" 정도", score: 1 },
      { label: "관심 가는 건 한번 써봐요", score: 2 },
      { label: "자주 새로운 도구를 테스트해요", score: 4 },
      { label: "나오자마자 바로 써보고 비교 분석해요", score: 5 },
    ],
  },
  {
    id: "t4",
    dimension: "toolStack",
    text: "AI를 업무용 도구(문서, 캘린더, 이메일 등)와 연결해서 써본 적이 있나요?",
    options: [
      { label: "해본 적 없어요", score: 0 },
      { label: "그런 게 되는지 몰랐어요", score: 0 },
      { label: "한두 번 시도해 봤어요", score: 2 },
      { label: "몇 가지 연결해서 쓰고 있어요", score: 4 },
      { label: "주요 업무 도구 대부분에 AI가 연결되어 있어요", score: 5 },
    ],
  },
  {
    id: "t5",
    dimension: "toolStack",
    text: "같은 작업을 위해 여러 AI를 비교해서 써본 적이 있나요?",
    options: [
      { label: "하나만 쓰거나, 비교할 생각을 못 했어요", score: 0 },
      { label: "한두 번 비교해 본 적 있어요", score: 1 },
      { label: "가끔 비교해서 더 나은 쪽을 골라요", score: 2 },
      { label: "작업에 따라 다른 AI를 골라 써요", score: 4 },
      { label: "각 AI의 강점을 파악해서 상황별로 나눠 써요", score: 5 },
    ],
  },

  // ═══════════════════════════════════════════════
  // Section 5: 투자 수준 (Investment)
  // ═══════════════════════════════════════════════
  {
    id: "i1",
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
  {
    id: "i2",
    dimension: "investment",
    text: "AI 사용법을 배우기 위해 시간을 따로 투자한 적이 있나요?",
    options: [
      { label: "따로 배운 적 없어요", score: 0 },
      { label: "관련 영상이나 글을 가끔 봐요", score: 1 },
      { label: "활용법 강의나 가이드를 찾아본 적 있어요", score: 2 },
      { label: "정기적으로 AI 관련 콘텐츠를 소비해요", score: 4 },
      { label: "유료 강의, 커뮤니티 등에 적극 참여해요", score: 5 },
    ],
  },
  {
    id: "i3",
    dimension: "investment",
    text: "AI 관련 뉴스나 업데이트를 얼마나 자주 접하시나요?",
    options: [
      { label: "거의 관심이 없어요", score: 0 },
      { label: "가끔 우연히 접해요", score: 1 },
      { label: "주 1~2회 정도 찾아봐요", score: 2 },
      { label: "거의 매일 확인해요", score: 4 },
      { label: "뉴스레터, 커뮤니티 등 여러 채널로 팔로업해요", score: 5 },
    ],
  },
  {
    id: "i4",
    dimension: "investment",
    text: "AI 유료 구독을 해지한 경험이 있나요?",
    options: [
      { label: "유료 구독 자체를 해본 적 없어요", score: 0 },
      { label: "구독했다가 바로 해지했어요", score: 1 },
      { label: "한동안 쓰다가 해지했어요", score: 2 },
      { label: "해지 없이 계속 유지 중이에요", score: 4 },
      { label: "구독을 늘리고 있어요 (업그레이드 또는 추가)", score: 5 },
    ],
  },
  {
    id: "i5",
    dimension: "investment",
    text: "주변 사람에게 AI 서비스를 추천해 본 적이 있나요?",
    options: [
      { label: "추천할 만큼 쓰지 않아요", score: 0 },
      { label: "한두 번 가볍게 얘기한 적 있어요", score: 1 },
      { label: "좋은 도구를 알려준 적 있어요", score: 2 },
      { label: "자주 추천하고, 사용법도 알려줘요", score: 4 },
      { label: "팀이나 조직에 도입을 주도한 적 있어요", score: 5 },
    ],
  },

  // ═══════════════════════════════════════════════
  // Section 6: 업무 통합도 (Integration)
  // ═══════════════════════════════════════════════
  {
    id: "g1",
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
    id: "g2",
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
  {
    id: "g3",
    dimension: "integration",
    text: "AI를 팀이나 동료와 함께 활용하고 있나요?",
    options: [
      { label: "혼자서도 안 쓰고, 팀에서도 안 써요", score: 0 },
      { label: "저만 가끔 써요", score: 1 },
      { label: "팀원 몇 명이 각자 쓰고 있어요", score: 2 },
      { label: "팀에서 공유하며 함께 활용해요", score: 4 },
      { label: "팀의 공식 업무 프로세스에 AI가 포함되어 있어요", score: 5 },
    ],
  },
  {
    id: "g4",
    dimension: "integration",
    text: "이메일이나 메시지를 쓸 때 AI의 도움을 받나요?",
    options: [
      { label: "직접 다 써요", score: 0 },
      { label: "가끔 맞춤법 확인에 써요", score: 1 },
      { label: "중요한 메일은 AI에게 초안이나 수정을 부탁해요", score: 3 },
      { label: "대부분의 업무 커뮤니케이션에 AI를 활용해요", score: 4 },
      { label: "AI 없이 메일 쓰는 게 오히려 어색해요", score: 5 },
    ],
  },
  {
    id: "g5",
    dimension: "integration",
    text: "하루 업무를 끝낼 때, AI가 얼마나 관여했나요?",
    options: [
      { label: "AI와 상관없이 일했어요", score: 0 },
      { label: "하나쯤 AI에게 도움을 받은 것 같아요", score: 1 },
      { label: "몇 가지 작업에서 AI가 도와줬어요", score: 3 },
      { label: "오늘 한 일의 절반 이상에 AI가 관여했어요", score: 4 },
      { label: "AI 없이 완료한 업무가 거의 없어요", score: 5 },
    ],
  },
];
