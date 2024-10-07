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
import {  ArrowUp, ArrowUpRight, Loader, MenuIcon } from "lucide-react";
import { motion } from "framer-motion";
import { NavigationMenuDemo } from "../navbar-shadcn";
import { Logo } from "../logo";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header
      className="top-0 left-0 right-0 flex h-16 w-full items-center justify-between px-4 border-b lg:px-6 p-4 bg-white/70 backdrop-blur-lg transition-all duration-300 ease-in-out sticky"
      style={{
        position: "sticky",
        top: "-100px",
        transform: "translateY(0)",
        zIndex: 50,
      }}
    >
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
            <nav className="flex items-center gap-6 lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </nav>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 bg-background mt-0 mr-2 p-4"
          >
            <SheetHeader className="mb-4">
              <Logo />
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <nav className="grid gap-6 mb-4">
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
                href="/tutors"
                className="text-lg font-medium border p-2 border-violet-500 tex-center transition-colors hover:text-primary"
                prefetch={false}
              >
                Maestros
              </Link>
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <ClerkLoading>
                <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
              </ClerkLoading>

              <ClerkLoaded>
                <SignedOut>
                  <SignInButton
                    mode="modal"
                    signUpFallbackRedirectUrl={"/dashboard"}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-blue-400 font-bold border flex"
                    >
                      Login
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                  <Link href="/dashboard">
                    <Button className="bg-background border text-center border-violet-500 m-auto">
                    Acceso
                    </Button>
                  </Link>
                </SignedIn>
              </ClerkLoaded>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex justify-center mr-8 items-center gap-6">
          <nav className="flex items-center gap-6">
            <NavigationMenuDemo />
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton
                mode="modal"
                signUpFallbackRedirectUrl={"/dashboard"}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-400 rounded-lg  border flex"
                >
                 Acceso
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
              <Link href="/dashboard">
                <Button className="bg-blue-500 text-white flex font-bold border text-center  border-violet-500 m-auto">
                  Panel
                  <ArrowUp className="h-4 w-4 ml-2 justify-end" />
                </Button>
              </Link>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
