"use client";

import {
  MobileSidebar,
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { IconBrandTabler } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import {
  BellDot,
  CalendarCheck,
  CalendarCog,
  Goal,
  ListVideoIcon,
  TicketSlash,
} from "lucide-react";
import { Logo, LogoIcon } from "@/components/logo";

import { FaMoneyBill } from "react-icons/fa";
import Avatar from "@/components/icon-avatar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) {
    // If user is not authenticated, redirect them to the login page
    return (
      <main className="text-center mt-10">
        <h2>You are not logged in</h2>
        <Link href="/login">
          <Button className="mt-10 bg-purple-800">Sign In</Button>
        </Link>
      </main>
    );
  }

  const links = [
    {
      label: "Cursos Panel",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Horario del curso",
      href: "/dashboard/schedule",
      icon: (
        <CalendarCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Entradas de clase",
      href: "/dashboard/tickets",
      icon: (
        <ListVideoIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Calendario de tutorías",
      href: "/dashboard/free-mentoring",
      icon: (
        <CalendarCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Eventos",
      href: "/dashboard/inperson-events",
      icon: (
        <TicketSlash className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Meditacion",
      href: "/dashboard/meditation",
      icon: (
        <BellDot className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Teillen Team",
      href: "https://teilenteam.com/",
      icon: (
        <Goal className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Donación",
      href: "https://paypal.me/BiblioOnlineCoaching?country.x=PE&locale.x=en_US",
      icon: (
        <FaMoneyBill className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <SidebarProvider>
      <div className="h-full scrollbar-thin scrollbar-rounded-full">
        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <MobileSidebar>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Logo />
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
              <div>
                <Avatar seed={user?.email || ""} />
              </div>
            </SidebarBody>
          </MobileSidebar>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
              <div>
                <SidebarLink
                  link={{
                    label: user.email || "User",
                    href: "#",
                    icon: <Avatar seed={user?.email || ""} />,
                  }}
                />
              </div>
            </SidebarBody>
          </Sidebar>
        </div>
      </div>
      <main className="p-2 md:p-10 rounded-tl-2xl border flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex flex-row space-x-4 justify-end ">
          <Link href={"/"}>
            <Button className="mt-5 bg-violet-800 text-white">Home</Button>
          </Link>
          <Button
            onClick={() => signOut(auth)}
            variant={"outline"}
            className="mt-5"
          >
            Sign out
          </Button>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
