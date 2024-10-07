import { redirect } from "next/navigation";
import { CheckCircle, Clock, Book, Code, Palette, Music } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { CoursesList } from "./_components/course-list";
import {
  CourseWithProgressWithCategory,
  getDashboardCourses,
} from "@/app/actions/courses";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NewCourseCard } from "@/app/search/subcategory/course-card";

interface CoursesState {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
}

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  let dbuser = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!dbuser) {
    dbuser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    dbuser.id
  );

  const courses = await db.course.findMany({
    take: 4,
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Gestiona tus cursos</h1>
      {user.firstName && (
        <p className="text-muted-foreground font-mono">
          Bienvenido, {user.firstName}!
        </p>
      )}

      <div className="mt-4 text-sm text-muted-foreground">
        Todos los cursos y certificaciones que pagues aparecerán aquí. Los
        cursos terminados y en curso se rastrearán aquí.
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard
          icon={Clock}
          label="En progreso"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completado"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>

      <CoursesList items={[...coursesInProgress, ...completedCourses]} />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recomendaciones para ti</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {courses.map((course) => (
            <NewCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
