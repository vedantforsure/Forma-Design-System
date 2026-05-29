"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

type Phase = "idle" | "bubble" | "expanded" | "leaving";

const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";
const spring  = "cubic-bezier(0.34, 1.56, 0.64, 1)";

function buildTransition(phase: Phase): string {
  if (phase === "bubble")
    return `transform 220ms ${easeOut}, opacity 220ms ${easeOut}`;
  if (phase === "expanded")
    return [
      `width 280ms ${spring}`,
      `max-height 280ms ${easeOut}`,
      `border-radius 280ms ${easeOut}`,
      `opacity 200ms ${easeOut}`,
      `transform 200ms ${easeOut}`,
    ].join(", ");
  if (phase === "leaving")
    return [
      `width 200ms ${easeOut}`,
      `max-height 200ms ${easeOut}`,
      `border-radius 200ms ${easeOut}`,
      `opacity 180ms ${easeOut}`,
      `transform 200ms ${easeOut}`,
    ].join(", ");
  return "none"; // idle — already hidden, no transition needed
}

export function ContactCard({ children }: { children?: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasFinePointer = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : true
  ).current;

  const reducedMotion = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  ).current;

  const setP = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleMouseEnter = useCallback(() => {
    if (!hasFinePointer) return;
    clear();
    const cur = phaseRef.current;
    if (cur === "leaving") {
      // Re-entering mid-exit: skip straight to expanded
      setP("expanded");
    } else if (cur === "idle") {
      if (reducedMotion) {
        setP("expanded");
      } else {
        setP("bubble");
        timerRef.current = setTimeout(() => setP("expanded"), 180);
      }
    }
    // already bubble or expanded: no-op
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!hasFinePointer) return;
    clear();
    if (phaseRef.current !== "idle") {
      setP("leaving");
      timerRef.current = setTimeout(() => setP("idle"), 220);
    }
  }, []);

  const isCircle  = phase === "idle" || phase === "bubble" || phase === "leaving";
  const isVisible = phase === "bubble" || phase === "expanded" || phase === "leaving";
  const showText  = phase === "expanded"; // text only during expanded

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card — z-[1] so the button (z-10) stays on top as the bubble emerges */}
      <div
        className={cn(
          "absolute bottom-full left-0 mb-2 pointer-events-none z-[1]",
          "bg-white border border-black/16 overflow-hidden select-none",
          isCircle
            ? "rounded-[20px] w-10 max-h-10"
            : "rounded-[12px] w-[221px] max-h-[120px]",
        )}
        style={{
          transition: reducedMotion ? "opacity 150ms ease-out" : buildTransition(phase),
          opacity: isVisible ? 1 : 0,
          transform: reducedMotion
            ? undefined
            : isVisible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
          transformOrigin: "bottom left",
        }}
      >
        <div className={cn("flex flex-col", isCircle ? "" : "gap-2 p-1")}>

          {/* Avatar + name row */}
          <div className="flex gap-2 items-center shrink-0">
            <div className="relative rounded-full shrink-0 size-10 ring-1 ring-inset ring-black/10">
              <img
                alt="Vedant"
                src="/x-pfp.jpg"
                className="absolute inset-0 size-full object-cover rounded-full pointer-events-none"
              />
            </div>
            <div
              className={cn(
                "flex flex-col gap-[2px]",
                showText
                  ? "opacity-100 transition-opacity duration-150 delay-[100ms]"
                  : "opacity-0 transition-none",
              )}
              style={!showText ? { height: 0, overflow: "hidden" } : undefined}
            >
              <div className="flex gap-1 items-center">
                <span className="font-sans font-medium text-[18px] leading-[22px] text-black whitespace-nowrap">
                  Vedant
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0" aria-hidden="true">
                  <circle cx="10" cy="10" r="10" fill="#1D9BF0" />
                  <path d="M6.5 10.5L9 13.5L14 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-sans font-medium text-ds-body text-[#666] whitespace-nowrap">
                @vedantdzn
              </span>
            </div>
          </div>

          {/* Bio — stagger delay 140ms */}
          <span
            className={cn(
              "font-sans font-medium text-ds-body text-black whitespace-nowrap",
              showText
                ? "opacity-100 transition-opacity duration-150 delay-[140ms]"
                : "opacity-0 transition-none",
            )}
          >
            Product designer
          </span>

          {/* Stats — stagger delay 180ms */}
          <div
            className={cn(
              "flex gap-[10px] font-sans font-medium text-ds-body whitespace-nowrap",
              showText
                ? "opacity-100 transition-opacity duration-150 delay-[180ms]"
                : "opacity-0 transition-none",
            )}
          >
            <div className="flex gap-1">
              <span className="text-black tabular-nums">124</span>
              <span className="text-[#666]">Following</span>
            </div>
            <div className="flex gap-1">
              <span className="text-black tabular-nums">150</span>
              <span className="text-[#666]">Followers</span>
            </div>
          </div>

        </div>
      </div>

      {/* Button — z-10, stays on top of the emerging bubble */}
      <div className="relative z-10">
        <button
          className={cn(
            "inline-flex items-center justify-center rounded-full py-[10px]",
            "font-sans font-medium text-ds-body whitespace-nowrap",
            "bg-transparent border-none",
            "transition-[color,scale] duration-150 ease-ds",
            "active:scale-[0.96] cursor-pointer select-none",
            phase !== "idle"
              ? "text-[#004FA9]"
              : "text-[#0077FF] hfine:hover:text-[#004FA9]",
          )}
        >
          {children}
        </button>
      </div>
    </div>
  );
}
