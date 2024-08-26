import LatestCourses from "@/components/courses/latest-courses";
import CoursesHeader from "@/components/landing-page/course-header";
import Features from "@/components/landing-page/features";
import FeaturesHeader from "@/components/landing-page/features-header";
import FloatingActionButton from "@/components/landing-page/floating-action-btn";
import { Footer } from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";
import { CompanyPartners } from "@/components/landing-page/partners";
import TutorsHeader from "@/components/landing-page/top-tutors-header";
import { NavigationMenuDemo } from "@/components/navbar-shadcn";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between scrollbar scrollbar-thin">
      <Navbar />
      <Hero />
      <CoursesHeader />
      <LatestCourses />
      <TutorsHeader />
      {/* Tutors With most reviews, and ratings */}
      <FeaturesHeader />
      <Features />
    
      <CompanyPartners />
      <FloatingActionButton />
      <Footer />
    </main>
  );
}
