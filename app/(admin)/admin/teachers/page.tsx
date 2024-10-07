import React from "react";
import { getAllTeachers } from "@/app/actions/user";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Page() {
  const teachers = await getAllTeachers();
  return (
    <div className="p-8">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Todos los Profesores Registrados</h1>
        <p className="text-gray-600 font-mono">
          Aquí puedes encontrar todos los profesores que han sido añadidos al
          sistema.
        </p>
      </div>
      <DataTable columns={columns} data={teachers} />
    </div>
  );
}