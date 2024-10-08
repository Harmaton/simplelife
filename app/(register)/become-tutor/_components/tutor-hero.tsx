import React from "react";
import { CardSpotlightDemo } from "./card-spotlight-steps";
import TutorRegForm from "./tutorReg-form";
import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Loadingpage from "@/components/loading-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TutorHero() {
  const user = await currentUser();

  if (!user) {
    return <Loadingpage />;
  }

  let dbuser = await db.user.findUnique({
    where: {
      clerkId: user?.id,
      email: user?.emailAddresses[0].emailAddress,
    },
  });

  if (!dbuser) {
    dbuser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    });
  }
  return (
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
          {!dbuser.isTeacher && !dbuser.isRegistered ? (
            <TutorRegForm userId={user.id} />
          ) : (
            <div>
              <Link href={"/tutor/profile"}>
                <Button className="bg-indigo-500">Ir a mi perfil</Button>
              </Link>
            </div>
          )}
          {dbuser.isRegistered && 
          <div>
            <Link href={'/dashboard'}>
            <Button>Regresar a Aprendizaje</Button> 
            </Link>
            </div>}
        </div>
      </div>
    </div>
  );
}
