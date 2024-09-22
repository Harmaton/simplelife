import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(  req: NextRequest,
    { params }: { params: {chapterId: string } }) {
  try {
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
  req: NextRequest,
  { params }: { params: {chapterId: string } }
) {
  try {
    console.log("PATCH request received", params);
    let { chapterId } = params;

    // If params are undefined, try to get them from query parameters
    // if (!courseId || !chapterId) {
    //   const url = new URL(req.url);
    //   courseId = url.searchParams.get('nxtPcourseId') || '';
    //   chapterId = url.searchParams.get('nxtPchapterid') || '';
    // }

    // console.log("Using courseId:", courseId, "chapterId:", chapterId);

    // if (!courseId || !chapterId) {
    //   console.error("Missing courseId or chapterId");
    //   return new NextResponse("Course ID and Chapter ID are required", { status: 400 });
    // }

    const values = await req.json();
    console.log("Received values:", values);

    // Check if the chapter exists
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        // courseId: courseId,
      },
    });

    if (!chapter) {
      console.error("Chapter not found", { chapterId});
      return new NextResponse("Chapter not found", { status: 404 });
    }

    // Update the specific chapter
    const updatedChapter = await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        ...values,
      },
    });

    console.log("Chapter updated successfully", updatedChapter);
    return NextResponse.json(updatedChapter);
  } catch (error) {
    console.error("[COURSE_CHAPTER_UPDATE] Detailed error:", error);
    return new NextResponse(`Internal Error: ${error}`, { status: 500 });
  }
}