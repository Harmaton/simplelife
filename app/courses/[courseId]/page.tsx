import React from "react";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  BarChart,
  Folder,
  FolderTree,
  ChevronLeft,
} from "lucide-react";
import Navbar from "@/components/landing-page/navbar";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Footer } from "@/components/landing-page/footer";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      startDate: {
        not: null,
      },
      imageUrl: {
        not: null,
      },
    },
    include: {
      Chapter: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
      User: true,
      category: true,
      subcategory: true,
    },
  });

  const userid = course?.teacherId;

  if (!userid) {
    redirect("/login");
  }

  if (!course || course.Chapter.length === 0) {
    return <div>Curso no encontrado o no hay capítulos disponibles.</div>;
  }

  return (
    <div className="p-2">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 ">
        <Card className="bg-gray-100">
          <CardHeader>
            <div className="flex justify-end">
              <ChevronLeft className="mb-6 border " />
            </div>
            <CardTitle className="text-4xl uppercase mb-4 font-bold">
              <h1 className="mb-4"> {course.title}</h1>
            </CardTitle>

            <div className="flex items-center">
              {course.User?.image && (
                <div className="mr-3 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={course.User.image}
                      alt={course.User.nickname || "Profesor"}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-col justify-center">
                <p className="text-sm text-gray-500">
                  Creado por:{" "}
                  <span className="text-black font-medium">
                    {course.User?.nickname || "Desconocido"}
                  </span>
                </p>
              </div>
            </div>

            {/* <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
              {course.User?.image && (
                <div className="mr-2">
                  <Image
                    src={course.User.image}
                    alt={course.User.nickname || "Profesor"}
                    width={48}
                    height={48}
                    className="rounded-md mb-2 sm:mb-0 sm:mr-4"
                  />
                </div>
              )}

              <p className="text-sm text-gray-500 ">
                Creado por:{" "}
                <span className="text-black">
                  {course.User?.nickname || "Desconocido"}
                </span>
              </p>
            </div> */}
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative">
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="object-cover rounded-md"
                />
              )}
            </div>
            <div className="mt-4">
              <p className="mb-4">{course.description}</p>
            </div>
            <div className="flex items-center mt-4 space-x-4">
              <div className="flex items-center">
                <Clock className="mr-2 text-black h-4 w-4" />
                <span>{course.startDate?.toDateString() || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>{course.averageRating || 0} calificación</span>
              </div>
              <div className="flex items-center">
                <BarChart className="mr-2 h-4 w-4" />
                <span>{course.Chapter.length} capítulos</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Folder className="mr-2 text-black h-4 w-4" />
                  <span className="mr-2 font-bold">Categoría: </span>
                  {course.category?.name}
                </div>
                <div className="flex items-center">
                  <FolderTree className="mr-2 text-black h-4 w-4" />
                  <span className="mr-2 font-bold">Subcategoría:</span>
                  {course.subcategory?.name}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Capítulos:</h3>
              <ul className="space-y-2">
                {course.Chapter.map((chapter) => (
                  <li
                    key={chapter.id}
                    className="flex justify-between border p-4 items-center"
                  >
                    <span>{chapter.title}</span>
                    <Button variant="outline" size="sm">
                      {chapter.isFree ? "Comenzar" : "Vista previa"}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Button className="w-full">Consultar precios</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CourseIdPage;
