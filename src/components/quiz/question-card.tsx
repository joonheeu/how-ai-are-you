"use client";

import { useMemo } from "react";
import type { Question } from "@/lib/questions";
import { OptionButton } from "./option-button";

interface QuestionCardProps {
  question: Question;
  selectedScore: number | null;
  onSelect: (score: number) => void;
}

/** Deterministic shuffle based on question id — stable across re-renders */
function seededShuffle<T>(arr: T[], seed: string): T[] {
  const copy = [...arr];
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  for (let i = copy.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1103515245) + 12345) | 0;
    const j = ((h >>> 0) % (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function QuestionCard({
  question,
  selectedScore,
  onSelect,
}: QuestionCardProps) {
  const shuffledOptions = useMemo(
    () => seededShuffle(question.options, question.id),
    [question.id, question.options]
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {question.text}
      </h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((option) => (
          <OptionButton
            key={option.score}
            label={option.label}
            selected={selectedScore === option.score}
            onClick={() => onSelect(option.score)}
          />
        ))}
      </div>
    </div>
  );
}
