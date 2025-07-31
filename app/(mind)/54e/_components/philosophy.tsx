'use client';

import { useEffect, useState } from 'react';

export default function Philosophy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="philosophy"
      className="py-28 px-6 relative overflow-hidden bg-gradient-to-b from-white via-purple-25 to-blue-25"
    >
      {/* Soft background orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10"></div>

      {/* Abstract wave divider (top) */}
      <div
        className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-transparent via-purple-100 to-transparent"
        style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}
      ></div>

      <div
        className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-6 leading-tight">
          FILOSOFÍA
        </h2>
        <p className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
          No vendemos parches. <br className="md:hidden" />
          <span className="text-purple-700 font-medium">Activamos procesos de bienestar.</span>
        </p>

        {/* Core Philosophy */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-10 md:p-12 border border-white/40 mb-20 max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Creemos que la verdadera salud es un estado de armonía integral, no solo la ausencia de enfermedad.
            Apostamos por un modelo que une lo mejor de la ciencia moderna, los principios de la medicina natural
            y una visión holística de la vida.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            No se trata de “tapar síntomas”, sino de activar procesos internos de autorregulación y bienestar,
            respetando el cuerpo y su inteligencia biológica.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 italic">
            Cada parche es una herramienta, pero también un símbolo: una señal de que estás eligiendo cuidarte,
            sin dañar tu organismo, sin excesos, sin agresiones. <br />
            <span className="font-semibold text-purple-700">Desde la piel, hacia adentro.</span>
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Visión */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-md border border-purple-100 text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              VISIÓN
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Ser referentes globales en salud holística de alta tecnología, acompañando a las personas en su proceso de autoconocimiento, transformación y evolución personal, sin comprometer la integridad de su cuerpo ni su esencia.
            </p>
          </div>

          {/* Misión */}
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl shadow-md border border-blue-100 text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              MISIÓN
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Facilitar el acceso a soluciones de salud naturales, tecnológicas y conscientes, que promuevan el bienestar integral, el cuidado preventivo y el crecimiento humano, respetando la singularidad de cada persona y su ritmo de vida.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">VALORES</h3>
          <ul className="space-y-4 text-gray-700">
            {[
              {
                label: 'Innovación',
                desc: 'tecnología de avanzada al servicio de la salud integral'
              },
              {
                label: 'Autenticidad',
                desc: 'hacemos lo que creemos, creemos en lo que hacemos'
              },
              {
                label: 'Integridad',
                desc: 'cuidamos al ser humano en todas sus dimensiones'
              },
              {
                label: 'Respeto por la naturaleza',
                desc: 'elegimos fórmulas limpias, éticas y seguras'
              },
              {
                label: 'Compromiso con la evolución personal',
                desc: 'queremos acompañarte, no sustituirte'
              }
            ].map((item, i) => (
              <li key={i} className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-semibold text-purple-700 min-w-56">
                  {item.label}:
                </span>
                <span className="text-gray-600 italic">{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing Line */}
        <p className="text-gray-500 italic text-center mt-12 max-w-2xl mx-auto">
          En 54e, no solo transformamos tu bienestar. <br />
          <span className="text-purple-700 font-medium">Te invitamos a evolucionar.</span>
        </p>
      </div>

      {/* Subtle animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .transition-all {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}