import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="flex max-w-lg flex-col items-center gap-6 text-center">
        <Image
          src="/hero-image.png"
          alt="니들이 AI를 알아?"
          width={200}
          height={200}
          className="drop-shadow-md"
          priority
        />
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          니들이 AI를 알아?
        </h1>
        <p className="text-lg text-muted-foreground">
          10개 질문. 2분이면 끝.
          <br />
          나는 AI를 얼마나 잘 쓰고 있는지 알아보세요.
        </p>
        <Link
          href="/quiz"
          className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base")}
        >
          테스트 시작하기
        </Link>
      </div>
    </main>
  );
}
