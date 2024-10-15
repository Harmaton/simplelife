import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
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
        categoryId: true,
        teacherId: true,
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

    if (chapter.isFree) {
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

export interface ChapterWithCountdown extends Chapter {
  countdown: number;
}

export async function getMyLessons(email: string): Promise<ChapterWithCountdown[]> {
  try {
    const dbuser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!dbuser) {
      return [];
    }

    const courses = await db.course.findMany({
      where: {
        teacherId: dbuser.id,
      },
      select: {
        Chapter: {
          where: {
            LiveDay: {
              gte: new Date(),
            },
          },
        },
      },
    });

    const chapters = courses.flatMap(course => course.Chapter);

    const sortedChapters = chapters
      .filter(chapter => chapter.LiveDay !== null)
      .sort((a, b) => (a.LiveDay as Date).getTime() - (b.LiveDay as Date).getTime());

    const chaptersWithCountdown = sortedChapters.map(chapter => ({
      ...chapter,
      countdown: Math.ceil(((chapter.LiveDay as Date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    }));

    return chaptersWithCountdown;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMyChapters(email: string): Promise<Chapter[]> {
  try {
    const dbuser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!dbuser) {
      return [];
    }

    const courses = await db.course.findMany({
      where: {
        teacherId: dbuser.id,
      },
      select: {
        Chapter: {
          where: {
            LiveDay: {
              gte: new Date(),
            },
          },
        },
      },
    });

    const chapters = courses.flatMap((course) => course.Chapter);

    const sortedChapters = chapters
      .filter((chapter) => chapter.LiveDay !== null)
      .sort(
        (a, b) =>
          (a.LiveDay as Date).getTime() - (b.LiveDay as Date).getTime()
      );

    return sortedChapters;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
}
