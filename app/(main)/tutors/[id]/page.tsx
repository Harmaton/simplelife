import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  Youtube,
  Mail,
  MessageSquare,
} from "lucide-react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTeacher } from "@/app/actions/user";
import Navbar from "@/components/landing-page/navbar";
import { Footer } from "@/components/landing-page/footer";

const TeacherIdPage = async ({ params }: { params: { id: string } }) => {
  const teacher = await getTeacher(params.id);

  if (!teacher) {
    return redirect("/tutors");
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3/4 mx-auto p-4">
        <div className="mb-4">
          <Link href="/tutors" className="">
            <Button variant="ghost" className="border" size="icon">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <div className="px-4 pb-4">
            <div className="relative -mt-16 flex justify-center">
              <Avatar className="h-32 w-32 ring-4 ring-white">
                {teacher.image && (
                  <Image
                    src={teacher.image}
                    width={250}
                    height={250}
                    alt={"image"}
                  />
                )}
                {/* <AvatarFallback>{teacher.name?.charAt(0)}</AvatarFallback> */}
              </Avatar>
            </div>
            <div className="mt-4 text-center">
              <h1 className="text-2xl font-bold">{teacher.nickname}</h1>
              <p className="text-gray-500">{teacher.profession}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Sobre Mí</h2>
              <p className="text-gray-700">{teacher.description}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Contáctame</h2>
              <div className="flex justify-center space-x-4">
                {teacher.youtube && (
                  <Link href={`https://${teacher.youtube}`}>
                    <Button variant="outline" size="icon">
                      <Youtube className="h-5 w-5 text-red-600" />
                    </Button>
                  </Link>
                )}
                {teacher.instagram && (
                  <Link href={`https://${teacher.instagram}`}>
                    <Button variant="outline" size="icon">
                      <InstagramIcon className="h-5 w-5 text-pink-600" />
                    </Button>
                  </Link>
                )}
                {teacher.mail && (
                  <Link href={`mailto:${teacher.mail}`}>
                    <Button variant="outline" size="icon">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </Button>
                  </Link>
                )}
                {teacher.whatsapp && (
                  <Link href={`https://${teacher.whatsapp}`}>
                    <Button variant="outline" size="icon">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </Button>
                  </Link>
                )}
                {teacher.linkedIn && (
                  <Link href={`https://${teacher.linkedIn}`}>
                    <Button variant="outline" size="icon">
                      <LinkedinIcon className="h-5 w-5 text-blue-700" />
                    </Button>
                  </Link>
                )}
                {teacher.facebook && (
                  <Link href={`https://${teacher.facebook}`}>
                    <Button variant="outline" size="icon">
                      <FacebookIcon className="h-5 w-5 text-blue-600" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default TeacherIdPage;
