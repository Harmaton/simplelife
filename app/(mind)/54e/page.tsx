'use client';

import React, { useState, useEffect } from 'react';
import Hero from './_components/Hero';
import Nav from './_components/nav';
import Footer from './_components/footer';
import Whatsapp from './_components/whatsapp';
import ReturnPolicy from './_components/return-policy';
import HowItWorks from './_components/HowItWorks';
import UsageGuide from './_components/user-guide';
import Products from './_components/products';
import { Product } from './type';

export default function SuperPatchesWebsite() {

  const [products, setProducts] = useState<Product[]>([]);

  // Load products from JSON
  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const toggleWishlist = (productId: number): void => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <section id="hero">
        <Hero />
      </section>

    <Products initialProducts={products} />

      <section id="guide">
        <UsageGuide />
      </section>
       <HowItWorks />     
              
      <section id="policy">
        <ReturnPolicy />
      </section>

     

      <section >
        <Footer />
        </section>

    <Whatsapp />
    </div>
  );
}