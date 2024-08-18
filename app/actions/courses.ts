"use server";

import { db } from "@/lib/db";

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
    const categories = await db.category.findMany({});
    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function GetCategorySubCategories(categoryId: string) {
  try {
    const subcategories = await db.subCategory.findMany({
      where: {
        categoryId,
      },
    });
    return subcategories;
  } catch (error) {
    console.log(error);
    return [];
  }
}
