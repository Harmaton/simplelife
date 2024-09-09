"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { JSX, SVGProps } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";
import { NavigationMenuDemo } from "../navbar-shadcn";
import { Logo } from "../logo";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="absolute top-0 left-0 right-0 flex h-16 w-full items-center justify-between px-4 md:px-6 p-4 bg-white/70 backdrop-blur-lg transition-all duration-300 ease-in-out sticky" style={{ position: 'sticky', top: '-100px', transform: 'translateY(0)', zIndex: 50 }}>
        <div className="absolute inset-0 bg-white/70 backdrop-blur-lg z-[-1]"></div>
      <Link
        href="/"
        className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        prefetch={false}
      >
        <motion.img
          src="/v_logo.png"
          alt="Logo"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-12 w-auto max-w-xs object-contain"
        />
      </Link>

      <div className="flex items-center gap-6 p-4">
        <Sheet>
          <SheetTrigger asChild>
            <nav className="flex items-center gap-6 md:hidden ">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </nav>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 bg-background mt-4 mr-2 p-4"
          >
            <SheetHeader className="mb-4">
              <Logo /> 
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <nav className="grid gap-6 mb-4 ">
              <Link
                href="/search"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Certificaciones
              </Link>
              <Link
                href="/tutors"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Tutores
              </Link>
              <Link
                href="/courses"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Diploma y cursos
              </Link>
              <Link
                href="/pricing"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Paquetes
              </Link>
              <Link
                href="/aboutus"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Sobre nosotros
              </Link>
              <Link
                href="/faq"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Preguntas frecuentes
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Contáctanos
              </Link>

              <Link
                href="/become-tutor"
                className="text-lg font-medium border p-2 border-violet-500 tex-center transition-colors hover:text-primary"
                prefetch={false}
              >
               Conviértete en tutor
              </Link>
             
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              {user ? (
                <>
                  <Button onClick={() => signOut(auth)} variant="outline">
                    Cerrar sesión
                  </Button>
                  <Link href="/dashboard">
                    <Button className="bg-background border text-center border-violet-500 m-auto">Panel de control</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Iniciar sesión</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-background">Comenzar</Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex justify-center mr-8 items-center gap-6">
          <nav className="flex items-center gap-6">
          <NavigationMenuDemo />
            </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Button onClick={() => signOut(auth)} variant="outline">
                <span className="text-xl mr-2 font-mono">Cerrar sesión</span>
              </Button>
              <Link href={"/dashboard"}>
                <Button className="bg-violet-500 hover:bg-blue-300 text-white p-2 border border-violet-500 m-auto">
                  <span className="text-xl mr-2 font-mono">Panel de control</span>
                  <ArrowRightCircle className="h-6 w-6 mr-2" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Iniciar sesión</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Comenzar</Button>
                
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
