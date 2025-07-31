'use client';

import React, { useState, useEffect } from 'react';
import Hero from './_components/Hero';
import ProductCard, { CartItems, Product } from './_components/product-card';
import Nav from './_components/nav';
import About from './_components/about';
import Contact from './_components/contact';
import Footer from './_components/footer';
import Whatsapp from './_components/whatsapp';
import TestimonialsAndFAQ from './_components/testimonials';
import ReturnPolicy from './_components/return-policy';

const products: Product[] = [
  {
    id: 1,
    name: 'REM Super Patch',
    description: 'Mejora tu descanso con nuestro parche transdérmico de sueño.',
    price: '66,55 €',
    image: '/mind/2.png',   // ← Your local image
    color: 'purple',
    count: 28,
  },
  {
    id: 2,
    name: 'Peace Super Patch',
    description: 'Reduce el estrés y encuentra tu equilibrio interior.',
    price: '66,55 €',
    image: '/mind/3.png',   // ← Your local image
    color: 'blue',
    count: 28,
  },
  {
    id: 3,
    name: 'Victory Super Patch',
    description: 'Maximiza tu rendimiento deportivo y energía.',
    price: '66,55 €',
    image: '/mind/4.png',   // ← Your local image
    color: 'orange',
    count: 28,
  },
  {
    id: 4,
    name: 'Kick It Super Patch',
    description: 'Elimina hábitos no deseados de forma natural.',
    price: '66,55 €',
    image: '/mind/5.png',   // ← Your local image
    color: 'teal',
    count: 28,
  },
];

export default function SuperPatchesWebsite() {
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const addToCart = (productId: number): void => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const updateQuantity = (productId: number, quantity: number): void => {
    if (quantity <= 0) {
      const newCart = { ...cartItems };
      delete newCart[productId];
      setCartItems(newCart);
    } else {
      setCartItems(prev => ({
        ...prev,
        [productId]: quantity,
      }));
    }
  };

  const toggleWishlist = (productId: number): void => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const totalCartItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-white">
      <Nav totalCartItems={totalCartItems} wishlistSize={wishlist.size} />

      <section id="hero">
        <Hero />
      </section>

      <section id="products">
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">SUPER PARCHES</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartQuantity={cartItems[product.id] || 0}
                  isInWishlist={wishlist.has(product.id)}
                  onAddToCart={() => addToCart(product.id)}
                  onUpdateQuantity={quantity => updateQuantity(product.id, quantity)}
                  onToggleWishlist={() => toggleWishlist(product.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <About />
      </section>

     

      <section id="policy">
        <ReturnPolicy />
      </section>

      <section id="testimonials">
        <TestimonialsAndFAQ />
      </section>

       <section id="contact">
        <Contact />
      </section>

      <section >
        <Footer />
        </section>

    <Whatsapp />
    </div>
  );
}