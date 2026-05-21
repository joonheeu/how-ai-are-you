"use client";

import type { Question } from "@/lib/questions";
import { OptionButton } from "./option-button";

interface QuestionCardProps {
  question: Question;
  selectedScore: number | null;
  onSelect: (score: number) => void;
}

export function QuestionCard({
  question,
  selectedScore,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {question.text}
      </h2>
      <div className="flex flex-col gap-2">
        {question.options.map((option) => (
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
