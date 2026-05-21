# Implementation Plan: how-ai-are-you MVP (P0)

## Context

"How AI Are You?" — AI 활용도 자가진단 웹 테스트. MBTI/Spotify Wrapped 류의 바이럴 셀프진단 포맷.
사용자가 10문항에 답하면 6차원 점수를 계산해 5등급으로 분류하고, 공유 가능한 결과 페이지를 제공한다.

**Design direction**: Minimal & Clean (Stripe/Linear feel) — 흰 배경, 넉넉한 여백, 타이포 중심.
**P0 scope**: 퍼센타일 제외, 6차원 bar chart 포함, 동적 OG 이미지, 공유 URL.

---

## Phase 1: Project Setup

### 1.1 Next.js 프로젝트 초기화
- `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias`
- shadcn/ui 초기화: `npx shadcn@latest init`
- 필요한 shadcn 컴포넌트: `button`, `progress`, `card`

### 1.2 프로젝트 구조
```
src/
├── app/
│   ├── layout.tsx          # 글로벌 레이아웃 + 폰트 + 메타데이터
│   ├── page.tsx            # Landing 페이지
│   ├── quiz/
│   │   └── page.tsx        # 퀴즈 페이지 (client component)
│   ├── result/
│   │   └── page.tsx        # 결과 페이지 (searchParams로 점수 수신)
│   └── api/
│       └── og/
│           └── route.tsx   # 동적 OG 이미지 생성
├── components/
│   ├── quiz/
│   │   ├── quiz-container.tsx   # 퀴즈 상태 관리 + 전환 로직
│   │   ├── question-card.tsx    # 개별 문항 표시
│   │   └── option-button.tsx    # 선택지 버튼
│   ├── result/
│   │   ├── grade-display.tsx    # 등급명 + 점수 대형 표시
│   │   ├── dimension-chart.tsx  # 6차원 bar chart (CSS only, no lib)
│   │   ├── grade-description.tsx # 등급별 설명 + 행동 제안
│   │   └── share-buttons.tsx    # X / LinkedIn / Copy link
│   └── ui/                 # shadcn/ui 컴포넌트
├── lib/
│   ├── questions.ts        # 문항 데이터 (정적)
│   ├── scoring.ts          # 점수 계산 + 등급 매핑
│   ├── grades.ts           # 등급별 메타 (이름, 설명, 행동제안)
│   └── share.ts            # 공유 URL/텍스트 생성 유틸
└── styles/
    └── globals.css         # Tailwind base + 커스텀 스타일
```

---

## Phase 2: Data Layer

### 2.1 questions.ts — 문항 데이터
```typescript
type Dimension = 'frequency' | 'breadth' | 'depth' | 'toolStack' | 'investment' | 'integration';

type Question = {
  id: string;
  dimension: Dimension;
  text: string;
  options: { label: string; score: number }[];
};
```
- PRD의 Q1~Q10 그대로 매핑
- 각 옵션에 raw score 포함

### 2.2 scoring.ts — 점수 계산
- 차원별 raw score 합산 → 가중치 적용
- 가중치: frequency(1.0), breadth(1.0), depth(1.5), toolStack(1.0), investment(1.0), integration(1.5)
- 각 차원 최대 raw = 10 (2문항 × max 5), 가중 최대 = 10 × weight
- 총 가중합 최대 = 10×1 + 5×1 + 10×1.5 + 10×1 + 5×1 + 10×1.5 = 60
- 등급 매핑: 0-12=Lv1, 13-24=Lv2, 25-36=Lv3, 37-48=Lv4, 49-60=Lv5

### 2.3 grades.ts — 등급 메타데이터
- 5등급별: name, emoji-free description, 3 action suggestions
- 톤: 긍정적, 비하 없음, 최하 등급도 "시작할 기회"

---

## Phase 3: Quiz Flow

### 3.1 quiz-container.tsx (Client Component)
- `useState`로 현재 문항 인덱스 + 답변 배열 관리
- 옵션 클릭 → 300ms delay → 자동 다음 문항
- "Back" 버튼으로 이전 문항 복귀
- 상단 progress bar (shadcn Progress + "3 / 10" 텍스트)
- 마지막 문항 완료 → 점수 계산 → `/result?s=37&d=2,3,4,5,3,4` 로 router.push
- 애니메이션: CSS transition (slide or fade)

### 3.2 question-card.tsx
- 질문 텍스트 + 옵션 리스트
- 선택된 옵션 하이라이트 (back으로 돌아왔을 때)

### 3.3 option-button.tsx
- 호버/액티브 상태, 선택 시 체크 표시
- 클릭 후 300ms 동안 선택 상태 유지 (피드백)

---

## Phase 4: Result Page

### 4.1 URL 구조
- `/result?s=37&d=8,4,12,7,4,12` (s=총점, d=차원별 가중점수 6개 콤마구분)
- searchParams에서 파싱, 유효하지 않으면 Landing으로 리다이렉트

### 4.2 grade-display.tsx
- 등급명 대형 타이포 (예: "AI Power User")
- 총점 표시 (37 / 60)

### 4.3 dimension-chart.tsx
- 6개 가로 bar chart (CSS only — Tailwind width 비율)
- 차원명 라벨 + 점수
- 깔끔한 minimal 스타일

### 4.4 share-buttons.tsx
- X(Twitter): Web Intent URL + 사전 작성된 텍스트
- LinkedIn: share URL
- Copy link: navigator.clipboard + 토스트 피드백
- "Retake" 버튼 → `/quiz`

### 4.5 동적 메타데이터
- `generateMetadata`에서 searchParams 파싱 → OG title/description 동적 생성
- OG image URL: `/api/og?score=37&grade=4`

---

## Phase 5: OG Image

### 5.1 /api/og/route.tsx
- `@vercel/og` (next/og) 사용
- 등급명 + 점수 + 6차원 미니 bar를 포함한 1200×630 이미지
- Minimal 디자인: 흰 배경, 깔끔한 타이포
- Edge runtime

---

## Phase 6: Landing Page

### 6.1 page.tsx
- "How AI Are You?" 타이틀 (대형 타이포)
- 서브카피: "10 questions. 2 minutes. Find out where you stand on the AI adoption curve."
- CTA 버튼: "Take the Test" → `/quiz`
- 심플한 히어로 레이아웃, 일러스트레이션 없이 타이포만으로

---

## Implementation Order

| Step | Task | Files |
|------|------|-------|
| 1 | Next.js + Tailwind + shadcn 초기화 | project root |
| 2 | 데이터 레이어 (questions, scoring, grades, share) | `src/lib/*` |
| 3 | Landing 페이지 | `src/app/page.tsx` |
| 4 | 퀴즈 컴포넌트 + 페이지 | `src/components/quiz/*`, `src/app/quiz/page.tsx` |
| 5 | 결과 컴포넌트 + 페이지 | `src/components/result/*`, `src/app/result/page.tsx` |
| 6 | OG 이미지 API | `src/app/api/og/route.tsx` |
| 7 | 메타데이터 + favicon + 최종 스타일 | `layout.tsx`, `globals.css` |

---

## Verification

1. `pnpm dev` → Landing 페이지 정상 렌더링
2. "Take the Test" → 10문항 순서대로 표시, 옵션 클릭 시 자동 진행
3. Back 버튼으로 이전 문항 복귀 + 이전 답변 유지
4. 마지막 문항 완료 → 결과 페이지 리다이렉트
5. 결과 페이지: 등급명, 점수, 6차원 bar chart 표시
6. 결과 URL 복사 후 새 탭에서 열기 → 동일 결과 표시
7. 공유 버튼 동작 확인 (X/LinkedIn 새 창, Copy link 클립보드)
8. `/api/og?score=37&grade=4` → OG 이미지 정상 생성
9. `pnpm build` 성공, Lighthouse Performance 95+
10. 모바일 뷰포트에서 레이아웃 정상
