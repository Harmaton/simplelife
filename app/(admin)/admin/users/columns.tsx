"use client"

import {  User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, UserCheck, UserCog2Icon } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Correo electrónico
          <UserCheck className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className=" p-2 flex justify-end">
        {/* <DeleteDialog id={id} /> */}
        </div>
      )
    }
  }
]
