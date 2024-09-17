"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCtegoriesAction, removeCategory } from "@/app/actions/categories";
import { Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

const categorySchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  pcode: z.number().min(1, "El código de producto debe ser mayor que 0"),
});

type Inputs = z.infer<typeof categorySchema>;

type CategoryProp = {
  categories: Category[];
};

export function AddCategoryForm({ categories }: CategoryProp) {
  const [isPending, startTransition] = React.useTransition();
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);

  const form = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      pcode: 0,
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;
  const router = useRouter();

  async function handleSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(async () => {
      try {
        await addCtegoriesAction(values.name, values.pcode);
        toast.success("Certificación añadida con éxito");
        form.reset();
        router.refresh();
      } catch (error) {
        toast.error("Error al añadir la certificación");
      }
    });
  }

  const handleDelete = async (categoryName: string) => {
    setDeletingCategory(categoryName);
    try {
      await removeCategory(categoryName);
      toast.success("Certificación eliminada con éxito");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar la certificación");
    } finally {
      setDeletingCategory(null);
    }
  };

  return (
    <div className="p-4 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full md:w-1/2 space-y-4"
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
                {...form.register("pcode", { valueAsNumber: true })}
              />
            </FormControl>
          </FormItem>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
            type="submit"
            disabled={isPending || !isValid}
          >
            {isPending ? (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : null}
            Añadir Certificación
          </Button>
        </form>
      </Form>

      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Certificaciones</h1>
        <p className="text-sm text-gray-600 mb-4">
          Administra las categorías existentes, haz clic para editar
        </p>
        {categories && categories.length > 0 ? (
          <div className="space-y-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex justify-between items-center"
              >
                <Link
                  href={`/admin/categories/${category.id}`}
                  className="flex-grow hover:text-blue-600 transition-colors duration-200"
                >
                  <span>{category.name}</span>
                </Link>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(category.name);
                  }}
                  disabled={deletingCategory === category.name}
                  className="ml-4"
                >
                  {deletingCategory === category.name ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4 text-red-500" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">Sin Certificaciones</div>
        )}
      </div>
    </div>
  );
}
