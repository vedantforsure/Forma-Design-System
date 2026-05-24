"use client";

import { Settings } from "lucide-react";
import { Textarea } from "./textarea";
import { Checkbox } from "./checkbox";
import { RadioGroup } from "./radio-group";
import { Toggle } from "./toggle";
import { PrimaryButton } from "./primary-button";
import { SecondaryButton } from "./secondary-button";

export function PreferencesForm() {
  return (
    <div className="bg-white dark:bg-ds-neutral-950 border border-black/12 dark:border-white/12 rounded-[24px] p-6 flex flex-col gap-9 w-full max-w-lg">

      {/* Header */}
      <div className="flex items-center gap-2">
        <Settings className="w-7 h-7 text-ds-neutral-1000 dark:text-ds-neutral-0 shrink-0" strokeWidth={1.5} />
        <p className="flex-1 text-[20px] leading-[24px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0">
          Preferences
        </p>
      </div>

      <div className="flex flex-col gap-8">

        {/* Textarea */}
        <Textarea
          label="Bio"
          optional
          placeholder="Tell us about yourself…"
        />

        {/* Radio */}
        <RadioGroup
          label="Notification frequency"
          defaultValue="daily"
          options={[
            { value: "realtime", label: "Real-time",      description: "Get notified as events happen" },
            { value: "daily",    label: "Daily digest",   description: "One summary email per day" },
            { value: "weekly",   label: "Weekly summary", description: "A roundup every Monday morning" },
          ]}
        />

        {/* Checkboxes */}
        <div className="flex flex-col gap-4">
          <p className="text-[16px] leading-[24px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0">
            Email me about
          </p>
          <Checkbox label="Product updates"  description="New features and improvements" defaultChecked />
          <Checkbox label="Security alerts"  description="Sign-in attempts and password changes" defaultChecked />
          <Checkbox label="Newsletter"       description="Tips, stories, and inspiration" />
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-4">
          <p className="text-[16px] leading-[24px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0">
            Integrations
          </p>
          <Toggle label="Slack notifications" description="Send alerts to your Slack workspace" defaultChecked />
          <Toggle label="Calendar sync"       description="Sync deadlines and events to your calendar" />
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-4">
        <SecondaryButton>Discard</SecondaryButton>
        <PrimaryButton>Save changes</PrimaryButton>
      </div>

    </div>
  );
}
