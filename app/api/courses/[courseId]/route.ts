

import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/firebase";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const userId = auth.currentUser;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({ where: {
        clerkId: userId.uid
    }});
    if (!user) {
        return NextResponse.json({ message: "No user" }, { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        teacherId: user.id,
      },
      include: {
        Chapter: true,
      }
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
    const userId = auth.currentUser;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({ where: {
      clerkId: userId.uid
    }});
    if (!user) {
      return NextResponse.json({ message: "No user" }, { status: 401 });
    }

    const { courseId } = params;
    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: courseId,
        teacherId: user.id,
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