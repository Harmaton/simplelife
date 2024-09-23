import React from "react";
import CategoryCard from "./category";
import { Category } from "@prisma/client";

interface TopCategoriesProps {
  categories: Category[];
}

const TopCategories: React.FC<TopCategoriesProps> = ({ categories }) => {
  return (
    <section className="py-8 px-4 max-w-10xl mx-auto">
      <div className="flex justify-between  mb-8">
        <div className="">
          <h2 className="text-3xl font-bold mb-2">Top Certifications</h2>
          <p className="text-gray-600">Explore our Popular Certications</p>
        </div>
        <button className="bg-white text-gray-800 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
          All Certifications
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <CategoryCard  courselength={0} category={category} key={index} />
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
