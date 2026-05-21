"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import type { Dimension } from "@/lib/types";
import { calculateScore, encodeDimensions, DIMENSIONS, DIMENSION_LABELS } from "@/lib/scoring";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "./question-card";

type Phase = "idle" | "exiting" | "entering";
type Direction = "forward" | "backward";

/** Build section metadata from question order */
function buildSections(qs: typeof questions) {
  const sections: { dimension: Dimension; startIndex: number; label: string }[] = [];
  let prevDim: Dimension | null = null;
  for (let i = 0; i < qs.length; i++) {
    if (qs[i].dimension !== prevDim) {
      sections.push({
        dimension: qs[i].dimension,
        startIndex: i,
        label: DIMENSION_LABELS[qs[i].dimension],
      });
      prevDim = qs[i].dimension;
    }
  }
  return sections;
}

export function QuizContainer() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [phase, setPhase] = useState<Phase>("idle");
  const [direction, setDirection] = useState<Direction>("forward");
  const lockRef = useRef(false);

  const sections = useMemo(() => buildSections(questions), []);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // Current section info
  const currentSection = useMemo(() => {
    let sectionIdx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (currentIndex >= sections[i].startIndex) sectionIdx = i;
    }
    return { index: sectionIdx, ...sections[sectionIdx] };
  }, [currentIndex, sections]);

  const isFirstOfSection = sections.some((s) => s.startIndex === currentIndex);

  const transition = useCallback(
    (dir: Direction, nextIndex: number | "result", newAnswers?: (number | null)[]) => {
      if (lockRef.current) return;
      lockRef.current = true;

      setDirection(dir);
      setPhase("exiting");

      setTimeout(() => {
        if (nextIndex === "result") {
          const finalAnswers = newAnswers ?? answers;
          const rawScores = {} as Record<Dimension, number>;
          for (const dim of DIMENSIONS) rawScores[dim] = 0;
          questions.forEach((q, i) => {
            rawScores[q.dimension] += finalAnswers[i] ?? 0;
          });
          const result = calculateScore(rawScores);
          router.push(`/result?s=${result.total}&d=${encodeDimensions(result.byDimension)}`);
          return;
        }

        setCurrentIndex(nextIndex);
        setPhase("entering");

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase("idle");
            lockRef.current = false;
          });
        });
      }, 100);
    },
    [answers, router]
  );

  const handleSelect = useCallback(
    (score: number) => {
      if (phase !== "idle" || lockRef.current) return;

      const newAnswers = [...answers];
      newAnswers[currentIndex] = score;
      setAnswers(newAnswers);

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          transition("forward", currentIndex + 1);
        } else {
          transition("forward", "result", newAnswers);
        }
      }, 80);
    },
    [answers, currentIndex, phase, transition]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0 && phase === "idle") {
      transition("backward", currentIndex - 1);
    }
  }, [currentIndex, phase, transition]);

  let animClass: string;
  if (phase === "exiting") {
    animClass =
      direction === "forward"
        ? "opacity-0 -translate-x-6 transition-all duration-100 ease-in"
        : "opacity-0 translate-x-6 transition-all duration-100 ease-in";
  } else if (phase === "entering") {
    animClass =
      direction === "forward"
        ? "opacity-0 translate-x-6"
        : "opacity-0 -translate-x-6";
  } else {
    animClass = "opacity-100 translate-x-0 transition-all duration-150 ease-out";
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {currentSection.label}
        </span>
        <span className="text-xs text-muted-foreground/60">
          ({currentSection.index + 1} / {sections.length})
        </span>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {questions.length}
        </span>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Question */}
      <div className={animClass}>
        <QuestionCard
          question={question}
          selectedScore={answers[currentIndex]}
          onSelect={handleSelect}
        />
      </div>

      {/* Back button */}
      {currentIndex > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleBack}
            disabled={phase !== "idle"}
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground disabled:opacity-50 disabled:no-underline"
          >
            이전 질문으로
          </button>
        </div>
      )}
    </div>
  );
}
