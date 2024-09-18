"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Categories = ({ categories }: { categories: Category[] }) => {
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);

  const router = useRouter();
  const handleDelete = async (categoryName: string) => {
    setDeletingCategory(categoryName);
    try {
      const response = await fetch(
        `/api/categories?name=${encodeURIComponent(categoryName)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      toast.success("Certificación eliminada con éxito");
      router.refresh();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error al eliminar la certificación");
    } finally {
      setDeletingCategory(null);
    }
  };

  return (
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
        <div className="text-center text-gray-500 py-8">
          Sin Certificaciones
        </div>
      )}
    </div>
  );
};

export default Categories;
