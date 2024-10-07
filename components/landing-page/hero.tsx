"use client";

import React, { useEffect, useState } from "react";
import {
  BookOpenIcon,
  BookmarkSquareIcon,
  FingerPrintIcon,
  LightBulbIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { ArrowRight, PenBox } from "lucide-react";
import { Button } from "../ui/button";
import CarouselHero from "./carousel";
import {
  checkIsAdmin,
  checkIsStudent,
  checkIsTeacher,
} from "@/app/actions/user";
import { useUser } from "@clerk/nextjs";

const Hero: React.FC = () => {
  const user = useUser();

  const router = useRouter();

  const [isTeacher, setIsTeacher] = useState(false);
  const [admin, setAdmin] = useState(false);
  const email = user.user?.emailAddresses[0].emailAddress;

  useEffect(() => {
    const fetchIsTeacherStatus = async () => {
      if (email) {
        const status = await checkIsTeacher(email);
        setIsTeacher(status);
      }
    };
    fetchIsTeacherStatus();
    const fetchAdminStatus = async () => {
      if (email) {
        const adminStatus = await checkIsAdmin(email);
        setAdmin(adminStatus);
      }
    };
    fetchAdminStatus();
  }, [email]);

  const slideInFromTop = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2 },
  };

  const slideInFromRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };

  const slideInFromBottom = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.6 },
  };

  const imageAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: "easeIn" },
  };

  function AdminLogin() {
    router.push("/admin");
  }

  function TeacherLogin() {
    router.push("/tutor/profile");
  }

  function exploreCoursesRoue() {
    router.push("/search");
  }

  function exploreTeachersRoue() {
    router.push("/tutors");
  }

  return (
    <>
      <svg
        className="absolute inset-0 z-[-1] h-full w-full stroke-gray-200 animate-scroll-up"
        style={{
          maskImage: "radial-gradient(100% 100% at center, white, transparent)",
        }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={150}
            height={150}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>

      <div className="container relative mt-4 antialiased ">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center p-2  rounded-lg">
          <div className="md:w-1/2 w-full text-center md:text-left p-2">
            <motion.h1
              className="text-2xl sm:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-violet-500"> Cursos online en vivo </span>
              para encontrar tu equilibrio emocional y{" "}
              <span className="text-violet-500">transformar tu vida</span>
            </motion.h1>
            <motion.p
              className="mb-5 text-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Movimiento global que facilita la conexión con personas en
              búsqueda de crecimiento personal, bienestar integral y programas
              educativos como cursos y diplomados enfocados al bienestar
              emocional.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="border-2 rounded-full text-center py-2  border-blue-300 hover:border-blue-500"
                variant={"ghost"}
                onClick={exploreCoursesRoue}
              >
                Nuestras Certificaciones
              </Button>

              {isTeacher && (
                <motion.div
                  className="flex"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    className="border-2 border-violet-300 hover:border-violet-500 text-center p-4 py-2 px-6 rounded-full flex font-semibold"
                    onClick={TeacherLogin}
                    variant={"ghost"}
                  >
                    Maestra Modo
                    <PenBox className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              )}
              {!isTeacher && (
                <Button
                  className="text-center py-2  rounded-full bg-transparent border border-blue-500"
                  variant={"ghost"}
                  onClick={exploreTeachersRoue}
                >
                  Tutores
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
              {admin && (
                <Button
                  className="border-2 text-center p-4 py-2 px-6 rounded-lg font-semibold border-red-300 hover:border-violet-500"
                  onClick={AdminLogin}
                  variant={"ghost"}
                >
                  Admin
                  <FingerPrintIcon className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>

            <div
              className="flex flex-row  m-5 mx-auto space-x-6 items-center"
              data-aos="fade-up"
            >
              <div className="flex flex-row items-center space-x-2">
                <div className="flex flex-row">
                  <BookmarkSquareIcon className="h-6 w-6 text-yellow-500" />
                  <span className="">Certificación</span>
                </div>
              </div>

              <div
                className="flex flex-row items-center space-x-2"
                data-aos="fade-up"
              >
                <div className="flex flex-row">
                  <LightBulbIcon className="h-6 w-6 text-red-500" />
                  <span className="">Terapia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image div */}
          <div className="md:w-1/2 w-full relative">
            <div className="relative w-full flex items-start lg:items-center justify-center md:px-6 lg:px-14 order-1 md:order-2 py-2 mt-2">
              <CarouselHero />
            </div>

            <motion.div
              className="absolute top-4 right-4/5 text-white text-center border bg-blue-400 p-2 rounded-lg flex flex-row items-center"
              data-aos="fade-up"
              {...slideInFromTop}
            >
              <div className="w-6 h-6 mr-2 hidden lg:block ">
                <UserGroupIcon />
              </div>
              <div>
                <span className="block text-2xl font-bold">2.5k+</span>
                <span>Estudiantes</span>
              </div>
            </motion.div>
            <motion.div
              className="absolute top-1/4 right-10 text-white text-center border bg-blue-400 p-2 rounded-lg hidden lg:block"
              {...slideInFromRight}
              data-aos="fade-up"
            >
              <BookOpenIcon className="w-6 h-6 ml-2 hidden lg:block" />

              <div>
                {" "}
                <span className="block text-2xl font-bold">3K+</span>
                <span>Cursos</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-1 right-2/5 text-white text-center border bg-blue-400 p-2 rounded-lg  flex flex-row items-center"
              {...slideInFromBottom}
              data-aos="fade-up"
            >
              <BookOpenIcon className="w-6 h-6 mr-2 hidden lg:block" />
              <div>
                <span className="block text-2xl font-bold">50+</span>
                <span>Tutores</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
