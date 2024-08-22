import { GetCategoryItem, GetSubCategories } from "@/app/actions/categories";

import React from "react";
import { redirect } from "next/navigation";
import { BreadcrumbWithCustomSeparator } from "./_components/breadC";
import { ImageForm } from "./_components/image";
import Subcategories from "./_components/sub-categories";
import { AddSubCategoryForm } from "../_components/add-subcategory-form";

export default async function page({
  params,
}: {
  params: { categoryId: string };
}) {
  const subcategories = await GetSubCategories(params.categoryId);
  const categoryItem = await GetCategoryItem(params.categoryId);
  if (!categoryItem) {
    redirect("/");
  }

  return (
    <div className="p-4 justify-center space-y-5">
      <h1 className="text-center my-4 text-2xl font-bold">
        <span className="text-blue-500">{categoryItem.name} </span> en
        Certificación
      </h1>
      <p className="text-center mb-4 text-sm ">Administrar Certificación</p>
      <BreadcrumbWithCustomSeparator categoryName={categoryItem.name} />
      <ImageForm initialData={categoryItem} categoryId={categoryItem.id} />
      <h1 className="text-2xl font-semibold">
        Crear o eliminar Certificación en{" "}
        <span className="font-bold text-blue-500">{categoryItem.name}</span>
      </h1>

      <AddSubCategoryForm
        names={subcategories}
        categoryname={categoryItem.name}
      />
      <Subcategories
        subcategories={subcategories}
        categoryName={categoryItem.name}
      />
    </div>
  );
}
