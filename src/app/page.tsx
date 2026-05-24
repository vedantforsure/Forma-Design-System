import { PrimaryButton } from "@/components/design-system/primary-button";
import { SecondaryButton } from "@/components/design-system/secondary-button";
import { DestructiveButton } from "@/components/design-system/destructive-button";
import { GhostButton } from "@/components/design-system/ghost-button";
import { IconButton } from "@/components/design-system/icon-button";
import { ThemeToggle } from "@/components/design-system/theme-toggle";
import { MotionSwatch } from "@/components/design-system/motion-swatch";
import { UploadForm } from "@/components/design-system/upload-form";
import { PreferencesForm } from "@/components/design-system/preferences-form";
import { RadioDropdown } from "@/components/design-system/radio-dropdown";
import { NavDropdown } from "@/components/design-system/nav-dropdown";

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
  { name: "Display", size: "36px", lineHeight: "40px", weight: "600", sample: "The quick brown fox" },
  { name: "H1",      size: "30px", lineHeight: "36px", weight: "600", sample: "The quick brown fox" },
  { name: "H2",      size: "24px", lineHeight: "32px", weight: "600", sample: "The quick brown fox" },
  { name: "H3",      size: "20px", lineHeight: "28px", weight: "500", sample: "The quick brown fox" },
  { name: "H4",      size: "16px", lineHeight: "24px", weight: "500", sample: "The quick brown fox" },
  { name: "Body",    size: "14px", lineHeight: "20px", weight: "400", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "Small",   size: "13px", lineHeight: "18px", weight: "400", sample: "The quick brown fox jumps over the lazy dog" },
  { name: "Label",   size: "12px", lineHeight: "16px", weight: "500", sample: "UPPERCASE LABEL" },
  { name: "Caption", size: "11px", lineHeight: "16px", weight: "400", sample: "Supporting caption text" },
];

const spacingScale = [
  { token: "1",  px: 4  },
  { token: "2",  px: 8  },
  { token: "3",  px: 12 },
  { token: "4",  px: 16 },
  { token: "5",  px: 20 },
  { token: "6",  px: 24 },
  { token: "8",  px: 32 },
  { token: "10", px: 40 },
  { token: "12", px: 48 },
  { token: "16", px: 64 },
  { token: "20", px: 80 },
  { token: "24", px: 96 },
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
      { label: "Colors", done: true },
      { label: "Typography", done: true },
      { label: "Spacing", done: true },
      { label: "Shadows", done: true },
      { label: "Motion", done: true },
    ],
  },
  {
    section: "Buttons",
    items: [
      { label: "Primary CTA", done: true },
      { label: "Secondary CTA", done: true },
      { label: "Destructive", done: true },
      { label: "Ghost", done: true },
      { label: "Icon Button", done: true },
    ],
  },
  {
    section: "Forms",
    items: [
      { label: "Text Input", done: true },
      { label: "Textarea", done: true },
      { label: "Select", done: true },
      { label: "Checkbox", done: true },
      { label: "Radio", done: true },
      { label: "Toggle", done: true },
    ],
  },
  {
    section: "Feedback",
    items: [
      { label: "Toast", done: false },
      { label: "Alert", done: false },
      { label: "Badge", done: false },
      { label: "Tooltip", done: false },
    ],
  },
  {
    section: "Overlays",
    items: [
      { label: "Modal", done: false },
      { label: "Drawer", done: false },
      { label: "Popover", done: false },
    ],
  },
  {
    section: "Data Display",
    items: [
      { label: "Card", done: false },
      { label: "Avatar", done: false },
      { label: "Tag / Chip", done: false },
      { label: "Table", done: false },
    ],
  },
  {
    section: "Navigation",
    items: [
      { label: "Tabs", done: false },
      { label: "Breadcrumb", done: false },
    ],
  },
];

const totalItems = checklist.flatMap((s) => s.items).length;
const doneItems  = checklist.flatMap((s) => s.items).filter((i) => i.done).length;

// ── Shared text styles (our scale applied as class strings) ───────────────────
// Label  → text-[12px] leading-[16px] font-medium uppercase tracking-widest
// Body   → text-[14px] leading-[20px] font-normal
// Small  → text-[13px] leading-[18px] font-normal
// Caption→ text-[11px] leading-[16px] font-normal

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-200">

      {/* ── Main ── */}
      <main className="px-4 py-10 pb-28 sm:px-16 sm:py-20 sm:pb-24">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 sm:mb-20">
          <div>
            {/* Label */}
            <p className="text-[12px] leading-[16px] font-medium uppercase tracking-widest text-ds-neutral-600 dark:text-ds-neutral-500 mb-3">
              Design System
            </p>
            {/* Display */}
            <h1 className="text-[36px] leading-[40px] font-semibold text-ds-neutral-1000 dark:text-ds-neutral-0">
              Components
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 mb-10 sm:mb-16" />

        {/* ── Colors ── */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-[12px] leading-[16px] font-medium uppercase tracking-widest text-ds-neutral-600 dark:text-ds-neutral-500 mb-10">
            Colors
          </h2>
          <div className="flex flex-col gap-10">
            <div>
              {/* Caption sub-label */}
              <p className="text-[11px] leading-[16px] text-ds-neutral-600 dark:text-ds-neutral-500 mb-4">Neutral</p>
              <div className="flex gap-2 flex-wrap">
                {neutrals.map((c) => (
                  <div key={c.token} className="flex flex-col gap-1.5 w-14">
                    <div className="h-10 w-full rounded-lg border border-black/6 dark:border-white/6" style={{ backgroundColor: c.hex }} />
                    <span className="text-[11px] leading-[16px] text-neutral-500 dark:text-ds-neutral-600 dark:text-ds-neutral-500">{c.token}</span>
                    <span className="text-[11px] leading-[16px] text-ds-neutral-600 dark:text-ds-neutral-500 font-mono">{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] leading-[16px] text-ds-neutral-600 dark:text-ds-neutral-500 mb-4">Semantic</p>
              <div className="flex gap-2">
                {semantics.map((c) => (
                  <div key={c.label} className="flex flex-col gap-1.5 w-14">
                    <div className="h-10 w-full rounded-lg border border-black/6" style={{ backgroundColor: c.hex }} />
                    <span className="text-[11px] leading-[16px] text-neutral-500 dark:text-ds-neutral-600 dark:text-ds-neutral-500">{c.label}</span>
                    <span className="text-[11px] leading-[16px] text-ds-neutral-600 dark:text-ds-neutral-500 font-mono">{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 mb-10 sm:mb-16" />

        {/* ── Typography ── */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-[12px] leading-[16px] font-medium uppercase tracking-widest text-ds-neutral-600 dark:text-ds-neutral-500 mb-10">
            Typography
          </h2>
          <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
            {typeScale.map((t) => (
              <div key={t.name} className="flex flex-col sm:flex-row sm:items-baseline items-start gap-2 sm:gap-12 py-4">
                <div className="w-full sm:w-40 sm:shrink-0 flex flex-col gap-1">
                  {/* Body for token name */}
                  <span className="text-[14px] leading-[20px] text-ds-neutral-1000 dark:text-ds-neutral-0">{t.name}</span>
                  {/* Caption for spec */}
                  <span className="text-[11px] leading-[16px] text-ds-neutral-600 dark:text-ds-neutral-500 font-mono">
                    {t.size} / {t.lineHeight} / {t.weight}
                  </span>
                </div>
                <p
                  className="text-ds-neutral-1000 dark:text-ds-neutral-0"
                  style={{
                    fontSize: t.size,
                    lineHeight: t.lineHeight,
                    fontWeight: t.weight,
                    letterSpacing: t.name === "Label" ? "0.08em" : undefined,
                  }}
                >
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 mb-10 sm:mb-16" />

        {/* ── Spacing ── */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-[12px] leading-[16px] font-medium uppercase tracking-widest text-ds-neutral-600 dark:text-ds-neutral-500 mb-10">
            Spacing
          </h2>
          <div className="flex flex-col gap-3">
            {spacingScale.map((s) => (
              <div key={s.token} className="flex items-center gap-6">
                <div className="w-20 shrink-0 flex justify-between">
                  <span className="text-[11px] leading-[16px] text-neutral-500 dark:text-ds-neutral-600 dark:text-ds-neutral-500 font-mono">{s.token}</span>
                  <span className="text-[11px] leading-[16px] text-ds-neutral-600 dark:text-ds-neutral-500 font-mono">{s.px}px</span>
                </div>
                <div className="h-5 rounded-sm bg-neutral-900 dark:bg-neutral-100" style={{ width: s.px }} />
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 mb-10 sm:mb-16" />

        {/* ── Shadows ── */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-[12px] leading-[16px] font-medium uppercase tracking-widest text-ds-neutral-600 dark:text-ds-neutral-500 mb-10">
            Shadows
          </h2>
          <div className="flex gap-8 flex-wrap">
            {shadows.map((s) => (
              <div key={s.name} className="flex flex-col gap-4">
                <div className="w-32 h-20 rounded-xl bg-white dark:bg-neutral-800" style={{ boxShadow: s.value }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] leading-[20px] text-ds-neutral-1000 dark:text-ds-neutral-0">{s.name}</span>
                  <span className="text-[11px] leading-[16px] text-ds-neutral-600 dark:text-ds-neutral-500">{s.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 mb-10 sm:mb-16" />

        {/* ── Motion ── */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-[12px] leading-[16px] font-medium uppercase tracking-widest text-ds-neutral-600 dark:text-ds-neutral-500 mb-10">
            Motion
          </h2>
          <div className="flex flex-col gap-6">
            {motionTokens.map((m) => (
              <div key={m.name} className="flex flex-col sm:flex-row sm:items-center items-start gap-3 sm:gap-10">
                <div className="w-full sm:w-40 sm:shrink-0 flex flex-col gap-1">
                  <span className="text-[14px] leading-[20px] text-ds-neutral-1000 dark:text-ds-neutral-0">{m.name}</span>
                  <span className="text-[11px] leading-[16px] text-ds-neutral-600 dark:text-ds-neutral-500 font-mono">{m.duration} · {m.easing}</span>
                </div>
                <MotionSwatch duration={m.duration} easing={m.easing} />
                <span className="text-[11px] leading-[16px] text-ds-neutral-600 dark:text-ds-neutral-500">{m.usage}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 mb-10 sm:mb-16" />

        {/* ── Forms ── */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-[12px] leading-[16px] font-medium uppercase tracking-widest text-ds-neutral-600 dark:text-ds-neutral-500 mb-10">
            Forms
          </h2>
          <div className="flex flex-col gap-8">
            <ComponentRow label="Radio Dropdown">
              <RadioDropdown
                label="Sort by"
                defaultValue="newest"
                options={[
                  { value: "newest", label: "Newer to Older" },
                  { value: "oldest", label: "Older to Newer" },
                  { value: "active",  label: "Recently Active" },
                  { value: "priority", label: "Priority" },
                ]}
              />
            </ComponentRow>
            <UploadForm />
            <PreferencesForm />
          </div>
        </section>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800 mb-10 sm:mb-16" />

        {/* ── Buttons ── */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-[12px] leading-[16px] font-medium uppercase tracking-widest text-ds-neutral-600 dark:text-ds-neutral-500 mb-10">
            Buttons
          </h2>
          <div className="flex flex-col gap-8">
            <ComponentRow label="Primary CTA"><PrimaryButton>Proceed</PrimaryButton></ComponentRow>
            <ComponentRow label="Secondary CTA"><SecondaryButton>Go Back</SecondaryButton></ComponentRow>
            <ComponentRow label="Destructive"><DestructiveButton>Delete</DestructiveButton></ComponentRow>
            <ComponentRow label="Ghost"><GhostButton>Cancel</GhostButton></ComponentRow>
            <ComponentRow label="Icon Button"><IconButton label="Add" /></ComponentRow>
          </div>
        </section>

      </main>

      <NavDropdown checklist={checklist} doneItems={doneItems} totalItems={totalItems} />

    </div>
  );
}

function ComponentRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-12">
      <span className="sm:w-40 sm:shrink-0 text-[14px] leading-[20px] text-ds-neutral-600 dark:text-ds-neutral-500">
        {label}
      </span>
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
}
