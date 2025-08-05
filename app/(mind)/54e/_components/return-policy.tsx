'use client';

import { ShieldCheck, ArrowLeftRight, XCircle, MessageCircle, Truck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ReturnPolicy() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute top-10 left-0 w-48 h-48 bg-purple-200 rounded-full opacity-30 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-40 blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-6">
            <ShieldCheck className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-5 leading-tight">
            Tranquilidad en cada compra
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            En <span className="font-semibold text-purple-700">54e</span>, tu bienestar incluye la libertad de decidir. 
            Por eso, ofrecemos una política de devoluciones clara, justa y humana.
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Two-Column Layout: Image Grid + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Left: 2x2 Image Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-3 min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
            {[
              {
                src: '/mind/energia2.png',
                alt: 'Producto 54e sin abrir'
              },
              {
                src: '/mind/Omega3.png',
                alt: 'Embalaje original 54e'
              },
              {
                src: '/mind/suen.png',
                alt: 'Parche 54e en uso'
              },
              {
                src: '/mind/Omega1.png',
                alt: 'Caja de envío 54e'
              }
            ].map((image, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right: Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col justify-between min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] transition-transform duration-300 hover:scale-105">
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Creemos en la transparencia y la satisfacción plena. Si no estás 100% satisfecho con tu compra, 
                puedes solicitar una devolución dentro de los primeros <strong className="text-purple-700">7 días</strong> 
                desde la recepción del pedido.
              </p>

              {/* Conditions */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3 mb-4">
                  <ArrowLeftRight className="w-5 h-5 text-blue-500" />
                  Condiciones para devolución
                </h3>
                <ul className="space-y-3">
                  {[
                    'Producto sin abrir, sin usar y en su embalaje original',
                    'Etiquetas y envoltorios intactos',
                    'Plazo máximo: <strong>14 días</strong> tras la entrega',
                    'Gastos de devolución por tu cuenta, salvo defecto o error'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3 mb-4">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  Cómo solicitar una devolución
                </h3>
                <ol className="space-y-4">
                  <li className="flex gap-3 text-gray-600 text-sm">
                    <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">1</span>
                    <span>
                      Escríbenos por{' '}
                      <Link
                        href="https://wa.me/543517568043"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 font-medium"
                      >
                        WhatsApp
                      </Link>{' '}
                      para confirmar.
                    </span>
                  </li>
                  <li className="flex gap-3 text-gray-600 text-sm">
                    <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">2</span>
                    <span>Envía el producto en su embalaje original.</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 text-sm">
                    <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">3</span>
                    <span>Te reembolsamos al recibirlo.</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Closing */}
            <p className="text-gray-500 text-center mt-6 text-sm italic">
              Gracias por elegir <span className="font-semibold text-gray-700">54e</span>.<br />
              <span className="text-purple-700 font-medium">Tu evolución es nuestra prioridad.</span>
            </p>
          </div>
        </div>

        {/* Non-refundable Section (Independent) */}
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl max-w-5xl mx-auto transition-transform duration-300 hover:scale-105">
          <h4 className="text-base font-semibold text-red-800 flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5" />
            No reembolsable si:
          </h4>
          <ul className="list-disc list-inside text-red-700 text-sm space-y-2">
            <li>El producto ha sido abierto, usado o sin embalaje</li>
            <li>La devolución supera los 7 días sin justificación</li>
          </ul>
        </div>

        {/* Closing Visual */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-4">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            ¿Listo para devolver? <Link href="https://wa.me/543517568043" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 font-medium">Contáctanos ahora</Link> y hagamos esto simple.
          </p>
        </div>
      </div>

      {/* Subtle Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse {
          animation: pulse 4s infinite ease-in-out;
        }
        @media (max-width: 640px) {
          .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}