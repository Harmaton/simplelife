import { redirect } from "next/navigation";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import EditTeacherPage from "./teacher-form";
import { ImageForm } from "./image-form";
import DeleteProfileDialog from "./delete-dialog";
import { getTeacherDeatails } from "@/app/actions/user";
import { Banner } from "@/components/banner";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/");
  }

  const email = user.emailAddresses[0].emailAddress;
  const teacherdata = await getTeacherDeatails(email);

  return (
    <div className="p-6 m-auto">
      {teacherdata ? (
        <>
          <Banner label="Tenga en cuenta que no todos los campos del enlace son obligatorios, pero el resto lo son en caso de que necesite editar sus datos. Puede editar la imagen por separado del resto del formulario, pero necesita completar todos los campos relevantes para poder ver sus detalles en la página de profesores." />
          <ImageForm teacherToEdit={teacherdata} />
          <EditTeacherPage teacherToEdit={teacherdata} />
          <DeleteProfileDialog />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-bold">No tienes un perfil de profesor.</h2>
            <p className="mt-2">Por favor, regístrate como profesor para continuar.</p>
            <Link href="/become-tutor">
              <Button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
                Regístrate como profesor
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}