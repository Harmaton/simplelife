"use client";

// components/EvaluationsForm.tsx

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Question, Option, Course, Chapter } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface EvaluationsFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}


const formSchema = z.object({
  googleFormLink: z.string().min(1),
});

export const EvaluationsForm = ({
  initialData,
  courseId,
  chapterId
}: EvaluationsFormProps) => {
  const [isCreating, setIsCreating] = useState(false);


  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      googleFormLink: initialData.googleFormLink || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
     const url = `/api/chapters/${chapterId}`;
      await axios.patch(url, values);
      toast.success("Capitulo actualizado");
      toggleCreating();

    } catch (error) {
      toast.error("Algo salió mal");
    }
  };


  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      Enlace de formulario de Google (evaluación)
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancelar</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar una evaluación
            </>
          )}
        </Button>
        
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="googleFormLink"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Este debería ser un cuestionario breve para una respuesta breve."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="flex justify-end" disabled={!isValid || isSubmitting} type="submit">
              Crear
            </Button>

           
          </form>
        </Form>
      )}


    </div>
  );
};
