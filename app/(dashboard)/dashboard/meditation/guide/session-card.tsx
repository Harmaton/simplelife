"use client";
import { Session, User } from "@prisma/client";
import { useState } from "react";
import { CalendarCheckIcon, Clock1 } from "lucide-react";
import Image from "next/image";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SessionProps {
  session: Session;
}

export default function SessionCard({ session }: SessionProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    if (session.sessionLink) {
      navigator.clipboard.writeText(session.sessionLink);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    }
  };

  function handleClick() {}

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-lg"
      onClick={handleClick}
    >
      {session.imageUrl && (
        <Image
          src={session.imageUrl}
          width={100}
          height={100}
          alt="image"
          unoptimized
          className="m-auto mt-4 rounded-full"
        />
      )}

      <CardHeader>
        <CardTitle className="uppercase p-2"> {session.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="whitespace-pre-line flex flex-row m-2 border p-2">
          {session.startTime ? (
            <span className="text-red-500">
              <CalendarCheckIcon className="mr-2 h-4 w-4" />
              {session.startTime.toString()}
            </span>
          ) : (
            <span>No hay fecha de inicio disponible</span>
          )}
        </p>

        <p className="whitespace-pre-line flex flex-row items-center p-2 m-2">
          <Clock1 className="mr-2 h-4 w-4" />
          <span className="mr-3">{session.duration}</span> Minutos
        </p>

        <div className="flex flex-row">
          <p className="font-italic mt-3 font-serif p-2 space-x-20">
            <span className="font-light mr-2 ">Por :</span> {session.moderator}
          </p>

          <div className="flex">
            <span className="font-light mr-2 text-blue-500">Aprende más</span>
            <ArrowTrendingUpIcon className="w-4 h-4 ml-2  mt-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
