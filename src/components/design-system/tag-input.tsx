"use client";

import { useState, useRef, useCallback } from "react";
import { Tag, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
  label: string;
  optional?: boolean;
  defaultTags?: string[];
  suggestions?: string[];
  className?: string;
}

export function TagInput({
  label,
  optional = false,
  defaultTags = [],
  className,
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [removingTags, setRemovingTags] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setInput("");
  };

  const removeTag = useCallback((tag: string) => {
    setRemovingTags((prev) => new Set(prev).add(tag));
    setTimeout(() => {
      setTags((prev) => prev.filter((t) => t !== tag));
      setRemovingTags((prev) => { const s = new Set(prev); s.delete(tag); return s; });
    }, 200);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && tags.length) {
      const last = tags[tags.length - 1];
      if (last && !removingTags.has(last)) removeTag(last);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[14px] leading-[18px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0">
        {label}
        {optional && (
          <span className="text-ds-neutral-500 font-normal"> (Optional)</span>
        )}
      </span>
      <div
        className={cn(
          "flex items-center gap-2 flex-wrap",
          "w-full px-4 py-3 rounded-full",
          "border-[1.5px] border-black/12 dark:border-white/12",
          "bg-white dark:bg-ds-neutral-950",
          "cursor-text",
          className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <Tag className="w-5 h-5 text-ds-neutral-500 shrink-0" strokeWidth={1.5} />

        {tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "tag-pill inline-flex items-center gap-1 px-3 py-2 rounded-full border-[1.5px] border-black/12 dark:border-white/12 text-[14px] leading-[18px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 shrink-0",
              removingTags.has(tag) && "is-removing"
            )}
          >
            {tag}
            <button
              onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
              className="-mr-1 p-1 rounded-full text-ds-neutral-500 hfine:hover:text-ds-neutral-1000 dark:hfine:hover:text-ds-neutral-0 transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <X className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length === 0 ? "Add tags…" : ""}
          className="flex-1 min-w-[80px] text-[14px] leading-[18px] font-medium bg-transparent outline-none text-ds-neutral-1000 dark:text-ds-neutral-0 placeholder:text-ds-neutral-400"
        />

        <ChevronDown className="w-5 h-5 text-ds-neutral-500 shrink-0 ml-auto" strokeWidth={1.5} />
      </div>
    </div>
  );
}
