"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcReadingEbook,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcPortraitMode,
  FcCollaboration,
  FcExternal,
} from "react-icons/fc";
import { GrProjects } from "react-icons/gr";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[] | undefined;
}

const iconMap: Record<Category["name"], IconType> = {
  "Pack Coaching": FcReadingEbook,
  "Pack Crecimiento Personal": FcSportsMode,
  "Pack Desarrollo Cognitivo": FcExternal,
  "Pack Terapia Holística": FcSalesPerformance,
  "Pack Espiritualidad": FcCollaboration,
  "Pack Psicologia": FcPortraitMode,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 m-auto overflow-x-auto pb-2 mt-2">
        {items ? (
          items.map((item) => (
            <CategoryItem
              key={item.id}
              label={item.name}
              icon={iconMap[item.name]}
              value={item.id}
            />
          ))
        ) : (
          <div className="col-span-full text-center">
            No Categories Added Yet
          </div>
        )}
      </div>
    </div>
  );
};
