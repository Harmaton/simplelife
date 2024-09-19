import { redirect } from "next/navigation";
import { File, Link2, MessageCircle } from "lucide-react";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { QueueListIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

import { YouTubePlayer } from "@/app/courses/chapters/_components/youtube-player";
import { CommentTextarea } from "@/app/courses/chapters/_components/comment";
import { getChapter, getCourseById } from "@/app/actions/chapter";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  
  const dbcourse = await getCourseById(params.courseId);



  const userId = dbcourse?.teacherId;

  if (!userId || userId === null) {
    return redirect("/");
  }


  const { chapter, course, attachments, nextChapter, userProgress, purchase } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      isStudent: true,
    },
  });

  const teacher = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const isStudent = user?.isStudent;

  const allComments = await db.comment.findMany({
    where: {
      courseId: params.courseId,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  if (!course.paymentLink) {
    console.log("Free Course");
  }

  const isLocked = !chapter.isFree || !isStudent;
  const completeOnEnd = !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="Ya completaste este capítulo.." />
      )}

      {!isStudent && (
        // <OfferBanner
        //   variant="warning"
        //   label="Descubre los paquetes hechos a tu medida, hasta un 75% de descuento"
        // />
        <div>No student</div>
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          {isStudent && chapter.youtubeLink ? (
            <YouTubePlayer isLocked={false} videoId={chapter.youtubeLink} />
          ) : (
            <div className=" flex items-center justify-center">
              <div className="flex mb-4 items-center justify-center h-auto rounded-2xl w-full ">
                {/* <TextRevealCard
                  text="Desbloquear una oferta especial!"
                  revealText="Contacta con la profesora para un descuento exclusivo."
                >
                  <TextRevealCardTitle>
                    Mejore su experiencia de aprendizaje con SimpleLife
                  </TextRevealCardTitle>
                  <TextRevealCardDescription>
                    Descubre los secretos del éxito en tus cursos en SimpleLife.
                    Llegar a con tu profesor usando el botón a continuación para
                    solicitar información sobre un descuento especial.
                  </TextRevealCardDescription>
                </TextRevealCard> */}
                Text Reveal
              </div>
            </div>
          )}
          {!isStudent && (
            <>
              <Card className="mt-4">
                <CardHeader className="text-center">
                  No eres un estudiante oficial, elige entre las siguientes
                  opciones para ver el curso más a fondo
                </CardHeader>
                <div className="p-4 flex flex-row space-x-5">
                  <h3>¿Quieres seguir aprendiendo?</h3>
                  <Link href={`${course.whatsapp}`}>
                    <Button className="bg-green-500">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Obtén 75% de descuento
                    </Button>
                  </Link>
                  <Button
                    variant={"ghost"}
                    className="flex border border-orange-500  "
                  >
                    Pricing
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
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
                href={`https://www.simplelifeofficial.com/teachers/${teacher?.id}`}
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

          {!!attachments.length && (
            <>
              <Separator />

              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
              <Separator />
            </>
          )}

          {/* <div className="p-4">
            {course.evaluationQuestions.map((quiz) => (
              <div key={quiz.id}>
                {quiz.text}
                <Input placeholder="Ingrese su respuesta de evaluación aquí" />
              </div>
            ))}
          </div> */}

          {userProgress?.isCompleted && (
            <>
              <Card className="p-4 ">
                <div className="max-w-xl mx-auto mt-8">
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold mb-2">
                      {" "}
                      Comentarios
                    </h2>

                    {allComments.map((comment) => (
                      <div key={comment.id} className=" p-4 rounded-md mb-2">
                        <div className="bg-gray-100 p-4 rounded-md">
                          {comment.content}
                        </div>
                        <span className="m-2 text-blue-500 p-2 ">
                          {comment.email}
                        </span>
                      </div>
                    ))}
                    {allComments.length == 0 && (
                      <div className="bg-gray-100 p-4 rounded-md">
                        Aún no hay comentarios sobre este curso.
                      </div>
                    )}
                    <div className="mt-2 mb-2 p-2 m-auto">
                      <CommentTextarea courseId={params.courseId} />
                    </div>
                  </div>

                  <div className="space-x-5">
                    <h2 className="text-2xl font-semibold mb-2">
                      Clasificación
                    </h2>
                    <div className="flex items-center space-x-5">
                      <span className="text-3xl font-bold mr-2">
                        {course.averageRating}
                      </span>
                      <div className="flex">
                        <svg
                          className="w-6 h-6 fill-current text-yellow-500 mr-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13h4v6h-1v-4h-3v4H9v-6z" />
                        </svg>

                        {/* <RatingInputButton courseId={params.courseId} /> */}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <Separator className="m-4" />
              <Card className="mt-4 p-2 flex flex-row ">
                <div className="flex flex-row m-auto">
                  <Link href={`${chapter.googleFormLink}`}>
                    <Button className="bg-red-500 animate animate-pulse">
                      <QueueListIcon className="w-4 h-4 mr-2" />
                      Rellena este formulario como evaluación del curso
                    </Button>
                  </Link>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
