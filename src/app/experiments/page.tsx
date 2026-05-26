"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/design-system/theme-toggle";
import { CreatorHoverCard } from "@/components/design-system/creator-hover-card";
import { EmailCaptureMorphV2 } from "@/components/design-system/email-capture-morph-v2";

export default function Experiments() {
  const [shimmer, setShimmer] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-200">

      {/* ── Main ── */}
      <main className="px-4 py-10 pb-28 sm:px-16 sm:py-20 sm:pb-24">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[14px] leading-[20px] font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500 mb-3">
              Design System
            </p>
            <h1 className="text-[30px] leading-[32px] font-medium tracking-[-0.6px] text-ds-neutral-1000 dark:text-ds-neutral-0 text-balance">
              Experiments
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Interactions ── */}
        <section>
          <h2 className="text-[24px] leading-[30px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Interactions
          </h2>
          <div className="flex flex-col gap-8">
            <ComponentRow label="Creator Hover Card">
              <div className="py-20">
                <p className="text-[15px] leading-[24px] font-medium text-ds-neutral-600 dark:text-ds-neutral-500">
                  Made with love by{" "}
                  <CreatorHoverCard
                    name="Vedant"
                    handle="@vedantdzn"
                    avatarSrc="/x-pfp.jpg"
                    bio="Product designer"
                    following={124}
                    followers={150}
                    verified
                  >
                    Vedant
                  </CreatorHoverCard>
                </p>
              </div>
            </ComponentRow>

            <ComponentRow label="Fun Waitlist">
              <div className="py-12 flex flex-col items-center gap-10 w-fit">
                <h2
                  className={shimmer ? "headline headline-shimmer" : "headline"}
                  onAnimationEnd={() => setShimmer(false)}
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    lineHeight: "32px",
                    fontWeight: 500,
                    letterSpacing: "-0.6px",
                    textAlign: "center",
                  }}
                >
                  Your next trade awaits
                </h2>
                <EmailCaptureMorphV2 onSuccess={() => setShimmer(true)} />
              </div>
            </ComponentRow>
          </div>
        </section>

      </main>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-[40px] px-4 rounded-full border border-black/16 dark:border-white/16 font-sans font-medium text-[16px] leading-[20px] text-black dark:text-white whitespace-nowrap bg-white dark:bg-ds-neutral-950 transition-[background-color,scale] duration-150 ease-ds active:scale-[0.96] hfine:hover:bg-ds-neutral-100 dark:hfine:hover:bg-ds-neutral-900 active:bg-ds-neutral-400 dark:active:bg-ds-neutral-700 cursor-pointer select-none"
        >
          Components
        </Link>
      </div>

    </div>
  );
}

function ComponentRow({ label, children, id }: { label: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-12 scroll-mt-8">
      <span className="sm:w-40 sm:shrink-0 text-[14px] leading-[18px] font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0">
        {label}
      </span>
      <div className="flex items-center gap-4 flex-1">{children}</div>
    </div>
  );
}
