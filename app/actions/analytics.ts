import { db } from "@/lib/db";
import { CoursePurchase } from "@prisma/client";
import { Course } from "@prisma/client";

type PurchaseWithCourse = CoursePurchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};
  
  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const user = await db.user.findUnique({ where: { clerkId: userId } });

    if (user) {
      const purchases = await db.coursePurchase.findMany({
        where: {
          course: {
            teacherId: user.id
          }
        },
        include: {
          course: true,
        }
      });

      const groupedEarnings = groupByCourse(purchases);
      const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
        name: courseTitle,
        total: total,
      }));

      const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
      const totalSales = purchases.length;

      return {
        data: data || [], // Ensure data is always an array
        totalRevenue,
        totalSales,
      };
    }

  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
}