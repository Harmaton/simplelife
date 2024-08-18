import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SubCategory } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  subcategory: SubCategory;
}

export default function SubcategoryItem({ subcategory }: Props) {
  return (
    <Card  className="bg-base-100 w-full shadow-xl h-80 flex flex-col justify-between rounded-md">
      <div className="relative h-full w-full overflow-hidden">
        {subcategory.imageUrl ? (
          <Image
            src={subcategory.imageUrl}
            alt={subcategory.name}
            width={50}
            height={50}
            objectFit="cover"
            className="w-full h-full"
          />
        ) : (
          <Image
            src="/background.jpg"
            alt={subcategory.name}
            width={50}
            height={50}
            objectFit="cover"
            className="w-full h-full"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
      </div>
      <CardContent className="p-4 bg-white bg-opacity-75 flex flex-col justify-between h-full">
        <h2 className="text-lg md:text-xl font-semibold font-serif text-neutral-700">
          {subcategory.name}
        </h2>
        <p className="text-sm text-neutral-600">{subcategory.description}</p>
        <div className="mt-4">
          <Link href={`/search/subcategory/${subcategory.id}`}>
            <Button className="w-full btn-primary">Cursos </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
