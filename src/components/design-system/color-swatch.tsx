"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ColorSwatchProps {
  label: string;
  hex: string;
}

const ICON_TRANSITION = "opacity 150ms cubic-bezier(0.23,1,0.32,1), transform 150ms cubic-bezier(0.23,1,0.32,1), filter 150ms cubic-bezier(0.23,1,0.32,1)";

export function ColorSwatch({ label, hex }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-white dark:bg-ds-neutral-950 border border-black/16 dark:border-white/16 flex flex-col gap-[8px] items-start overflow-clip p-[8px] relative rounded-[12px] w-32">
      <div
        className="relative rounded-[4px] shrink-0 w-full"
        style={{ backgroundColor: hex, height: "100px" }}
      >
        <button
          aria-label={`Copy ${hex}`}
          onClick={handleCopy}
          className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-[background-color,scale] duration-150 active:scale-[0.96] cursor-pointer"
        >
          <div className="relative w-3.5 h-3.5">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: copied ? 1 : 0,
                transform: copied ? "scale(1)" : "scale(0.25)",
                filter: copied ? "blur(0px)" : "blur(4px)",
                transition: ICON_TRANSITION,
              }}
            >
              <Check className="w-3.5 h-3.5 text-ds-neutral-1000" strokeWidth={2} />
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                opacity: copied ? 0 : 1,
                transform: copied ? "scale(0.25)" : "scale(1)",
                filter: copied ? "blur(4px)" : "blur(0px)",
                transition: ICON_TRANSITION,
              }}
            >
              <Copy className="w-3.5 h-3.5 text-ds-neutral-1000" strokeWidth={2} />
            </div>
          </div>
        </button>
      </div>
      <div className="flex flex-col gap-[4px] items-start shrink-0 font-medium text-[14px]">
        <p className="leading-[20px] text-ds-neutral-1000 dark:text-ds-neutral-0">{label}</p>
        <p className="leading-[22px] text-ds-neutral-600 dark:text-ds-neutral-500 font-mono">{hex}</p>
      </div>
    </div>
  );
}
