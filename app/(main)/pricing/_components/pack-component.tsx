import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EmbeddedHotmartCheckout from "./embedded-checkout";

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

export default function PackComponent({
  id,
  title,
  price,
  imageUrl,
  features,
  link,
}: PackProps) {
  const handleAddToWishlist = () => {
    // Add to wishlist logic here
    console.log("Added to wishlist:", id);
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
        <Image
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          className="mb-4 rounded-md"
        />
        <div className="absolute top-0 right-0 bg-indigo-500 text-white px-2 py-1 rounded-tl-lg z-10">
          <span className="text-sm font-bold">10% de descuento</span>
        </div>
        <h2 className="text-xl font-bold mb-2 h-14 flex items-center">
          {title}
        </h2>
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
          <div className="flex justify-end mb-4">
            <EmbeddedHotmartCheckout link={link} />
          </div>
        </div>
      </div>
    </div>
  );
}
