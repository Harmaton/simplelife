
import Navbar from "@/components/landing-page/navbar";
import Image from "next/image";
import SubCategories from "./subcategories";
import { GetAllCategories, GetCategorySubCategories } from "../actions/courses";
import { Categories } from "./categories";
interface SearchPageProps {
  searchParams: {
    name: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {

  const categories = await GetAllCategories();
  const subcategories = await GetCategorySubCategories(searchParams.categoryId);
  return (
    <>
      <Navbar />
      <div className="py-3 pt-6 flex flex-col space-y-4 m-6">
        {/* <SearchInput /> */}
        <Categories items={categories} />
      </div>
      <div className="p-6 space-y-4 m-4">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-2">
          Diplomados
        </h2>
        {subcategories ? (
          <SubCategories subcategories={subcategories} />
        ) : (
          <div className="p-4 text-center text-sm text-gray-600 flex flex-col space-y-4 mt-4">
            <h1>Seleccion Uno Categoria</h1>
            <Image
              src={"/no-courses.svg"}
              className="flex items-center justify-center m-auto"
              width={300}
              height={300}
              alt={"no courses"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
