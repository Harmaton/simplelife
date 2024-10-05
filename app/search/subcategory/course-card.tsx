"use client";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarRange,
  Clock,
  MinusIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { useAuth } from "@/providers/AuthProvider";
import { ArrowUpOnSquareIcon } from "@heroicons/react/20/solid";

interface CourseCardProps {
  course: Course;
}

export const NewCourseCard = ({ course }: CourseCardProps) => {
  function calculateDuration(startDate: string | Date, endDate: string | Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} días`;
    } else {
      const diffMonths = Math.ceil(diffDays / 30);
      return `${diffMonths} ${diffMonths === 1 ? "mes" : "meses"}`;
    }
  }
  const hasChapters = course;

  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");
  const user = useAuth();

  const router = useRouter();
  useEffect(() => {
    if (course.startDate) {
      const currentDate = new Date();
      const startDateAsDate = new Date(course.startDate);
      if (currentDate.getTime() >= startDateAsDate.getTime()) {
        setStatus("In Progress");
      } else {
        const diffTime = Math.abs(
          startDateAsDate.getTime() - currentDate.getTime()
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setRemainingDays(diffDays);
      }
    }

    // const fetchIsStudentStatus = async () => {
    //   const email = user?.user?.email;
    //   if (email) {
    //     const studentStatus = await checkIsStudent(email);
    //     setIsStudent(studentStatus);
    //   }
    // };

    // fetchIsStudentStatus();
  }, [course.startDate, user]);

  const renderStatusBadge = () => {
    if (status === "In Progress") {
      return (
        <Badge variant="destructive" className="bg-green-500 p-2 text-center">
          Comenzado
        </Badge>
      );
    } else if (remainingDays !== null) {
      if (remainingDays < 7) {
        // If remaining days are less than 7, use a different color variant
        return (
          <Badge variant="destructive" className="p-2 text-center">
            Comienza en {remainingDays} dias
          </Badge>
        );
      } else if (remainingDays >= 7 && remainingDays <= 28) {
        // If remaining days are between 7 and 28, use another color variant
        return (
          <Badge className="p-2 text-center">
            Comienza en {remainingDays} dias
          </Badge>
        );
      } else if (remainingDays > 28) {
        return (
          <Badge variant="secondary" className="p-2 text-center">
            Comienza en {remainingDays} dias
          </Badge>
        );
      }
    }
    return null;
  };

  const renderButton = () => {
    const handleClick = () => {
      router.push(`/courses/${course.id}`);
    };

    return (
      <Button
        onClick={handleClick}
        variant={"ghost"}
        className={`flex bg-blue-500 mr-2`}
      >
        Accede al curso
        <ArrowUpOnSquareIcon className=" ml-2 h-4 w-4" />
      </Button>
    );
  };

  const renderCardContent = () => (
    <div className="group transition space-y-4 overflow-hidden border hover:shadow-md rounded-lg p-3 max-w-md md:max-w-none sm:my-4 m-auto ">
      {/* Other content remains the same */}

      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        {course.imageUrl && (
          <Image
            fill
            className="object-cover"
            alt={course.title}
            src={course.imageUrl}
          />
        )}
      </div>

      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition truncate">
          {course.title}
        </div>

        {/* <p className="text-xs text-muted-foreground">{course.category}</p> */}
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs"></div>
        <div className="flex justify-between mb-2 items-center mt-2 text-slate-500">
          <div className="flex items-center">
            <CalendarRange className="h-4 w-4 mr-2" />
            <div className="flex items-center">
              {course.startDate && (
                <span className="text-sm">
                  {new Date(course.startDate).toLocaleDateString("es-AR")}
                </span>
              )}
              {course.startDate && course.endDate && (
                <>
                  <MinusIcon className="h-4 w-4 mx-2" />
                  <span className="text-sm">
                    {new Date(course.endDate).toLocaleDateString("es-AR")}
                  </span>
                </>
              )}
            </div>
          </div>
          {course.startDate && course.endDate && (
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{calculateDuration(course.startDate, course.endDate)}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center gap-x-2 mt-2">
          <div className="flex items-center gap-x-2 flex-grow">
            {renderStatusBadge()}
          </div>
          <div className="flex items-center">{renderButton()}</div>
        </div>
      </div>
    </div>
  );

  const renderClickableContent = () => {
    if (hasChapters) {
      return <Link href={`/courses/${course.id}`}>{renderCardContent()}</Link>;
    }
    return <div>{renderCardContent()}</div>;
  };

  return renderClickableContent();
};
