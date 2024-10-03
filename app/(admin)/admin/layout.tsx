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
  Book,
  CreditCard,
  Home,
  LineChart,
  LogOut,
  PenBox,
  PlusIcon,
  TicketSlash,
  UserCheck2Icon,
} from "lucide-react";
import { Logo, LogoIcon } from "@/components/logo";
import Avatar from "@/components/icon-avatar";
import { toast } from "sonner";
import { checkIsAdmin } from "@/app/actions/user";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import LoadingPage from "@/components/loading-page";

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
      <div className="flex flex-col items-center justify-center border p-4 rounded-lg">
        <div className="text-2xl mb-4">🔒</div>
        <Link href="/login">
          <Button>Iniciar Sesión como Admin</Button>
        </Link>
        <LoadingPage />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center border p-4 rounded-lg">
        <div className="text-2xl mb-4">🚫</div>
        <p className="text-lg">No tienes permisos de administrador.</p>
        <Link href="/">
          <Button>Volver a la plataforma</Button>
        </Link>
        <LoadingPage />
      </div>
      
    );
  }

  const links = [
    {
      label: "Usuarios",
      href: "/admin",
      icon: (
        <UserCheck2Icon className="text-black dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Maestros",
      href: "/admin/teachers",
      icon: (
        <PenBox className="text-blue-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Solicitudes",
      href: "/admin/teacher-applications",
      icon: (
        <PlusIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Administrar estudiantes",
    //   href: "/admin/students",
    //   icon: (
    //     <DocumentArrowUpIcon className="text-red-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    // {
    //   label: "Admino Analitica",
    //   href: "/admin/analytics",
    //   icon: (
    //     <BarChart className="text-green-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: "Pagos Hotmart",
      href: "/admin/hotmart",
      icon: (
        <CreditCard className="text-orange-500 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Administrar certificaciones",
      href: "/admin/categories",
      icon: (
        <LineChart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
        <Book className="text-yellow-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const handleSignOut = async () => {
    await signOut(auth);
    toast.success("Sesión cerrada");
    window.location.href = "/";
  };

  return (
    <SidebarProvider>
      <div className="h-full scrollbar-thin scrollbar-rounded-full">
        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <MobileSidebar>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1  overflow-y-auto overflow-x-hidden">
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
              <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none overflow-x-hidden">
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
        <div className="flex flex-row space-x-4 justify-end">
          <Link href={"/dashboard"}>
            <Button className="flex items-center border bg-white font-mono text-black">
              🎓 Modo estudiante
            </Button>
          </Link>
          <Link href={"/tutor/profile"}>
            <Button className="flex font-mono items-center bg-blue-500 text-white">
              👨‍🏫 Modo profesor
            </Button>
          </Link>

          <Button
            onClick={handleSignOut}
            variant={"outline"}
            className="flex items-center"
          >
            <LogOut className="m-auto h-4 w-4" />
          </Button>
          <Link href={"/"}>
            <Button className="flex items-center bg-violet-800 text-white">
              <Home className="m-auto h-4 w-4" />
            </Button>
          </Link>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
