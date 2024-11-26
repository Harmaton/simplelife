import React from "react";
import TeacherCard from "./teacher-card";
import Loadingpage from "@/components/loading-page";
import { GetAllTutors } from "@/app/actions/user";
import Navbar from "@/components/landing-page/navbar";
import Top from "@/components/top-page";
import Link from "next/link";

async function getTeachers() {
  try {
    const teachers = await GetAllTutors();
    return teachers;
  } catch (error) {
    console.error("Failed to fetch teachers:", error);
    return [];
  }
}

export default async function TeacherDirectory() {
  const teachers = await getTeachers();

  if (!teachers) {
    return <Loadingpage />;
  }

  const teachersPerPage = 6;
  const totalPages = Math.ceil(teachers.length / teachersPerPage);

  return (
    <>
      <Navbar />
      <Top
        header={"Nuestros Educadores"}
        text={"Empoderando a los estudiantes con conocimiento y experiencia"}
      />
      <div className="container m-2 mx-auto p-6  bg-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            Un Equipo de Expertos Impulsado por la Excelencia
          </h2>
          <p className="mb-4 font-mono">
            Nuestros educadores dedicados, cuidadosamente seleccionados por su
            experiencia y logros, colaboran para inspirar la innovación y
            ofrecer soluciones impactantes en la educación.
          </p>
          <Link
            href="/become-tutor"
            className="bg-blue-500 text-white p-2 rounded-full mt-4 hover:bg-violet-500 transition-colors"
          >
            Conviértete en tutora →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.slice(0, teachersPerPage).map((teacher) => (
            <TeacherCard teacher={teacher} key={teacher.id} {...teacher} />
          ))}
        </div>

        {/* Pagination will need to be handled client-side or through separate pages */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <Link
              key={number}
              href={`/teachers?page=${number}`}
              className={`mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300`}
            >
              {number}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
