'use client';

import { useState } from 'react';

export default function Contact() {
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeFirstName, setSubscribeFirstName] = useState('');
  const [subscribeLastName, setSubscribeLastName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`¡Gracias, ${subscribeFirstName}! Te has suscrito con éxito.`);
    setSubscribeFirstName('');
    setSubscribeLastName('');
    setSubscribeEmail('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.');
    // Add your API call here
    setContactName('');
    setContactSubject('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Contáctanos</h2>
          <p className="text-lg text-gray-600">¿Tienes preguntas? Estamos aquí para ayudarte.</p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Subscribe Section */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              SUSCRÍBETE PARA DESCUENTOS Y REGALOS
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={subscribeFirstName}
                    onChange={(e) => setSubscribeFirstName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={subscribeLastName}
                    onChange={(e) => setSubscribeLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow hover:shadow-lg transform hover:-translate-y-0.5"
              >
                SUSCRIBIRSE
              </button>
            </form>
          </div>

          {/* Contact Us Form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              CONTÁCTANOS
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
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow hover:shadow-lg transform hover:-translate-y-0.5"
              >
                ENVIAR MENSAJE
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-8 text-center text-sm text-gray-600 space-y-2">
              <p>
                <strong>Llámanos:</strong> +54 351 756 8043
              </p>
              <p>
                <strong>Escíbenos:</strong> simplelifesud@gmail.com
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}