"use client";

import { useState } from "react";
import { Modal } from "./modal";
import { Drawer } from "./drawer";
import { Popover } from "./popover";
import { SecondaryButton } from "./secondary-button";
import { PrimaryButton } from "./primary-button";
import { TextInput } from "./text-input";

export function OverlaysDemo() {
  const [modal, setModal]         = useState(false);
  const [drawerRight, setRight]   = useState(false);
  const [drawerBottom, setBottom] = useState(false);

  return (
    <>
      {/* Triggers */}
      <div className="flex flex-wrap gap-3">
        <SecondaryButton onClick={() => setModal(true)}>Open Modal</SecondaryButton>
        <SecondaryButton onClick={() => setRight(true)}>Drawer — Right</SecondaryButton>
        <SecondaryButton onClick={() => setBottom(true)}>Drawer — Bottom</SecondaryButton>
        <Popover
          side="bottom"
          align="start"
          trigger={<SecondaryButton>Open Popover</SecondaryButton>}
        >
          <div className="flex flex-col p-1">
            {[
              { label: "Edit",      sub: "Make changes to this item" },
              { label: "Duplicate", sub: "Create an identical copy" },
              { label: "Archive",   sub: "Hide without deleting" },
            ].map(({ label, sub }) => (
              <button key={label} className="flex flex-col gap-0.5 text-left px-3 py-2 rounded-lg hover:bg-ds-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-100 cursor-pointer">
                <span className="font-sans text-[14px] leading-[18px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0">{label}</span>
                <span className="font-sans text-[14px] leading-[18px] font-medium text-ds-neutral-500">{sub}</span>
              </button>
            ))}
            <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] my-1" />
            <button className="flex flex-col gap-0.5 text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-100 cursor-pointer">
              <span className="font-sans text-[14px] leading-[18px] font-medium text-[#FF0000]">Delete</span>
              <span className="font-sans text-[14px] leading-[18px] font-medium text-ds-neutral-500">Permanently remove this item</span>
            </button>
          </div>
        </Popover>
      </div>

      {/* Overlays */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Delete project?"
        description="This will permanently delete the project and all its contents. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
      />
      <Drawer open={drawerRight} onClose={() => setRight(false)} side="right" title="Notifications">
        <div className="flex flex-col gap-4">
          {[
            { title: "Lena commented on your post", time: "2 min ago" },
            { title: "Your export is ready to download", time: "14 min ago" },
            { title: "Team plan renews in 3 days", time: "1 hour ago" },
            { title: "Marcus invited you to a project", time: "Yesterday" },
          ].map(({ title, time }) => (
            <div key={title} className="flex flex-col gap-1">
              <span className="font-sans text-[14px] leading-[20px] font-medium text-ds-neutral-1000 dark:text-ds-neutral-0">{title}</span>
              <span className="font-sans text-[14px] leading-[18px] font-medium text-ds-neutral-500">{time}</span>
            </div>
          ))}
        </div>
      </Drawer>
      <Drawer open={drawerBottom} onClose={() => setBottom(false)} side="bottom" title="Share">
        <div className="flex flex-col gap-4">
          <p className="font-sans text-[14px] leading-[20px] font-medium text-ds-neutral-600 dark:text-ds-neutral-500">
            Anyone with the link can view this project. You can revoke access at any time.
          </p>
          <div className="flex items-end gap-2">
            <TextInput
              label="Share link"
              readOnly
              value="https://app.example.com/share/xyz123"
            />
            <PrimaryButton>Copy</PrimaryButton>
          </div>
        </div>
      </Drawer>
    </>
  );
}
