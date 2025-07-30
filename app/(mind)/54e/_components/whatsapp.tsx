'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Whatsapp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="https://wa.me/34655538782"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatea con nosotros por WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-green-600 focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105"
      >
        <MessageCircle className="w-7 h-7" />
      </Link>
    </div>
  );
}