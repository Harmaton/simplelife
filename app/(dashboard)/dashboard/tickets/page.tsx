'use client'

import React, { useState, useEffect } from "react";
import { db } from "@/lib/db";
import { Info } from "./info";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OnlineEvent from "./online-events";
import { fetchStudent } from "@/app/actions/user";
import { useAuth } from "@/providers/AuthProvider";
import { CalendarEvent } from "@prisma/client";

export default function Page() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isStudent, setIsStudent] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userId = user?.uid;
      if (!userId) {
        // setError("User Undefined!");
        setIsLoading(false);
        return;
      }

      try {
        const studentStatus = await fetchStudent(userId);
        setIsStudent(studentStatus);

        if (studentStatus) {
          const today = new Date();
          const allEvents = await db.calendarEvent.findMany({
            where: {
              start: {
                gt: today.toISOString(),
              },
            },
            orderBy: {
              start: "asc",
            },
          });
          setEvents(allEvents);
        }
      } catch (err) {
        setError("Error fetching events");
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 flex flex-col m-2 ">
        <p>{error}</p>
      </div>
    );
  }

  if (!isStudent) {
    return (
      <div className="p-4 flex flex-col mb-5 gap-5 m-auto items-center justify-center ">
        <p className="m-auto">
          Lo sentimos, no puedes ver las clases programadas porque no eres un
          estudiante registrado. Comuníquese con el administrador de Simple Life
          para convertirse en estudiante.
        </p>

        <Card className="border-blue-500">
          <CardHeader>Siga el siguiente enlace para registrarse como estudiante</CardHeader>
          <CardContent className="border ">
            <Link href="/">
              <Button className="m-4">Regístrate como estudiante</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col m-2 space-y-4">
      <Info />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((eve) => (
          <OnlineEvent key={eve.id} onevent={eve} />
        ))}
        {events.length === 0 && (
          <div className="col-span-full text-center">
            {"Simple Life aún no ha publicado ningún libro. Busque libros en esta secciónNo hay ninguna conferencia próxima en este momento. Estar en la búsqueda"}
          </div>
        )}
      </div>
    </div>
  );
}
