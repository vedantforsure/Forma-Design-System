"use client";

import { Layers, Globe, Users, X } from "lucide-react";
import { TextInput } from "./text-input";
import { Textarea } from "./textarea";
import { FileDropzone } from "./file-dropzone";
import { TagInput } from "./tag-input";
import { SegmentedControl } from "./segmented-control";
import { RadioDropdown } from "./radio-dropdown";
import { RadioGroup } from "./radio-group";
import { Checkbox } from "./checkbox";
import { Toggle } from "./toggle";
import { PrimaryButton } from "./primary-button";
import { SecondaryButton } from "./secondary-button";
import { IconButton } from "./icon-button";

export function ShowcaseForm() {
  return (
    <div className="bg-white dark:bg-ds-neutral-950 border border-black/12 dark:border-white/12 rounded-[24px] p-[20px] flex flex-col gap-[20px] w-full max-w-lg">

      {/* Header */}
      <div className="flex items-center gap-[8px]">
        <Layers className="w-7 h-7 text-ds-neutral-1000 dark:text-ds-neutral-0 shrink-0" strokeWidth={1.5} />
        <p className="flex-1 text-[20px] leading-[24px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 text-balance">
          New project
        </p>
        <IconButton label="Close" icon={<X className="w-4 h-4" strokeWidth={2} />} />
      </div>

      {/* Basics */}
      <div className="flex flex-col gap-[12px]">
        <TextInput label="Project name" defaultValue="Design System v2" />
        <Textarea label="Description" optional placeholder="What is this project about…" />
        <div className="flex flex-col gap-[8px]">
          <span className="text-[14px] leading-[18px] font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0">
            Category
          </span>
          <RadioDropdown
            label="Select category"
            defaultValue="design"
            options={[
              { value: "design",      label: "Design" },
              { value: "engineering", label: "Engineering" },
              { value: "research",    label: "Research" },
              { value: "marketing",   label: "Marketing" },
            ]}
          />
        </div>
      </div>

      {/* Files */}
      <div className="flex flex-col gap-[12px]">
        <FileDropzone label="Upload assets" />
        <TagInput label="Labels" optional defaultTags={["Design", "Q3"]} />
      </div>

      {/* Access */}
      <SegmentedControl
        label="Visibility"
        description="Control who can view and edit this project."
        defaultValue="everyone"
        segments={[
          { value: "everyone", label: "Everyone",    icon: <Globe className="w-5 h-5" strokeWidth={1.5} /> },
          { value: "admins",   label: "Admins only", icon: <Users className="w-5 h-5" strokeWidth={1.5} /> },
        ]}
      />

      {/* Frequency */}
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
      <div>
        <p className="text-[14px] leading-[18px] font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0 mb-[8px]">
          Notify me about
        </p>
        <div className="flex flex-col gap-[12px]">
          <Checkbox label="Comments"       description="When someone comments on a task" defaultChecked />
          <Checkbox label="Status changes" description="When a task is completed or blocked" defaultChecked />
          <Checkbox label="Weekly report"  description="Summary of activity every Monday" />
        </div>
      </div>

      {/* Toggles */}
      <div>
        <p className="text-[14px] leading-[18px] font-medium tracking-[0.4px] text-ds-neutral-1000 dark:text-ds-neutral-0 mb-[8px]">
          Integrations
        </p>
        <div className="flex flex-col gap-[12px]">
          <Toggle label="Slack notifications" description="Send alerts to your Slack workspace" defaultChecked />
          <Toggle label="Calendar sync"       description="Sync deadlines and events to your calendar" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-[8px]">
        <SecondaryButton>Cancel</SecondaryButton>
        <PrimaryButton>Create project</PrimaryButton>
      </div>

    </div>
  );
}
