"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { teacherSchema, TeacherSchema } from "@/lib/validations/teacher";
import { useAuth } from "@/providers/AuthProvider";

interface EditTeacherProps {
  teacherToEdit: User;
}

export default function EditTeacherPage({ teacherToEdit }: EditTeacherProps) {
  const router = useRouter();

  const { user } = useAuth();

  if(!user){
    return <div> Not Signed In </div>
  }

  const form = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      nickname: teacherToEdit.nickname || "",
      country: teacherToEdit.country || "",
      description: teacherToEdit.description || "",
      linkedIn: teacherToEdit.linkedIn || "",
      youtube: teacherToEdit.youtube || "",
      whatsapp: teacherToEdit.twitter || "",
      facebook: teacherToEdit.facebook || "",
      mail: teacherToEdit.mail || "",
      instagram: teacherToEdit.instagram || "",
    },
  });

  const onSubmit = async (values: TeacherSchema) => {
    try {
      await axios.patch("/api/teacher", {
        email: user.email,
        ...values,
      });
      router.refresh();
      toast.success("Detalles del profesor actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los detalles del profesor:", error);
      toast.error("Detalles del maestro no actualizadosd");
    }
    console.log(values);
  };

  return (
    <>
      <div className="m-auto p-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del maestro</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cómo te llamarán tus alumnos"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Este es su nombre para mostrar públicamente.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input placeholder="Perú, Argentina..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Su país de origen será visible para los estudiantes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="por ejemplo, en qué se destaca, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Incluya detalles relevantes para que los estudiantes lo
                    comprendan mejor.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduce un enlace que lleve a tu perfil. y no incluyas (https://) en tu enlace..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduce un enlace que lleve a tu perfil. y no incluyas (https://) en tu enlace..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enlace Whatsapp</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduce un enlace que lleve a tu perfil. y no incluyas (https://) en tu enlace..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduce un enlace que lleve a tu perfil. y no incluyas (https://) en tu enlace..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduce un enlace que lleve a tu perfil. y no incluyas (https://) en tu enlace..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduce un enlace que lleve a tu perfil. y no incluyas (https://) en tu enlace..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="justify-end">
              Entregar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
