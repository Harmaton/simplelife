import React from "react";
import { CardSpotlightDemo } from "./card-spotlight-steps";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroProps {
  isteacher: boolean,
  isregistered: boolean
}

export default  function TutorHero({isteacher, isregistered}: HeroProps) {

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
          {!isteacher && !isregistered ? (
            // <TutorRegForm /> 
            <div>reg</div>
          ) : (
            <div className="space-y-4">
              <Link href="/tutor/dashboard">
                <Button className="bg-indigo-500 w-full">Ir a mi perfil</Button>
              </Link>
              {isregistered && (
                <Link href="/dashboard">
                  <Button className="w-full">Regresar a Aprendizaje</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}