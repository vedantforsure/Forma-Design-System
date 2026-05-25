"use client";

import { Tooltip } from "./tooltip";

const triggers = [
  { side: "top",    label: "Autosave", content: "Your changes are saved automatically every 30 seconds" },
  { side: "right",  label: "Invite",   content: "Invite teammates by email or shareable link" },
  { side: "bottom", label: "Archive",  content: "Archived projects are hidden but not deleted" },
  { side: "left",   label: "API key",  content: "Keep this secret — it grants full account access" },
] as const;

export function TooltipDemo() {
  return (
    <div className="flex items-center gap-6 py-8">
      {triggers.map(({ side, label, content }) => (
        <Tooltip key={side} content={content} side={side}>
          <button className="inline-flex items-center gap-[6px] p-1 rounded-md font-sans text-[14px] leading-[18px] font-medium text-ds-neutral-600 dark:text-ds-neutral-500 cursor-pointer select-none">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 7v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="4.75" r="0.75" fill="currentColor" />
            </svg>
            {label}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
