import Ad from "@/components/landing-page/ad";
import Features from "@/components/landing-page/features";
import FeaturesHeader from "@/components/landing-page/features-header";
import FloatingActionButton from "@/components/landing-page/floating-action-btn";
import { Footer } from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";
import TopCategories from "@/components/landing-page/top-categories";
import { GetAllCategories } from "./actions/courses";
import Testimonials from "@/components/testimonials/testimonials";
import TestimonialSectionTwo from "@/components/testimonials/testimonials-two";
import CompanyPartners from "@/components/landing-page/companies";

export default async function Home() {
  const categories = await GetAllCategories();
  return (
    <>
        <Ad />
        <Navbar />
        <Hero />
        <TopCategories categories={categories} />
        <FeaturesHeader />
        <Features />
        <div className="p-2 m-auto">
        <Testimonials />
        <TestimonialSectionTwo />
        </div>
       <CompanyPartners />
        <FloatingActionButton />
        <Footer />
      
    </>
  );
}
