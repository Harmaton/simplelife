import { GetLatestCourses } from "@/app/actions/courses";
import React from "react";
import CourseCard from "./course-card";
import Image from "next/image";

export default async function LatestCourses() {
  const courses = await GetLatestCourses();

  if (!courses.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Image
          src="/no-courses.svg" // Replace with your image path
          alt="No upcoming courses"
          width={300}
          height={300}
          className="object-contain m-2"
        />
        <p className="text-lg font-medium text-gray-600 mt-4">
          Check Back later for Upcoming Courses
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} teacher={course.User} />
      ))}
    </div>
  );
}
