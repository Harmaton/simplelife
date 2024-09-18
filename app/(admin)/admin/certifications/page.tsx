import { GetCategoryNames } from "@/app/actions/categories";
import React from "react";
import { DataTable } from "../categories/_components/data-table";
import { columns } from "../categories/_components/columns";

export default async function Page() {
  const categories = await GetCategoryNames();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center my-4 text-3xl font-bold">
          Administrar Certificaciones
        </h1>
        <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-2">
          <DataTable columns={columns} data={categories} />
        </div>
      </div>
    </div>
  );
}
