import { QuizContainer } from "@/components/quiz/quiz-container";

export const metadata = {
  title: "테스트 — 니들이 AI를 알아?",
};

export default function QuizPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <QuizContainer />
    </main>
  );
}
