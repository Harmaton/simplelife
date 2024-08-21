"use client";

import { CalendarEvent } from "@prisma/client";
import { useState } from "react";

import { CalendarCheck, Clock, Link2Icon, PersonStanding } from "lucide-react";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Emodal {
  onevent: CalendarEvent;
}

export default function OnlineEvent({ onevent }: Emodal) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    if (onevent.eventLink) {
      navigator.clipboard.writeText(onevent.eventLink);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    }
  };

  const isToday = () => {
    const today = new Date();
    const eventDate = new Date(onevent.start || "");
    return (
      today.getDate() === eventDate.getDate() &&
      today.getMonth() === eventDate.getMonth() &&
      today.getFullYear() === eventDate.getFullYear()
    );
  };

  const extractTimeRange = (isoDate: Date) => {
    const eventDate = new Date(isoDate);
    eventDate.setHours(eventDate.getHours() + 4);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return eventDate.toLocaleTimeString("es-ES", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone,
    });
  };

  const extractDate = (isoDate: Date) => {
    const eventDate = new Date(isoDate);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return eventDate.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone,
    });
  };
  const isFutureDate = () => {
    const today = new Date();
    const eventDate = new Date(onevent.start || "");
    return eventDate.getTime() > today.getTime();
  };

  const timeRange = onevent.start ? extractTimeRange(onevent.start) : null;
  const dateOnly = onevent.start ? extractDate(onevent.start) : null;

  return (
    <>
      {isFutureDate() && (
        <Card
          className={`cursor-pointer hover:border-green-500  gap-2 transition-shadow hover:shadow-lg ${
            isToday() ? "border-red-500 " : "border-blue-300"
          }`}
        >
          <CardHeader>
            <CardTitle className="uppercase flex flex-row gap-2 ">
              {" "}
              {onevent.title}{" "}
            </CardTitle>
          </CardHeader>

          <CardContent className="divide-y">
            <p
              className={`whitespace-pre-line p-2 ${
                isToday() ? "border-red-500" : "border-gray-300"
              }`}
            >
              <CalendarCheck className="h-4 w-4 mr-2" />
              {dateOnly}
            </p>
            <p
              className={`whitespace-pre-line p-2 ${
                isToday() ? "border-red-500" : "border-gray-300"
              }`}
            >
              <Clock
                className={`h-4 w-4 mr-2 ${
                  isToday() ? "animate animate-ping" : "text-normal"
                }`}
              />
              {timeRange}
            </p>
            {
              <h2 className="flex flex-row border mt-2 p-2 overflow-hidden">
                <Link href={`${onevent.eventLink}`} className="w-full">
                  <Button
                    variant={"ghost"}
                    className="bg-green-100 rounded-full w-full  hover:bg-blue-500"
                  >
                    Asistir a la conferencia
                  </Button>
                </Link>
              </h2>
            }
            <div className="">
              <p className="font-italic mt-3 font-serif flex flex-row text-2xl ">
                <PersonStanding className="h-6 w-6 m-2 my-auto" />
                {onevent.hostName}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
