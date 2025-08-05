'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ShoppingCartIcon, Star, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// === Product Interface ===
export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: string;
  image: string;
  color: 'purple' | 'blue' | 'orange' | 'teal';
  category: 'energy' | 'sleep' | 'stress' | 'omega' | 'focus';
  rating: number;
  reviews: number;
  featuredReview: string;
  mercadolibre: string;
  benefits: string[];
  ingredients: string[];
  contraindications: string[];
}

// === Mock Features per Category ===
const CATEGORY_FEATURES: Record<Product['category'], string[]> = {
  energy: [
    'Energía constante sin picos',
    'Mayor resistencia física',
    'Claridad mental mejorada',
  ],
  sleep: [
    'Sueño profundo y natural',
    'Mejora calidad del descanso',
    'Regula ciclo sueño-vigilia',
  ],
  stress: [
    'Reduce estrés y ansiedad',
    'Equilibrio emocional',
    'Sin somnolencia diurna',
  ],
  omega: [
    'Salud cardiovascular',
    'Mejora concentración',
    'Efecto antiinflamatorio',
  ],
  focus: [
    'Claridad mental mejorada',
    'Mayor capacidad de enfoque',
    'Reduce cansancio mental',
  ],
};

// === ProductCard Component ===
interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const features = CATEGORY_FEATURES[product.category] || [];

  // Color mapping for styling
  const colorStyles = {
    purple: {
      gradient: 'from-purple-50 to-purple-100',
      border: 'border-purple-200',
      accent: 'text-purple-600',
    },
    blue: {
      gradient: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      accent: 'text-blue-600',
    },
    orange: {
      gradient: 'from-orange-50 to-orange-100',
      border: 'border-orange-200',
      accent: 'text-orange-600',
    },
    teal: {
      gradient: 'from-teal-50 to-teal-100',
      border: 'border-teal-200',
      accent: 'text-teal-600',
    },
  };

  const styles = colorStyles[product.color];

  const handleBuyClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(product.mercadolibre, '_blank', 'noopener');
  }, [product.mercadolibre]);

  return (
    <Link href={`/54e/${product.slug}`} className="block group">
      <div className={`bg-gradient-to-br ${styles.gradient} rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${styles.border} h-full flex flex-col`}>
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-white/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 shadow-sm">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-gray-900 transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2 flex-shrink-0">
            {product.shortDescription}
          </p>
          
          {/* Features */}
          <ul className="mb-4 space-y-1.5 flex-1">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start text-xs text-gray-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Reviews */}
          <div className="flex items-center mb-4 text-xs text-gray-500">
            <Users className="w-3 h-3 mr-1" />
            <span>{product.reviews} reseñas</span>
          </div>
          
          {/* Price and Action - Stacked */}
          <div className="mt-auto space-y-3">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-800 block">{product.price}</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleBuyClick}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <ShoppingCartIcon size={14} className="mr-1.5" />
                Comprar
              </button>
              

              <div className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-white/70 text-gray-600 group-hover:text-blue-600 transition-colors">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

// === Category Filter Definitions ===
const categories = [
  { key: 'all', label: 'Todos', color: 'gray' },
  { key: 'energy', label: 'Energía', color: 'orange' },
  { key: 'sleep', label: 'Sueño', color: 'purple' },
  { key: 'stress', label: 'Antiestrés', color: 'blue' },
  { key: 'omega', label: 'Omega 3', color: 'teal' },
  { key: 'focus', label: 'Concentración', color: 'blue' },
];

// === Main Products Component ===
export default function Products({ initialProducts }: { initialProducts: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Memoized filtered products for performance
  const filteredProducts = useMemo(() => {
    return selectedCategory === 'all'
      ? initialProducts
      : initialProducts.filter((product) => product.category === selectedCategory);
  }, [initialProducts, selectedCategory]);

  // Memoized category change handler
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              54e Patches
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra gama de parches innovadores diseñados para alivio efectivo y recuperación. 
            Tecnología transdérmica avanzada para resultados óptimos.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(({ key, label, color }) => {
            const isActive = selectedCategory === key;
            const bgColor = isActive
              ? color === 'gray'
                ? 'bg-gradient-to-r from-gray-700 to-gray-800 shadow-lg'
                : color === 'orange'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-200'
                : color === 'purple'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 shadow-purple-200'
                : color === 'teal'
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 shadow-teal-200'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-200'
              : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300';
            const textColor = isActive ? 'text-white' : 'text-gray-700 hover:text-gray-900';

            return (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${bgColor} ${textColor} transform hover:scale-105 hover:shadow-lg ${
                  isActive ? 'shadow-xl' : 'shadow-sm'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Products Grid - Consistent 3-column layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingCartIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No hay productos disponibles
              </h3>
              <p className="text-gray-500">
                No se encontraron productos en esta categoría.
              </p>
            </div>
          )}
        </div>

 <div className="mt-20 mb-16">
  <div className="max-w-6xl mx-auto px-6">
    {/* Title */}
    <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
      Consejo
    </h3>

    {/* Full Grid: 3 Equal Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Tip 1 */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col items-center">
        <div className="w-14 h-14 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-purple-600 text-lg">⏱️</span>
        </div>
        <p className="text-gray-700 leading-relaxed mt-2 flex-1">
          <strong>Tomate 30 segundos al colocarlo,</strong> y regálate 12 horas de equilibrio.
        </p>
      </div>

      {/* Tip 2 */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col items-center">
        <div className="w-14 h-14 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-orange-600 text-lg">🌱</span>
        </div>
        <p className="text-gray-700 leading-relaxed mt-2 flex-1">
          <strong>Pequeños hábitos</strong> crean grandes transformaciones.
        </p>
      </div>

      {/* Inspirational Message - Now a Full-Height Card in the Grid */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200 text-center shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-center">
        <p className="text-lg md:text-xl font-semibold text-gray-800 italic leading-relaxed">
          Con <strong className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">54e</strong>, 
          tu bienestar empieza desde la piel y llega hasta el alma.
        </p>
      </div>
    </div>
  </div>
</div>
</div>
      
    </section>
  );
}