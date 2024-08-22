
"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Book } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

export interface BookProps {
  bookToPublish: Book,
  bookid: string
}

export const fileSchema = z.object({
  imageUrl: z.string().min(1, {
  message: "Se requiere imagen",
  }),
});

export const updateImgSchema = fileSchema.extend({
  id: z.string().min(1),
});


export const BookImageForm = ({
  bookToPublish,
  bookid
}: BookProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof fileSchema>) => {
    try {
      
        await axios.patch(`/api/books/${bookid}`, values )
      
      toast.success("Imagen actualizada");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md m-2 p-4" >
      <div className="font-medium flex items-center justify-between">
      Portada del libro
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancelar</>
          )}
          {!isEditing && !bookToPublish.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Añadir una imagen
            </>
          )}
          {!isEditing && bookToPublish.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar imagen
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !bookToPublish.imageUrl ? (
          <div className="flex items-center justify-center h-30 bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={bookToPublish.imageUrl}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="bookImage"
            onChange={(url) => {
              if (url) {
                onSubmit({
                  imageUrl: url,
                });
              }
            }}
          />
        </div>
      )}
    </div>
  )
}