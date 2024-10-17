import { redirect } from "next/navigation";
import { CheckCircle, Clock, Book, Code, Palette, Music } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { CoursesList } from "./_components/course-list";
import { getDashboardCourses } from "@/app/actions/courses";
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
    const allCourses = await db.course.findMany();
    const shuffledCourses = allCourses.sort(() => Math.random() - 0.5);
    return shuffledCourses.slice(0, count);
  }

  const courses = await getRandomCourses(4);

  const catpurchases = await db.categoryPurchase.findMany({
    where: {
      userId: dbuser.id,
    },
  });

  const certifications = await db.category.findMany({
    where: {
      id: {
        in: catpurchases.map(purchase => purchase.categoryId)
      },
    },
    include: {
      Courses: {
        include: {
          Chapter: {
            include: {
              userProgress: {
                where: {
                  userId: dbuser.id
                }
              }
            }
          }
        }
      }
    }
  });

  // Calculate progress for each certification
  const certificationsWithProgress = certifications.map(cert => {
    const totalChapters = cert.Courses.reduce((acc, course) => acc + course.Chapter.length, 0);
    const completedChapters = cert.Courses.reduce((acc, course) => 
      acc + course.Chapter.filter(Chapter => Chapter.userProgress.some(progress => progress.isCompleted)).length, 0);
    const progress = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;
    return { ...cert, progress };
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
        <h1 className="font-semibold ">Tus cursos</h1>
        <p className="text-sm">
          Todos los cursos y certificaciones que pagues aparecerán aquí. Los
          cursos terminados y en curso se rastrearán aquí.
        </p>
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

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Certificaciones en progreso</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certificationsWithProgress.map((cert) => (
            <div key={cert.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-between">
              <span className="text-sm font-semibold">{cert.name}</span>
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="4"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="#4b5563"
                    strokeWidth="4"
                    strokeDasharray="126"
                    strokeDashoffset={126 - (cert.progress / 100) * 126}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  {Math.round(cert.progress)}%
                </span>
              </div>
            </div>
          ))}
        </div>
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