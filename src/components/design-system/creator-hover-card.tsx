"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

type Phase = "hidden" | "seed" | "card" | "leaving";

export interface CreatorHoverCardProps {
  name: string;
  handle: string;
  avatarSrc: string;
  bio?: string;
  following?: number;
  followers?: number;
  verified?: boolean;
  children: React.ReactNode;
}

// ── Constants ────────────────────────────────────────────────────────────────

const EASE   = "cubic-bezier(0.22, 1, 0.36, 1)";
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const SEED_SIZE = 40;  // avatar is size-10 = 40px
const CARD_W    = 221; // matches Figma exactly
const CARD_H    = 130; // slightly above content height for safety

const INIT = (): { baseY: number; magX: number; magY: number; scale: number } =>
  ({ baseY: 10, magX: 0, magY: 0, scale: 0.9 });

// ── Lerp ─────────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ── Component ────────────────────────────────────────────────────────────────

export function CreatorHoverCard({
  name,
  handle,
  avatarSrc,
  bio,
  following,
  followers,
  verified = false,
  children,
}: CreatorHoverCardProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);
  const phaseRef   = useRef<Phase>("hidden");
  const hovered    = useRef(false);

  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t3 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cur = useRef(INIT());
  const tgt = useRef(INIT());

  const [phase, _setPhase]            = useState<Phase>("hidden");
  const [showContent, setShowContent] = useState(false);

  const setPhase = useCallback((p: Phase) => {
    phaseRef.current = p;
    _setPhase(p);
  }, []);

  // ── RAF loop ──────────────────────────────────────────────────────────────

  const flush = useCallback(() => {
    if (!cardRef.current) return;
    const { baseY, magX, magY, scale } = cur.current;
    cardRef.current.style.transform =
      `translateX(calc(-50% + ${magX.toFixed(2)}px)) ` +
      `translateY(${(baseY + magY).toFixed(2)}px) ` +
      `scale(${scale.toFixed(4)})`;
  }, []);

  const tick = useCallback(() => {
    const c = cur.current;
    const t = tgt.current;
    c.baseY = lerp(c.baseY, t.baseY, 0.11);
    c.magX  = lerp(c.magX,  t.magX,  0.09);
    c.magY  = lerp(c.magY,  t.magY,  0.09);
    c.scale = lerp(c.scale, t.scale, 0.11);
    flush();
    rafRef.current = requestAnimationFrame(tick);
  }, [flush]);

  const startRaf = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stopRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // ── Timers ────────────────────────────────────────────────────────────────

  const clearTimers = useCallback(() => {
    [t1, t2, t3].forEach(r => {
      if (r.current) { clearTimeout(r.current); r.current = null; }
    });
  }, []);

  // ── Interaction ───────────────────────────────────────────────────────────

  const handleEnter = useCallback(() => {
    hovered.current = true;
    clearTimers();

    tgt.current.baseY = 0;
    tgt.current.scale = 1;
    tgt.current.magX  = 0;
    tgt.current.magY  = 0;

    const curr = phaseRef.current;

    // Re-entry mid-exit: reverse immediately.
    if (curr === "seed" || curr === "card" || curr === "leaving") {
      setPhase("card");
      setShowContent(true);
      startRaf();
      return;
    }

    // Fresh entry: Phase 1 (seed avatar) → Phase 2 (card expansion).
    t1.current = setTimeout(() => {
      cur.current = INIT();
      flush();
      startRaf();
      setPhase("seed");

      t2.current = setTimeout(() => {
        setPhase("card");
        setTimeout(() => setShowContent(true), 60);
      }, 120);
    }, 80);
  }, [clearTimers, flush, setPhase, startRaf]);

  const handleLeave = useCallback(() => {
    hovered.current = false;
    clearTimers();

    tgt.current.baseY = 8;
    tgt.current.scale = 0.97;
    tgt.current.magX  = 0;
    tgt.current.magY  = 0;

    setShowContent(false);
    setPhase("leaving");

    t3.current = setTimeout(() => {
      setPhase("hidden");
      stopRaf();
      cur.current = INIT();
      tgt.current = INIT();
      flush();
    }, 300);
  }, [clearTimers, flush, setPhase, stopRaf]);

  const handleMove = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    if (!triggerRef.current || !hovered.current) return;
    const r  = triggerRef.current.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    tgt.current.magX = (e.clientX - cx) * 0.08;
    tgt.current.magY = (e.clientY - cy) * 0.05;
  }, []);

  useEffect(() => () => {
    stopRaf();
    clearTimers();
  }, [stopRaf, clearTimers]);

  // ── Derived ───────────────────────────────────────────────────────────────

  const isCircle  = phase === "hidden" || phase === "seed";
  const isVisible = phase === "seed" || phase === "card";
  const isExiting = phase === "leaving";

  const shapeT = isCircle ? "none" : [
    `width 280ms ${SPRING}`,
    `max-height 280ms ${EASE}`,
    `border-radius 280ms ${EASE}`,
  ].join(", ");

  const dur = isExiting ? 180 : 220;

  const transition = [
    shapeT !== "none" ? shapeT : null,
    `opacity ${dur}ms ${EASE}`,
    `filter  ${dur}ms ${EASE}`,
  ].filter(Boolean).join(", ");

  const hasStats = following !== undefined || followers !== undefined;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <span className="relative inline-block">

      {/* Trigger */}
      <span
        ref={triggerRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
        className="text-[#0077FF] dark:text-[#5AB0FF] font-semibold cursor-pointer select-none hfine:hover:text-[#004FA9] dark:hfine:hover:text-[#7CC4FF] transition-colors duration-150"
      >
        {children}
      </span>

      {/* ── Morphing container ─────────────────────────────────────────────────
          Phase 1 (seed): 40×40 circle — avatar fills it.
          Phase 2 (card): 221px wide panel — morphs from avatar orb.
          Shape (w/h/radius) → CSS transition.
          Opacity + filter → CSS transition.
          Transform (rise, sink, magnetic) → RAF lerp.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        ref={cardRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 overflow-hidden",
          "bg-white dark:bg-[#111111]",
          "border border-black/[0.16] dark:border-white/[0.12]",
          "shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.45)]",
        )}
        style={{
          bottom:       "calc(100% + 12px)",
          width:        isCircle ? `${SEED_SIZE}px` : `${CARD_W}px`,
          maxHeight:    isCircle ? `${SEED_SIZE}px` : `${CARD_H}px`,
          borderRadius: isCircle ? `${SEED_SIZE / 2}px` : "12px",
          opacity:      isVisible ? 1 : 0,
          filter:       isVisible ? "blur(0px)" : "blur(4px)",
          transition,
          transform:    "translateX(-50%) translateY(10px) scale(0.9)",
        }}
      >
        {/* Inner layout — padding + gap only in card mode */}
        <div className={cn("flex flex-col", isCircle ? "" : "gap-2 px-[10px] py-[6px]")}>

          {/* ── Avatar + identity row ────────────────────────────── */}
          <div className={cn("flex items-center shrink-0", isCircle ? "" : "gap-2")}>

            {/* Avatar — fills seed circle; scales in on card reveal */}
            <div
              className="size-10 rounded-full overflow-hidden shrink-0 ring-1 ring-inset ring-black/10 dark:ring-white/10"
              style={{
                transform:  isCircle || showContent ? "scale(1)" : "scale(0.92)",
                transition: isCircle ? "none" : `transform 300ms ${EASE}`,
              }}
            >
              <img
                src={avatarSrc}
                alt={name}
                className="size-full object-cover pointer-events-none"
              />
            </div>

            {/* Name + handle — stagger 0ms */}
            <div
              className="flex flex-col gap-[2px]"
              style={{
                opacity:    showContent ? 1 : 0,
                transform:  showContent ? "translateY(0px)" : "translateY(5px)",
                transition: `opacity 260ms ${EASE}, transform 260ms ${EASE}`,
              }}
            >
              {/* Name + badge */}
              <div className="flex items-center gap-1">
                <span className="font-sans font-medium text-ds-body text-black dark:text-white whitespace-nowrap">
                  {name}
                </span>
                {verified && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <g clipPath="url(#seal-clip)">
                      <path d="M2.34308 13.6569C1.63538 12.9492 2.10462 11.4623 1.74462 10.5915C1.37077 9.69231 0 8.96154 0 8C0 7.03846 1.37077 6.30769 1.74462 5.40846C2.10462 4.53846 1.63538 3.05077 2.34308 2.34308C3.05077 1.63538 4.53846 2.10462 5.40846 1.74462C6.31154 1.37077 7.03846 0 8 0C8.96154 0 9.69231 1.37077 10.5915 1.74462C11.4623 2.10462 12.9492 1.63538 13.6569 2.34308C14.3646 3.05077 13.8954 4.53769 14.2554 5.40846C14.6292 6.31154 16 7.03846 16 8C16 8.96154 14.6292 9.69231 14.2554 10.5915C13.8954 11.4623 14.3646 12.9492 13.6569 13.6569C12.9492 14.3646 11.4623 13.8954 10.5915 14.2554C9.69231 14.6292 8.96154 16 8 16C7.03846 16 6.30769 14.6292 5.40846 14.2554C4.53846 13.8954 3.05077 14.3646 2.34308 13.6569Z" fill="#0099FF"/>
                      <path d="M4.9231 8.61538L6.76925 10.4615L11.0769 6.15384" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="seal-clip">
                        <rect width="16" height="16" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </div>
              {/* Handle */}
              <span className="font-sans font-medium text-ds-body text-[#666] dark:text-[#888] whitespace-nowrap">
                {handle}
              </span>
            </div>
          </div>

          {/* ── Bio — stagger 20ms ──────────────────────────────── */}
          {bio && (
            <p
              className="font-sans font-medium text-ds-body text-black dark:text-white whitespace-nowrap m-0"
              style={{
                opacity:    showContent ? 1 : 0,
                transform:  showContent ? "translateY(0px)" : "translateY(5px)",
                transition: `opacity 260ms 20ms ${EASE}, transform 260ms 20ms ${EASE}`,
              }}
            >
              {bio}
            </p>
          )}

          {/* ── Stats — stagger 40ms ─────────────────────────────── */}
          {hasStats && (
            <div
              className="flex gap-[10px] font-sans font-medium text-ds-body whitespace-nowrap"
              style={{
                opacity:    showContent ? 1 : 0,
                transform:  showContent ? "translateY(0px)" : "translateY(5px)",
                transition: `opacity 260ms 40ms ${EASE}, transform 260ms 40ms ${EASE}`,
              }}
            >
              {following !== undefined && (
                <div className="flex gap-1">
                  <span className="text-black dark:text-white tabular-nums">{following}</span>
                  <span className="text-[#666] dark:text-[#888]">Following</span>
                </div>
              )}
              {followers !== undefined && (
                <div className="flex gap-1">
                  <span className="text-black dark:text-white tabular-nums">{followers}</span>
                  <span className="text-[#666] dark:text-[#888]">Followers</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </span>
  );
}
