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
  BookOpen,
  Calendar,
  Home,
  Locate,
  LogOut,
  UserCog,
  Users,
} from "lucide-react";
import { Logo, LogoIcon } from "@/components/logo";
import Avatar from "@/components/icon-avatar";
import { toast } from "sonner";
import { checkIsTeacher } from "@/app/actions/user";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isTeacher, setTeacher] = useState(false)

  useEffect(()=> {
    const checkTeacherstatus = async() => {
      if(user?.email){
        const status = await checkIsTeacher(user?.email)
        setTeacher(status)
      }
      
    }
    checkTeacherstatus()
  }, [user?.email])

  if (!user?.email) {
    return (
      <div className="flex flex-col items-center justify-center h-full border p-4 rounded-lg">
        <div className="text-2xl mb-4">🔒</div>
        <h1 className="text-3xl font-bold mb-2">Acceso Restringido</h1>
        <p className="text-lg mb-4">Por favor, inicia sesión para continuar.</p>
        <Link href="/login">
          <Button>Comienza aquí</Button>
        </Link>
      </div>
    );
  }

  if (!isTeacher) {
    return (
      <div className="flex flex-col items-center justify-center h-full border p-4 rounded-lg">
        <div className="text-2xl mb-4 mt-4">🚫</div>
        <h1 className="text-3xl font-bold mb-2">Acceso Denegado</h1>
        <p className="text-lg">Lo siento, no estás registrado como profesor. Aplica para convertirte en tutor en la plataforma.</p>
        <Link href="/become-tutor" className="mt-4">
          <Button>Aplicar</Button>
        </Link>
      </div>
    );
  }
  const links = [
    {
      label: "Gestionar Perfil",
      href: "/tutor/profile",
      icon: (
        <UserCog className="text-blue-500 dark:text-blue-400 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Gestionar Cursos",
      href: "/tutor/courses",
      icon: (
        <BookOpen className="text-green-500 dark:text-green-400 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Programar Clases",
      href: "/tutor/calendar",
      icon: (
        <Calendar className="text-purple-500 dark:text-purple-400 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Sesiones de Mentoría",
      href: "/tutor/mentor",
      icon: (
        <Users className="text-teal-500 dark:text-teal-400 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Meditación",
      href: "/tutor/meditation",
      icon: (
        <Locate className="text-yellow-500 dark:text-yellow-400 h-5 w-5 flex-shrink-0" />
      ),
    }
  ];
  
  const handleSignOut = async () => {
    await signOut(auth);
    toast.success('Sesión cerrada');
    window.location.href = '/'; 
  };

  return (
    <SidebarProvider>
      <div className="h-full ">
        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <MobileSidebar>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto  overflow-x-hidden">
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
        <div className="flex flex-row space-x-4 justify-end ">
        <Button
            onClick={handleSignOut}
            variant={"outline"}
            className="flex items-center"
          >
            <LogOut className="m-auto  h-4 w-4" />            
          </Button>
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

export default TeacherLayout;
