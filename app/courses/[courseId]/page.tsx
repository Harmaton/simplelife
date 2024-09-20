import React from "react";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, BarChart, Folder, FolderTree } from "lucide-react";
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
    redirect('/login');
  }

  if (!course || course.Chapter.length === 0) {
    return <div>Curso no encontrado o no hay capítulos disponibles.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
            <div className="flex items-center mt-2">
              {course.User?.image && (
                <div className="mr-2">
                  <Image
                    src={course.User.image}
                    alt={course.User.nickname || "Profesor"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              )}
              <p className="text-sm text-gray-500">
                Creado por: {course.User?.nickname || "Desconocido"}
              </p>
            </div>
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
              <p>{course.description}</p>
            </div>
            <div className="flex items-center mt-4 space-x-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{course.duration || "N/A"}</span>
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
                  <Folder className="mr-2 h-4 w-4" />
                  <span>Categoría: Certificación</span>
                </div>
                <div className="flex items-center">
                  <FolderTree className="mr-2 h-4 w-4" />
                  <span>Subcategoría: Diploma</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Capítulos:</h3>
              <ul className="space-y-2">
                {course.Chapter.map((chapter) => (
                  <li
                    key={chapter.id}
                    className="flex justify-between items-center"
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
    </>
  );
};

export default CourseIdPage;