import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "니들이 AI를 알아?",
  description:
    "AI를 얼마나 잘 쓰고 있는지 알아보세요. 10개 질문, 2분이면 끝.",
  metadataBase: new URL("https://howai.dev"),
  openGraph: {
    title: "니들이 AI를 알아?",
    description:
      "AI를 얼마나 잘 쓰고 있는지 알아보세요. 10개 질문, 2분이면 끝.",
    siteName: "니들이 AI를 알아?",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "니들이 AI를 알아?",
    description:
      "AI를 얼마나 잘 쓰고 있는지 알아보세요. 10개 질문, 2분이면 끝.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
