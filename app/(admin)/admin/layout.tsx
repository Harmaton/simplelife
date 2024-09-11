"use client";

import {
  MobileSidebar,
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import {
  BarChart,
  BookmarkIcon,
  Home,
  LineChart,
  LogOut,
  PenBox,
  PlusIcon,
  TicketSlash,
  UserCircle,
} from "lucide-react";
import { Logo, LogoIcon } from "@/components/logo";
import Avatar from "@/components/icon-avatar";
import Loadingpage from "@/components/loading-page";
import { toast } from "sonner";
import { checkIsAdmin } from "@/app/actions/user";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const checkAdminState = async () => {
      if (user?.email) {
        const isAdmin = await checkIsAdmin(user.email);
        setAdmin(isAdmin);
      }
    };
    checkAdminState();
  }, [user?.email]);

  if (!user?.email) {
    return (
      <div className="flex flex-col items-center justify-center h-full border p-4 rounded-lg">
        <div className="text-2xl mb-4">🔒</div>
        <Link href="/login">
          <Button>Iniciar Sesión como Admin</Button>
        </Link>
      </div>
    );
  }

  if (user.email && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full border p-4 rounded-lg">
        <div className="text-2xl mb-4">🚫</div>
        <p className="text-lg">No tienes permisos de administrador.</p>
        <Link href="/">
          <Button>Volver a la plataforma</Button>
        </Link>
      </div>
    );
  }

  const links = [
    {
      label: "Maestros",
      href: "/admin",
      icon: (
        <PenBox className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Solicitudes",
      href: "/admin/teacher-applications",
      icon: (
        <PlusIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Admino Analitica",
      href: "/admin/analytics",
      icon: (
        <BarChart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Categorías",
      href: "/admin/categories",
      icon: (
        <LineChart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Estudiante",
      href: "/admin/students",
      icon: (
        <UserCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Administrar eventos",
      href: "/admin/inperson",
      icon: (
        <TicketSlash className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Administrar libros",
      href: "/admin/addbook",
      icon: (
        <BookmarkIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const handleSignOut = async () => {
    await signOut(auth);
    toast.success('Sesión cerrada');
    window.location.href = '/'; 
  };

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
          <Button
            onClick={handleSignOut}
            variant={"outline"}
            className="flex items-center"
          >
            <LogOut className="m-auto" />            
          </Button>
          <Link href={"/"}>
            <Button className="flex items-center bg-violet-800 text-white">
              <Home className="m-auto" />
            </Button>
          </Link>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
