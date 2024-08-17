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

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="relative flex top-0 h-16 w-full items-center justify-between px-6 md:px-8 p-6 bg-white">
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
            side="right"
            className="w-64 bg-background mt-4 mr-4 p-4"
          >
            <SheetHeader className="mb-4">
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <nav className="grid gap-6 mb-4 ">
              <Link
                href="/search"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Certifications
              </Link>
              <Link
                href="/tutors"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Tutors
              </Link>
              <Link
                href="/pricing"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Packages
              </Link>
              <Link
                href="/aboutus"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                About Us
              </Link>
              <Link
                href="/faq"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Contact Us
              </Link>
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              {user ? (
                <>
                  <Button onClick={() => signOut(auth)} variant="outline">
                    Sign Out
                  </Button>
                  <Link href="/dashboard">
                    <Button className="bg-background">Dashboard</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-background">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex justify-center mr-8 items-center gap-6">
          <nav className="flex items-center gap-6">
          <Link
                href="/search"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Certifications
              </Link>
              <Link
                href="/tutors"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Tutors
              </Link>
              <Link
                href="/pricing"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Packages
              </Link>
              <Link
                href="/aboutus"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                About Us
              </Link>
              <Link
                href="/faq"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium transition-colors hover:text-primary"
                prefetch={false}
              >
                Contact Us
              </Link>
            </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Button onClick={() => signOut(auth)} variant="outline">
                <span className="text-xl mr-2 font-mono">Sign Out</span>
              </Button>
              <Link href={"/dashboard"}>
                <Button className=" bg-red-800 text-white p-2">
                  <span className="text-xl mr-2 font-mono">Dashboard</span>
                  <ArrowRightCircle className="h-6 w-6 mr-2" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
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
