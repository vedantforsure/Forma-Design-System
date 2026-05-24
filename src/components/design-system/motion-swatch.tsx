"use client";

import { useState } from "react";

export function MotionSwatch({ duration, easing }: { duration: string; easing: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-48 h-8 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden cursor-pointer relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 bg-neutral-900 dark:bg-neutral-100 rounded-full"
        style={{
          transformOrigin: "left center",
          transform: hovered ? "scaleX(1)" : "scaleX(0.1)",
          transition: `transform ${duration} ${easing}`,
        }}
      />
    </div>
  );
}
