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
import {IconType} from "react-icons"
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
  "Pack Psicologia":  FcPortraitMode
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex flex-col">
      <div className='border rounded-md m-auto p-4 bg-background mb-2 text-center w-full'> 
      <h2 className="max-w-7xl   text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-3">
      Certificaciones 
      </h2>
      <p className='text-sm mt-4 mb-2'>Sharpen Your Skills with Proffesional Packs of Diplomas and earn Certificatates</p>
      </div>
      
      <div className="flex items-center gap-x-2 m-auto overflow-x-auto pb-2 mt-2">
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
          <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            No Categories Added Yet
          </div>
        )}
      </div>
    </div>
  );
};
