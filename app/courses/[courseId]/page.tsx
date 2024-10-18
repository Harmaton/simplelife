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
  ArrowUp,
  Lock,
  DessertIcon,
} from "lucide-react";
import Navbar from "@/components/landing-page/navbar";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Footer } from "@/components/landing-page/footer";
import { BreadcrumbWithCustomSeparatorForCoursePage } from "./_components/crumbs";
import { GetCategoryPurchases } from "@/app/actions/courses";
import { currentUser } from "@clerk/nextjs/server";
import { getUserID } from "@/app/actions/user";
import Link from "next/link";

const CourseIdPage = async ({
  params,
}: {
  params: { courseId: string; uid: string };
}) => {
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

  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  let dbuser = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!dbuser) {
    dbuser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  if (!course || !course.categoryId) {
    return <div>Curso no encontrado o no hay capítulos disponibles.</div>;
  }

  const categoryPurchase = await GetCategoryPurchases(
    course.categoryId,
    dbuser.id
  );

  return (
    <div className="p-2">
      <div className="lg:pl-12 m-2 space-y-2">
        {course &&
          course.category &&
          course.categoryId &&
          course.subcategory && (
            <BreadcrumbWithCustomSeparatorForCoursePage
              categoryName={course.category?.name}
              categoryId={course.categoryId}
              subcategoryName={course.subcategory?.name}
              courseName={course.title}
            />
          )}
        <h2 className="max-w-7xl pl-4 mx-auto text-center text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-2 border rounded-full p-2">
          {course.title}
        </h2>
      </div>

      {!categoryPurchase && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center space-x-4">
          <Lock className="h-6 w-6 text-red-700" />
          <span className="flex-grow text-center font-semibold">
            {`Necesitas comprar la categoría - ${course.category?.name} - para acceder al curso completo.
¡Descuento especial válido por las próximas 48 horas!`}
          </span>
          <Link href="/pricing" className="text-blue-500 underline mr-4">
            Ir a precios
          </Link>
        </div>
      )}

      <div className="max-w-5xl mx-auto p-6 ">
        <Card className="bg-gray-100">
          <CardHeader>
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
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative">
              {course.imageUrl && (
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover w-full rounded-md"
                />
              )}
            </div>
            <div className="mt-4 flex ">
              <DessertIcon className="mr-2 w-4 h-4" />
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
                  <span className="mr-2 font-bold">Lecciones Categoría: </span>
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
                    className="flex justify-between border rounded-md  p-4 items-center"
                  >
                    <span>{chapter.title}</span>
                    {categoryPurchase ? (
                      <Link
                        href={`/courses/${course.id}/chapters/${chapter.id}`}
                        passHref
                      >
                        <Button variant="outline" size="sm" className="flex">
                          Continuar aprendiendo
                          <ArrowUp className="h-4 w-4 justify-end ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/pricing" passHref>
                        <Button variant="outline" size="sm" className="flex">
                          Vista previa
                          <ArrowUp className="h-4 w-4 justify-end ml-2" />
                        </Button>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CourseIdPage;
