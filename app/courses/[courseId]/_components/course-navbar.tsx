import { Chapter, Course, UserProgress } from "@prisma/client";
import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CourseNavbarProps {
  course: Course & {
    Chapter: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center justify-between shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />

      <div className="flex items-center gap-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <Link href="/dashboard">
              <Button variant="outline" className="border-violet-500">
                Panel
              </Button>
            </Link>
          </SignedIn>
        </ClerkLoaded>
      </div>
    </div>
  );
};
