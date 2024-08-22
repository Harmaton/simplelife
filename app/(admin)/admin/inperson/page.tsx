
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/column"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { auth } from "@/firebase"

const InPersonPage = async () => {

   const user = auth.currentUser
   const userId = user?.uid

    if (!userId) {
      return redirect("/");
    }
  
    const event = await db.inHouseEvent.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return(
        <div className="p-6 justify-center">
          <h1>Administrar eventos</h1>
         <DataTable columns={columns} data={event} />
        </div>
    )
}

export default InPersonPage