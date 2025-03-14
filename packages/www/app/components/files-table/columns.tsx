"use client";

import type { Item } from "@boogle/core/item/item";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Item.Info>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const file = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(file.name)}
            >
              Copy file name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const link = document.createElement("a");
                link.href = file.url;
                link.download = file.name;
                link.click();
              }}
            >
              Download file
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "url",
  //   header: "URL",
  // },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "mimeType",
    header: "MIME Type",
  },
  {
    accessorKey: "timeCreated",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.original.timeCreated;
      return <div>{date.toLocaleString()}</div>;
    },
  },
];
