import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getMyLessons } from "@/app/actions/chapter";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user || !user.email) {
      return new NextResponse("User not found", { status: 404 });
    }

    const chapters = await getMyLessons(user.email);

    return new NextResponse(JSON.stringify(chapters), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("[CALENDAR_EVENT_ERR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}