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
  BookOpen,
  Calendar,
  Locate,
  UserCog,
  Users,
} from "lucide-react";
import { Logo, LogoIcon } from "@/components/logo";
import Avatar from "@/components/icon-avatar";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
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
      label: "Gestionar Perfil",
      href: "/tutor/profile",
      icon: (
        <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Gestionar Cursos",
      href: "/tutor/courses",
      icon: (
        <BookOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Programar Clases",
      href: "/tutor/calendar",
      icon: (
        <Calendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Sesiones de Mentoría",
      href: "/tutor/mentor",
      icon: (
        <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Meditación",
      href: "/tutor/meditation",
      icon: (
        <Locate className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    }
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
            <Button className="mt-5 bg-violet-800 text-white">Inicio</Button>
          </Link>
          <Button
            onClick={() => signOut(auth)}
            variant={"outline"}
            className="mt-5"
          >
            Carrear Sesion
          </Button>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default TeacherLayout;
