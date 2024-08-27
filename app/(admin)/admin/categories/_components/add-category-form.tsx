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
import { SplineIcon, Trash } from "lucide-react";
import { useOptimistic } from "react";
import Link from "next/link";
import { Category } from "@prisma/client";

const categorySchema = z.object({
  name: z.string().min(3),
  pcode: z.number()
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
      pcode: 1234
    },
  });

  async function handleSubmit(values: z.infer<typeof categorySchema>) {
    await addCtegoriesAction(values.name, values.pcode);
    toast.success("Delicioso");
  }

  return (
    <div className="p-2 m-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid w-full max-w-4xl gap-2 items-center mb-2 "
        >
          <FormItem>
            <FormLabel>Nombre del Certificacion</FormLabel>
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

          <Button className="w-fit" type="submit" disabled={isPending}>
            {isPending && (
              <SplineIcon
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Añadir Certificacion
          </Button>
        </form>
      </Form>

      <div className="">
        <h1 className="text-center font-bold mb-2 mt-4">Certificaciones</h1>
        {categories ? (
          categories.map((category, index) => (
            <Link
              key={index}
              href={`/admin/categories/${category.id}`}
              className="p-4 mb-2 border flex justify-between items-center rounded-md hover:opacity-50 hover:text-blue-500 cursor-pointer hover:border-separate shadow-lg"
            >
              <span className="mr-2">{category.name}</span>
              <Button
                variant="outline"
                onClick={async () => {
                  await removeCategory(category.name);
                  toast.success("Remota");
                }}
              >
                <Trash className="m-auto h-4 w-4 text-red-500" />
              </Button>
            </Link>
          ))
        ) : (
          <div> Sin Certificaciones </div>
        )}
      </div>
    </div>
  );
}
