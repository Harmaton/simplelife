import React from "react";
import EditTeacherPage from "./teacher-form";
import { ImageForm } from "./image-form";
import { redirect } from "next/navigation";
import DeleteProfileDialog from "./delete-dialog";
import { getTeacherDeatails } from "@/app/actions/user";
import { Banner } from "@/components/banner";

export default async function Page() {
  const teacher = await getTeacherDeatails();
  if (!teacher) {
    redirect("/");
  }

  return (
    <div className="p-2 m-2">
      <Banner label="Tenga en cuenta que no todos los campos del enlace son obligatorios, pero el resto lo son en caso de que necesite editar sus datos. Puede editar la imagen por separado del resto del formulario, pero necesita completar todos los campos relevantes para poder ver sus detalles en la página de profesores." />
      <ImageForm teacherToEdit={teacher} />
      <EditTeacherPage teacherToEdit={teacher} />

      <DeleteProfileDialog />
    </div>
  );
}
