import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    // console.log('CREATE PRODUCTS',name, productCode)

    const newCategory = await db.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.log("[CATEGORY_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    console.log("DELETE", name);

    if (!name) {
      return new NextResponse("Category name is required", { status: 400 });
    }

    const deletedCategory = await db.category.delete({
      where: {
        name,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
