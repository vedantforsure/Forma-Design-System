"use client";

import { useState, useRef, useLayoutEffect } from "react";

const EASE_SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)"; // spring w/ overshoot — rotation, orb
const EASE_GROW   = "cubic-bezier(0.34, 1.22, 0.64, 1)"; // gentle spring — width, bg
const H = 48;
const CD = 42;
const PAD = 3;
const IDLE_W = 164;
// SVG is 20px wide at left: 16px → right edge 36px from left → 128px from right
const IDLE_ORB_RIGHT = IDLE_W - 16 - 20; // 128

type Phase = "idle" | "active" | "success";

const INPUT_PL = 18;                    // input padding-left
const INPUT_PR = CD + PAD * 2 + 8;    // input padding-right (68px)

function getWidth(phase: Phase, textW: number): number {
  if (phase === "idle") return IDLE_W;
  if (phase === "success") return 260;
  return Math.max(140, INPUT_PL + textW + INPUT_PR + 6); // +6px guards against mirror-span measurement drift
}

export function EmailCapture({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [textW, setTextW] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const placeholderMirrorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const emailW = mirrorRef.current?.offsetWidth ?? 0;
    const phW    = placeholderMirrorRef.current?.offsetWidth ?? 0;
    setTextW(Math.max(emailW, phW));
  }, [email, phase]);

  const isIdle    = phase === "idle";
  const isActive  = phase === "active";
  const isSuccess = phase === "success";
  const isExpanded = isActive || isSuccess;

  const cw = getWidth(phase, textW);

  const orbRight  = isExpanded ? PAD             : IDLE_ORB_RIGHT;
  const orbTop    = isExpanded ? PAD             : (H - 20) / 2;
  const orbBottom = isExpanded ? PAD             : (H - 20) / 2;
  const orbW      = isExpanded ? CD              : 20;

  // Orb is a submit button when active so clicking it submits the form
  const OrbTag = isActive ? "button" : "div";

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (email) { setPhase("success"); onSuccess?.(); } }}
      style={{ display: "inline-block" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          if (isIdle) {
            setHovered(false);
            setPhase("active");
            setTimeout(() => inputRef.current?.focus(), 40);
          }
        }}
        style={{
          position: "relative",
          width: cw,
          maxWidth: "calc(100vw - 32px)",
          height: H,
          borderRadius: H,
          backgroundColor: isExpanded ? "#ffffff" : "#0099FF",
          border: `1px solid ${focused ? "rgba(0,153,255,0.28)" : isExpanded ? "rgba(0,0,0,0.1)" : "transparent"}`,
          boxShadow: focused ? "0 0 0 3px rgba(0,153,255,0.09)" : "none",
          overflow: "hidden",
          cursor: isActive || isSuccess ? "default" : "pointer",
          transition: [
            `width 400ms ${EASE_GROW}`,
            `background-color 300ms ease`,
            `border-color 240ms ease`,
            `box-shadow 220ms ease`,
          ].join(", "),
          willChange: "width",
          userSelect: "none",
        }}
      >
        {/* Blue orb — hidden over SVG in idle, expands and travels right on click */}
        <OrbTag
          {...(isActive ? { type: "submit" as const } : {})}
          style={{
            position: "absolute",
            right: orbRight,
            top: orbTop,
            bottom: orbBottom,
            width: orbW,
            borderRadius: H,
            backgroundColor: "#0099FF",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            opacity: isExpanded ? 1 : 0,
            cursor: isActive ? "pointer" : "default",
            flexShrink: 0,
            transition: [
              `right 380ms ${EASE_SPRING}`,
              `width 360ms ${EASE_SPRING}`,
              `top 280ms ${EASE_SPRING}`,
              `bottom 280ms ${EASE_SPRING}`,
              `opacity 100ms ease`,
            ].join(", "),
            willChange: "right, width",
          }}
        >
          {!isSuccess && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 10H17M11.2727 15L17 10L11.2727 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {isSuccess && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7L5.5 10.5L12 3" stroke="white" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </OrbTag>

        {/* Left-padding mask — sits above the input to cover any text that drifts under the padding zone */}
        {isExpanded && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: INPUT_PL,
              background: "linear-gradient(to right, #ffffff 55%, transparent)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Idle: white icon + white text on blue background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 16,
            gap: 8,
            opacity: isIdle ? 1 : 0,
            transition: "opacity 140ms ease",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              transform: hovered ? "rotate(90deg)" : "rotate(0deg)",
              transition: `transform 420ms ${EASE_SPRING}`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.999 17.999H2V2H17.999V17.999ZM10 3.59961C6.46545 3.59961 3.59961 6.46545 3.59961 10C3.59986 13.5343 6.4656 16.3994 10 16.3994C13.5342 16.3992 16.3992 13.5342 16.3994 10C16.3994 6.4656 13.5343 3.59985 10 3.59961Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#ffffff", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
            Request access
          </span>
        </div>

        {/* Email input */}
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") { setPhase("idle"); setEmail(""); setFocused(false); }
          }}
          placeholder="you@email.com"
          tabIndex={isActive ? 0 : -1}
          autoComplete="email"
          style={{
            position: "absolute",
            inset: 0,
            paddingLeft: INPUT_PL,
            paddingRight: INPUT_PR,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: 14,
            fontWeight: 500,
            color: "#111111",
            letterSpacing: "0.01em",
            opacity: isActive ? 1 : 0,
            transition: `opacity 200ms ease ${isActive ? "160ms" : "0ms"}`,
            pointerEvents: isActive ? "auto" : "none",
          }}
        />

        {/* Success */}
        {isSuccess && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              paddingLeft: INPUT_PL,
              paddingRight: INPUT_PR,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 500, color: "#111111", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
              You&apos;re in — see you soon.
            </span>
          </div>
        )}
      </div>
      {/* Hidden mirror spans — measure text width to drive container size */}
      <span
        ref={mirrorRef}
        aria-hidden
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          visibility: "hidden",
          pointerEvents: "none",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {email}
      </span>
      <span
        ref={placeholderMirrorRef}
        aria-hidden
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          visibility: "hidden",
          pointerEvents: "none",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
        }}
      >
        you@email.com
      </span>
    </form>
  );
}
