import { Button } from "@/components/ui/button";
import { ArrowDownLeftIcon, LogOut } from "lucide-react";
import React from "react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import SessionCard from "./session-card";

export default async function page() {
  try {
    const allsessions = await db.session.findMany({
      where: {
        isPublished: true,
      },
    });

    console.log(allsessions);
    return (
      <div className="m-auto">
        <div className="p-4 flex space-x-5">
          <PageHeader
            id="billing-header"
            aria-labelledby="billing-header-heading"
          >
            <PageHeaderHeading size="sm">
              Próximas sesiones de meditación
            </PageHeaderHeading>
          </PageHeader>
          <Link href="/dashboard/meditation" className="mr-2">
            <Button size="sm" className="p-2" variant="outline">
              <ArrowDownLeftIcon className="h-4 w-4 m-2 mr-2" />
              Todas las meditaciones
            </Button>
          </Link>
        </div>
        <Separator />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 p-4">
          {allsessions.map((book) => (
            <Link key={book.id} href={`/dashboard/meditation/guide/${book.id}`}>
              <SessionCard session={book} />
            </Link>
          ))}
          {allsessions.length === 0 && (
            <div className="col-span-full text-center">
              {"No hay próxima sesión actualizada por el administrador."}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return (
      <div className="p-4 flex flex-col m-2 ">
        <p>Error </p>
      </div>
    );
  }
}
