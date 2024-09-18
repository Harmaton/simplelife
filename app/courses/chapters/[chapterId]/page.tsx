import React from 'react'

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  return (
    <div>
      {params.chapterId}
      {params.courseId}
    </div>
  )
}

export default ChapterIdPage
