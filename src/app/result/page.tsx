import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GradeDisplay } from "@/components/result/grade-display";
import { DimensionChart } from "@/components/result/dimension-chart";
import { GradeDescription } from "@/components/result/grade-description";
import { ShareButtons } from "@/components/result/share-buttons";
import { Methodology } from "@/components/result/methodology";
import { getGrade, decodeDimensions } from "@/lib/scoring";
import { grades } from "@/lib/grades";

interface ResultPageProps {
  searchParams: Promise<{ s?: string; d?: string }>;
}

function parseParams(params: { s?: string; d?: string }) {
  const score = Number(params.s);
  const dimensionString = params.d ?? "";
  const byDimension = decodeDimensions(dimensionString);

  if (isNaN(score) || score < 0 || score > 60 || !byDimension) {
    return null;
  }

  return { score, grade: getGrade(score), byDimension, dimensionString };
}

export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const parsed = parseParams(params);
  if (!parsed) return { title: "니들이 AI를 알아?" };

  const gradeInfo = grades[parsed.grade];

  return {
    title: `${gradeInfo.name} (${parsed.score}/60) — 니들이 AI를 알아?`,
    description: gradeInfo.description,
    openGraph: {
      title: `나는 "${gradeInfo.name}" — 니들이 AI를 알아?`,
      description: `AI 활용도 테스트에서 ${parsed.score}/60점을 받았어요. 당신은?`,
      images: [
        {
          url: `/api/og?score=${parsed.score}&grade=${parsed.grade}&d=${params.d}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `나는 "${gradeInfo.name}" — 니들이 AI를 알아?`,
      description: `AI 활용도 테스트에서 ${parsed.score}/60점을 받았어요.`,
      images: [`/api/og?score=${parsed.score}&grade=${parsed.grade}&d=${params.d}`],
    },
  };
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const parsed = parseParams(params);

  if (!parsed) {
    redirect("/");
  }

  const { score, grade, byDimension, dimensionString } = parsed;

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12 sm:py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-10">
        <GradeDisplay score={score} grade={grade} />

        <div className="w-full">
          <DimensionChart byDimension={byDimension} />
        </div>

        <div className="w-full">
          <GradeDescription grade={grade} />
        </div>

        <div className="w-full">
          <Methodology />
        </div>

        <div className="flex flex-col items-center gap-4">
          <ShareButtons
            score={score}
            grade={grade}
            dimensionString={dimensionString}
          />
          <Link
            href="/quiz"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            다시 테스트하기
          </Link>
        </div>
      </div>
    </main>
  );
}
