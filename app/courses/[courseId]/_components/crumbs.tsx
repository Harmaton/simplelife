

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import { SlashIcon } from "lucide-react";
  
  interface Props {
    categoryName: string;
    categoryId: string
    subcategoryName: string
    courseName: string
  }
  
  export function BreadcrumbWithCustomSeparatorForCoursePage({
    categoryName,
    categoryId,
    subcategoryName,
    courseName

  }: Props) {
    return (
      <Breadcrumb className="mt-2 mb-2 p-2 text-blue-500">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/search/?categoryId=${categoryId}`}>{categoryName}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
          <BreadcrumbLink href={`/search/?categoryId=${categoryId}`}>{subcategoryName}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-blue-500">{courseName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  