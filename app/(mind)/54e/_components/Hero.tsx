'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// Define patch slide type
interface PatchSlide {
  image: string;
  title: string;
  description: string;
  btnText: string;
  color: {
    primary: string;  // e.g., 'from-orange-500'
    secondary: string; // e.g., 'to-red-500'
    hover: string;     // e.g., 'hover:from-orange-600'
    dot: string;       // e.g., 'bg-orange-500'
  };
}

// Updated patch data from your detailed product info
const patches: PatchSlide[] = [
  {
    image: '/mind/2.png',
    title: 'Parche de Energía',
    description: 'Despierta tu potencial con nuestro parche transdérmico. Potencia tu rendimiento físico, activa tu mente y mejora tu equilibrio emocional sin sobrecargar tu cuerpo.',
    btnText: 'Obtener Parche',
    color: {
      primary: 'from-orange-500',
      secondary: 'to-red-500',
      hover: 'hover:from-orange-600 hover:to-red-600',
      dot: 'bg-orange-500',
    },
  },
  {
    image: '/mind/3.png',
    title: 'Parche de Sueño',
    description: 'Dormir bien no debería ser un lujo. Revoluciona tu descanso nocturno con una fórmula avanzada que actúa de forma natural y sin dependencia.',
    btnText: 'Obtener Parche',
    color: {
      primary: 'from-purple-500',
      secondary: 'to-indigo-600',
      hover: 'hover:from-purple-600 hover:to-indigo-700',
      dot: 'bg-purple-500',
    },
  },
  {
    image: '/mind/4.png',
    title: 'Parche de Antiestrés',
    description: 'Reduce el estrés y la ansiedad de forma natural. Promueve el equilibrio emocional y el bienestar mental sin somnolencia.',
    btnText: 'Obtener Parche',
    color: {
      primary: 'from-blue-500',
      secondary: 'to-cyan-500',
      hover: 'hover:from-blue-600 hover:to-cyan-600',
      dot: 'bg-blue-500',
    },
  },
  {
    image: '/mind/5.png',
    title: 'Parche de Omega 3',
    description: 'Omega 3 transdérmico: sin digestión, sin sabor, sin esfuerzo. Apoya tu salud cerebral, cardiovascular y celular.',
    btnText: 'Obtener Parche',
    color: {
      primary: 'from-teal-500',
      secondary: 'to-emerald-500',
      hover: 'hover:from-teal-600 hover:to-emerald-600',
      dot: 'bg-teal-500',
    },
  },
  {
    image: '/mind/6.png',
    title: 'Parche de Concentración',
    description: 'Mejora tu claridad mental, enfoque y retención. Ideal para estudios, trabajo intenso y toma de decisiones.',
    btnText: 'Obtener Parche',
    color: {
      primary: 'from-blue-600',
      secondary: 'to-purple-600',
      hover: 'hover:from-blue-700 hover:to-purple-700',
      dot: 'bg-blue-500',
    },
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentPatch = patches[currentIndex];

  // Auto-advance carousel
  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % patches.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Soft background blur effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100 opacity-40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-1000 transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800">
              {currentPatch.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-600">
              {currentPatch.description}
            </p>
            <button
              className={`bg-gradient-to-r ${currentPatch.color.primary} ${currentPatch.color.secondary} text-white px-8 py-4 rounded-full font-semibold ${currentPatch.color.hover} transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2`}
            >
              {currentPatch.btnText}
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-8">
              {patches.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? `${currentPatch.color.dot} scale-125`
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative w-full h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden ">
              <Image
                src={currentPatch.image}
                alt={currentPatch.title}
                fill
                className="object-cover"
                priority={currentIndex === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}