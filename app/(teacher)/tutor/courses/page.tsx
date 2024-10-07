import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

async function getTeacherCourses() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/");
  }

  const dbUser = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!dbUser) {
    return null;
  }

  const courses = await db.course.findMany({
    where: {
      teacherId: dbUser.id,
    },
  });

  return {
    courses,
    dbUser,
  };
}

const CoursesPage = async () => {
  const data = await getTeacherCourses();

  return (
    <div className="p-8 justify-center">
      <div className="text-left my-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Mantén un Registro de Tus Cursos
        </h1>
        <p className="text-lg text-gray-600">
          Administra y controla fácilmente tus cursos a continuación
        </p>
      </div>
      {data?.courses && data.courses.length > 0 ? (
        <DataTable columns={columns} data={data.courses} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full border rounded-md mt-4 p-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500 text-white">
            <span className="text-2xl">🚀</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold">Comienza ahora</h1>
          <p className="mt-2 text-lg">¡Inicia tu viaje con nosotros hoy!</p>
          <p className="mt-1 text-md">Únete a nosotros y haz un impacto</p>
          <Link href="/tutor/create">
            <Button className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
              Comenzar
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;