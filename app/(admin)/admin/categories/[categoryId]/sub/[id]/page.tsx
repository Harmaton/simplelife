import React from "react";
import { redirect } from "next/navigation";
import {
  GetCategoryNameFromSubCategory,
  GetSubCategoryItem
} from "@/app/actions/categories";
import { BreadcrumbWithCustomSeparator } from "./_components/breadC";
import { ImageForm } from "./_components/image";
import { DescriptionForm } from "./_components/desc";

export default async function Page({ params }: { params: { id: string } }) {
  const subcategoryItem = await GetSubCategoryItem(params.id);

  if (!subcategoryItem || !subcategoryItem.categoryId) {
    redirect("/");
  }

  const categoryName = await GetCategoryNameFromSubCategory(
    subcategoryItem.categoryId
  );

  if (!categoryName) {
    redirect("/admin/categories/");
  }

  return (
    <div className="p-4 justify-center space-y-5">
      <h1 className="text-center my-4 text-2xl font-bold">
        <span className="text-blue-500"> {subcategoryItem.name}</span> en
        Diploma
      </h1>
      <p className="text-center mb-4 text-sm ">Administrar Diploma</p>
      <BreadcrumbWithCustomSeparator
        categoryName={categoryName.name}
        subcategoryName={subcategoryItem.name}
        categoryId={subcategoryItem.categoryId}
      />
      <ImageForm
        initialData={subcategoryItem}
        subcategoryId={subcategoryItem.id}
      />
      <div className="p-2 space-y-2">
        <h1 className="text-2xl font-semibold">
          Actualizar descripción de Diplomas
        </h1>
        <DescriptionForm
          initialData={subcategoryItem}
          subcategoryId={subcategoryItem.id}
        />
      </div>
    </div>
  );
}
