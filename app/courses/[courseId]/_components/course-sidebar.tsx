
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseSidebarItem } from "./course-sidebar-item";
import { auth } from "@clerk/nextjs/server";
import { CourseProgress } from "@/app/(dashboard)/dashboard/_components/course-progress";


interface CourseSidebarProps {
  course: Course & {
    Chapter: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
  progressCount: number;
};

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId || !course.categoryId) {
    return redirect("/");
  }

//   const purchase = await db.coursePurchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       }
//     }
//   });



const bought = await db.categoryPurchase.findMany({
    where: {
        userId: userId,
        categoryId: course.categoryId
    }
})

const purchase = bought.length !== 0;



  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">
          {course.title}
        </h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.Chapter.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!purchase}
          />
        ))}
      </div>
    </div>
  )
}