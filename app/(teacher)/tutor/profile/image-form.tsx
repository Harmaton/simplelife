"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { auth } from "@/firebase";
import { db } from "@/lib/db";
import { updateUserImage } from "@/app/actions/user";

export interface ImageTeacherProps {
  teacherToEdit: User;
}

export const imgSchema = z.object({
  image: z.string().min(1, {
    message: "Se requiere imagen",
  }),
});

export const updateImgSchema = imgSchema.extend({
  id: z.string().min(1),
});

export const ImageForm = ({ teacherToEdit }: ImageTeacherProps) => {
  const user = auth.currentUser;

  if (!user){
    redirect('/login')
  } 

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof imgSchema>) => {
    try {

    if(user.uid){
      await updateUserImage( user.uid, values)
      toast.success("Imagen Actualizada");
    }
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Imagen del maestro
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancelar</>}
          {!isEditing && !teacherToEdit?.image && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Añadir una imagen
            </>
          )}
          {!isEditing && teacherToEdit?.image && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar imagen
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!teacherToEdit.image ? (
          <div className="flex items-center justify-center h-30 bg-slate-200 rounded-full">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              className="object-cover w-full  rounded-md"
              src={teacherToEdit.image}
              width={100}
              height={50}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="userImage"
            onChange={(url) => {
              if (url) {
                onSubmit({
                  image: url,
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
