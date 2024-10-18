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
import Link from "next/link";
import { CalendarCheck, CoffeeIcon, Goal, Home } from "lucide-react";
import { Logo, LogoIcon } from "@/components/logo";
import { FaMoneyBill } from "react-icons/fa";
import Avatar from "@/components/icon-avatar";
import Loadingpage from "@/components/loading-page";
import { useUser } from "@clerk/nextjs";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const user = useUser();

  if (!user) {
    return <Loadingpage />;
  }

  const links = [
    {
      label: "Cursos Panel",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-blue-500 dark:text-blue-400 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Mi horario",
      href: "/dashboard/schedule",
      icon: (
        <CalendarCheck className="text-green-500 dark:text-green-400 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Teillen Team",
      href: "https://teilenteam.com/",
      icon: (
        <Goal className="text-teal-500 dark:text-teal-400 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Invítanos a un café",
      href: "https://paypal.me/BiblioOnlineCoaching?country.x=PE&locale.x=en_US",
      icon: (
        <CoffeeIcon className="text-indigo-500 dark:text-indigo-400 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <SidebarProvider>
      <div className="h-full scrollbar-thin">
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
                <Avatar
                  seed={user.user?.emailAddresses[0].emailAddress || ""}
                />
              </div>
            </SidebarBody>
          </MobileSidebar>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 ">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none  overflow-x-hidden">
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
                    label: user.user?.emailAddresses[0].emailAddress || "User",
                    href: "#",
                    icon: (
                      <Avatar
                        seed={user.user?.emailAddresses[0].emailAddress || ""}
                      />
                    ),
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
            <Button className="flex items-center bg-violet-800 text-white">
              <Home className="m-auto  h-4 w-4" />
            </Button>
          </Link>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
