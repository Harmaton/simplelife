"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from "@/components/landing-page/navbar";
import Image from "next/image";
import SubCategories from "./subcategories";
import { GetAllCategories, GetCategorySubCategories, GetCategoryPurchases } from "../actions/courses";
import { Categories } from "./categories";
import Top from "@/components/top-page";
import Ad from "@/components/landing-page/ad";
import { useAuth } from '@/providers/AuthProvider';
import { Category, SubCategory } from '@prisma/client';
import Loadingpage from '@/components/loading-page';


interface SearchPageProps {
  searchParams: {
    name: string;
    categoryId: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [hasCategoryPurchase, setHasCategoryPurchase] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [allsubcategories, setallsubcategories] = useState<SubCategory[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      if (user) {
        const fetchedCategories = await GetAllCategories();
        const fetchedSubcategories = await GetCategorySubCategories(searchParams.categoryId);
        const categoryPurchaseStatus = await GetCategoryPurchases(searchParams.categoryId, user.uid);
        
        setCategories(fetchedCategories);
        setSubcategories(fetchedSubcategories);
        setHasCategoryPurchase(!!categoryPurchaseStatus);
      } else {
        setHasCategoryPurchase(false);
      }
      setLoading(false);
    }

    fetchData();
  }, [user, searchParams.categoryId]);

  if (loading) {
    return <Loadingpage />
  }

  return (
    <>
      <Ad />
      <Navbar />
      <div className="flex flex-col space-y-4 m-6">
        <Top header="Certificaciones" text="Perfeccione sus habilidades con paquetes profesionales de diplomas y obtenga certificados" />
        <Categories items={categories} />
      </div>
      <div className="p-6 space-y-4 m-4">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-2">
          Diplomados
        </h2>
        {hasCategoryPurchase ? (
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
            <Link href="/pricing" className="text-blue-500 border hover:underline">
              Ir a Precios
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;