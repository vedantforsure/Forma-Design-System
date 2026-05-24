"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "lucide-react";

interface ChecklistItem { label: string; done: boolean; }
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
    <div ref={containerRef} className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">

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
        className="absolute bottom-[48px] left-1/2 -translate-x-1/2 bg-white dark:bg-ds-neutral-900 border border-black/8 dark:border-white/8 rounded-[20px] shadow-[0px_8px_32px_rgba(0,0,0,0.10),0px_0.5px_2px_rgba(0,0,0,0.08)] w-max max-w-[calc(100vw-40px)] overscroll-contain"
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-black/6 dark:border-white/6">
          <p className="text-[11px] leading-[16px] font-medium uppercase tracking-widest text-ds-neutral-600 dark:text-ds-neutral-500">
            Progress
          </p>
          <p className="text-[13px] leading-[18px] text-ds-neutral-600 dark:text-ds-neutral-500 mt-0.5">
            {doneItems} / {totalItems} done
          </p>
        </div>

        {/* Checklist body — all sections in a single horizontal row */}
        <div className="p-3 flex flex-row flex-wrap gap-1 items-start">
          {checklist.map((group) => (
            <div key={group.section}>
              <p className="text-[10px] leading-[14px] font-medium uppercase tracking-widest text-neutral-300 dark:text-neutral-600 px-2.5 pt-3 pb-1.5">
                {group.section}
              </p>
              <div className="flex flex-col">
                {group.items.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 py-[5px] px-2.5 rounded-[10px]">
                    <div
                      className={[
                        "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0",
                        item.done
                          ? "bg-neutral-900 dark:bg-neutral-100 border-neutral-900 dark:border-neutral-100"
                          : "border-neutral-200 dark:border-neutral-700",
                      ].join(" ")}
                    >
                      {item.done && (
                        <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                          <path
                            d="M1 2.5L2.5 4L6 1"
                            className="stroke-white dark:stroke-neutral-900"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={[
                        "text-[13px] leading-[18px]",
                        item.done
                          ? "text-ds-neutral-1000 dark:text-ds-neutral-0"
                          : "text-ds-neutral-600 dark:text-ds-neutral-500",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                  </div>
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
          "rounded-full border border-black/8 dark:border-white/8",
          "shadow-[0px_2px_8px_rgba(0,0,0,0.10),0px_0.5px_2px_rgba(0,0,0,0.06)]",
          "text-[16px] leading-[22px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0",
          "cursor-pointer select-none outline-none",
          "transition-[colors,transform] duration-150 ease-ds",
          "active:scale-[0.97]",
          open
            ? "bg-ds-neutral-100 dark:bg-ds-neutral-800"
            : "bg-white dark:bg-ds-neutral-950 hfine:hover:bg-ds-neutral-50 dark:hfine:hover:bg-ds-neutral-900",
        ].join(" ")}
      >
        <span className="whitespace-nowrap">
          Progress · {doneItems}/{totalItems}
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
