"use client";

import { useState, useRef, useEffect, useId } from "react";
import { ChevronDown } from "lucide-react";

interface RadioDropdownOption {
  value: string;
  label: string;
}

interface RadioDropdownProps {
  label: string;
  options: RadioDropdownOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function RadioDropdown({ label, options, defaultValue = "", onChange }: RadioDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

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

  const selectedLabel = options.find((o) => o.value === selected)?.label;

  const select = (value: string) => {
    const next = selected === value ? "" : value;
    setSelected(next);
    onChange?.(next);
    if (next) setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block">

      {/* Trigger */}
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((v) => !v)}
        className={[
          "h-[40px] pl-[14px] pr-[10px] flex items-center gap-2",
          "rounded-full border border-black/16 dark:border-white/16",
          "font-sans font-medium text-[16px] leading-[20px] text-black dark:text-white",
          "cursor-pointer select-none outline-none",
          "transition-[background-color,scale] duration-150 ease-ds",
          "active:scale-[0.96]",
          open
            ? "bg-ds-neutral-100 dark:bg-ds-neutral-800"
            : "bg-white dark:bg-ds-neutral-950 hfine:hover:bg-ds-neutral-100 dark:hfine:hover:bg-ds-neutral-900 active:bg-ds-neutral-400 dark:active:bg-ds-neutral-700",
        ].join(" ")}
      >
        <span className="whitespace-nowrap">{selectedLabel ?? label}</span>
        <ChevronDown
          className="w-4 h-4 shrink-0"
          strokeWidth={2}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 150ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />
      </button>

      {/* Dropdown panel */}
      <div
        id={listboxId}
        role="listbox"
        aria-label={label}
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0px) scale(1)" : "translateY(-8px) scale(0.97)",
          transformOrigin: "top left",
          pointerEvents: open ? "auto" : "none",
          transition: open
            ? "opacity 200ms cubic-bezier(0.23, 1, 0.32, 1), transform 200ms cubic-bezier(0.23, 1, 0.32, 1)"
            : "opacity 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        className="absolute left-0 top-[44px] bg-white dark:bg-ds-neutral-900 border border-black/8 dark:border-white/8 rounded-[16px] shadow-[0px_0.5px_2px_0px_rgba(0,0,0,0.08)] p-[4px] w-[300px] z-20"
      >
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              role="option"
              aria-selected={isSelected}
              onClick={() => select(opt.value)}
              className={[
                "flex items-center gap-5 h-[44px] w-full px-[12px] py-[10px] rounded-[12px]",
                "text-left cursor-pointer outline-none",
                "transition-colors duration-100",
                isSelected
                  ? "bg-ds-neutral-100 dark:bg-ds-neutral-800"
                  : "bg-white dark:bg-ds-neutral-900 hover:bg-ds-neutral-100 dark:hover:bg-ds-neutral-800 active:bg-ds-neutral-100 dark:active:bg-ds-neutral-800",
              ].join(" ")}
            >
              <span className="flex-1 text-[14px] leading-[18px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 min-w-0">
                {opt.label}
              </span>
              <div
                className={[
                  "w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0",
                  "transition-colors duration-100",
                  isSelected
                    ? "border-ds-neutral-1000 dark:border-ds-neutral-0"
                    : "border-black/20 dark:border-white/20",
                ].join(" ")}
              >
                <div
                  className="w-[10px] h-[10px] rounded-full bg-ds-neutral-1000 dark:bg-ds-neutral-0"
                  style={{
                    opacity: isSelected ? 1 : 0,
                    transform: isSelected ? "scale(1)" : "scale(0.25)",
                    filter: isSelected ? "blur(0px)" : "blur(4px)",
                    transition: "opacity 150ms cubic-bezier(0.23,1,0.32,1), transform 150ms cubic-bezier(0.23,1,0.32,1), filter 150ms cubic-bezier(0.23,1,0.32,1)",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
