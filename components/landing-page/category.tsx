import { getCategoryNumberOfCourses, getSubcategoriesInCategory } from "@/app/actions/categories";
import { Category } from "@prisma/client";
import { Camera } from "lucide-react";
import Image from "next/image";

export default async function CategoryCard({
  category,
  courselength,
}: {
  category: Category;
  courselength: number;
}) {
  const leng = await getCategoryNumberOfCourses(category.id);
 const subs = await getSubcategoriesInCategory(category.id)
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow hover:bg-purple-300 cursor-pointer">
      {}{" "}
      {category.imageUrl ? (
        <Image src={category.imageUrl} className="w-full" alt={"Image"} height={200} width={250} />
      ) : (
        <Image src={"/logo-1.png"} alt={"Image"} height={200} width={200} />
      )}
      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
      <div className="flex justify-between ">
      <p className="text-sm text-gray-600 mr-2">Diplomados {subs} </p>

      <p className="text-sm text-gray-600 ml-2 "> Cursos {leng}</p>
      </div>
    </div>
  );
}