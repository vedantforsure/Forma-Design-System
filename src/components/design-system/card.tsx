import { cn } from "@/lib/utils";

interface SlotProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: SlotProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-ds-neutral-1000 rounded-[20px] border border-black/16 dark:border-white/16 p-4 flex flex-col gap-3",
        className,
      )}
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: SlotProps) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

export function CardTitle({ className, children }: SlotProps) {
  return (
    <h3
      className={cn(
        "text-ds-body font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children }: SlotProps) {
  return (
    <p
      className={cn(
        "text-ds-body font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function CardContent({ className, children }: SlotProps) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ className, children }: SlotProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  );
}
