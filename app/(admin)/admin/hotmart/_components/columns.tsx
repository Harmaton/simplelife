"use client";

import { Allpurchase, Course, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  PersonStanding,
  Phone,
  Skull,
  UserCog2Icon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FaMoneyBillWave } from "react-icons/fa";

export const columns: ColumnDef<Allpurchase>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre del paquete
          <UserCog2Icon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "buyerEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correo electrónico del comprador
          <Phone className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "buyerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre del comprador
          <PersonStanding className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio pagado
          <FaMoneyBillWave className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
