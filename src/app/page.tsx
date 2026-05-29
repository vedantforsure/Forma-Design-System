import Link from "next/link";
import { PrimaryButton } from "@/components/design-system/primary-button";
import { SecondaryButton } from "@/components/design-system/secondary-button";
import { DestructiveButton } from "@/components/design-system/destructive-button";
import { GhostButton } from "@/components/design-system/ghost-button";
import { IconButton } from "@/components/design-system/icon-button";
import { ThemeToggle } from "@/components/design-system/theme-toggle";
import { MotionSwatch } from "@/components/design-system/motion-swatch";
import { ShowcaseForm } from "@/components/design-system/showcase-form";
import { NavDropdown } from "@/components/design-system/nav-dropdown";
import { ColorSwatch } from "@/components/design-system/color-swatch";
import { ContactCard } from "@/components/design-system/contact-card";
import { ToastDemo } from "@/components/design-system/toast-demo";
import { OverlaysDemo } from "@/components/design-system/overlays-demo";
import { Alert } from "@/components/design-system/alert";
import { Badge } from "@/components/design-system/badge";
import { TooltipDemo } from "@/components/design-system/tooltip-demo";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/design-system/card";
import { Avatar } from "@/components/design-system/avatar";
import { TagDemo } from "@/components/design-system/tag-demo";
import { ComponentTableDemo } from "@/components/design-system/component-table-demo";
import { Tabs } from "@/components/design-system/tabs";
import { Breadcrumb } from "@/components/design-system/breadcrumb";

// ── Foundations data ──────────────────────────────────────────────────────────

const neutrals = [
  { token: "0",    hex: "#ffffff" },
  { token: "50",   hex: "#f9f9f9" },
  { token: "100",  hex: "#f2f2f2" },
  { token: "200",  hex: "#e0e0e0" },
  { token: "300",  hex: "#c8c8c8" },
  { token: "400",  hex: "#bbbbbb" },
  { token: "500",  hex: "#888888" },
  { token: "600",  hex: "#666666" },
  { token: "700",  hex: "#444444" },
  { token: "800",  hex: "#333333" },
  { token: "900",  hex: "#1a1a1a" },
  { token: "950",  hex: "#111111" },
  { token: "1000", hex: "#000000" },
];

const semantics = [
  { label: "Destructive", hex: "#FF0000" },
  { label: "Success",     hex: "#00CC44" },
  { label: "Warning",     hex: "#FF9900" },
  { label: "Info",        hex: "#2979FF" },
];

const typeScale = [
  { name: "Display", size: "30px", lineHeight: "32px", weight: "500", letterSpacing: "-0.6px", sample: "The quick brown fox" },
  { name: "H1",      size: "24px", lineHeight: "30px", weight: "500", letterSpacing: "-0.2px", sample: "The quick brown fox" },
  { name: "H2",      size: "16px", lineHeight: "20px", weight: "500", letterSpacing: "",        sample: "The quick brown fox" },
  { name: "Body",    size: "16px", lineHeight: "20px", weight: "500", letterSpacing: "",        sample: "The quick brown fox jumps over the lazy dog", color: "text-ds-neutral-600 dark:text-ds-neutral-500" },
  { name: "Small",   size: "14px", lineHeight: "18px", weight: "500", letterSpacing: "",        sample: "The quick brown fox jumps over the lazy dog", color: "text-ds-neutral-450" },
  { name: "Buttons", size: "16px", lineHeight: "20px", weight: "500", letterSpacing: "",       sample: "Button label" },
];

const spacingTokens = [
  { name: "xs", px: 4,   usage: "Label to content (h6)" },
  { name: "sm", px: 8,   usage: "Heading to content (h4+), between buttons" },
  { name: "md", px: 12,  usage: "Related fields within a group" },
  { name: "lg", px: 20,  usage: "Subsections within a component, card padding" },
  { name: "xl", px: 100, usage: "Major page sections" },
];

const shadows = [
  { name: "sm", value: "0 1px 2px rgba(0,0,0,0.04)",  usage: "Inputs, subtle lift" },
  { name: "md", value: "0 2px 8px rgba(0,0,0,0.06)",  usage: "Cards, dropdowns" },
  { name: "lg", value: "0 4px 16px rgba(0,0,0,0.08)", usage: "Modals, panels" },
  { name: "xl", value: "0 8px 32px rgba(0,0,0,0.10)", usage: "Large overlays" },
];

const motionTokens = [
  { name: "Fast", duration: "100ms", easing: "cubic-bezier(0.23, 1, 0.32, 1)", usage: "Icon swaps, indicators" },
  { name: "Base", duration: "150ms", easing: "cubic-bezier(0.23, 1, 0.32, 1)", usage: "Color, opacity, borders" },
  { name: "Slow", duration: "300ms", easing: "cubic-bezier(0.77, 0, 0.175, 1)", usage: "Layout shifts, reveals" },
];

// ── Checklist ─────────────────────────────────────────────────────────────────

const checklist = [
  {
    section: "Foundations",
    items: [
      { label: "Colors",     done: true, sectionId: "colors" },
      { label: "Typography", done: true, sectionId: "typography" },
      { label: "Spacing",    done: true, sectionId: "spacing" },
      { label: "Shadows",    done: true, sectionId: "shadows" },
      { label: "Motion",     done: true, sectionId: "motion" },
    ],
  },
  {
    section: "Buttons",
    items: [
      { label: "Primary CTA",   done: true, sectionId: "buttons" },
      { label: "Secondary CTA", done: true, sectionId: "buttons" },
      { label: "Destructive",   done: true, sectionId: "buttons" },
      { label: "Ghost",         done: true, sectionId: "buttons" },
      { label: "Icon Button",   done: true, sectionId: "buttons" },
    ],
  },
  {
    section: "Forms",
    items: [
      { label: "Text Input", done: true, sectionId: "forms" },
      { label: "Textarea",   done: true, sectionId: "forms" },
      { label: "Select",     done: true, sectionId: "forms" },
      { label: "Checkbox",   done: true, sectionId: "forms" },
      { label: "Radio",      done: true, sectionId: "forms" },
      { label: "Toggle",     done: true, sectionId: "forms" },
    ],
  },
  {
    section: "Feedback",
    items: [
      { label: "Toast",   done: true, sectionId: "feedback-toast" },
      { label: "Alert",   done: true, sectionId: "feedback-alert" },
      { label: "Badge",   done: true, sectionId: "feedback-badge" },
      { label: "Tooltip", done: true, sectionId: "feedback-tooltip" },
    ],
  },
  {
    section: "Overlays",
    items: [
      { label: "Modal",   done: true, sectionId: "overlays" },
      { label: "Drawer",  done: true, sectionId: "overlays" },
      { label: "Popover", done: true, sectionId: "overlays" },
    ],
  },
  {
    section: "Data Display",
    items: [
      { label: "Card",       done: true, sectionId: "dd-card" },
      { label: "Avatar",     done: true, sectionId: "dd-avatar" },
      { label: "Tag / Chip", done: true, sectionId: "dd-tag" },
      { label: "Table",      done: true, sectionId: "dd-table" },
    ],
  },
  {
    section: "Navigation",
    items: [
      { label: "Tabs",       done: true, sectionId: "nav-tabs" },
      { label: "Breadcrumb", done: true, sectionId: "nav-breadcrumb" },
    ],
  },
];

const totalItems = checklist.flatMap((s) => s.items).length;
const doneItems  = checklist.flatMap((s) => s.items).filter((i) => i.done).length;

// ── Shared text styles (our scale applied as class strings) ───────────────────
// Label  → text-[12px] leading-[16px] font-medium uppercase tracking-widest
// Body   → text-ds-body font-normal
// Small  → text-[13px] leading-[18px] font-normal
// Caption→ text-[11px] leading-[16px] font-normal

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-200">

      {/* ── Main ── */}
      <main className="px-4 py-10 pb-28 sm:px-16 sm:py-20 sm:pb-24">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            {/* Label */}
            <p className="text-ds-small font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500 mb-3">
              Design System
            </p>
            {/* Display */}
            <h1 className="text-ds-display font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 text-balance">
              Components
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Colors ── */}
        <section id="colors" className="scroll-mt-8">
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Colors
          </h2>
          <div className="flex flex-col gap-10">
            <div>
              {/* Caption sub-label */}
              <p className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500 mb-4">Neutral</p>
              <div className="flex gap-2 flex-wrap">
                {neutrals.map((c) => (
                  <ColorSwatch key={c.token} label={c.token} hex={c.hex} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500 mb-4">Semantic</p>
              <div className="flex gap-2">
                {semantics.map((c) => (
                  <ColorSwatch key={c.label} label={c.label} hex={c.hex} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Typography ── */}
        <section id="typography" className="scroll-mt-8">
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Typography
          </h2>
          <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
            {typeScale.map((t) => (
              <div key={t.name} className="flex flex-col sm:flex-row sm:items-baseline items-start gap-2 sm:gap-12 py-4">
                <div className="w-full sm:w-40 sm:shrink-0 flex flex-col gap-1">
                  <span className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0">{t.name}</span>
                  {/* Caption for spec */}
                  <span className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500 font-mono">
                    {t.size} / {t.lineHeight} / {t.weight}{t.letterSpacing ? ` / ${t.letterSpacing}` : ""}
                  </span>
                </div>
                <p
                  className={t.color ?? "text-ds-neutral-1000 dark:text-ds-neutral-0"}
                  style={{
                    fontSize: t.size,
                    lineHeight: t.lineHeight,
                    fontWeight: t.weight,
                    letterSpacing: t.letterSpacing || undefined,
                  }}
                >
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Spacing ── */}
        <section id="spacing" className="scroll-mt-8">
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Spacing
          </h2>
          <div className="flex flex-col gap-3">
            {spacingTokens.map((s) => (
              <div key={s.name} className="flex items-center gap-8">
                <span className="w-6 shrink-0 text-ds-body font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0">{s.name}</span>
                <span className="w-12 shrink-0 text-ds-body font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500">{s.px}px</span>
                <div className="h-[6px] rounded-full bg-ds-neutral-1000 dark:bg-ds-neutral-0 shrink-0" style={{ width: s.px }} />
                <span className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500 text-pretty">{s.usage}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Shadows ── */}
        <section id="shadows" className="scroll-mt-8">
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Shadows
          </h2>
          <div className="flex gap-8 flex-wrap">
            {shadows.map((s) => (
              <div key={s.name} className="flex flex-col gap-4">
                <div className="w-32 h-20 rounded-xl bg-white dark:bg-neutral-800" style={{ boxShadow: s.value }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0">{s.name}</span>
                  <span className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500 text-pretty">{s.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Motion ── */}
        <section id="motion" className="scroll-mt-8">
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Motion
          </h2>
          <div className="flex flex-col gap-6">
            {motionTokens.map((m) => (
              <div key={m.name} className="flex flex-col sm:flex-row sm:items-center items-start gap-3 sm:gap-10">
                <div className="w-full sm:w-40 sm:shrink-0 flex flex-col gap-1">
                  <span className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0">{m.name}</span>
                  <span className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500 font-mono">{m.duration} · {m.easing}</span>
                </div>
                <MotionSwatch duration={m.duration} easing={m.easing} />
                <span className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500">{m.usage}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Forms ── */}
        <section id="forms" className="scroll-mt-8">
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Forms
          </h2>
          <ShowcaseForm />
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Buttons ── */}
        <section id="buttons" className="scroll-mt-8">
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Buttons
          </h2>
          <div className="flex flex-col gap-8">
            <ComponentRow label="Primary CTA"><PrimaryButton>Click me</PrimaryButton></ComponentRow>
            <ComponentRow label="Secondary CTA"><SecondaryButton>Click me</SecondaryButton></ComponentRow>
            <ComponentRow label="Destructive"><DestructiveButton>Delete</DestructiveButton></ComponentRow>
            <ComponentRow label="Ghost"><GhostButton>Cancel</GhostButton></ComponentRow>
            <ComponentRow label="Icon Button"><IconButton label="Add" /></ComponentRow>
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Feedback ── */}
        <section id="feedback" className="scroll-mt-8">
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Feedback
          </h2>
          <div className="flex flex-col gap-8">
            <ComponentRow id="feedback-toast"   label="Toast"><ToastDemo /></ComponentRow>
            <ComponentRow id="feedback-tooltip" label="Tooltip"><TooltipDemo /></ComponentRow>
            <ComponentRow id="feedback-badge"   label="Badge">
              <div className="flex flex-wrap gap-2">
                <Badge variant="neutral" label="Neutral" dot />
                <Badge variant="info"    label="Info"    dot />
                <Badge variant="success" label="Success" dot />
                <Badge variant="warning" label="Warning" dot />
                <Badge variant="error"   label="Error"   dot />
              </div>
            </ComponentRow>
            <div id="feedback-alert" className="flex flex-col sm:flex-row items-start gap-2 sm:gap-12 scroll-mt-8">
              <span className="sm:w-40 sm:shrink-0 text-ds-body font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 sm:pt-4">
                Alert
              </span>
              <div className="flex flex-col gap-3 sm:w-[400px]">
                <Alert variant="info"    title="Heads up" description="Your session will expire in 10 minutes." />
                <Alert variant="success" title="Changes saved" description="Your profile has been updated successfully." />
                <Alert variant="warning" title="Unsaved changes" description="You have changes that haven't been saved yet." />
                <Alert variant="error"   title="Something went wrong" description="We couldn't process your request. Try again." />
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Overlays ── */}
        <section id="overlays" className="scroll-mt-8">
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Overlays
          </h2>
          <OverlaysDemo />
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Data Display ── */}
        <section>
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Data Display
          </h2>
          <div className="flex flex-col gap-8">

            {/* Card */}
            <div id="dd-card" className="flex flex-col sm:flex-row items-start gap-2 sm:gap-12 scroll-mt-8">
              <span className="sm:w-40 sm:shrink-0 text-ds-body font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0">
                Card
              </span>
              <Card className="w-[280px]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar src="/x-pfp.jpg" alt="Vedant" size="lg" />
                    <div className="flex flex-col gap-[2px]">
                      <CardTitle>Vedant Lad</CardTitle>
                      <CardDescription>Product Designer</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-ds-body font-medium tracking-[0.4px] text-ds-neutral-600 dark:text-ds-neutral-500">
                    Building polished, purposeful interfaces that feel natural to use.
                  </p>
                </CardContent>
                <CardFooter>
                  <PrimaryButton>Follow</PrimaryButton>
                  <GhostButton>Message</GhostButton>
                </CardFooter>
              </Card>
            </div>

            {/* Avatar */}
            <ComponentRow id="dd-avatar" label="Avatar">
              <Avatar src="/x-pfp.jpg" alt="Vedant" size="sm" />
              <Avatar src="/x-pfp.jpg" alt="Vedant" size="md" />
              <Avatar src="/x-pfp.jpg" alt="Vedant" size="lg" />
              <Avatar fallback="VL" size="sm" />
              <Avatar fallback="VL" size="md" />
              <Avatar fallback="VL" size="lg" />
            </ComponentRow>

            {/* Tag / Chip */}
            <ComponentRow id="dd-tag" label="Tag / Chip">
              <TagDemo />
            </ComponentRow>

            {/* Table */}
            <div id="dd-table" className="flex flex-col sm:flex-row items-start gap-2 sm:gap-12 scroll-mt-8">
              <span className="sm:w-40 sm:shrink-0 text-ds-body font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0">
                Table
              </span>
              <ComponentTableDemo />
            </div>

          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-[50px]" />

        {/* ── Navigation ── */}
        <section>
          <h2 className="text-ds-h1 font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 mb-10 text-balance">
            Navigation
          </h2>
          <div className="flex flex-col gap-8">

            <div id="nav-tabs" className="flex flex-col sm:flex-row items-start gap-2 sm:gap-12 scroll-mt-8">
              <span className="sm:w-40 sm:shrink-0 text-ds-body font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0">
                Tabs
              </span>
              <Tabs
                tabs={[
                  { label: "Overview",    value: "overview" },
                  { label: "Components",  value: "components" },
                  { label: "Tokens",      value: "tokens" },
                  { label: "Changelog",   value: "changelog" },
                ]}
                className="w-full sm:max-w-sm"
              />
            </div>

            <ComponentRow id="nav-breadcrumb" label="Breadcrumb">
              <Breadcrumb
                items={[
                  { label: "Design System", href: "#" },
                  { label: "Components",    href: "#" },
                  { label: "Buttons" },
                ]}
              />
            </ComponentRow>

          </div>
        </section>


      </main>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        <Link
          href="/experiments"
          className="inline-flex items-center justify-center h-[40px] px-4 rounded-full border border-black/16 dark:border-white/16 font-sans font-medium text-ds-body text-black dark:text-white whitespace-nowrap bg-white dark:bg-ds-neutral-950 transition-[background-color,scale] duration-150 ease-ds active:scale-[0.96] hfine:hover:bg-ds-neutral-100 dark:hfine:hover:bg-ds-neutral-900 active:bg-ds-neutral-400 dark:active:bg-ds-neutral-700 cursor-pointer select-none"
        >
          Experiments
        </Link>
        <NavDropdown checklist={checklist} doneItems={doneItems} totalItems={totalItems} />
      </div>

    </div>
  );
}


function ComponentRow({ label, children, id }: { label: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-12 scroll-mt-8">
      <span className="sm:w-40 sm:shrink-0 text-ds-body font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0">
        {label}
      </span>
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
}
