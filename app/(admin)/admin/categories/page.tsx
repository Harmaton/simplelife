
import { GetCategoryNames } from "@/app/actions/categories";
import React from "react";
import { AddCategoryForm } from "./_components/add-category-form";

export default async function page() {
  const categories = await GetCategoryNames();
  return (
    <div className="p-4 justify-center space-y-5">
      <h1 className="text-center my-4 text-2xl font-bold">
        Administrar Certificaciones
      </h1>
      <p className="text-center mb-4 text-sm ">
        Crear, actualizar y eliminar Certificaciones y Diplomas.
      </p>
      <AddCategoryForm categories={categories}  />
    </div>
  );
}
