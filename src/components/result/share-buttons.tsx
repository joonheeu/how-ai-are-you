"use client";

import { useCallback, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getXShareUrl, getLinkedInShareUrl } from "@/lib/share";

interface ShareButtonsProps {
  score: number;
  grade: 1 | 2 | 3 | 4 | 5;
  dimensionString: string;
}

export function ShareButtons({ score, grade, dimensionString }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text from a temporary input
    }
  }, []);

  const xUrl = getXShareUrl(score, grade, dimensionString);
  const linkedInUrl = getLinkedInShareUrl(score, dimensionString);
  const linkClasses = cn(buttonVariants({ variant: "outline", size: "sm" }));

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        X에 공유
      </a>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        LinkedIn 공유
      </a>
      <Button variant="outline" size="sm" onClick={handleCopyLink}>
        {copied ? "복사됨!" : "링크 복사"}
      </Button>
    </div>
  );
}
