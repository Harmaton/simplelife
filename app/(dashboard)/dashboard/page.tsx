import { redirect } from "next/navigation";
import { CheckCircle, Clock, Book, Code, Palette, Music } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { CoursesList } from "./_components/course-list";
import {
  getDashboardCourses,
} from "@/app/actions/courses";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NewCourseCard } from "@/app/search/subcategory/course-card";


export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  let dbuser = await db.user.findUnique({
    where: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
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

  async function getRandomCourses(count = 4) {
    // Get all courses
    const allCourses = await db.course.findMany();
  
    // Shuffle the courses
    const shuffledCourses = allCourses.sort(() => Math.random() - 0.5);
  
    // Take the first 'count' courses
    const randomCourses = shuffledCourses.slice(0, count);
  
    return randomCourses;
  }
  
  // Usage
  const courses = await getRandomCourses(4);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Gestiona tus cursos</h1>
      {user.firstName && (
        <p className="text-muted-foreground font-mono">
          Bienvenido, {user.firstName}!
        </p>
      )}

      <div className="mt-4 text-sm text-muted-foreground">
        <h1 className="font-semibold ">Tus cursos</h1>
       <p className="text-sm"> Todos los cursos y certificaciones que pagues aparecerán aquí. Los
        cursos terminados y en curso se rastrearán aquí. </p>
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
