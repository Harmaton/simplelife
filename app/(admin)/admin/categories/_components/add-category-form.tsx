"use client";

import React, { useOptimistic, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Category } from "@prisma/client";

export const categorySchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  productCode: z.number().min(1, "El código de producto debe ser mayor que 0"),
});

type Inputs = z.infer<typeof categorySchema>;

export function AddCategoryForm() {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      productCode: 0,
    }
  });

  const { isValid } = form.formState;
  async function handleSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(async () => {
      try {
        const response = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Failed to create category");
        }

        toast.success("Certificación añadida con éxito");
        form.reset();
        
      } catch (error) {
        console.error("Error adding category:", error);
        toast.error("Error al añadir la certificación");
      }
    });
  }

  // const [optimisticCategories, addOptimisticCategories] = useOptimistic<
  //   Category[],
  //   string
  // >(categories, (state, newCategory) => [...state, { category: newCategory }]);

  // const formAction = async (formData) => {
  //   const message = formData.get('message') as string
  //   addOptimisticMessage(message)
  //   await send(message)
  // }

  const { pending } = useFormStatus();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full md:w-1/2 space-y-4"
        // action={addCtegoriesAction}
      >
        <FormItem>
          <FormLabel>Nombre de la Certificación</FormLabel>
          <FormControl>
            <Input
              placeholder="Categoría de entrada"
              {...form.register("name")}
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Código de Producto</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Código de producto"
              {...form.register("productCode", { valueAsNumber: true })}
            />
          </FormControl>
        </FormItem>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          type="submit"
          disabled={isPending || !isValid}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          ) : null}
          Añadir Certificación
        </Button>
      </form>
    </Form>
  );
}
