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
            투자 수준, 업무 통합도)에 걸쳐 30개 행동 기반 문항(차원당 5문항)으로
            구성되어 있습니다.
          </p>
          <p>
            각 문항의 응답은 차원별로 합산된 후, 활용 깊이와 업무 통합도에
            ×1.5 가중치를 적용합니다. 총점은 가중합을 최대 가능 점수 대비
            비율로 환산하여 100점 만점으로 표시됩니다.
          </p>
          <p>
            5개 등급 구간은 20점 단위로 균등 분할되며, 자가 응답 기반
            진단이므로 참고 지표로 활용해 주세요.
          </p>
        </div>
      </details>
    </div>
  );
}
