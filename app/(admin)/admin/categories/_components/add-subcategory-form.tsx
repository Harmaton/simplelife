"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  addsubCtegoriesAction,
  removesubCategory,
} from "@/app/actions/categories";
import { SplineIcon, Trash } from "lucide-react";
import { useOptimistic } from "react";
import Link from "next/link";

const categorySchema = z.object({
  name: z.string().min(3),
});

type Inputs = z.infer<typeof categorySchema>;

type SubCategoryProp = {
  name: string;
};

export function AddSubCategoryForm({
  names,
  categoryname,
}: {
  names: SubCategoryProp[];
  categoryname: string;
}) {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const [optimisticsubCategories, updateOptimisticsubCategories] =
    useOptimistic<
      SubCategoryProp[],
      { name: string; action: "add" | "remove" }
    >(names, (state, { name, action }) => {
      if (action === "add") {
        return [...state, { name }];
      } else if (action === "remove") {
        return state.filter((category) => category.name !== name);
      }
      return state;
    });

  return (
    <div className="p-4 m-2 border rounded-md">
      <Form {...form}>
        <form
          className="grid w-full max-w-4xl gap-2 items-center mb-2"
          onSubmit={form.handleSubmit(async (data) => {
            const newname = data.name;
            if (newname) {
              updateOptimisticsubCategories({ name: newname, action: "add" });

              console.log(newname);
              const result = await addsubCtegoriesAction(newname, categoryname);
              console.log(result);
            } else {
              console.error("Name is not a string:", newname);
              toast.error("No se pudo administrar");
            }
          })}
        >
          <FormItem>
            <FormLabel>Nombre de la Subcategoría</FormLabel>
            <FormControl>
              <Input
                placeholder="Ingrese el nombre de la subcategoría"
                {...form.register("name")}
              />
            </FormControl>
          </FormItem>

          <Button className="w-fit" disabled={!form.watch("name")}>
            {isPending && (
              <SplineIcon
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Añadir Subcategoría
          </Button>
        </form>
      </Form>
    </div>
  );
}
