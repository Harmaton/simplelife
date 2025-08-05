'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-28 px-6 relative overflow-hidden bg-gradient-to-b from-white via-purple-25 to-blue-25"
    >
      {/* Background Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10"></div>

      <div
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-semibold text-gray-800 mb-6 leading-tight">
            ¿CÓMO FUNCIONA?
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            <span className="font-bold">NanoTecnología transdérmica</span> de última generación.
          </p>
          <p className="text-lg text-gray-500 italic">
            El poder de los nutrientes directo a tu piel, sin sobrecargar tu estómago.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* 1. Core Message + Hero Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 max-w-6xl mx-auto items-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/40">
            <p className="text-lg leading-relaxed text-gray-700 mb-5">
              <strong>Tu cuerpo no necesita más pastillas.</strong> <br />
              <span className="font-semibold text-purple-700">Necesita más inteligencia.</span>
            </p>
            <p className="text-gray-600 leading-relaxed">
              La piel no solo protege. También respira, se comunica y absorbe. 
              Nuestros parches 54e utilizan una avanzada nanotecnología transdérmica que permite que los ingredientes activos atraviesen las capas externas de la piel y lleguen al torrente sanguíneo de manera progresiva, segura y eficiente.
            </p>
          </div>

          {/* Hero Image - Larger */}
          <div className="flex justify-center">
            <div className="w-80 h-96 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/mind/Antiestres3.png"
                alt="Parche 54e en aplicación sobre piel"
                width={320}
                height={384}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 2. Skin Absorption Diagram */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 shadow-lg border border-blue-200 mb-20 max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">¿Cómo penetra el parche?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Diagram Image */}
            <div className="flex justify-center">
              <div className="w-72 h-80 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <Image
                  src="/mind/concentracion4.png"
                  alt="Capas de la piel y absorción transdérmica"
                  width={288}
                  height={320}
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>

            {/* Process Explanation */}
            <div className="space-y-5 text-gray-700">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div>
                  <strong>Aplicación</strong> sobre piel limpia y seca.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div>
                  <strong>Activación térmica</strong> por el calor corporal.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div>
                  <strong>Liberación controlada</strong> de principios activos.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div>
                  <strong>Absorción transdérmica</strong> a través de las capas de la piel.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                <div>
                  <strong>Ingreso al torrente sanguíneo</strong> sin pasar por el hígado.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Key Benefits Grid */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 md:p-10 rounded-2xl shadow-lg border border-purple-100 mb-20 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">¿Qué significa esto para ti?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Sin sobrecarga digestiva',
                desc: 'Evita acidez, náuseas o molestias gastrointestinales.'
              },
              {
                title: 'Absorción más eficiente',
                desc: 'Hasta un 90% de biodisponibilidad vs. 20-40% en cápsulas.'
              },
              {
                title: 'Acción sostenida',
                desc: 'Liberación gradual durante 8–12 horas, sin picos.'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-white/30 text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-bold text-purple-700 mb-3">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Comparison Table */}
        <div className="mb-20 max-w-5xl mx-auto">
          <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Comparativa: Parche vs. Cápsula</h3>
          <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-purple-100 to-blue-100">
                  <th className="border-b border-gray-300 px-4 py-4 text-left font-semibold text-gray-800">Característica</th>
                  <th className="border-b border-gray-300 px-4 py-4 text-center font-semibold text-purple-700">Parches 54e</th>
                  <th className="border-b border-gray-300 px-4 py-4 text-center font-semibold text-orange-600">Suplementos orales</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Ruta de absorción', 'A través de la piel', 'Tracto digestivo'],
                  ['Velocidad de acción', 'Moderada pero constante', 'Rápida o irregular'],
                  ['Riesgo gastrointestinal', 'Nulo', 'Puede provocar molestias'],
                  ['Eficiencia del ingrediente', 'Alta (sin pérdida gástrica)', 'Variable (por enzimas, ácidos)'],
                  ['Adherencia al tratamiento', 'Alta (uso cómodo)', 'Media (olvidos, rechazo)'],
                  ['Dosis controlada', 'Sí, liberación continua', 'Pico y caída rápida']
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border-b border-gray-200 px-4 py-3 font-medium text-gray-800">{row[0]}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-center text-green-700 font-medium">{row[1]}</td>
                    <td className="border-b border-gray-200 px-4 py-3 text-center text-red-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Closing Statement */}
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-8 md:p-10 rounded-2xl border border-gray-200 max-w-4xl mx-auto text-center shadow-md">
          <p className="text-lg leading-relaxed text-gray-700">
            Solo ingredientes funcionales, tecnología limpia y una visión consciente de lo que significa estar bien.
            <br />
            <span className="font-semibold text-purple-700 mt-2 block">
              Porque cuando respetamos la inteligencia del cuerpo, los resultados son naturales, profundos y duraderos.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}