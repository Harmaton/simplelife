"use client";

import React from "react";
import Link from "next/link";
import { 
  QueryClient, 
  QueryClientProvider,
  useQuery 
} from "@tanstack/react-query";
import Navbar from "@/components/landing-page/navbar";
import Image from "next/image";
import SubCategories from "./subcategories";
import {
  GetAllCategories,
  GetCategorySubCategories,
  GetCategoryPurchases,
} from "../actions/courses";
import { Categories } from "./categories";
import Top from "@/components/top-page";
import Ad from "@/components/landing-page/ad";
import { useAuth } from "@/providers/AuthProvider";
import { Category, SubCategory } from "@prisma/client";
import Loadingpage from "@/components/loading-page";
import { getUserID } from "../actions/user";

interface SearchPageProps {
  searchParams: {
    name: string;
    categoryId: string;
  };
}

const queryClient = new QueryClient();

const SearchPageInner = ({ searchParams }: SearchPageProps) => {
  const { user } = useAuth();

  const { data: userId, isLoading: isLoadingUser } = useQuery({
    queryKey: ['userId', user?.uid],
    queryFn: async () => {
      if (!user?.uid) return null;
      const id = await getUserID(user.uid);
      return id || null; // Ensure we always return null instead of undefined
    },
    enabled: !!user
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const cats = await GetAllCategories();
      return cats || []; // Ensure we always return an array
    },
  });

  const { data: subcategories, isLoading: isLoadingSubcategories } = useQuery<SubCategory[]>({
    queryKey: ['subcategories', searchParams.categoryId],
    queryFn: async () => {
      const subcats = await GetCategorySubCategories(searchParams.categoryId);
      return subcats || []; // Ensure we always return an array
    },
    enabled: !!searchParams.categoryId
  });

  const { data: categoryPurchaseStatus, isLoading: isLoadingPurchase } = useQuery({
    queryKey: ['categoryPurchase', searchParams.categoryId, userId],
    queryFn: async () => {
      if (!userId || !searchParams.categoryId) return null;
      const status = await GetCategoryPurchases(searchParams.categoryId, userId);
      return status || null; // Ensure we always return null instead of undefined
    },
    enabled: !!userId && !!searchParams.categoryId
  });

  const isLoading = isLoadingUser || isLoadingCategories || 
                    isLoadingSubcategories || isLoadingPurchase;

  if (isLoading) {
    return <Loadingpage />;
  }

  return (
    <>
      <Ad />
      <Navbar />
      <div className="flex flex-col space-y-4 m-6">
        <Top
          header="Certificaciones"
          text="Perfeccione sus habilidades con paquetes profesionales de diplomas y obtenga certificados"
        />
        <Categories items={categories || []} />
      </div>
      <div className="p-6 space-y-4 m-4">
        <div>
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-2 border rounded-full p-2">
            Diplomados
          </h2>
          <p className="lg:ml-10 ml-2 text-sm">
            Los cursos se encuentran dentro de los diplomas a continuación
          </p>
        </div>
        {categoryPurchaseStatus ? (
          subcategories && subcategories.length > 0 ? (
            <SubCategories subcategories={subcategories} />
          ) : (
            <div className="p-4 text-center text-sm text-gray-600">
              No hay subcategorías disponibles.
            </div>
          )
        ) : (
          <div className="p-4 text-center text-sm text-gray-600 flex flex-col space-y-4 mt-4">
            <h1>No hay compras para esta categoría</h1>
            <Image
              src="/no-courses.svg"
              className="flex items-center justify-center m-auto"
              width={300}
              height={300}
              alt="no courses"
            />
            <Link
              href="/pricing"
              className="text-blue-500 border hover:underline"
            >
              Ir a Precios
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

const SearchPage = (props: SearchPageProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPageInner {...props} />
    </QueryClientProvider>
  );
};

export default SearchPage;