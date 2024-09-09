"use client"

import { Course, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Skull, UserCog2Icon } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Menú abierto</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
           
              <DropdownMenuItem>
                <Skull className="h-4 w-4 mr-2" />
                Profesora de prohibición
              </DropdownMenuItem>
        
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
