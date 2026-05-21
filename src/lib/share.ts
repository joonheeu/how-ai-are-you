import { grades } from "./grades";

const BASE_URL = "https://howai.dev";

export function getResultUrl(score: number, dimensionString: string): string {
  return `${BASE_URL}/result?s=${score}&d=${dimensionString}`;
}

export function getShareText(score: number, grade: 1 | 2 | 3 | 4 | 5): string {
  const gradeInfo = grades[grade];
  return `나는 "${gradeInfo.name}" (${score}/100점). 니들이 AI를 알아?`;
}

export function getXShareUrl(score: number, grade: 1 | 2 | 3 | 4 | 5, dimensionString: string): string {
  const text = getShareText(score, grade);
  const url = getResultUrl(score, dimensionString);
  return `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

export function getLinkedInShareUrl(score: number, dimensionString: string): string {
  const url = getResultUrl(score, dimensionString);
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}
