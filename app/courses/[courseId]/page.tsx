import React from 'react';
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, BarChart } from "lucide-react";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      startDate: {
        not: null
      },
      imageUrl: {
        not: null
      }
    },
    include: {
      Chapter: {
        where: {
          isPublished: true
        },
        orderBy: {
          position: "asc"
        }
      },
      User: true,
    }
  });

  if (!course || course.Chapter.length === 0) {
    return <div>Course not found or no chapters available.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
          <p className="text-sm text-gray-500">Created by: {course.User?.nickname || 'Unknown'}</p>
        </CardHeader>
        <CardContent>
          <div className="aspect-video relative">
            {course.imageUrl && (
              <img
                src={course.imageUrl}
                alt={course.title}
                className="object-cover rounded-md"
              />
            )}
          </div>
          <div className="mt-4">
            <p>{course.description}</p>
          </div>
          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{course.duration || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>{course.averageRating || 0} rating</span>
            </div>
            <div className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              <span>{course.Chapter.length} chapters</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Chapters:</h3>
            <ul className="space-y-2">
              {course.Chapter.map((chapter) => (
                <li key={chapter.id} className="flex justify-between items-center">
                  <span>{chapter.title}</span>
                  <Button variant="outline" size="sm">
                    {chapter.isFree ? 'Start' : 'Preview'}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Button className="w-full">Enroll in Course</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseIdPage;