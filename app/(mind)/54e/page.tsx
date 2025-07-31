'use client';

import React, { useState, useEffect } from 'react';
import Hero from './_components/Hero';
import ProductCard, { Product } from './_components/product-card';
import Nav from './_components/nav';
import About from './_components/about';
import Contact from './_components/contact';
import Footer from './_components/footer';
import Whatsapp from './_components/whatsapp';
import TestimonialsAndFAQ from './_components/testimonials';
import ReturnPolicy from './_components/return-policy';
import Philosophy from './_components/philosophy';
import HowItWorks from './_components/HowItWorks';
import UsageGuide from './_components/user-guide';
import Products from './_components/products';

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
      <Nav totalCartItems={3} />

      <section id="hero">
        <Hero />
      </section>

    <Products initialProducts={products} />

      <section id="about">
        <About />
      </section>

      <section id="guide">
        <UsageGuide />
      </section>
       <HowItWorks />
      <Philosophy />
     
              
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