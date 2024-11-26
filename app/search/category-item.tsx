"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { checkUserPurchase } from "../actions/purchases";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
  id: string;
}

export const CategoryItem = ({
  label,
  value,
  icon: Icon,
  id,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-purple-300  flex items-center gap-x-1 hover:border-sky-700 hover:bg-blue-500  transition rounded-full",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} className="mr-2" />}
      <div>{label}</div>
      {/* {isPaid && <CheckCircle size={16} className="ml-2 text-green-500" />} */}
    </button>
  );
};
