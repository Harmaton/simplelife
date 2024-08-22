"use client";

import { BarChart, Book, BookOpen, BookmarkIcon, LineChart, PartyPopper, PenBox,  UserCircle } from "lucide-react";

import { SidebarItem } from "./sidebar-item";


const routes = [
  {
    icon: PenBox,
    label: "Maestros",
    href: "/admin",
  },
  {
    icon: LineChart,
    label: "Categorías de cursos",
    href: "/admin/categories",
  },
  {
    icon: UserCircle,
    label: "estudiante",
    href: "/admin/students",
  },
  {
    icon: BarChart,
    label: " Admino Analitica",
    href: "/admin/analytics",
  },
  {
    icon: PartyPopper,
    label: "Eventos en persona",
    href: "/admin/inperson",
  },
  {
    icon: BookmarkIcon,
    label: "Agregar libros",
    href: "/admin/addbook",
  }
];


export const SidebarRoutes = () => {

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      {
        
      }
    </div>
  )
}