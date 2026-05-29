"use client";

import { FileText, X, Globe, Users } from "lucide-react";
import { TextInput } from "./text-input";
import { FileDropzone } from "./file-dropzone";
import { TagInput } from "./tag-input";
import { SegmentedControl } from "./segmented-control";
import { PrimaryButton } from "./primary-button";
import { SecondaryButton } from "./secondary-button";
import { IconButton } from "./icon-button";

export function UploadForm() {
  return (
    <div className="bg-white dark:bg-ds-neutral-950 border border-black/12 dark:border-white/12 rounded-[24px] p-6 flex flex-col gap-9 w-full max-w-lg">

      {/* Header */}
      <div className="flex items-center gap-2">
        <FileText className="w-7 h-7 text-ds-neutral-1000 dark:text-ds-neutral-0 shrink-0" strokeWidth={1.5} />
        <p className="flex-1 text-[20px] leading-[24px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0 text-balance">
          Upload files
        </p>
        <IconButton label="Close" icon={<X className="w-4 h-4" strokeWidth={2} />} />
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <TextInput label="Document name" defaultValue="Analysis 2025" />
          <FileDropzone label="Upload the file(s)" />
          <TagInput label="Tags" optional defaultTags={["Analysis", "Intern"]} />
        </div>

        {/* Access section */}
        <div className="flex flex-col gap-2">
          <p className="text-ds-body font-medium text-ds-neutral-1000 dark:text-ds-neutral-0">
            Document access
          </p>
          <p className="text-ds-body font-medium text-ds-neutral-600 dark:text-ds-neutral-500 text-pretty">
            Select who you would like to have access to this document. Visit our help centre to learn more about uploaded document access.
          </p>
        </div>

        <SegmentedControl
          label="Admins only access (Optional)"
          description="Admins can modify and delete all documents. Restrict to admin-only if it contains sensitive or confidential documents."
          defaultValue="everyone"
          segments={[
            { value: "everyone", label: "Everyone",    icon: <Globe  className="w-5 h-5" strokeWidth={1.5} /> },
            { value: "admins",   label: "Admins only", icon: <Users  className="w-5 h-5" strokeWidth={1.5} /> },
          ]}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-4">
        <SecondaryButton>Go Back</SecondaryButton>
        <PrimaryButton>Proceed</PrimaryButton>
      </div>
    </div>
  );
}
