
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
  subcategoryName: string;
  categoryId: string
}

export function BreadcrumbWithCustomSeparator({
  categoryName,
  subcategoryName,
  categoryId
}: Props) {
  return (
    <Breadcrumb className="mt-2 mb-2 p-2 text-blue-500">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/categories">Certificaciónes</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/admin/categories/${categoryId}`}>
            {categoryName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-blue-500">{subcategoryName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
