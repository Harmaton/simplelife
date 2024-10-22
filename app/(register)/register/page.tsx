import React from "react";
import { ApplicationForm } from "../become-tutor/_components/form";
import Top from "@/components/top-page";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  const dbuser = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (dbuser?.isRegistered || dbuser?.isTeacher) {
    redirect("/become-tutor");
  }

  return (
    <div className="p-6">
      <Top
        header={"Página de aplicación"}
        text={"Complete los detalles a continuación y espere"}
      />
      <div className="max-w-[33%] mx-auto">
      <ApplicationForm />
      </div>
    </div>
  );
}
