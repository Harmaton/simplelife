'use client';

import { useState } from 'react';
import ProductCard from './product-card';

// Define types
export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  price: string;
  image: string;
  color: 'purple' | 'blue' | 'orange' | 'teal';
  category: 'energy' | 'sleep' | 'stress' | 'omega' | 'focus';
  rating: number;
  reviews: number;
  featuredReview: string;
  mercadolibre: string;
}

// Define categories
const categories = [
  { key: 'all', label: 'Todos', color: 'gray' },
  { key: 'energy', label: 'Energía', color: 'orange' },
  { key: 'sleep', label: 'Sueño', color: 'purple' },
  { key: 'stress', label: 'Antiestrés', color: 'blue' },
  { key: 'omega', label: 'Omega 3', color: 'teal' },
  { key: 'focus', label: 'Concentración', color: 'blue' },
];

export default function Products({ initialProducts }: { initialProducts: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter products based on category
  const filteredProducts = selectedCategory === 'all'
    ? initialProducts
    : initialProducts.filter(product => product.category === selectedCategory);

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">SUPER PARCHES</h2>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(({ key, label, color }) => {
            const isActive = selectedCategory === key;
            const bgColor = isActive
              ? color === 'gray' ? 'bg-gray-800' :
                color === 'orange' ? 'bg-orange-500' :
                color === 'purple' ? 'bg-purple-500' :
                color === 'teal' ? 'bg-teal-500' :
                'bg-blue-500'
              : 'bg-gray-200 hover:bg-gray-300';
            const textColor = isActive ? 'text-white' : 'text-gray-700';

            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-sm ${
                  bgColor
                } ${textColor} transform hover:scale-105 ${
                  isActive ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={false} // Replace with real wishlist state
                onToggleWishlist={() => {}} // Replace with real function
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No hay productos disponibles en esta categoría.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}