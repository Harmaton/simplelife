
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { auth } from "@/firebase"


const BookPage = async () => {

   const user = auth.currentUser

   const userId = user?.uid

    if (!userId) {
      return redirect("/");
    }
  
    const book = await db.book.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return(
        <div className="p-6 justify-center">
         <DataTable columns={columns} data={book} />
        </div>
    )
}

export default BookPage