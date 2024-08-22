
import Link from "next/link"
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { auth } from "@/firebase"



const CoursesPage = async () => {
    const user = auth.currentUser
    const userId  = user?.uid;

    if (!userId) {
      return redirect("/");
    }
  
    const courses = await db.course.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return(
        <div className="p-6 justify-center">
         <Link href='/dashboard/teacher/create'>
         <h2 className="text-center justify-center text-indigo-500 font-italic underline ">
         Comenzar
         </h2>
         </Link>
         <DataTable columns={columns} data={courses} />
        </div>
    )
}

export default CoursesPage