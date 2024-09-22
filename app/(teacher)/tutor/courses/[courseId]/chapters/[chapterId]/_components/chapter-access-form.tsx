"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/chapters/${chapterId}`, values);
      toast.success("Capítulo actualizado");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      Acceso al capítulo
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancelar</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Editar acceso
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.isFree && "text-slate-500 italic"
        )}>
          {initialData.isFree ? (
            <>Este capítulo es gratuito para su vista previa.</>
          ) : (
            <>Este capítulo no es gratuito.</>
          )}
        </p>
      )}
      {isEditing && (
       <Form {...form}>
       <form
         onSubmit={form.handleSubmit(onSubmit)}
         className="space-y-4 mt-4"
       >
         <FormField
           control={form.control}
           name="isFree"
           render={({ field }) => (
             <FormItem className="flex flex-row items-center justify-between space-x-3 rounded-md border p-4">
               <div className="space-y-0.5">
                 <FormDescription>
                   Marque esta casilla si desea que este capítulo sea gratuito para obtener una vista previa.
                 </FormDescription>
               </div>
               <FormControl>
                 <Checkbox
                   checked={field.value}
                   onCheckedChange={field.onChange}
                 />
               </FormControl>
             </FormItem>
           )}
         />
         <div className="flex justify-end">
           <Button
             disabled={!isValid || isSubmitting}
             type="submit"
           >
             Ahorrar
           </Button>
         </div>
       </form>
     </Form>
      )}
    </div>
  )
}