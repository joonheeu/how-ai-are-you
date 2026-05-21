import { grades } from "@/lib/grades";

interface GradeDescriptionProps {
  grade: 1 | 2 | 3 | 4 | 5;
}

export function GradeDescription({ grade }: GradeDescriptionProps) {
  const gradeInfo = grades[grade];

  return (
    <div className="flex flex-col gap-6">
      <p className="text-muted-foreground leading-relaxed">
        {gradeInfo.description}
      </p>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold tracking-widest text-muted-foreground">
          다음에 해볼 만한 것
        </h3>
        <ul className="flex flex-col gap-2">
          {gradeInfo.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="flex gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-0.5 shrink-0 text-foreground/40">&rarr;</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
