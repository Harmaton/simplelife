"use client";

import React, { useState } from "react";
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
import { getUserByUID, updateUser } from "@/app/actions/user";

interface EditTeacherProps {
  teacherToEdit: User;
}

export default function EditTeacherPage({ teacherToEdit }: EditTeacherProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

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
      profession:  teacherToEdit.profession || ""
    },
  });

  const onSubmit = async (values: TeacherSchema) => {
    if (!user) {
      toast.error("No se ha iniciado sesión");
      return;
    }

    try {
      setLoading(true);
      if (user) {
        
          await updateUser(teacherToEdit.email, values);
          toast.success("Actualizada")
      }
      router.refresh();
      toast.success("Actualizada");
    } catch {
      toast.error("Algo salió mal");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>No se ha iniciado sesión</div>;
  }

  return (
    <>
      <div className="space-y-1 mb-2 mt-2">
        <h1 className="font-bold text-center text-2xl">
          Información del perfil
        </h1>
        <p className="font-mono text-center">
          Edite toda la información de su perfil a continuación para destacar{" "}
        </p>
      </div>
      <div className="flex justify-center items-center mt-2">
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
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder-gray-500 text-black"
                      placeholder="..."
                      {...field}
                    />
                  </FormControl>
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
                    <Input
                      className="placeholder-gray-500 text-black"
                      placeholder="..."
                      {...field}
                    />
                  </FormControl>
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
                      className="placeholder-gray-500 text-black"
                      placeholder="..."
                      {...field}
                    />
                  </FormControl>
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
                      className="placeholder-gray-500 text-black"
                      placeholder="..."
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
                      className="placeholder-gray-500 text-black"
                      placeholder="..."
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
                      className="placeholder-gray-500 text-black"
                      placeholder="..."
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
                      className="placeholder-gray-500 text-black"
                      placeholder="..."
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
                      className="placeholder-gray-500 text-black"
                      placeholder="..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mail</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder-gray-500 text-black"
                      placeholder="..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <Button type="submit" disabled={loading} className="justify-end">
              {loading ? "Cargando..." : "Entregar"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
