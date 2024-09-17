import { GetCategoryItem, GetSubCategories } from "@/app/actions/categories";

import React from "react";
import { redirect } from "next/navigation";
import { BreadcrumbWithCustomSeparator } from "./_components/breadC";
import { ImageForm } from "./_components/image";
import Subcategories from "./_components/sub-categories";
import { AddSubCategoryForm } from "../_components/add-subcategory-form";
import ImageFormDropdown from "./image";

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
    <div className="p-8  justify-center space-y-2">
      <h1 className="text-center my-4 text-2xl font-bold">
        <span className="text-blue-500">{categoryItem.name} </span> en
        Certificación
      </h1>
      <p className="text-center mb-4 text-sm ">Administrar Certificación</p>
      <BreadcrumbWithCustomSeparator categoryName={categoryItem.name} />
      <ImageFormDropdown initialData={categoryItem} categoryId={categoryItem.id} />

      <h1 className="text-2xl text-center font-semibold">
        Crear o eliminar Certificación en{" "}
        <span className="font-bold text-center text-blue-500">
          {categoryItem.name}
        </span>
      </h1>

      <AddSubCategoryForm
        categoryname={categoryItem.name}
        subcategories={subcategories}
      />
    </div>
  );
}
