"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import type { Dimension } from "@/lib/questions";
import { calculateScore, encodeDimensions, DIMENSIONS } from "@/lib/scoring";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "./question-card";

export function QuizContainer() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = useCallback(
    (score: number) => {
      if (isTransitioning) return;

      const newAnswers = [...answers];
      newAnswers[currentIndex] = score;
      setAnswers(newAnswers);

      setIsTransitioning(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setIsTransitioning(false);
        } else {
          // Calculate and navigate to result
          const rawScores = {} as Record<Dimension, number>;
          for (const dim of DIMENSIONS) {
            rawScores[dim] = 0;
          }
          questions.forEach((q, i) => {
            rawScores[q.dimension] += newAnswers[i] ?? 0;
          });

          const result = calculateScore(rawScores);
          const dimensionString = encodeDimensions(result.byDimension);
          router.push(`/result?s=${result.total}&d=${dimensionString}`);
        }
      }, 300);
    },
    [answers, currentIndex, isTransitioning, router]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, isTransitioning]);

  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {currentIndex + 1} / {questions.length}
          </span>
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              이전
            </button>
          )}
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div
        className={
          isTransitioning
            ? "opacity-0 translate-y-2 transition-all duration-200"
            : "opacity-100 translate-y-0 transition-all duration-200"
        }
      >
        <QuestionCard
          question={question}
          selectedScore={answers[currentIndex]}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
