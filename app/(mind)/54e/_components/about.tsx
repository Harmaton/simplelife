'use client';

import { useState, useEffect } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-blue-50"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>

      <div className={`max-w-5xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-orange-500 bg-clip-text text-transparent mb-6">
            SOBRE NOSOTROS
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            <strong>54e</strong> es mucho más que un parche: es una filosofía de salud hecha piel. 
            Somos la fusión entre ciencia, tecnología y conciencia, al servicio del bienestar físico, mental y emocional.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto border border-white/30">
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Inspirados por el concepto de <strong>“Simple Life”</strong>, nacimos con una visión clara: 
            ofrecer soluciones de salud naturales, efectivas y accesibles, que respeten la integridad del cuerpo 
            y acompañen a cada persona en su proceso de transformación.
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 p-6 rounded-r-xl mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">El nombre <span className="text-purple-600">54e</span></h3>
            <p className="text-gray-600 leading-relaxed">
              <strong>“54”</strong> en números romanos es <strong>LIV</strong>, que representa <em>transición, evolución y despertar</em>.<br />
              La <strong>“e”</strong> añade <em>energía, esencia y equilibrio</em>.<br />
              Y la palabra resultante — <span className="font-bold text-purple-700">LIVe</span> — es una invitación a vivir de forma más consciente, más natural, más plena.
            </p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Cada uno de nuestros parches es un puente entre la naturaleza y la innovación: 
            tecnología transdérmica de última generación, formulaciones limpias y una experiencia de uso 
            que respeta el ritmo único de cada cuerpo.
          </p>

          <p className="text-xl font-semibold text-center text-gray-800 italic">
            Con <strong className="text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">54e</strong>, 
            no buscas solo salud. <br />
            <span className="text-purple-700">Eliges evolución.</span>
          </p>
        </div>
      </div>

      {/* Subtle Animation */}
      <style jsx>{`
        .text-gradient {
          background: linear-gradient(90deg, #9333EA, #3B82F6, #F97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}