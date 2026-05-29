"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGlimm } from "glimm/next";

const ICON_TRANSITION = "opacity 300ms cubic-bezier(0.23,1,0.32,1), transform 300ms cubic-bezier(0.23,1,0.32,1), filter 300ms cubic-bezier(0.23,1,0.32,1)";

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { sweep } = useGlimm();
  const [mounted, setMounted] = useState(false);
  const sweeping = useRef(false);
  const isDark = resolvedTheme === "dark";

  const handleToggle = useCallback(() => {
    if (!mounted || sweeping.current) return;
    sweeping.current = true;
    const handle = sweep(() => setTheme(isDark ? "light" : "dark"));
    handle.done.then(() => { sweeping.current = false; });
  }, [mounted, sweep, setTheme, isDark]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "D") return;
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      handleToggle();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [handleToggle]);

  if (!mounted) return <div className="w-12 h-12" />;

  return (
    <button
      onClick={handleToggle}
      className="w-12 h-12 flex items-center justify-center rounded-full border border-black/8 dark:border-white/8 text-neutral-400 hfine:hover:text-neutral-900 dark:hfine:hover:text-neutral-100 hfine:hover:bg-neutral-100 dark:hfine:hover:bg-neutral-800 transition-[background-color,color,scale] duration-150 ease-ds active:scale-[0.96] cursor-pointer"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? "scale(1)" : "scale(0.25)",
            filter: isDark ? "blur(0px)" : "blur(4px)",
            transition: ICON_TRANSITION,
          }}
        >
          <SunIcon />
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? "scale(0.25)" : "scale(1)",
            filter: isDark ? "blur(4px)" : "blur(0px)",
            transition: ICON_TRANSITION,
          }}
        >
          <MoonIcon />
        </div>
      </div>
    </button>
  );
}
