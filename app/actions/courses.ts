"use server";

import { db } from "@/lib/db";
import { ExtendedCourse } from "@/types";
import { Category, Chapter, Course } from "@prisma/client";

export async function GetLatestCourses() {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        startDate: {
          gte: new Date(), // Ensure the course starts on or after today
        },
      },
      orderBy: {
        startDate: "asc", // Order courses by startDate in ascending order
      },
      take: 3, // Limit the results to 3 courses
      include: {
        User: true,
      },
    });
    if (!courses) {
      return [];
    }
    return courses;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function GetAllCategories() {
  try {
    const categories = await db.category.findMany({
      take: 6, // Limit to the latest 6 categories
    });
    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function GetAllSubCategories() {
  try {
    const subcategories = await db.subCategory.findMany({
      include: {
        Courses: true,
        category: true
      },
      orderBy: {
        name: "asc",
      },
    });

    return subcategories;
  } catch (error) {
    console.error("Error fetching all subcategories:", error);
    throw error;
  }
}

export async function GetCategoryPurchases(categoryId: string, userId: string) {
  try {
    const purchases = await db.categoryPurchase.findMany({
      where: {
        categoryId: categoryId,
        userId: userId,
      },
    });

    if (purchases.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false
  }
}

export async function GetCategorySubCategories(categoryId: string) {
  try {
    const subcategories = await db.subCategory.findMany({
      where: {
        categoryId,
      },
      include: {
        Courses: true,
        category: true
      },
    });
    return subcategories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

export async function getDashboardCourses(userId: string): Promise<{
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
}> {
  try {
    const categoryPurchases = await db.categoryPurchase.findMany({
      where: {
        userId: userId
      },
      include: {
        category: {
          include: {
            Courses: {
              where: {
              isPublished: true
              },
              include: {
                category: true,
                Chapter: {
                  where: {
                    isPublished: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Transform the data to match CourseWithProgressWithCategory
    let courses = categoryPurchases.flatMap(purchase =>
      purchase.category.Courses.map(course => ({
        ...course,
        chapters: course.Chapter, // Rename Chapter to chapters
        progress: null, // Will be populated later
      }))
    ) as CourseWithProgressWithCategory[];

    // Remove duplicates
    courses = Array.from(new Set(courses.map(c => c.id)))
      .map(id => courses.find(c => c.id === id)!);

    // Get progress for each course
    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course.progress = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
}


export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
};

export async function createCourse(values: any, email: string) {
  try {
    const teacher = await db.user.findUnique({
      where: {
        email: email,
      },
    });


    if (teacher) {
      const newCourse = await db.course.create({
        data: {
          ...values,
          teacherId: teacher.id,
          updatedAt: new Date(),
        },
      });

      console.log(newCourse, "course");

      return newCourse;
    }
  } catch (error) {
    console.error("[CREATE_COURSE]", error);
  }
}

export async function getAllTeacherCourses(userid: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: userid,
      },
    });

    if (user) {
      const courses = await db.course.findMany({
        where: {
          teacherId: user.id,
        },
      });
      return courses;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getTeacherCourses(teacherid: string) {
  try {
    const courses = await db.course.findMany({
      where: {
        teacherId: teacherid,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses;
  } catch (error) {
    return [];
  }
}

export async function GetsubCategoryDetails(subcategoryId: string) {
  try {
    const details = await db.subCategory.findUnique({
      where: {
        id: subcategoryId,
      },
    });

    return details;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function GetCoursesInCategory(subcategoryId: string) {
  try {
    const courses = await db.course.findMany({
      where: {
        subcategoryId: subcategoryId,
        isPublished: true
      },
    });
    return courses;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchCourse(id: string): Promise<ExtendedCourse | null> {
  try {
    const course = await db.course.findUnique({
      where: {
        id: id,
        startDate: {
          not: null,
        },
        imageUrl: {
          not: null,
        },
      },
      include: {
        Chapter: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
        User: true,
        category: true,
        subcategory: true,
      },
    });

    return course as ExtendedCourse | null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
