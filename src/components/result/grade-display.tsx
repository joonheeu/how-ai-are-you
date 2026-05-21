import { grades } from "@/lib/grades";

interface GradeDisplayProps {
  score: number;
  grade: 1 | 2 | 3 | 4 | 5;
}

export function GradeDisplay({ score, grade }: GradeDisplayProps) {
  const gradeInfo = grades[grade];

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="text-sm font-medium tracking-widest text-muted-foreground">
        당신의 결과
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {gradeInfo.name}
      </h1>
      <p className="text-lg text-muted-foreground">
        {score} / 100
      </p>
    </div>
  );
}
