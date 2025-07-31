'use client';

import { useEffect, useState } from 'react';

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-white via-purple-25 to-blue-25"
    >
      {/* Soft background elements */}
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

        {/* Core Message */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-white/40 mb-16 max-w-5xl mx-auto text-center">
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            Tu cuerpo no necesita más pastillas. <br />
            <span className="font-semibold text-purple-700">Necesita más inteligencia.</span>
          </p>
          <p className="text-gray-600 leading-relaxed">
            La piel no solo protege. También respira, se comunica y absorbe. <br />
            Nuestros parches 54e utilizan una avanzada nanotecnología transdérmica que permite que los ingredientes activos atraviesen las capas externas de la piel y lleguen al torrente sanguíneo de manera progresiva, segura y eficiente.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-10 rounded-2xl shadow-md border border-purple-100 mb-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">¿Qué significa esto?</h3>
          <ul className="space-y-4 text-gray-700 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></span>
              <span>Los principios activos entran directamente en tu sistema, sin pasar por el estómago, el hígado o los jugos gástricos.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></span>
              <span>Se reducen las pérdidas por digestión y se eliminan efectos secundarios comunes (acidez, reflujo, náuseas).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></span>
              <span>La absorción es más constante y sostenida — sin picos ni caídas bruscas.</span>
            </li>
          </ul>
        </div>

        {/* What is Transdermal Nanotechnology */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">¿Qué es la nanotecnología transdérmica?</h3>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-5xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Es un sistema de liberación controlada de sustancias bioactivas a través de la piel. A diferencia de cápsulas o líquidos, los parches entregan directamente las moléculas donde más se necesitan: tu sangre, tus células, tu energía.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nuestros parches están diseñados con material médico tipo 3M, que garantiza adherencia segura y permeabilidad eficaz durante varias horas. Cada parche se activa con el calor natural de tu cuerpo, liberando los principios activos gradualmente.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Aunque no usamos nanopartículas industriales, aplicamos los principios de <strong>biodisponibilidad inteligente</strong>: cada molécula está pensada para actuar con precisión, efectividad y seguridad.
            </p>
            <p className="text-gray-600 italic mt-4">
              Tecnología limpia, mínima y efectiva. Como debe ser.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Comparativa: Parche vs. Cápsula</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-purple-100 to-blue-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Característica</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-purple-700">Parches 54e</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-orange-600">Suplementos orales</th>
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
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">{row[0]}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-green-700 font-medium">{row[1]}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-red-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How It Works Step-by-Step */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">¿Cómo actúa el parche en tu cuerpo?</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              'Aplicación',
              'Liberación gradual',
              'Absorción directa',
              'Acción sostenida',
              'Sin rebote'
            ].map((title, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">
                  {i + 1}
                </div>
                <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-center mt-6 text-sm">
            Resultado: bienestar sin esfuerzo. Sin agredir tu cuerpo. Sin químicos innecesarios.
          </p>
        </div>

        {/* Closing Statement */}
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-10 rounded-2xl border border-gray-200 max-w-4xl mx-auto text-center">
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