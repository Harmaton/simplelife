import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; } }
) {
  try {
  
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        Chapter: true,
      },
    });

    if (!course) {
      return new NextResponse("Course Not found", { status: 404 });
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
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
  { params }: { params: { courseId: string } } 
) {
  try {
    const { courseId } = params; 


    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: courseId
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}