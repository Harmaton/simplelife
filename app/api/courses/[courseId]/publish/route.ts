
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        Chapter: true
        }
    });

    
    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedChapter = course.Chapter.some((chapter) => chapter.isPublished);

    // if (!course.title || !course.description || !course.imageUrl || !course.categoryId  ) {
    //   return new NextResponse("Missing required fields", { status: 401 });
    // }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}