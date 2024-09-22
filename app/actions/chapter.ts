import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export async function getCourseById(id: string) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: id,
      },
    });
    if (course !== null) {
      return course;
    }
  } catch (error) {
    console.log(error);
  }
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const purchase = await db.coursePurchase.findMany({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
        prerequisites: true,
        whatsapp: true,
        paymentLink: true,
        averageRating: true,
        googleFormLink: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      // muxData = await db.muxData.findUnique({
      //   where: {
      //     chapterId: chapterId,
      //   }
      // });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};

export async function updateChapterTitle(chapterId: string, title: string) {
  try {
    await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        title: title,
      },
    });
    return { success: true, message: "Capítulo actualizado" };
  } catch (error) {
    console.log(error);
    return { success: true, message: "Error" };
  }
}
