"use client";

import React, { useState } from "react";
import TeacherCard from "./teacher-card";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import { User } from "@prisma/client";
import Loadingpage from "@/components/loading-page";
import { GetAllTutors } from "@/app/actions/user";
import Navbar from "@/components/landing-page/navbar";
import Top from "@/components/top-page";
import Link from "next/link";

const queryClient = new QueryClient();

// Function to fetch teachers
const fetchTeachers = async (): Promise<User[]> => {
  const response = await GetAllTutors();
  return response;
};

const TeacherDirectory = () => {
  const {
    data: teachers = [],
    isLoading,
    isError,
  } = useQuery<User[]>(["teachers"], fetchTeachers);

  if (isLoading) {
    <Loadingpage />;
  }

  if (isError) {
    <div>Error</div>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 6;

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(teachers.length / teachersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Navbar />
      <Top header={"Nuestros Educadores"} text={"Empoderando a los estudiantes con conocimiento y experiencia"} />
      <div className="container m-2 mx-auto px-6 py-10 bg-gray-100">
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-violet-500 transition-colors"
          >
            Conviértete en tutora →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTeachers.map((teacher) => (
            <TeacherCard teacher={teacher} key={teacher.id} {...teacher} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TeacherDirectory />
    </QueryClientProvider>
  );
};

export default App;
