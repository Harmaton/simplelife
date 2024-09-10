
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { clerkId, email, isadmin, isTeacher, isStudent, createdAt, updatedAt } = await req.json();

    const user = await db.user.create({
      data: {
        clerkId,
        email,
        isadmin,
        isTeacher,
        isStudent,
        createdAt,
        updatedAt,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("[USER_SIGNUP]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}