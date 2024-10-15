import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user || !user.email) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Fetch all category purchases by the user
    const purchases = await db.categoryPurchase.findMany({
      where: { userId: user.id },
      include: { category: true }, // Include related category data
    });

    if (purchases.length === 0) {
      return new NextResponse(JSON.stringify([]), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract category IDs from purchases
    const categoryIds = purchases.map(purchase => purchase.categoryId);

    // Fetch all courses and their chapters that belong to the purchased categories
    const chapters = await db.chapter.findMany({
      where: {
        course: {
          categoryId: { in: categoryIds },
        },
      },
      include: {
        course: {
          select: { title: true, category: { select: { name: true } } },
        },
      },
    });

    return new NextResponse(JSON.stringify(chapters), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("[CHAPTER_FETCH_ERR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
