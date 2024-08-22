"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Book, BookAttachment, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface BookProps {
  bookToPublish: Book & { resourceUrl: BookAttachment[] };
  bookid: string;
};

const formSchema = z.object({
  resourceUrl: z.string().min(1),
});

export const BookPDFForm = ({
  bookToPublish,
  bookid
}: BookProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/books/${bookid}/resourceUrl`, values);
      toast.success("Libro actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/books/${bookid}/resourceUrl/${id}`);
      toast.success("Adjunto eliminado");
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      Anexos del curso
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancelar</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar un archivo
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {bookToPublish.resourceUrl.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              Aún no hay archivos adjuntos
            </p>
          )}
          {bookToPublish.resourceUrl.length > 0 && (
            <div className="space-y-2">
              {bookToPublish.resourceUrl.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="resourceUrl"
            onChange={(resourceUrl) => {
              if (resourceUrl) {
                onSubmit({ resourceUrl: resourceUrl });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
           Agregue todo lo que sus estudiantes puedan necesitar para completar el Libro.
          </div>
        </div>
      )}
    </div>
  )
}