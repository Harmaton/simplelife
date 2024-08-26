import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Feature {
  id: number;
  name: string;
}

interface PackProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  link: string;
  features: Feature[];
}

export default function PackComponent({ id, title, price, imageUrl, features,link }: PackProps) {
  const handleAddToWishlist = () => {
    // Add to wishlist logic here
    console.log('Added to wishlist:', id);
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', id);
  };

  const handleBuyNow = (link: string) => {
    window.location.assign(link)
    console.log('Buying now:', id);
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
        <Image src={imageUrl} alt={title} width={200} height={200} className="mb-4 rounded-md" />
        <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-tl-lg z-10">
          <span className="text-sm font-bold">10% de descuento</span>
        </div>
        <h2 className="text-xl font-bold mb-2 h-14 flex items-center">{title}</h2>
        <p className="text-2xl font-semibold mb-4">${price.toFixed(2)}</p>
        <ul className="mb-4">
          {features.map((feature) => (
            <li key={feature.id} className="flex items-center mb-2">
              <span className="mr-2">✓</span>
              {feature.name}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <div className="flex justify-between mb-4">
            <Button variant="outline" onClick={handleAddToWishlist}>
              <Heart className="mr-2" />
              Wishlist
            </Button>
            <Button variant="outline" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2" />
              Add to Cart
            </Button>
          </div>
          <Button className="w-full text-white" onClick={()=>handleBuyNow(link)}>
          Comprar Ahora
          </Button>
        </div>
      </div>
    </div>
  );
}
