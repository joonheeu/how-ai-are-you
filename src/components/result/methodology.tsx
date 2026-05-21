export function Methodology() {
  return (
    <div className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3">
      <details className="group">
        <summary className="cursor-pointer text-xs font-medium text-muted-foreground select-none">
          측정 방법론
        </summary>
        <div className="mt-3 flex flex-col gap-2 text-xs leading-relaxed text-muted-foreground">
          <p>
            본 테스트는 6개 차원(사용 빈도, 활용 범위, 활용 깊이, 도구 다양성,
            투자 수준, 업무 통합도)에 걸쳐 10개 행동 기반 문항으로 구성되어
            있습니다.
          </p>
          <p>
            각 문항의 응답은 차원별로 합산된 후, 활용 깊이와 업무 통합도에
            ×1.5 가중치를 적용하여 총 60점 만점으로 환산됩니다. 이는 단순한
            사용 빈도보다 활용의 질적 수준이 AI 역량의 더 유의미한 지표라는
            가설에 기반합니다.
          </p>
          <p>
            5개 등급 구간은 12점 단위로 균등 분할되며, 자가 응답 기반
            진단이므로 참고 지표로 활용해 주세요.
          </p>
        </div>
      </details>
    </div>
  );
}
