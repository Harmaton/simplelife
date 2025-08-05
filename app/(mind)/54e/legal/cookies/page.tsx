'use client';

import { Cookie, Mail } from 'lucide-react';

export default function Cookies() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute top-10 left-0 w-48 h-48 bg-purple-200 rounded-full opacity-30 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-40 blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-6">
            <Cookie className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-5 leading-tight">
            Política de Cookies
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            En <span className="font-semibold text-purple-700">54e</span>, utilizamos cookies para mejorar tu experiencia de navegación.
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-transform duration-300 hover:scale-105">
          <p className="text-gray-700 leading-relaxed mb-6">
            En 54e (en adelante, el &quot;Sitio Web&quot;), utilizamos cookies y tecnologías similares para garantizar el correcto funcionamiento de nuestro sitio, mejorar la experiencia del usuario y ofrecer contenidos personalizados. Esta Política de Cookies describe qué son las cookies, qué tipos de cookies utilizamos y cómo puedes gestionarlas. Al utilizar nuestro Sitio Web, aceptas el uso de cookies conforme a esta política.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">1. ¿Qué son las cookies?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Las cookies son pequeños archivos de texto que los sitios web envían y almacenan en el navegador del usuario para recordar información sobre su visita. Estas cookies permiten al sitio web recordar tus preferencias (como el idioma, el tamaño de fuente, etc.) y ayudarte a navegar de manera eficiente. Las cookies también pueden ser utilizadas para analizar el comportamiento de los usuarios en un sitio web.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Tipos de cookies utilizadas</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                En el Sitio Web utilizamos los siguientes tipos de cookies:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2">
                <li><strong>Cookies estrictamente necesarias:</strong> Estas cookies son esenciales para que el sitio web funcione correctamente. Permiten la navegación por el sitio y el uso de sus funcionalidades básicas, como el acceso a áreas seguras. Sin estas cookies, algunos servicios no podrían ser proporcionados.</li>
                <li><strong>Cookies de rendimiento:</strong> Recopilan información sobre cómo los usuarios interactúan con el Sitio Web, como las páginas que más visitan o si reciben mensajes de error. Estas cookies nos ayudan a mejorar el rendimiento y la funcionalidad del Sitio Web.</li>
                <li><strong>Cookies de funcionalidad:</strong> Permiten recordar las elecciones que haces en el sitio web (como tu nombre de usuario, idioma o región) para ofrecer una experiencia más personalizada. Estas cookies también pueden utilizarse para proporcionar ciertos servicios solicitados, como ver un video o comentar en un blog.</li>
                <li><strong>Cookies de personalización y publicidad:</strong> Estas cookies se utilizan para mostrar anuncios personalizados en función de tus intereses. También nos permiten medir la efectividad de nuestras campañas publicitarias. Algunas de estas cookies son colocadas por terceros, como redes publicitarias.</li>
                <li><strong>Cookies de análisis:</strong> Estas cookies permiten analizar el comportamiento de los usuarios en el Sitio Web y realizar un seguimiento del rendimiento del mismo. Utilizamos estas cookies para entender mejor cómo los usuarios interactúan con nuestro contenido y cómo mejorar su experiencia. En muchos casos, estas cookies son proporcionadas por terceros, como Google Analytics.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Cookies de terceros</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                El Sitio Web puede utilizar cookies de terceros para gestionar y mejorar los servicios ofrecidos. Estos terceros pueden incluir plataformas de redes sociales, proveedores de análisis o anunciantes externos. Las cookies de terceros están sujetas a las políticas de privacidad de dichos terceros, y no tenemos control directo sobre la configuración de estas cookies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Duración de las cookies</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Las cookies pueden clasificarse según su duración:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2">
                <li><strong>Cookies de sesión:</strong> Son cookies temporales que se eliminan automáticamente cuando cierras el navegador. Permiten reconocer al usuario mientras navega por una página o sitio web.</li>
                <li><strong>Cookies persistentes:</strong> Estas cookies permanecen en tu dispositivo durante un período de tiempo determinado o hasta que las elimines manualmente. Permiten que el sitio web recuerde tus preferencias o acciones para futuras visitas.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">5. Consentimiento para el uso de cookies</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Al acceder al Sitio Web, te proporcionamos información sobre el uso de cookies a través de un banner o aviso. Al continuar navegando o hacer clic en &quot;Aceptar&quot;, consientes el uso de cookies conforme a lo descrito en esta Política de Cookies. Tienes el derecho a retirar tu consentimiento en cualquier momento.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">6. Cómo gestionar y desactivar las cookies</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Puedes configurar tu navegador para aceptar, bloquear o eliminar cookies. Cada navegador es diferente, pero a continuación te proporcionamos enlaces a las instrucciones sobre cómo gestionar las cookies en los principales navegadores:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">Apple Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-0439-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">Microsoft Edge</a></li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed mt-2">
                Si decides bloquear o desactivar algunas o todas las cookies, es posible que la funcionalidad del Sitio Web se vea afectada y no puedas acceder a ciertas partes del mismo o disfrutar de una experiencia personalizada.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">7. Transferencias internacionales de datos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Algunas de las cookies que utilizamos pueden implicar la transferencia de datos personales a países fuera del Espacio Económico Europeo (EEE). En estos casos, nos aseguramos de que las transferencias se realicen con las garantías adecuadas, de acuerdo con la normativa de protección de datos, utilizando mecanismos como las Cláusulas Contractuales Tipo o la adhesión a marcos internacionales como el Privacy Shield.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">8. Actualizaciones de la política de cookies</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nos reservamos el derecho de modificar esta Política de Cookies en cualquier momento. Cualquier cambio será publicado en esta página y será efectivo desde el momento de su publicación. Te recomendamos que revises esta página de forma periódica para mantenerte informado sobre nuestro uso de cookies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">9. Contacto</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Si tienes alguna pregunta sobre esta Política de Cookies, o deseas ejercer tus derechos de protección de datos relacionados con las cookies, puedes contactarnos en <a href="mailto:simplelifesud@gmail.com" className="text-purple-600 hover:text-purple-800">simplelifesud@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Call-to-Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            ¿Tienes dudas sobre nuestra Política de Cookies? <a href="mailto:simplelifesud@gmail.com" className="text-purple-600 hover:text-purple-800 font-medium">Contáctanos</a> para más información.
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
      `}</style>
    </section>
  );
}