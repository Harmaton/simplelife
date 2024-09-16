
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { url } = await req.json();

    const attachment = await db.chapterAttachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
        chapterId: params.chapterId
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("CHAPTER_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

