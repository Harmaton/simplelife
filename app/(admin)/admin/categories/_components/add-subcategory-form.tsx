"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addsubCtegoriesAction,  } from "@/app/actions/categories";
import { Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removesubCategory } from "@/app/actions/categories";

const categorySchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
});

type Inputs = z.infer<typeof categorySchema>;

type SubCategoryProp = {
  name: string;
  id: string;
};

export function AddSubCategoryForm({
  subcategories,
  categoryname,
}: {
  subcategories: SubCategoryProp[];
  categoryname: string;
}) {
  const [isPending, startTransition] = React.useTransition();
  const [deletingSubCategory, setDeletingSubCategory] = React.useState<string | null>(null);
  const router = useRouter();

  const form = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const { isValid } = form.formState;

  async function handleSubmit(values: z.infer<typeof categorySchema>) {
    startTransition(async () => {
      try {
        const result = await addsubCtegoriesAction(values.name, categoryname);
        if (result.success) {
          toast.success("Diploma añadido con éxito");
          form.reset();
          router.refresh();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Error al añadir el diploma");
      }
    });
  }

  const handleDelete = async (subcategoryName: string) => {
    setDeletingSubCategory(subcategoryName);
    try {
      await removesubCategory(subcategoryName);
      toast.success("Diploma eliminado con éxito");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar el diploma");
    } finally {
      setDeletingSubCategory(null);
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
            <FormLabel>Nombre del Diploma</FormLabel>
            <FormControl>
              <Input
                placeholder="Ingrese el nombre del diploma"
                {...form.register("name")}
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
            Añadir Diploma
          </Button>
        </form>
      </Form>

      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Diplomas Creados</h1>
        <p className="text-sm text-gray-600 mb-4">
          Administra los diplomas existentes, haz clic para editar
        </p>
        {subcategories && subcategories.length > 0 ? (
          <div className="space-y-3">
            {subcategories.map((subcategory, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex justify-between items-center"
              >
                <Link
                  href={`/admin/categories/${categoryname}/sub/${subcategory.id}`}
                  className="flex-grow hover:text-blue-600 transition-colors duration-200"
                >
                  <span>{subcategory.name}</span>
                </Link>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(subcategory.name);
                  }}
                  disabled={deletingSubCategory === subcategory.name}
                  className="ml-4"
                >
                  {deletingSubCategory === subcategory.name ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4 text-red-500" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">Sin Diplomas</div>
        )}
      </div>
    </div>
  );
}