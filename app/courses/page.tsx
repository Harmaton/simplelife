import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  const course = await db.course.findUnique({
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
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!course || course.Chapter.length === 0) {
    return redirect("/");
  }
  
  return redirect(`/courses/${course.id}/chapters/${course.Chapter[0].id}`);
}

export default CourseIdPage;