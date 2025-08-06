'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {  Menu, X, Instagram, Facebook } from 'lucide-react';
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

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); // Current path

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              {/* Social Icons */}
              <a
                href="https://www.instagram.com/parche54e/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-pink-50"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              
              <a
                href="https://www.facebook.com/simplelifemindset/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-blue-50"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5 md:w-6 md:h-6" />
              </a>

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
              
              {/* Social Icons in Mobile Menu */}
              <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-100">
                <a
                  href="https://www.instagram.com/parche54e/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-pink-50"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                
                <a
                  href="https://www.facebook.com/simplelifemindset/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-blue-50"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}