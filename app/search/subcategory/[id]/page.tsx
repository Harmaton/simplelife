import {
    GetCoursesInCategory,
    GetsubCategoryDetails,
  } from "@/app/actions/courses";
  import React from "react";
  import { NewCourseCard } from "../course-card";
  import { BreadcrumbWithCustomSeparator } from "./crumbs";
  import { GetCategoryNameFromSubCategory } from "@/app/actions/categories";
  import Image from "next/image";
import Navbar from "@/components/landing-page/navbar";
  export default async function Page({ params }: { params: { id: string } }) {
    const courses = await GetCoursesInCategory(params.id);
    const details = await GetsubCategoryDetails(params.id);
  
    if (!details || !details.categoryId) {
      return null; // Return null or a placeholder if details are not found
    }
  
    const category = await GetCategoryNameFromSubCategory(details.categoryId);
  
    return (
      <div className="p-2 space-y-2">
        <Navbar />
        <div className="lg:pl-12 m-2 space-y-2">
          {category && (
            <BreadcrumbWithCustomSeparator
              categoryName={category?.name}
              categoryId={details.categoryId}
              subcategoryName={details.name}
            />
          )}
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-2 border rounded-full p-2">
            Cursos de {details.name}
          </h2>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {courses.map((course) => (
                <NewCourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-600 flex flex-col space-y-4 mt-4">
              <h1>
                No hay cursos disponibles en esta categoría. Vuelve más tarde
              </h1>
              <Image
                src={"/no-courses.svg"}
                className="flex items-center justify-center m-auto"
                width={300}
                height={300}
                alt={"no courses"}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
  