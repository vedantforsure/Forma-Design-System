"use client";

import { Table, type TableColumn } from "./table";
import { Badge } from "./badge";

type Row = { component: string; category: string; status: string };

const rows: Row[] = [
  { component: "Card",       category: "Data Display", status: "Done" },
  { component: "Avatar",     category: "Data Display", status: "Done" },
  { component: "Tag / Chip", category: "Data Display", status: "Done" },
  { component: "Tabs",       category: "Navigation",   status: "Pending" },
  { component: "Breadcrumb", category: "Navigation",   status: "Pending" },
];

const columns: TableColumn<Row>[] = [
  { key: "component", label: "Component" },
  { key: "category",  label: "Category" },
  {
    key: "status",
    label: "Status",
    render: (v) => (
      <Badge
        variant={v === "Done" ? "success" : "warning"}
        label={v as string}
        dot
      />
    ),
  },
];

export function ComponentTableDemo() {
  return <Table columns={columns} rows={rows} />;
}
