import React from "react";
import Navbar from "@/components/landing-page/navbar";
import How from "./_components/how";
import { Footer } from "@/components/landing-page/footer";
import Top from "@/components/top-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardSpotlightDemo } from "./_components/card-spotlight-steps";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { confirmIsRegistred, confirmIsTeacher } from "@/app/actions/user";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default async function Page() {
  return (
    <div>
      <Navbar />
      <Top
        header="Modo Instructor"
        text="Empiece su viaje para enseñar en Simplelife"
      />

      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-2">
          <div className="mr-2">
            <CardSpotlightDemo />
          </div>
          <div className="space-y-6 flex flex-col items-center justify-center text-left">
            <h1 className="text-4xl font-serif text-left font-bold">
              Conviértete en tutora
            </h1>
            <p className="text-lg max-w-md mx-auto font-serif">
              Únete a nuestra comunidad y comienza a enseñar con más de 2000
              tutores. Crece junto a 10 000 estudiantes. Crece a nivel
              internacional.
            </p>
            <Link href="/register">
              <Button className="bg-indigo-500 w-full">
                Empezar <ArrowLeftEndOnRectangleIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <div className="space-y-4">
              <Link href="/tutor/dashboard">
                <Button className="bg-blue-500 w-full">
                  Ir a mi perfil
                  <ArrowLeftEndOnRectangleIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* isteacher  : (
              <div className="space-y-4">
                <Link href="/tutor/dashboard">
                  <Button className="bg-indigo-500 w-full">
                    Ir a mi perfil
                  </Button>
                </Link>
              </div>
            )} */}
            {/* {isregistred && (
              <Link
                href="/tutors"
                className="border p-2 border-red-500 rounded-md"
              >
                Pendiente de aprobación ...
              </Link>
            )} */}
          </div>
        </div>
      </div>
      <hr className="mt-2" />
      <How />
      <Footer />
    </div>
  );
}
