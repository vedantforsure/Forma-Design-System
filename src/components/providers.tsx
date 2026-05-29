"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";

function ToasterWithTheme() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-right"
      richColors
      style={{ "--border-radius": "12px" } as React.CSSProperties}
      toastOptions={{
        style: {
          padding: "20px",
          gap: "8px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        },
        classNames: {
          title: "font-sans text-ds-body font-medium tracking-[0.4px]",
          description: "font-sans text-ds-body font-medium tracking-[0.4px] opacity-70",
        },
      }}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme={false}>
      {children}
      <ToasterWithTheme />
    </ThemeProvider>
  );
}
