'use client'
import React from "react";
import EditTeacherPage from "./teacher-form";
import { ImageForm } from "./image-form";
import { redirect } from "next/navigation";
import DeleteProfileDialog from "./delete-dialog";
import { getTeacherDeatails } from "@/app/actions/user";
import { Banner } from "@/components/banner";
import { User } from "@prisma/client";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useAuth } from "@/providers/AuthProvider";
import Loadingpage from "@/components/loading-page";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

function ProfilePage() {
  const { user } = useAuth(); // Use useAuth to get the current user

  const { data: teacherdata, isLoading } = useQuery<User | null>(
    ['teacherDetails', user?.uid],
    async () => {
      const userid = user?.uid; // Access uid directly from user
      if (!userid) {
        return null;
      }
      const teacher = await getTeacherDeatails(userid);
      if (!teacher) {
        redirect("/become-tutor");
        return null;
      }
      return teacher;
    },
    {
      enabled: !!user?.uid, // Only run the query if user.uid is available
    }
  );

  if (isLoading) {
    return <Loadingpage />
  }

  return (
    <div className="p-6 m-2">
      {teacherdata ? (
        <>
          <Banner label="Tenga en cuenta que no todos los campos del enlace son obligatorios, pero el resto lo son en caso de que necesite editar sus datos. Puede editar la imagen por separado del resto del formulario, pero necesita completar todos los campos relevantes para poder ver sus detalles en la página de profesores." />
          <ImageForm teacherToEdit={teacherdata} />
          <EditTeacherPage teacherToEdit={teacherdata} />
          <DeleteProfileDialog />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
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

const ProfilePageWrapper = () => (
  <QueryClientProvider client={queryClient}>
      <ProfilePage />
  </QueryClientProvider>
);

export default ProfilePageWrapper;
