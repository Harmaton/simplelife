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
}

// Your patch data
const patches: PatchSlide[] = [
  {
    image: '/mind/2.png',
    title: 'REM Super Patch',
    description: 'Mejora tu descanso con nuestro parche transdérmico de sueño.',
    btnText: 'Obtener Parche',
  },
  {
    image: '/mind/3.png',
    title: 'Peace Super Patch',
    description: 'Reduce el estrés y encuentra tu equilibrio interior.',
    btnText: 'Obtener Parche',
  },
  {
    image: '/mind/4.png',
    title: 'Victory Super Patch',
    description: 'Maximiza tu rendimiento deportivo y energía.',
    btnText: 'Obtener Parche',
  },
  {
    image: '/mind/5.png',
    title: 'Kick It Super Patch',
    description: 'Elimina hábitos no deseados de forma natural.',
    btnText: 'Obtener Parche',
  },
  {
    image: '/mind/6.png',
    title: 'Focus Super Patch',
    description: 'Aumenta tu concentración y claridad mental durante el día.',
    btnText: 'Obtener Parche',
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    setIsLoaded(true); // Trigger entrance animations
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % patches.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentPatch = patches[currentIndex];

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-purple-100 via-white to-blue-50 overflow-hidden"
    >
      {/* Soft background blur effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200 opacity-40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100 opacity-50 rounded-full blur-3xl"></div>
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
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
              {currentPatch.btnText}
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-8">
              {patches.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-purple-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentIndex(index)}
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
            <div className="relative w-full h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src={currentPatch.image}
                alt={currentPatch.title}
                fill
                className="object-cover"
                priority={currentIndex === 0} // Only prioritize first image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}