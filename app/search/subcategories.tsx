import { SubCategory } from "@prisma/client";
import React from "react";
import SubcategoryItem from "./subcategory-item";


interface Props {
  subcategories: SubCategory[];
}

export default function SubCategories({ subcategories }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6">
      {subcategories.length > 0 ? (
        subcategories.map((subcategory) => (
          <SubcategoryItem key={subcategory.id} subcategory={subcategory} />
        ))
      ) : (
        <div> Selecciona una categoría</div>
      )}
    </div>
  );
}
