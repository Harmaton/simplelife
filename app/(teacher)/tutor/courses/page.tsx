'use client'

import Link from "next/link"
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { Course } from "@prisma/client"
import { useAuth } from "@/providers/AuthProvider"
import { Button } from "@/components/ui/button"
import Loadingpage from "@/components/loading-page"

const queryClient = new QueryClient();

const CoursesPage = () => {
    const { user } = useAuth(); 

    const { data: coursedata, isLoading } = useQuery<Course[]>(['courses', user?.uid], async () => {
        if (!user?.uid) {
            redirect("/tutor/create");
            return [];
        }
        const courses = await db.course.findMany({
            where: {
                userId: user.uid
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return courses;
    });

    if (isLoading) {
       <Loadingpage />
    }

    return(
        <div className="p-6 justify-center">
         {coursedata ? (
             <DataTable columns={columns} data={coursedata} />
         ) : (
             <div className="flex flex-col items-center justify-center h-full border rounded-md mt-4 p-4">
                 <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500 text-white ">
                     <span className="text-2xl">🚀</span>
                 </div>
                 <h1 className="mt-4 text-2xl font-bold">Comienza ahora</h1>
                 <p className="mt-2 text-lg">¡Inicia tu viaje con nosotros hoy!</p>
                 <p className="mt-1 text-md">Únete a nosotros y haz un impacto</p>
                 <Link href='/tutor/create'>
                     <Button className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
                         Comenzar
                     </Button>
                 </Link>
             </div>
         )}
        </div>
    )
}

const CoursesPageWrapper = () => (
    <QueryClientProvider client={queryClient}>
        <CoursesPage />
    </QueryClientProvider>
);

export default CoursesPageWrapper;