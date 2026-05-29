"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "lucide-react";

interface ChecklistItem { label: string; done: boolean; sectionId?: string; }
interface ChecklistGroup { section: string; items: ChecklistItem[]; }

interface NavDropdownProps {
  checklist: ChecklistGroup[];
  doneItems: number;
  totalItems: number;
}

export function NavDropdown({ checklist, doneItems, totalItems }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">

      {/* Panel — opens upward from trigger */}
      <div
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0px) scale(1)" : "translateY(8px) scale(0.97)",
          transformOrigin: "bottom center",
          pointerEvents: open ? "auto" : "none",
          transition: open
            ? "opacity 200ms cubic-bezier(0.23, 1, 0.32, 1), transform 200ms cubic-bezier(0.23, 1, 0.32, 1)"
            : "opacity 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        className="absolute bottom-[48px] left-1/2 -translate-x-1/2 bg-white dark:bg-ds-neutral-900 border border-black/8 dark:border-white/8 rounded-[22px] shadow-[0px_8px_32px_rgba(0,0,0,0.10),0px_0.5px_2px_rgba(0,0,0,0.08)] w-max max-w-[calc(100vw-40px)] overscroll-contain"
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-black/6 dark:border-white/6">
          <p className="text-[11px] leading-[16px] font-medium uppercase tracking-widest text-ds-neutral-1000 dark:text-ds-neutral-0">
            Components
          </p>
        </div>

        {/* Checklist body — all sections in a single horizontal row */}
        <div className="p-3 flex flex-row flex-wrap gap-1 items-start">
          {checklist.map((group) => (
            <div key={group.section}>
              <p className="text-ds-body font-medium text-ds-neutral-600 dark:text-ds-neutral-500 px-2.5 pt-3 pb-1.5">
                {group.section}
              </p>
              <div className="flex flex-col">
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (item.sectionId) {
                        document.getElementById(item.sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                        setOpen(false);
                      }
                    }}
                    className={[
                      "flex items-center gap-2.5 py-[5px] px-2.5 rounded-[10px] w-full text-left",
                      "transition-colors duration-150",
                      item.sectionId ? "cursor-pointer hfine:hover:bg-ds-neutral-100 dark:hfine:hover:bg-ds-neutral-800" : "cursor-default",
                    ].join(" ")}
                  >
                    <span className="text-ds-body text-ds-neutral-1000 dark:text-ds-neutral-0">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "h-[40px] pl-[14px] pr-[10px] flex items-center gap-2",
          "rounded-full border border-black/16 dark:border-white/16",
          "font-sans font-medium text-ds-body text-black dark:text-white",
          "bg-white dark:bg-ds-neutral-950",
          "cursor-pointer select-none outline-none",
          "transition-[background-color,scale] duration-150 ease-ds",
          "active:scale-[0.96]",
          "hfine:hover:bg-ds-neutral-100 dark:hfine:hover:bg-ds-neutral-900",
          "active:bg-ds-neutral-400 dark:active:bg-ds-neutral-700",
        ].join(" ")}
      >
        <span className="whitespace-nowrap">
          Components
        </span>
        <ChevronUp
          className="w-4 h-4 shrink-0"
          strokeWidth={2}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 150ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />
      </button>

    </div>
  );
}
