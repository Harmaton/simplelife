'use client';

import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Enhanced Footer Wave SVG (now clearly visible with energy dots)
const FooterWave = () => (
  <svg
    viewBox="0 0 1440 180"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute bottom-0 left-0 w-full"
    style={{ zIndex: -1 }}
  >
    {/* Base wave - more visible */}
    <path
      d="M0 80C120 40, 240 30, 360 40C480 50, 600 90, 720 85C840 80, 960 40, 1080 35C1200 30, 1320 50, 1440 80V180H0V180Z"
      fill="url(#gradientPurple)"
      opacity="0.8"
    />

    {/* Second wave - softer */}
    <path
      d="M0 100C120 60, 240 50, 360 60C480 70, 600 110, 720 105C840 100, 960 60, 1080 55C1200 50, 1320 70, 1440 100V180H1440V180Z"
      fill="url(#gradientBlue)"
      opacity="0.5"
    />

    {/* Patch-style energy dots */}
    <circle cx="200" cy="90" r="10" fill="url(#gradientAccent)" />
    <circle cx="400" cy="70" r="8" fill="url(#gradientAccent)" />
    <circle cx="600" cy="80" r="9" fill="url(#gradientPurple)" />
    <circle cx="800" cy="65" r="7" fill="url(#gradientOrange)" />
    <circle cx="1000" cy="85" r="8" fill="url(#gradientAccent)" />
    <circle cx="1200" cy="75" r="6" fill="url(#gradientBlue)" />

    {/* Small pulses for motion */}
    <circle cx="300" cy="120" r="4" fill="url(#gradientOrange)" opacity="0.7" />
    <circle cx="500" cy="130" r="3" fill="url(#gradientPurple)" opacity="0.6" />
    <circle cx="700" cy="125" r="4" fill="url(#gradientAccent)" opacity="0.8" />
    <circle cx="900" cy="135" r="3.5" fill="url(#gradientBlue)" opacity="0.6" />
    <circle cx="1100" cy="130" r="4" fill="url(#gradientOrange)" opacity="0.7" />

    {/* Gradients */}
    <defs>
      <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#9333EA" /> {/* purple-600 */}
        <stop offset="100%" stopColor="#A78BFA" /> {/* purple-400 */}
      </linearGradient>
      <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3B82F6" /> {/* blue-500 */}
        <stop offset="100%" stopColor="#60A5FA" /> {/* blue-400 */}
      </linearGradient>
      <linearGradient id="gradientAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#D946EF" /> {/* fuchsia-500 */}
        <stop offset="100%" stopColor="#C084FC" /> {/* purple-300 */}
      </linearGradient>
      <linearGradient id="gradientOrange" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F97316" /> {/* orange-500 */}
        <stop offset="100%" stopColor="#FB923C" /> {/* orange-400 */}
      </linearGradient>
    </defs>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-white relative overflow-hidden">
      {/* Creative Full-Bottom SVG Wave */}
      <FooterWave />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 relative z-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="#hero" className="flex items-center space-x-3">
              <Image
                src="/mind/logo.png"
                alt="SimpleLifeMind Logo"
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <h3 className="font-bold text-xl text-gray-800">SimpleLifeMind</h3>
                <p className="text-sm text-gray-500">Bienestar desde Córdoba</p>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Empoderamos tu salud con parches inteligentes y naturales. 
              Rendimiento, equilibrio y recuperación inspirados en la vida simple.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com/simplelifemind"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-transform hover:scale-110"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com/simplelifemind"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-transform hover:scale-110"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/simplelifemind"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 transition-transform hover:scale-110"
                aria-label="Síguenos en X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-5 text-lg">Enlaces</h4>
            <ul className="space-y-3">
              {[
                { name: 'Inicio', href: '#hero' },
                { name: 'Productos', href: '#products' },
                { name: 'Sobre Nosotros', href: '/54e/about' },
                { name: 'Contacto', href: '/54e/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Productos */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-5 text-lg">Productos</h4>
            <ul className="space-y-3">
              {[
                'Parche de Energía',
                'Parche de Sueño',
                'Parche de Antiestrés',
                'Parche de Omega 3',
                'Parche de Concentración'
              ].map((product) => (
                <li key={product}>
                  <Link
                    href="#products"
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-5 text-lg">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-gray-600">
                <Phone className="w-4 h-4 mt-0.5 text-purple-600" />
                <span>+54 351 756 8043</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-600">
                <Mail className="w-4 h-4 mt-0.5 text-purple-600" />
                <span> simplelifesud@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 text-purple-600" />
                <span>Córdoba, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-purple-100 space-y-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href="/legal/aviso-legal" className="text-gray-500 hover:text-purple-600 transition-colors">
              Aviso Legal
            </Link>
            <Link href="/legal/privacidad" className="text-gray-500 hover:text-purple-600 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/legal/cookies" className="text-gray-500 hover:text-purple-600 transition-colors">
              Política de Cookies
            </Link>
          </div>

          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-700">SimpleLifeMind</span>. 
            Todos los derechos reservados. Hecho con ❤️ en Córdoba.
          </p>
        </div>
      </div>
    </footer>
  );
}