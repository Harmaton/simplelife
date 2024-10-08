"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { redirect, useRouter } from "next/navigation";


export default  function DeleteProfileDialog() {
    const router = useRouter()
  const handleDeleteProfile = async () => {
    // await deleteTeacherProfile();
    router.push('/')
  };

  return (
    <div className="flex justify-end">
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="mb-2 ml-5">
          Eliminar tu perfil
          <Trash className="w-4 h-4 ml-2 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y eliminará tus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProfile}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  );
}
