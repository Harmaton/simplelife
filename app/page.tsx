import Ad from "@/components/landing-page/ad";
import Features from "@/components/landing-page/features";
import FeaturesHeader from "@/components/landing-page/features-header";
import FloatingActionButton from "@/components/landing-page/floating-action-btn";
import { Footer } from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";
import TopCategories from "@/components/landing-page/top-categories";
import { GetAllCategories } from "./actions/courses";
import CompanyPartners from "@/components/landing-page/companies";


export default async function Home() {
  const categories = await GetAllCategories();
  return (
    <>
      <Ad />
      <main className="flex flex-col items-center justify-between ">
        <Navbar />
        <Hero />
        {/* <TutorsHeader />  TOP CATEGORIES*/}
        {/* Tutors With most reviews, and ratings */}
        <TopCategories categories={categories} />
        <FeaturesHeader />
        <Features />
        {/* <TutorsHeader />  TOP TUTORS*/}
        {/* Tutors With most reviews, and ratings */}
        <CompanyPartners />
        <FloatingActionButton />
        <Footer />
      </main>
    </>
  );
}
