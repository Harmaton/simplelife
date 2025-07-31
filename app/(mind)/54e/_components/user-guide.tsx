'use client';

import { useEffect, useState } from 'react';

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
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-6 leading-tight">
            GUÍA DE USO
          </h2>
          <p className="text-xl text-gray-600 italic mb-2">
            Tu parche, tu bienestar. Aplicalo bien, siéntelo mejor.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Recommended Zones */}
        <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12 border border-gray-100 mb-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📍 Zonas Recomendadas de Colocación
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Elegí zonas con poco o ningún vello, sin pliegues ni mucho movimiento. 
            Asegurate de que la piel esté <strong>limpia, seca y sin irritaciones</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              'Parte interna del brazo (entre el hombro y el codo)',
              'Parte superior de la espalda (cerca del omóplato)',
              'Zona lateral o inferior del abdomen',
              'Parte frontal o lateral del muslo',
              'Parte superior del glúteo (si no habrá roce fuerte)'
            ].map((zone, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl text-gray-700"
              >
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm">{zone}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 italic">
            🔄 Rota las zonas en cada aplicación para evitar sensibilización de la piel.
          </p>
        </div>

        {/* Step-by-Step Application */}
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-10 rounded-2xl shadow-md border border-gray-200 mb-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            🔢 Paso a Paso de Aplicación
          </h3>
          <ol className="space-y-4">
            {[
              'Lava y seca bien la piel. Evita cremas, aceites o perfumes.',
              'Abre el sobre con cuidado. Retira el parche con manos limpias.',
              'Aplica sobre piel seca y lisa. Presiona suavemente 10–15 segundos.',
              'Deja actuar entre 8 y 12 horas. No lo reutilices.',
              'Retira con cuidado. Desecha el parche y cambia la zona en el próximo uso.'
            ].map((step, i) => (
              <li key={i} className="flex gap-4 text-gray-700">
                <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1 self-center">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips for Better Adherence */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 Tips Para Una Mejor Adherencia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              'Aplica en la mañana si es para energía, concentración o antiestrés.',
              'Para dormir, colócalo 1 hora antes de acostarte.',
              'Evita ducharte o hacer ejercicio intenso con el parche.',
              'No uses sobre piel irritada, herida o recién depilada.',
              'Si no se adhiere bien, cámbialo de zona.',
              'Guarda los sobres en un lugar fresco, seco y sin luz solar.',
              'Una vez abierto, usa el parche lo antes posible.',
              'Si tienes piel sensible, prueba primero en una zona menos expuesta.'
            ].map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-700"
              >
                <span className="text-purple-500 mt-1">✦</span>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Not Recommended */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-red-800 mb-5 flex items-center gap-2">
            ⚠️ No Recomendado
          </h3>
          <ul className="space-y-3 text-red-700">
            {[
              'Pegar sobre articulaciones o zonas con pliegues',
              'Aplicar sobre piel sudada o con crema',
              'Usar más de un parche del mismo tipo al mismo tiempo',
              'Reutilizar parches (son de uso único)',
              'Mojar o exponer a calor extremo',
              'Compartir parches entre personas'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Final Advice */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-10 rounded-2xl border border-purple-100 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Consejo Final</h3>
          <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <li>🔸 Tomate 30 segundos al colocarlo, y regalate 12 horas de equilibrio.</li>
            <li>🔸 Pequeños hábitos crean grandes transformaciones.</li>
            <li className="font-semibold text-purple-700">
              Con 54e, tu bienestar empieza desde la piel y llega al alma.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}