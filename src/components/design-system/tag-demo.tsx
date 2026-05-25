"use client";

import { useState } from "react";
import { Tag } from "./tag";

const INITIAL = ["React", "TypeScript", "Design", "UI", "Tokens"];

export function TagDemo() {
  const [tags, setTags] = useState(INITIAL);
  const [removing, setRemoving] = useState<Set<string>>(new Set());

  function handleRemove(label: string) {
    setRemoving((prev) => new Set([...prev, label]));
    setTimeout(() => {
      setTags((prev) => prev.filter((t) => t !== label));
      setRemoving((prev) => {
        const next = new Set(prev);
        next.delete(label);
        return next;
      });
    }, 210);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          removing={removing.has(tag)}
          onRemove={() => handleRemove(tag)}
        />
      ))}
    </div>
  );
}
