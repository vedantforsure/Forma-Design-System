"use client";

import { useState } from "react";
import { EmailCapture } from "@/components/design-system/email-capture";

function PlusMark({ top, right, bottom, left }: {
  top?: number; right?: number; bottom?: number; left?: number;
}) {
  return (
    <div style={{ position: "absolute", top, right, bottom, left, opacity: 0.4 }}>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
        <line x1="0"   y1="5.5" x2="11" y2="5.5" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function Landing() {
  const [shimmer, setShimmer] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-sans)",
      }}
    >
      <PlusMark top={36}  left={36}  />
      <PlusMark top={36}  right={36} />
      <PlusMark bottom={36} left={36}  />
      <PlusMark bottom={36} right={36} />

      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <h1
          className={shimmer ? "headline-shimmer" : ""}
          onAnimationEnd={() => setShimmer(false)}
          style={{
            margin: 0,
            fontSize: "clamp(36px, 5.5vw, 62px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "#0F172A",
            textAlign: "center",
          }}
        >
          Your next trade awaits
        </h1>

        <EmailCapture onSuccess={() => setShimmer(true)} />
      </div>
    </div>
  );
}
