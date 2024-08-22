"use client";

import { removesubCategory } from "@/app/actions/categories";
import { Button } from "@/components/ui/button";
import { SubCategory } from "@prisma/client";
import { Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  subcategories: SubCategory[];
  categoryName: string;
}

export default function Subcategories({ subcategories, categoryName }: Props) {
  async function handleDelete(name: string) {
    await removesubCategory(name);
    toast.success("Remota");
  }
  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold mb-2 mt-2 text-center">
        Diplomas creados
      </h1>
      {subcategories ? (
        subcategories.map((subcategory, index) => (
          <Link
            key={index}
            href={`/admin/categories/${categoryName}/sub/${subcategory.id}`}
            className="p-4 mb-2 border border-b-3 flex justify-between items-center rounded-md hover:opacity-50 hover:text-blue-500 cursor-pointer hover:border-separate shadow-lg"
          >
            <span className="mr-2">{subcategory.name}</span>
            <Button
              variant="outline"
              onClick={() => handleDelete(subcategory.name)}
            >
              <Trash className="m-auto h-4 w-4 text-red-500" />
            </Button>
          </Link>
        ))
      ) : (
        <div>Sin Diplomas</div>
      )}
    </div>
  );
}
