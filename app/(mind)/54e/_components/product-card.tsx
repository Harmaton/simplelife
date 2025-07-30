'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  color: 'purple' | 'blue' | 'orange' | 'teal';
  count: number;
}

export interface CartItems {
  [productId: number]: number;
}

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  isInWishlist: boolean;
  onAddToCart: () => void;
  onUpdateQuantity: (quantity: number) => void;
  onToggleWishlist: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity,
  isInWishlist,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
}) => {
  const getColorClass = (color: Product['color']): string => {
    switch (color) {
      case 'purple':
        return 'bg-purple-400';
      case 'blue':
        return 'bg-blue-400';
      case 'orange':
        return 'bg-orange-400';
      case 'teal':
        return 'bg-teal-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Product Image */}
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          className="object-cover"
          priority={false}
        />
        {/* Wishlist Button */}
        <button
          onClick={onToggleWishlist}
          className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow hover:shadow-md transition-all duration-200 transform hover:scale-110"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
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
        <p className="text-gray-600 text-sm mb-4 flex-1">{product.description}</p>
        <p className="text-2xl font-bold text-gray-800 mb-4">{product.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(cartQuantity - 1)}
              disabled={cartQuantity <= 0}
              className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-4 py-1 border-x border-gray-300 min-w-[40px] text-center font-medium">
              {cartQuantity || 1}
            </span>
            <button
              onClick={() => onUpdateQuantity(cartQuantity + 1)}
              className="px-3 py-1 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Color Dot */}
          <div className={`w-5 h-5 rounded-full ${getColorClass(product.color)} shadow-sm`} />
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          AÑADIR AL CARRITO
        </button>
      </div>
    </div>
  );
};

export default ProductCard;