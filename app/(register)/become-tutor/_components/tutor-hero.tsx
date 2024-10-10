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

  const email = user?.emailAddresses[0].emailAddress;

  let dbuser;
  
  try {
    // First, try to find the user
    dbuser = await db.user.findFirst({
      where: {
        OR: [
          { clerkId: user.id },
          { email: email }
        ]
      }
    });

    // If user doesn't exist, create a new one
    if (!dbuser) {
      dbuser = await db.user.create({
        data: {
          clerkId: user.id,
          email: email,
        },
      });
    } else {
      // If user exists but clerkId doesn't match, update it
      if (dbuser.clerkId !== user.id) {
        dbuser = await db.user.update({
          where: { id: dbuser.id },
          data: { clerkId: user.id }
        });
      }
    }
  } catch (error) {
    console.error("Error handling user data:", error);
    // You might want to add proper error handling here
    return <div>Something went wrong. Please try again later.</div>;
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
