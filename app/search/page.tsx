import Link from 'next/link';
import Image from "next/image";
import Navbar from "@/components/landing-page/navbar";
import SubCategories from "./subcategories";
import { GetAllCategories, GetCategorySubCategories, GetAllSubCategories } from "../actions/courses";
import { Categories } from "./categories";
import Top from "@/components/top-page";
import Ad from "@/components/landing-page/ad";

interface SearchPageProps {
  searchParams: {
    name?: string;
    categoryId?: string;
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const categories = await GetAllCategories();
  
  const subcategories = searchParams.categoryId 
    ? await GetCategorySubCategories(searchParams.categoryId)
    : await GetAllSubCategories(); // New function to get all subcategories

  const headerText = searchParams.categoryId
    ? categories.find(cat => cat.id === searchParams.categoryId)?.name || 'Diplomados'
    : 'Todos los Diplomados';

  return (
    <>
      <Ad />
      <Navbar />
      <div className="flex flex-col space-y-4 m-6">
        <Top 
          header="Certificaciones" 
          text="Perfeccione sus habilidades con paquetes profesionales de diplomas y obtenga certificados" 
        />
        <Categories items={categories} />
      </div>
      <div className="p-6 space-y-4 m-4">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-2 border rounded-full p-2">
          {headerText}
        </h2>
        <p className='lg:ml-8 ml-4'>Explora los cursos dentro de los diplomados</p>
        {subcategories && subcategories.length > 0 ? (
          <SubCategories subcategories={subcategories} />
        ) : (
          <div className="p-4 text-center text-sm text-gray-600 flex flex-col space-y-4 mt-4">
            <h1>No hay subcategorías disponibles</h1>
            <Image
              src="/no-courses.svg"
              className="flex items-center justify-center m-auto"
              width={300}
              height={300}
              alt="no courses"
            />  
          </div>
        )}
      </div>
    </>
  );
}

export default SearchPage;