"use client"

import {  User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, UserCog2Icon } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import DeleteDialog from "./delete-dialog";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "nickname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <UserCog2Icon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "isTeacher",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado del instructor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isTeacher = row.getValue("isTeacher") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          isTeacher && "bg-sky-700"
        )}>
          {isTeacher ? "Activa" : "No activa"}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <div className=" p-2 flex justify-end">
        <DeleteDialog id={id} />
        </div>
      )
    }
  }
]
