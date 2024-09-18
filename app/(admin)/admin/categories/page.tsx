import { GetCategoryNames } from "@/app/actions/categories";
import React from "react";
import { AddCategoryForm } from "./_components/add-category-form";
import Categories from "./_components/categories";
import CreatePage from "./_components/new-addcategory";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

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
        <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-2">
          <CreatePage />
          <DataTable columns={columns} data={categories} />
        </div>
      </div>
    </div>
  );
}
