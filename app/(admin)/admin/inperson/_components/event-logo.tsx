
"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { InHouseEvent } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

export interface BookProps {
  eventToPublish: InHouseEvent,
  eventid: string
}

export const fileSchema = z.object({
 logoimg: z.string().min(1, {
  message: "Se requiere imagen",
  }),
});

export const updateImgSchema = fileSchema.extend({
  id: z.string().min(1),
});


export const EventLogoForm = ({
  eventToPublish,
  eventid
}: BookProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof fileSchema>) => {
    try {
      
        await axios.patch(`/api/in-person/${eventid}`, values )
      
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
      Logo del Event
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancelar</>
          )}
          {!isEditing && !eventToPublish.logoimg && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Añadir una imagen
            </>
          )}
          {!isEditing && eventToPublish.logoimg && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar imagen
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !eventToPublish.logoimg ? (
          <div className="flex items-center justify-center h-30 bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={eventToPublish.logoimg}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="logoimg"
            onChange={(url) => {
              if (url) {
                onSubmit({
                  logoimg: url,
                });
              }
            }}
          />
        </div>
      )}
    </div>
  )
}