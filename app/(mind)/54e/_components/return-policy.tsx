'use client';

import { ShieldCheck, ArrowLeftRight, XCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ReturnPolicy() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-25 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-blue-100 rounded-full opacity-40 blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-5">
            <ShieldCheck className="w-7 h-7 text-purple-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-5 leading-tight">
            Tranquilidad en cada compra
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            En <span className="font-semibold">54e</span>, tu bienestar incluye la libertad de decidir. 
            Por eso, ofrecemos una política de devoluciones clara y humana.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <p className="text-gray-700 leading-relaxed mb-6">
            Creemos en la transparencia y la satisfacción plena. Si no estás 100% satisfecho con tu compra, 
            puedes solicitar una devolución dentro de los primeros <strong className="text-purple-700">7 días</strong> 
            desde la recepción del pedido.
          </p>

          {/* Conditions */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-3 mb-5">
              <ArrowLeftRight className="w-6 h-6 text-blue-500" />
              Condiciones para devolución
            </h3>
            <ul className="space-y-3 ml-2">
              {[
                "El producto debe estar sin abrir, sin usar y en su embalaje original.",
                "Todas las etiquetas y envoltorios deben estar intactos.",
                "El plazo máximo para devolver es de <strong>14 días</strong> desde la entrega.",
                "Los gastos de envío de devolución son responsabilidad del cliente, salvo que el producto esté defectuoso o sea incorrecto."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-3 mb-5">
              <MessageCircle className="w-6 h-6 text-green-500" />
              Cómo solicitar una devolución
            </h3>
            <ol className="space-y-4 ml-2">
              <li className="flex gap-4 text-gray-600">
                <span className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  1
                </span>
                <span>
                  Contacta con nuestro equipo de Atención al Cliente por{' '}
                  <Link
                    href="https://wa.me/543517568043"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    WhatsApp
                  </Link>{' '}
                  para confirmar la elegibilidad.
                </span>
              </li>
              <li className="flex gap-4 text-gray-600">
                <span className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  2
                </span>
                <span>Envía el producto en su embalaje original.</span>
              </li>
              <li className="flex gap-4 text-gray-600">
                <span className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  3
                </span>
                <span>Una vez recibido, procesaremos tu reembolso en el método de pago original.</span>
              </li>
            </ol>
          </div>

          {/* Non-refundable */}
          <div className="mt-10 p-5 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="text-lg font-semibold text-red-800 flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5" />
              No reembolsable si:
            </h4>
            <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
              <li>El producto ha sido abierto, usado o sin embalaje original.</li>
              <li>La devolución se realiza después de 7 días sin justificación (daño o error).</li>
            </ul>
          </div>

          {/* Closing */}
          <p className="text-gray-500 text-center mt-8 italic">
            Gracias por elegir <span className="font-semibold text-gray-700">54e</span>.<br />
            Tu evolución es nuestra prioridad.
          </p>
        </div>
      </div>
    </section>
  );
}