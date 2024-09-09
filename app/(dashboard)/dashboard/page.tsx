"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { CoursesList } from "./_components/course-list";
import {
  CourseWithProgressWithCategory,
  getDashboardCourses,
} from "@/app/actions/courses";
import { useAuth } from "@/providers/AuthProvider";
import Loadingdash from "./_components/loadingdash";

interface CoursesState {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
}

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<CoursesState>({
    completedCourses: [],
    coursesInProgress: [],
  });

  useEffect(() => {
    if (!user) {
      redirect('/')
    }

    const fetchCourses = async () => {
      const userId = user.uid;
      const { completedCourses, coursesInProgress } = await getDashboardCourses(
        userId
      );

      setCourses({
        completedCourses,
        coursesInProgress,
      });

      setLoading(false);
    };

    fetchCourses();
  }, [user, router]);

  if (loading) {
   <Loadingdash />
  }

  return (
    <div className="p-6 space-y-4 scrollbar-thin scrollbar-track-slate-200">
      <div className="p-4 flex flex-row space-x-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="En curso"
          numberOfItems={courses.coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Terminada"
          numberOfItems={courses.completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList
        items={[...courses.coursesInProgress, ...courses.completedCourses]}
      />
    </div>
  );
}