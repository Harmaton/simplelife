import { redirect } from "next/navigation";
import {
  TimerIcon,
  File,
  Clock10Icon,
  LayoutDashboard,
  ListChecks,
  CheckSquareIcon,
  CircleDollarSign,
} from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import { PrerequisitesForm } from "./_components/prerequisites";
import { StartDateForm } from "./_components/dates";
import { EndDateForm } from "./_components/last-date";
import { LinkForm } from "./_components/link";
import { EvaluationsForm } from "./_components/evaluation";
import { WhatsappForm } from "./_components/whatsapp";
import { SubCategoryForm } from "./_components/sub-category";
import Loadingpage from "@/components/loading-page";

const CourseIdPage = async ({ params, searchParams }: { params: { courseId: string }, searchParams: { userId: string } }) => {
  const userId = searchParams.userId;

  if (!userId) {
    return <Loadingpage />;
  }

  // const teacher = await db.user.findUnique({
  //   where: {
  //     clerkId: userId,
  //   },
  // });

  // if (!teacher) {
  //   return <Loadingpage />;
  // }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      Chapter: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  let subcategories: any[] = [];
  if (course.categoryId) {
    subcategories = await db.subCategory.findMany({
      where: {
        categoryId: course.categoryId,
      },
    });
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.subcategoryId,
    course.Chapter.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-8 border">
      {!course.isPublished && (
        <Banner label="Este curso es inédito. No será visible para los estudiantes." />
      )}
      <div className="p-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Configuración del curso</h1>
            <span className="text-sm text-slate-700">
              Completa todos los campos {completionText}
            </span>
          </div>
          <Actions
            disabled={false}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Left Column */}
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Personaliza tu curso</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            {course.categoryId ? (
              <SubCategoryForm
                initialData={course}
                courseId={course.id}
                options={subcategories.map((subCategory) => ({
                  label: subCategory.name,
                  value: subCategory.id,
                }))}
              />
            ) : (
              <div className="mt-6 border bg-slate-100 rounded-md p-4">
                <h1 className="text-lg font-semibold">Subcategoría</h1>
                <div className="font-medium flex items-center justify-between">
                  <p className="text-green-500 text-sm">
                    Elija la categoría primero
                  </p>
                </div>
              </div>
            )}
            <WhatsappForm initialData={course} courseId={course.id} />
           
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Capítulos del curso</h2>
            </div>
            <ChaptersForm initialData={course} courseId={course.id} />

            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Vende tu curso</h2>
            </div>
            <LinkForm initialData={course} courseId={course.id} />
            <div>{course.paymentLink}</div>

            <div className="flex items-center gap-x-2">
              <IconBadge icon={CheckSquareIcon} />
              <h2 className="text-xl">Requisitos previos del curso</h2>
            </div>
            <PrerequisitesForm initialData={course} courseId={course.id} />

            <div className="flex items-center gap-x-2">
              <IconBadge icon={Clock10Icon} />
              <h2 className="text-xl">Fecha de inicio del curso</h2>
            </div>
            <StartDateForm initialData={course} courseId={course.id} />

            <div className="flex items-center gap-x-2">
              <IconBadge icon={TimerIcon} />
              <h2 className="text-xl">Último día del curso</h2>
            </div>
            <EndDateForm initialData={course} courseId={course.id} />

            <EvaluationsForm courseId={course.id} initialData={course} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
