import React from "react";
import { BookPDFForm } from "../_components/book-pdf";
import { BookImageForm } from "../_components/book-image";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { BookActions } from "../_components/book-actions";
import { auth } from "@clerk/nextjs/server";

const BookIdPage = async ({ params }: { params: { bookid: string } }) => {
  const user = await auth();

  const userId = user?.userId;

  if (!userId) {
    return redirect("/");
  }

  const book = await db.book.findUnique({
    where: {
      id: params.bookid,
      userId,
    },
    include: {
      resourceUrl: true,
    }
  });

  if (!book) {
    redirect("/");
  }

  return (
    <div className="p-4">
      <div className="text-center m-2 flex space-y-6">
        <h1 className="font-bold 2xl">Administrar {book.title}</h1>
        <Link className="mr-2" href="/admin/addbook">
          <Button variant={"ghost"}>
            <MoveLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex p-2">
        <div>
          <BookImageForm bookToPublish={book} bookid={params.bookid} />
        </div>
        <div>

          <BookPDFForm bookToPublish={book} bookid={params.bookid} />

          <div className="mt-4">
            <BookActions
              disabled={false}
              id={params.bookid}
              isPublished={book.isPublished}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookIdPage;
