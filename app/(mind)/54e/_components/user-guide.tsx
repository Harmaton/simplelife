'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function UsageGuide() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="usage-guide"
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-white via-blue-25 to-purple-25"
    >
      {/* Soft background orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10"></div>

      <div
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4 leading-tight">
            GUÍA DE USO
          </h2>
          <p className="text-xl text-gray-600 italic mb-6">
            Tu parche, tu bienestar. <strong>Aplicalo bien, siéntelo mejor.</strong>
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* 1. Recommended Zones */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📍 Zonas Recomendadas
            </h3>
            <ul className="space-y-3 mb-6">
              {[
                'Parte interna del brazo',
                'Parte superior de la espalda',
                'Zona lateral o inferior del abdomen',
                'Frontal o lateral del muslo',
                'Superior del glúteo (sin roce)'
              ].map((zone, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg text-sm text-gray-700">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  {zone}
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Visual Body Zones with Image */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-lg p-6 border border-blue-200 flex items-center justify-center">
            <Image
              src="/mind/energia3.png"
              alt="Zonas recomendadas de colocación del parche"
              width={192}
              height={256}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* 3. Step-by-Step Application */}
          <div className="lg:col-span-2 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              🔢 Paso a Paso
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: 'Lava y seca la piel', emoji: '🧼' },
                { step: 'Abre el sobre', emoji: '✂️' },
                { step: 'Aplica con presión', emoji: '✋' },
                { step: 'Deja actuar 8–12h', emoji: '⏳' },
                { step: 'Retira y descarta', emoji: '🗑️' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <p className="text-xs text-gray-700 leading-relaxed">{item.step}</p>
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mt-3">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Tips & Warnings Side-by-Side */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Tips For Better Adherence */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  💡 Tips Para Mejor Adherencia
                </h3>
                <div className="space-y-3">
                  {[
                    'Aplica por la mañana para energía',
                    'Para dormir, colócalo 1h antes de acostarte',
                    'Evita ducharte o ejercicio intenso',
                    'No uses sobre piel irritada o herida',
                    'Si no se adhiere, cambia de zona',
                    'Guarda en lugar fresco y seco',
                    'Usa el parche inmediatamente después de abrir',
                    'Prueba en zona discreta si tienes piel sensible'
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 text-sm text-gray-700">
                      <span className="text-blue-500 mt-1.5">✦</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Not Recommended */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                  ⚠️ No Recomendado
                </h3>
                <div className="space-y-3">
                  {[
                    'Pegar sobre articulaciones o pliegues',
                    'Aplicar sobre piel sudada o con crema',
                    'Usar más de un parche del mismo tipo',
                    'Reutilizar parches (uso único)',
                    'Mojar o exponer a calor extremo',
                    'Compartir parches entre personas'
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-red-100 text-sm text-red-700"
                    >
                      <span className="text-red-500 text-lg">🚫</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}