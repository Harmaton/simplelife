"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCourse } from "@/app/actions/courses";
import { useUser } from "@clerk/nextjs";

// Update schema to handle productCode as a string
const createCourseformSchema = z.object({
  title: z.string().min(1, {
    message: "Se requiere título",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof createCourseformSchema>>({
    resolver: zodResolver(createCourseformSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const user = useUser()

  const email = user.user?.emailAddresses[0].emailAddress

  const onSubmit = async (values: z.infer<typeof createCourseformSchema>) => {
    try {
      if (!user || !email) {
        toast.error("Please Log in to continue");
        return null;
      }
      const response = await createCourse(values, email);
      if (response) {
        router.push(`/tutor/courses/${response.id}`);
        toast.success("Curso Creado");
      }
    } catch {
      toast.error("Algo salió mal");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Nombra tu curso</h1>
        <p className="text-sm text-slate-600">
          ¿Cómo te gustaría llamar tu curso? No te preocupes, puedes cambiar
          esto más tarde.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del curso</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="p.ej. 'El Secreto de la TRIPLE A'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    ¿Qué enseñarás en este curso?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/tutor/courses">
                <Button type="button" variant="ghost" disabled={isSubmitting}>
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Cargando..." : "Continuar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
