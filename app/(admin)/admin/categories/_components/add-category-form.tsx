"use client";

import * as React from "react";
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

  return (
    <div className="p-2 m-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid w-full max-w-4xl gap-2 items-center mb-2 "
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
            className="hover:bg-blue-500 transition-colors duration-200"
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

      <div className="">
        <h1 className="text-center font-bold mb-2 mt-4">Certificaciones</h1>
        <p className="font-mono text-center font-sm">
          Administra las categorías existentes, haz clic para editar
        </p>
        {categories && categories.length > 0 ? (
          categories.map((category, index) => (
            <Link
              key={index}
              href={`/admin/categories/${category.id}`}
              className="p-4 mb-2 border flex justify-between items-center rounded-md hover:opacity-50 hover:text-blue-500 cursor-pointer hover:border-separate shadow-lg transition-all duration-200"
            >
              <span className="mr-2">{category.name}</span>
              <Button
                variant="outline"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  startTransition(async () => {
                    try {
                      await removeCategory(category.name);
                      toast.success("Certificación eliminada");
                      router.refresh(); // Ensure the page refreshes after removal
                    } catch (error) {
                      toast.error("Error al eliminar la certificación");
                    }
                  });
                }}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="m-auto h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="m-auto h-4 w-4 text-red-500" />
                )}
              </Button>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-500">Sin Certificaciones</div>
        )}
      </div>
    </div>
  );
}
