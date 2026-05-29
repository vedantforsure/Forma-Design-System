"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  label: string;
  accept?: string;
  hint?: string;
  className?: string;
  onChange?: (files: FileList | null) => void;
}

export function FileDropzone({
  label,
  accept,
  hint = "PDF, JPG, PNG, JPEG, DOC, DOCX, CSV, XML, XMLX, XLS, XLSX (max 10MB)",
  className,
  onChange,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onChange?.(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-ds-body font-medium text-ds-neutral-1000 dark:text-ds-neutral-0">
        {label}
      </span>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "relative w-full flex flex-col items-center justify-center gap-3",
          "px-4 py-7 rounded-xl",
          "cursor-pointer select-none",
          "transition-colors duration-150 ease-ds",
          isDragOver
            ? "bg-ds-neutral-100 dark:bg-ds-neutral-800"
            : "hfine:hover:bg-ds-neutral-50 dark:hfine:hover:bg-ds-neutral-900",
          className
        )}
      >
        {/* SVG dashed border — matches Figma's dash rendering exactly */}
        <svg
          className={cn(
            "absolute inset-0 pointer-events-none transition-colors duration-150 ease-ds",
            isDragOver ? "text-black/40 dark:text-white/40" : "text-black/12 dark:text-white/12"
          )}
          style={{ width: "100%", height: "100%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.75"
            y="0.75"
            style={{ width: "calc(100% - 1.5px)", height: "calc(100% - 1.5px)" }}
            rx="11.25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 5"
            strokeLinecap="round"
          />
        </svg>
        <UploadCloud className="w-7 h-7 text-ds-neutral-1000 dark:text-ds-neutral-0" strokeWidth={1.5} />
        <div className="text-center">
          <p className="text-ds-body font-medium">
            <span className="text-ds-neutral-1000 dark:text-ds-neutral-0">Click to upload</span>
            <span className="text-ds-neutral-600 dark:text-ds-neutral-500"> or drag and drop</span>
          </p>
          <p className="text-ds-body font-medium text-ds-neutral-600 dark:text-ds-neutral-500 mt-0.5">
            {hint}
          </p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => onChange?.(e.target.files)}
      />
    </div>
  );
}
