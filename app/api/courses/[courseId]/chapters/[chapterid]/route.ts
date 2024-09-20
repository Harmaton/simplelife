import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string ,chapterId: string} }
) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: params.courseId
      },
      include: {
        Chapter: true
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedCourse = await db.chapter.delete({
      where: {
        id: params.chapterId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {

    // console.log("PATCH request received", params);
    const { courseId, chapterId } = params;
    const values = await req.json();

    

    // First, check if the course and chapter exist
    const course = await db.course.findUnique({
      where: {
        id: courseId
      },
      include: {
        Chapter: {
          where: {
            id: chapterId
          }
        }
      }
    });

    if (!course || course.Chapter.length === 0) {
      return new NextResponse("Course or Chapter not found", { status: 404 });
    }

    // Update the specific chapter
    const updatedChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId // Ensure the chapter belongs to the correct course
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(updatedChapter);
  } catch (error) {
    console.log("[COURSE_CHAPTER_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}