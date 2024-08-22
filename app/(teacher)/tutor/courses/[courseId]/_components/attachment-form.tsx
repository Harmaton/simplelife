"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { Input } from "@/components/ui/input";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Curso actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Adjunto eliminado");
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    } finally {
      setDeletingId(null);
    }
  };

  const onUpdateName = async (id: string, value: string) => {
    try {
      await axios.patch(`/api/courses/${courseId}/attachments/${id}`, { name: value });
      toast.success('Name Updated');
      setEditingId(null);
      setEditingValue("");
      router.refresh();
    } catch (error) {
      toast.error("Algo salió mal");
    }
  };

  const startEditing = (id: string, value: string) => {
    setEditingId(id);
    setEditingValue(value);
  };

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
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              Aún no hay archivos adjuntos
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  {editingId === attachment.id ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="border border-gray-300 p-1 rounded-md"
                      />
                      <Button
                        onClick={() => onUpdateName(attachment.id, editingValue)}
                        className="px-2 py-1 rounded-md"
                      >
                        Actualizar
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs line-clamp-1">
                        {attachment.name}
                      </p>
                      {deletingId === attachment.id ? (
                        <div>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) : (
                        <div className="flex items-center ml-auto space-x-2">
                          <Button
                            onClick={() => startEditing(attachment.id, attachment.name)}
                            className="hover:opacity-75 transition"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => onDelete(attachment.id)}
                            className="hover:opacity-75 transition"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </>
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
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({
                  url: url,
                });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Agregue todo lo que sus estudiantes puedan necesitar para completar el curso.
          </div>
        </div>
      )}
    </div>
  );
};
