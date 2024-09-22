import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookCopy, Eye, LayoutDashboard, Video } from "lucide-react";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterActions } from "./_components/chapter-actions";
import { EvaluationsForm } from "./_components/evaluation";
import { ChapterYoutubeForm } from "./_components/youtube-link";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {

  // fetch the user and compare to the userid in the course from this courseid
  
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.youtubeLink];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-8 border">
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="Este capítulo es inédito. No será visible en el curso."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/tutor/courses/${params.courseId}`}
              className="flex justify-end text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la configuración del curso
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Creación de capítulos</h1>
                <span className="text-sm text-slate-700">
                  Completa todos los campos {completionText}
                </span>
              </div>
              {isComplete ? (
                <ChapterActions
                  disabled={false}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                  isPublished={chapter.isPublished}
                />
              ) : (
                <div>
                  <span>⚠️</span>
                  <p className="font-mono text-sm underline text-red-500 ">
                    Complete los campos obligatorios{" "}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Personaliza tu capítulo</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
             <div className="flex items-center mt-4 gap-x-2">
              <IconBadge icon={BookCopy} />
              <h2 className="text-xl">Personaliza tu capítulo</h2>
            </div>
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl">Configuración de acceso</h2>
            </div>
            <ChapterAccessForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h2 className="text-xl">Añadir un vídeo</h2>
          </div>

          <ChapterYoutubeForm
            initialData={chapter}
            chapterId={params.chapterId}
            courseId={params.courseId}
          />
          {/* <AttachmentForm initialData={chapterone} courseId={params.courseId} chapterId={params.chapterId}   /> */}
          <EvaluationsForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
