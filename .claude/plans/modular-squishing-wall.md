# Plan: 30문항 확장 + 100점 만점 + 섹션 구분

## Context

10문항 → 30문항으로 확장하여 차원별 5문항씩 균등 배분. 점수 체계를 60점 → 100점 만점으로 변경하고, 차원별 섹션 헤더를 퀴즈 UI에 추가.

## 변경 파일

### 1. `src/data/questions.ts` — 30문항 작성
- 6차원 × 5문항 = 30문항
- 차원별로 그룹화하여 순서 배치 (섹션 UI와 연동)
- 각 문항 5개 옵션, score 0~5
- 행동 기반 + 쉬운 문구 유지

### 2. `src/lib/scoring.ts` — 100점 만점 정규화
- `DIMENSION_MAX_RAW`를 문항 데이터에서 동적 계산
- 총점을 0~100으로 정규화: `(weightedSum / maxWeightedSum) × 100`
- 등급 구간 변경: 0-20 / 21-40 / 41-60 / 61-80 / 81-100
- `getDimensionMax()`도 동적 계산

### 3. `src/components/quiz/quiz-container.tsx` — 섹션 헤더 추가
- 문항 index로 현재 차원을 판별
- 새 차원 시작 시 섹션 전환 표시: "사용 빈도 (1/6)"
- progress bar는 30 기준으로 동작

### 4. `src/app/page.tsx` — 랜딩 카피 변경
- "10개 질문. 2분이면 끝." → "30개 질문. 5분이면 끝."

### 5. `src/components/result/methodology.tsx` — 방법론 업데이트
- "10개 문항" → "30개 문항", "60점" → "100점" 반영

### 6. `src/app/api/og/route.tsx` — OG 이미지 점수 표기 변경
- "37 / 60" → "62 / 100"

### 7. `src/components/result/grade-display.tsx` — 만점 표기 변경
- "/ 60" → "/ 100"

## 점수 설계

```
차원별 max raw = 5문항 × 5점 = 25
가중합 max = 25×1.0 + 25×1.0 + 25×1.5 + 25×1.0 + 25×1.0 + 25×1.5 = 175
정규화: total = (가중합 / 175) × 100
등급: 0-20=Lv1, 21-40=Lv2, 41-60=Lv3, 61-80=Lv4, 81-100=Lv5
```

### 8. `src/components/result/radar-chart.tsx` — 레이더(방사형) 차트 추가
- SVG 기반 6각형 레이더 차트 (외부 라이브러리 없이 순수 SVG)
- 6개 차원을 꼭짓점으로, 점수 비율로 면적 표시
- bar chart보다 6차원 균형을 한눈에 파악 가능

### 9. `src/components/result/result-tabs.tsx` — 뷰 전환 탭
- "차트" / "상세" 두 개 탭으로 전환
- 차트 탭: 레이더 차트 + 등급 설명
- 상세 탭: 기존 bar chart (차원별 점수 + 설명)
- 기본 뷰: 차트 탭

## Verification
- `pnpm build` 성공
- 퀴즈 30문항 전체 진행 → 결과 페이지 정상 표시
- 섹션 전환 시 헤더 표시 확인
- 점수 /100 + 등급 매핑 정확성
- OG 이미지 /100 표기
