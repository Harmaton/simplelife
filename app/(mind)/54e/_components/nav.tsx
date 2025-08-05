'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Phone, ShoppingCart, Menu, X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

// Navigation items
const navItems = [
  { name: 'Home', href: '/54e' },
  { name: 'Nosotros', href: '/54e/about' },
  { name: 'Catalogo', href: '#products' },
  { name: 'Guia', href: '#guide' },
  { name: 'Contacto', href: '/54e/contacto' },
  { name: 'FAQ', href: '/54e/preguntas' },
];

// Mock cart for demo
interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export default function Nav({ totalCartItems = 0 }: { totalCartItems: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); // Current path

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle cart overflow
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  // Scroll to section after navigation
  useEffect(() => {
    if (window.location.hash && pathname === '/54e') {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure page load
      }
    }
  }, [pathname]);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const hash = href;

    // Close mobile menu
    setIsOpen(false);

    if (pathname === '/54e') {
      // Already on homepage: just scroll
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // In case the element isn't loaded yet
        setTimeout(() => {
          const el = document.querySelector(hash);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // Update URL without page reload
      window.history.pushState(null, '', hash);
    } else {
      // On another page: navigate to home + scroll
      router.push(`/54e${hash}`);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Mock cart items
  const cartItems: CartItem[] = [
    { id: 1, name: 'Parche de Energía', price: '15,000 ₱', image: '/mind/3.png', quantity: 1 },
    { id: 2, name: 'Parche de Sueño', price: '15,000 ₱', image: '/mind/2.png', quantity: 2 },
    { id: 3, name: 'Parche de Antiestrés', price: '15,000 ₱', image: '/mind/4.png', quantity: 2 }
  ].slice(0, totalCartItems > 0 ? Math.min(totalCartItems, 3) : 0);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-lg bg-white/80 shadow-lg border-b border-white/20' 
          : 'backdrop-blur-sm bg-white/70'
      }`}>
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-3 md:py-4">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/54e">
                <Image
                  src="/mind/logo.png"
                  alt="Super Parches Logo"
                  width={150}
                  height={100}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
              {navItems.map((item) => {
                const isHashLink = item.href.startsWith('#');
                return (
                  <div key={item.name} className="relative group">
                    {isHashLink ? (
                      <button
                        onClick={(e) => scrollToSection(e, item.href)}
                        className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105"
                      >
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative"
                      >
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <button
                onClick={toggleCart}
                className="relative text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-blue-50"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse font-semibold shadow-lg">
                    {totalCartItems > 99 ? '99+' : totalCartItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-700 hover:text-blue-600 transition-all duration-200 p-2 rounded-full hover:bg-blue-50"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <nav className="mt-4 bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
              {navItems.map((item) => {
                const isHashLink = item.href.startsWith('#');
                return (
                  <div key={item.name} className={item !== navItems[navItems.length - 1] ? 'border-b border-gray-100' : ''}>
                    {isHashLink ? (
                      <button
                        onClick={(e) => scrollToSection(e, item.href)}
                        className="block py-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:translate-x-2 w-full text-left"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:translate-x-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-out z-50 border-l border-white/20 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* [Keep your cart content unchanged] */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Tu Carrito</h3>
              <p className="text-sm text-gray-500">{totalCartItems} {totalCartItems === 1 ? 'artículo' : 'artículos'}</p>
            </div>
            <button
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700 transition-all duration-200 p-2 rounded-full hover:bg-white/50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center mt-20">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                <p className="text-gray-400 text-sm mt-2">Agrega algunos productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`flex gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-all duration-200 ${
                    index !== cartItems.length - 1 ? 'mb-3' : ''
                  }`}>
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={70}
                        height={70}
                        className="rounded-xl object-cover shadow-sm"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.name}</h4>
                      <p className="text-blue-600 font-bold text-sm sm:text-base mt-1">{item.price}</p>
                      <div className="flex items-center mt-3 bg-gray-50 rounded-lg p-1 w-fit">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white rounded-md transition-all duration-200">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="mx-3 font-semibold text-gray-800 min-w-[2rem] text-center">{item.quantity}</span>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white rounded-md transition-all duration-200">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-lg">189,65 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-gray-800">45,000 ₱</span>
                  </div>
                </div>
                <Link href={'https://articulo.mercadolibre.com.ar/MLA-2174450122-parche-de-vitalidad-y-bienestar-pack-7-_JM?attributes=Parche_transd%C3%A9rmico_vpp%3AUGFyY2hlIGRlIENvbmNlbnRyYWNpw7Nu&quantity=1&picker=true'}>
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Finalizar Compra
                </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleCart}
        ></div>
      )}
    </>
  );
}