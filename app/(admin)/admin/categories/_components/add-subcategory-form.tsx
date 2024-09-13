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
} from "@/app/actions/categories";
import { SplineIcon, Trash } from "lucide-react";
import { useOptimistic } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Keep this import here

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
  const router = useRouter(); // Moved inside the component

  const [isPending, startTransition] = React.useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const [optimisticsubCategories, updateOptimisticsubCategories] =
    useOptimistic<SubCategoryProp[], { name: string; action: "add" | "remove" }>(
      names,
      (state, { name, action }) => {
        if (action === "add") {
          return [...state, { name }];
        } else if (action === "remove") {
          return state.filter((category) => category.name !== name);
        }
        return state;
      }
    );

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-lg p-6 border rounded-md shadow-lg bg-white">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(async (data) => {
              const newname = data.name;
              if (newname && typeof newname === "string") {
                try {
                  updateOptimisticsubCategories({
                    name: newname,
                    action: "add",
                  });

                  const result = await addsubCtegoriesAction(
                    newname,
                    categoryname
                  );

                  if (result.success) {
                    router.refresh();
                    toast.success(result.message);
                  } else {
                    toast.error(result.message)
                    throw new Error(result.message);
                  }
                } catch (error) {
                  toast.error(error)
                  console.error("Error al añadir la subcategoría:", error);
                  toast.error(
                    error instanceof Error
                      ? error.message
                      : "Error al añadir la subcategoría"
                  );
                  // Revert the optimistic update
                  updateOptimisticsubCategories({
                    name: newname,
                    action: "remove",
                  });
                }
              } else {
                toast.error("El nombre de la subcategoría no es válido");
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

            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={!form.watch("name")}
            >
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
    </div>
  );
}
