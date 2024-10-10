import { redirect } from "next/navigation";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import EditTeacherPage from "./teacher-form";
import { ImageForm } from "./image-form";
import DeleteProfileDialog from "./delete-dialog";
import { getTeacherDeatails } from "@/app/actions/user";
import { Banner } from "@/components/banner";

export default async function ProfilePage() {
  const user = await currentUser();

  console.log(user)
  if (!user) {
    redirect("/");
  }

  const email = user.emailAddresses[0].emailAddress;
  const teacherdata = await getTeacherDeatails(email);

  console.log(teacherdata)

  if(!teacherdata){
    return <div>No teacher details</div>
  }

  return (
    <div className="p-6 m-auto">
      <Banner label="Tenga en cuenta que no todos los campos del enlace son obligatorios, pero el resto lo son en caso de que necesite editar sus datos. Puede editar la imagen por separado del resto del formulario, pero necesita completar todos los campos relevantes para poder ver sus detalles en la página de profesores." />
      <ImageForm teacherToEdit={teacherdata} />
      <EditTeacherPage teacherToEdit={teacherdata} />
    </div>
  );
}
