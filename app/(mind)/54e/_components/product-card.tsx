'use client';

import { Heart, Star, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  price: string;
  image: string;
  color: 'purple' | 'blue' | 'orange' | 'teal';
  category: 'energy' | 'sleep' | 'stress' | 'omega' | 'focus';
  slug: string;
  rating: number;
  reviews: number;
  mercadolibre: string;
  featuredReview: string;
}

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
}

// Helper to generate full stars, half stars, empty stars
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    } else if (i - 0.5 <= rating) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-200 text-yellow-200" />);
    } else {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, isInWishlist, onToggleWishlist }) => {

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full max-w-lg mx-auto">
      {/* Product Image */}
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          className="object-cover"
        />
        {/* Wishlist Button */}
        <button
          onClick={onToggleWishlist}
          className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow hover:shadow-md transition-all duration-200 transform hover:scale-110"
          aria-label={isInWishlist ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-500'
            }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 flex-1">{product.shortDescription}</p>

        {/* Price & Rating */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-gray-800 mb-2">{product.price}</p>
          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
          <p className="text-sm italic text-gray-500 line-clamp-1">{product.featuredReview}</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Link
            href={`/54e/${product.slug}`}
            className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Ver detalles
          </Link>
          <a
            href={product.mercadolibre}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-center bg-green-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
           Comprar ahora
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;