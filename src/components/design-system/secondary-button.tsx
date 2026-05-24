"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function SecondaryButton({
  children = "Go Back",
  className,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        "px-4 py-2 min-w-[96px]",
        "rounded-full",
        "border border-black/8 dark:border-white/8",
        "font-sans font-medium text-[16px] leading-[20px] text-black dark:text-white whitespace-nowrap",
        "bg-white dark:bg-ds-neutral-950",
        "transition-[colors,transform] duration-150 ease-ds",
        "active:scale-[0.97]",
        "hfine:hover:bg-ds-neutral-100 dark:hfine:hover:bg-ds-neutral-900",
        "active:bg-ds-neutral-400 dark:active:bg-ds-neutral-700",
        "cursor-pointer",
        "select-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
