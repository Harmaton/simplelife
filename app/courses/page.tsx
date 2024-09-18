import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  // First, find the course by ID
  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  });

  // If the course doesn't exist, redirect
  if (!course) {
    return redirect("/");
  }

  // Now, use findFirst with additional conditions
  const validCourse = await db.course.findFirst({
    where: {
      id: params.courseId,
      startDate: {
        not: null
      },
      imageUrl: {
        not: null
      }
    },
    include: {
      Chapter: {
        where: {
          isPublished: true
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!validCourse || validCourse.Chapter.length === 0) {
    return redirect("/");
  }

  return redirect(`/courses/${validCourse.id}/chapters/${validCourse.Chapter[0].id}`);
}

export default CourseIdPage;