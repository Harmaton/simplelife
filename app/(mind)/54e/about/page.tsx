'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '../_components/nav';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Navigation */}
      <Nav totalCartItems={3} />

      {/* Main About Section */}
      <section
        id="about"
        className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-purple-50 to-blue-50"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full opacity-10 blur-3xl"></div>
        <div
          className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-transparent via-purple-100 to-transparent"
          style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}
        ></div>

        <div className={`max-w-5xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Hero-Style Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-orange-500 bg-clip-text text-transparent mb-6">
              SOBRE NOSOTROS
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              <strong>54e</strong> es más que un parche: es una filosofía de salud hecha piel. Somos la fusión entre ciencia, tecnología y conciencia, al servicio del bienestar físico, mental y emocional.
              <br />
              <span className="text-purple-700 font-medium">No vendemos parches. Activamos procesos de bienestar.</span>
            </p>
          </div>

          {/* Philosophy Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-10 md:p-12 border border-white/40 mb-20 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nuestra Filosofía</h3>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Creemos que la verdadera salud es un estado de armonía integral, no solo la ausencia de enfermedad. Apostamos por un modelo que une lo mejor de la ciencia moderna, los principios de la medicina natural y una visión holística de la vida.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              No se trata de “tapar síntomas”, sino de activar procesos internos de autorregulación y bienestar, respetando el cuerpo y su inteligencia biológica.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 italic">
              Cada parche es una herramienta, pero también un símbolo: una señal de que estás eligiendo cuidarte, sin dañar tu organismo, sin excesos, sin agresiones. <br />
              <span className="font-semibold text-purple-700">Desde la piel, hacia adentro.</span>
            </p>
          </div>

          {/* Split Section 1: "Simple Life" + Image */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <div className="lg:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Filosofía de vida simple"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl object-cover"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">Inspirados en &quot;Simple Life&quot;</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Nacimos con una visión clara: ofrecer soluciones de salud naturales, efectivas y accesibles, que respeten la integridad del cuerpo y acompañen a cada persona en su proceso de transformación.
              </p>
              <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-6 border-purple-400 rounded-r-xl shadow-sm">
                <p className="text-gray-700 italic">
                  Creemos que el bienestar no debe ser complicado. Lo simple es poderoso. Lo natural es efectivo.
                </p>
              </div>
            </div>
          </div>

          {/* Split Section 2: The Name "54e" + Image */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24">
            <div className="lg:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Desarrollo del nombre 54e"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl object-cover"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">El nombre <span className="text-purple-600">54e</span></h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>&quot;54&quot;</strong> en números romanos es <strong>LIV</strong>, que representa <em>transición, evolución y despertar</em>.
                </p>
                <p>
                  La <strong>&quot;e&quot;</strong> añade <em>energía, esencia y equilibrio</em>.
                </p>
                <p>
                  Y la palabra resultante — <span className="font-bold text-purple-700">LIVe</span> — es una invitación a vivir de forma más consciente, más natural, más plena.
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl border border-purple-200">
                <p className="text-xl font-semibold text-gray-800">
                  <strong className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">54e</strong>
                  <br />
                  <span className="text-purple-700">Eliges evolución.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Split Section 3: Innovation & Nature + Image */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <div className="lg:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Innovación y Naturaleza"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl object-cover"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">Naturaleza + Innovación</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Cada uno de nuestros parches es un puente entre la naturaleza y la innovación: tecnología transdérmica de última generación, formulaciones limpias y una experiencia de uso que respeta el ritmo único de cada cuerpo.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span><strong>Tecnología transdérmica</strong> para absorción eficaz</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Ingredientes limpios</strong> y sin residuos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span><strong>Diseño discreto</strong> y cómodo todo el día</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-md border border-purple-100 text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                VISIÓN
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ser referentes globales en salud holística de alta tecnología, acompañando a las personas en su proceso de autoconocimiento, transformación y evolución personal, sin comprometer la integridad de su cuerpo ni su esencia.
              </p>
            </div>
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

          {/* Our Values Section */}
          <div className="mt-16 mb-16">
            <h3 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Nuestros Valores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 text-purple-600">Calidad</h4>
                <p className="text-gray-700 leading-relaxed">
                  Nunca comprometemos la calidad de nuestros ingredientes o procesos de fabricación. Cada parche cumple con los más altos estándares de seguridad y eficacia.
                </p>
              </div>
              <div className={`text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 text-blue-600">Innovación</h4>
                <p className="text-gray-700 leading-relaxed">
                  Investigamos y desarrollamos continuamente nuevas formulaciones y tecnologías para mejorar la efectividad de nuestros productos.
                </p>
              </div>
              <div className={`text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 text-orange-600">Accesibilidad</h4>
                <p className="text-gray-700 leading-relaxed">
                  Creemos que todos merecen acceso a soluciones efectivas de salud. Nos esforzamos por hacer que nuestros productos sean asequibles y ampliamente disponibles.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Values Section */}
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100 max-w-4xl mx-auto mb-20">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Valores Fundamentales</h3>
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

          {/* Statistics Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className={`text-center p-6 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl border border-purple-200 shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '800ms' }}>
              <span className="block text-3xl font-bold text-purple-600 mb-2">5+</span>
              <span className="text-sm text-gray-600 font-medium">Años de Experiencia</span>
            </div>
            <div className={`text-center p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl border border-blue-200 shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '1000ms' }}>
              <span className="block text-3xl font-bold text-blue-600 mb-2">10k+</span>
              <span className="text-sm text-gray-600 font-medium">Clientes Satisfechos</span>
            </div>
            <div className={`text-center p-6 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl border border-orange-200 shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '1200ms' }}>
              <span className="block text-3xl font-bold text-orange-600 mb-2">5</span>
              <span className="text-sm text-gray-600 font-medium">Líneas de Productos</span>
            </div>
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
    </>
  );
}