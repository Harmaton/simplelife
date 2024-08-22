
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { auth } from "@/firebase"

const MeditationPage = async () => {

    const user  = auth.currentUser
    const userId = user?.uid
    if (!userId) {
      return redirect("/");
    }
  
    const sessions = await db.session.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return(
        <div className="p-6 justify-center space-y-4">
         
         <h2 className="text-center justify-center2-xl font-italic underline ">
          Gestiona tus sesiones de meditación
         </h2>
         
         <DataTable columns={columns} data={sessions} />
        </div>
    )
}

export default MeditationPage