import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { grades } from "@/lib/grades";
import {
  DIMENSIONS,
  DIMENSION_LABELS,
  getDimensionMax,
  decodeDimensions,
} from "@/lib/scoring";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const score = Number(searchParams.get("score") ?? "0");
  const gradeLevel = Number(searchParams.get("grade") ?? "3") as
    | 1
    | 2
    | 3
    | 4
    | 5;
  const dimensionString = searchParams.get("d");

  const gradeInfo = grades[gradeLevel] ?? grades[3];
  const byDimension = dimensionString
    ? decodeDimensions(dimensionString)
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              fontWeight: 500,
              color: "#888888",
              letterSpacing: "3px",
            }}
          >
            니들이 AI를 알아?
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.1,
            }}
          >
            {gradeInfo.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "#666666",
            }}
          >
            {score} / 100
          </div>
        </div>

        {byDimension && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              width: "100%",
              maxWidth: "500px",
              marginTop: "40px",
            }}
          >
            {DIMENSIONS.map((dim) => {
              const value = byDimension[dim];
              const max = getDimensionMax(dim);
              const pct = max > 0 ? (value / max) * 100 : 0;

              return (
                <div
                  key={dim}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100px",
                      fontSize: "14px",
                      color: "#888888",
                      justifyContent: "flex-end",
                    }}
                  >
                    {DIMENSION_LABELS[dim]}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      height: "12px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: `${Math.max(pct, 3)}%`,
                        height: "100%",
                        backgroundColor: "#111111",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
