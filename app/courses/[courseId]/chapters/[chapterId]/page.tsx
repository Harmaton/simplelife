import { redirect } from "next/navigation";
import { File, Link2 } from "lucide-react";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { getChapter } from "@/app/actions/chapter";
import { YouTubePlayer } from "../_components/youtube-player";
import { currentUser } from "@clerk/nextjs/server";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const currentuser = await currentUser();

  if (!currentuser) {
    return redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: currentuser.id,
    },
  });

  if (!user) {
    return redirect("/");
  }

  const userId = user.id;

  const { chapter, course, attachments, nextChapter, userProgress } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  const allComments = await db.comment.findMany({
    where: {
      courseId: params.courseId,
    },
  });

  if (!chapter || !course.categoryId || !course.teacherId) {
    return redirect("/");
  }

  const purchase = await db.categoryPurchase.findMany({
    where: {
      userId: userId,
      categoryId: course.categoryId,
    },
  });

  const teacher = await db.user.findUnique({
    where: {
      clerkId: course.teacherId,
    },
  });

  const hasPurchase = purchase.length > 0;
  const now = new Date();

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="Ya completaste este capítulo." />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          {hasPurchase ? (
            chapter.youtubeLink ? (
              <YouTubePlayer isLocked={false} videoId={chapter.youtubeLink} />
            ) : (
              <div className="flex items-center justify-center">
                <div className="flex mb-4 items-center justify-center h-auto rounded-2xl w-full">
                  No hay video disponible para este capítulo.
                </div>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center bg-red-100 p-4 rounded-md">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Paga para acceder al descuento en las próximas 24 horas.
              </span>
            </div>
          )}
        </div>

        {hasPurchase && (
          <div className="mt-4 text-center">
            <Link href={chapter.videoUrl || "#"}>
              <Button className="bg-blue-500 text-white">
                Unirse a la clase en Zoom
              </Button>
            </Link>
          </div>
        )}

        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2 uppercase">
              {chapter.title}
            </h2>
          </div>
          <Separator />
          <Preview value={chapter.description!} />
          <Separator />

          <Card className="m-5">
            <CardHeader className="text-center">
              Información del maestro
            </CardHeader>
            <CardContent className="flex flex-row space-x-4">
              <div className="">
                {teacher?.image && (
                  <Image
                    src={teacher?.image}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="image teachers"
                  />
                )}
              </div>
              <div>
                <p className="uppercase mb-2">{teacher?.nickname}</p>
                <p className="font-serif text-left">
                  {" "}
                  Unida: {teacher?.createdAt.toDateString()}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href={`https://www.simplelifeofficial.com/tutors/${teacher?.id}`}
              >
                <Button className="mr-4 text-blue-500 " variant={"ghost"}>
                  <Link2 className="mr-2 h-4 w-4" />
                  Visitar perfil del profesor
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="font-bold">Requisitos</CardHeader>
            <div>
              <div className="p-4 ">{course.prerequisites}</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
