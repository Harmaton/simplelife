


import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    // Check if the user exists in the database
    const user = await db.user.findUnique({
      where: { clerkId: uid },
    });

    // Return true if user exists, otherwise return false
    if (user) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 404 });
    }
  } catch (error) {
    console.error("[USER_LOGIN]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}