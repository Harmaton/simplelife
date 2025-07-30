'use client';

import React, { useState } from 'react';
import { Phone, ShoppingCart, Menu, X } from 'lucide-react';
import Image from 'next/image';

// Navigation items
const navItems = [
    { name: 'Nosotros', href: '#about' },
  { name: 'Catalogo', href: '#products' },
  { name: 'Guia', href: '#products' },
  { name: 'Contacto', href: '#contact' },
];

// Mock cart for demo (you can pass real cart data via props)
interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export default function Nav({ totalCartItems = 0, wishlistSize = 0 }: { totalCartItems: number , wishlistSize: number;}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mock cart items (replace with real data if needed)
  const cartItems: CartItem[] = [
    { id: 1, name: 'REM Super Patch', price: '66,55 €', image: '/patch1.png', quantity: 1 },
    { id: 2, name: 'Peace Super Patch', price: '66,55 €', image: '/patch2.png', quantity: 2 },
  ].slice(0, totalCartItems > 0 ? Math.min(totalCartItems, 2) : 0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar - Responsive Spacing */}
        <div className="bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-12 py-2 text-sm hidden sm:flex justify-between items-center text-gray-600 max-w-screen-xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Contacte con nosotros: 655 538 782</span>
          </div>
          <div>Mi lista de deseos ({totalCartItems})</div>
        </div>

        {/* Main Header */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/mind/logo.png"
                alt="Super Parches Logo"
                width={150}
                height={100}
                className="h-10 object-contain"
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-10">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-5">
              {/* Only Cart Icon (Search & User removed) */}
              <button
                onClick={toggleCart}
                className="relative text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-700"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <nav className="md:hidden mt-3 bg-white border-t border-gray-200 px-4 py-3 rounded-b-lg shadow-sm">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Cart Sidebar (Sheet) */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Tu Carrito ({totalCartItems})</h3>
            <button
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 p-6 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">Tu carrito está vacío</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex gap-4 border-b pb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-blue-600">{item.price}</p>
                      <div className="flex items-center mt-1">
                        <button className="w-6 h-6 flex items-center justify-center border rounded text-sm">−</button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <button className="w-6 h-6 flex items-center justify-center border rounded text-sm">+</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t">
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-semibold">199,65 €</span>
            </div>
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCart}
        ></div>
      )}
    </>
  );
}