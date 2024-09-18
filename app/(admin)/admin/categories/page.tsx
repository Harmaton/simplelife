import { GetCategoryNames } from "@/app/actions/categories";
import React from "react";
import { AddCategoryForm } from "./_components/add-category-form";
import Categories from "./_components/categories";
import CreatePage from "./_components/new-addcategory";

export default async function Page() {
  const categories = await GetCategoryNames();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center my-4 text-3xl font-bold">
          Administrar Certificaciones
        </h1>
        <p className="text-center mb-2 text-lg text-gray-600 font-mono">
          Crear, actualizar y eliminar Certificaciones y Diplomas.
        </p>
        <div className="p-4 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        <CreatePage  />
        <Categories categories={categories} />
        </div>
      </div>
    </div>
  );
}