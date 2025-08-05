'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Send } from 'lucide-react';

export default function Contact() {
  const [contactName, setContactName] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'simplelifesud@gmail.com',
          from: contactEmail,
          subject: contactSubject,
          text: `Mensaje de ${contactName}:\n\n${contactMessage}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setContactName('');
        setContactSubject('');
        setContactEmail('');
        setContactMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute top-10 left-0 w-48 h-48 bg-purple-200 rounded-full opacity-30 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-40 blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-6">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-5 leading-tight">
            Contáctanos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ¿Tienes preguntas? En <span className="font-semibold text-purple-700">54e</span>, estamos aquí para ayudarte a evolucionar.
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Two-Column Layout: Image Grid + Contact Form */}
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

          {/* Right: Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col justify-between min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] transition-transform duration-300 hover:scale-105">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center gap-3">
                <Send className="w-6 h-6 text-blue-500" />
                Envíanos tu mensaje
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre y Apellido
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactSubject" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto
                  </label>
                  <input
                    id="contactSubject"
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="¿Sobre qué es tu mensaje?"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="contactMessage"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold transition-all shadow hover:shadow-lg transform hover:-translate-y-0.5 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-orange-600 hover:to-red-600'
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'ENVIAR MENSAJE'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-600 text-sm text-center mt-3">
                    ¡Mensaje enviado! Nos pondremos en contacto pronto.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm text-center mt-3">
                    Error al enviar el mensaje. Por favor, intenta de nuevo.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl max-w-5xl mx-auto transition-transform duration-300 hover:scale-105">
          <h4 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-3 justify-center">
            <Phone className="w-5 h-5 text-purple-600" />
            Otras formas de contactarnos
          </h4>
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>
              <strong>Llámanos:</strong> +54 351 756 8043
            </p>
            <p>
              <strong>Escíbenos:</strong> simplelifesud@gmail.com
            </p>
            <p>
              <Link
                href="https://wa.me/543517568043"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-.816-.911-1.115-.241-.297-.492-.288-.669-.288-.174-.001-.372-.025-.571-.075-.197-.05-.892-.274-1.341-.421-.446-.148-.669-.397-.669-.596 0-.198.099-.496.297-.694.198-.198.496-.347.892-.446.396-.099 1.785-.149 2.429.298.644.547 1.114 1.785 1.263 2.182.149.397.149.694.025.892-.124.198-.595.347-.992.496-.396.149-.794.297-.892.595-.099.297-.099.645.099.892.198.247.892.842 1.934 1.537.996.664 1.537.993 1.835 1.091.297.099.496.099.694-.025.198-.124.892-.595 1.138-.843.248-.247.446-.148.645-.049.198.099.347.645.446.943.099.297.099.496-.05.645z" />
                  <path d="M3.053 4.436A11.94 11.94 0 0 0 1 12c0 6.627 5.373 12 12 12 2.663 0 5.126-.867 7.064-2.326l-1.414-1.414c-1.585 1.138-3.47 1.74-5.65 1.74-5.523 0-10-4.477-10-10 0-2.18.702-4.065 1.84-5.65L3.053 4.436zM12 22c-2.18 0-4.065-.702-5.65-1.84L4.436 21.947l1.414 1.414A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-2.663-.867-5.126-2.326-7.064l-1.414 1.414C21.298 7.935 22 9.82 22 12c0 5.523-4.477 10-10 10z" />
                </svg>
                Contáctanos por WhatsApp
              </Link>
            </p>
          </div>
        </div>

        {/* Closing Visual */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-4">
            <Send className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Tu mensaje importa. <span className="text-purple-700 font-medium">Conéctate con 54e</span> y hagamos que tu bienestar evolucione.
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