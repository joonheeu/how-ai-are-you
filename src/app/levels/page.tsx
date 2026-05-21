import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { grades } from "@/lib/grades";

export const metadata = {
  title: "전체 등급 — 니들이 AI를 알아?",
  description: "AI 활용도 진단 5단계 등급을 확인해 보세요.",
};

const GRADE_RANGES: Record<number, string> = {
  1: "0 – 20점",
  2: "21 – 40점",
  3: "41 – 60점",
  4: "61 – 80점",
  5: "81 – 100점",
};

const GRADE_COLORS: Record<number, string> = {
  1: "bg-stone-100 border-stone-200",
  2: "bg-orange-50 border-orange-200",
  3: "bg-amber-50 border-amber-200",
  4: "bg-sky-50 border-sky-200",
  5: "bg-emerald-50 border-emerald-200",
};

const GRADE_ACCENT: Record<number, string> = {
  1: "text-stone-600",
  2: "text-orange-600",
  3: "text-amber-600",
  4: "text-sky-600",
  5: "text-emerald-600",
};

export default function LevelsPage() {
  const gradeList = [1, 2, 3, 4, 5] as const;

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12 sm:py-16">
      <div className="flex w-full max-w-lg flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            전체 등급
          </h1>
          <p className="text-sm text-muted-foreground">
            AI 활용도 진단 5단계. 당신은 어디에 해당하나요?
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          {gradeList.map((level) => {
            const grade = grades[level];
            return (
              <div
                key={level}
                className={cn(
                  "rounded-xl border p-5 transition-shadow hover:shadow-md",
                  GRADE_COLORS[level]
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs font-bold",
                          GRADE_ACCENT[level]
                        )}
                      >
                        Lv.{level}
                      </span>
                      <h2 className="text-lg font-bold">{grade.name}</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {grade.description}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                      GRADE_ACCENT[level],
                      GRADE_COLORS[level]
                    )}
                  >
                    {GRADE_RANGES[level]}
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-1">
                  {grade.suggestions.map((s) => (
                    <p
                      key={s}
                      className="flex gap-2 text-xs text-muted-foreground"
                    >
                      <span className="shrink-0 opacity-40">→</span>
                      <span>{s}</span>
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/quiz"
          className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base")}
        >
          테스트 하러 가기
        </Link>
      </div>
    </main>
  );
}
