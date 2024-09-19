"use client";

import React, { useState, useEffect } from "react";
import { getAllTeachers } from "@/app/actions/user";
import { DataTable } from "./teachers/data-table";
import { columns } from "./teachers/columns";
import { User } from "@prisma/client";

export default function Page() {
  const [teachers, setTeachers] = useState<User[]>([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      const fetchedTeachers = await getAllTeachers();
      setTeachers(fetchedTeachers);
    };
    fetchTeachers();
  }, []);

  return (
    <div className="p-8 ">
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
