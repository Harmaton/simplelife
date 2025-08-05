'use client';

import { Shield, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Privacy() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute top-10 left-0 w-48 h-48 bg-purple-200 rounded-full opacity-30 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-40 blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-5 leading-tight">
            Política de Privacidad
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            En <span className="font-semibold text-purple-700">54e</span>, protegemos tus datos personales con las mejores prácticas de seguridad.
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-transform duration-300 hover:scale-105">
          <p className="text-gray-700 leading-relaxed mb-6">
            El presente Aviso Legal regula el acceso, navegación y uso del sitio web de 54e (en adelante, el &quot;Sitio Web&quot;), que es propiedad de Simple Life (en adelante, &quot;el Titular&quot;), con domicilio en Marcelo T de Alvear 628, Córdoba – Argentina, y número de identificación fiscal 27962441365. El correo electrónico de contacto es <a href="mailto:simplelifesud@gmail.com" className="text-purple-600 hover:text-purple-800">simplelifesud@gmail.com</a>.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Información que recopilamos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                En el Sitio Web recopilamos los siguientes tipos de información personal:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2">
                <li>Datos de identificación: Nombre, apellidos, dirección, teléfono y correo electrónico que nos proporcionas a través de formularios de contacto o registro.</li>
                <li>Datos de navegación: Dirección IP, tipo de navegador, idioma, ubicación geográfica, y otros datos técnicos que obtenemos automáticamente cuando interactúas con nuestro sitio.</li>
                <li>Datos financieros: En caso de realizar compras o pagos a través del Sitio Web, los datos de tu tarjeta de crédito o débito serán gestionados de manera segura por Redsys, sin que la tienda acceda a esta información. Si eliges PayPal, este procesará tus datos de pago directamente y de forma protegida. En el caso de transferencias bancarias, no recopilamos información adicional de pago, únicamente los datos necesarios para confirmar la recepción de la transferencia.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Finalidades del tratamiento de datos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Los datos personales que recopilamos en el Sitio Web se utilizan con los siguientes fines:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2">
                <li>Prestación de servicios: Gestionar tu cuenta, responder a tus solicitudes y facilitar la compra de nuestros productos o servicios.</li>
                <li>Comunicación: Enviar notificaciones, actualizaciones y comunicaciones de interés relacionadas con nuestros productos o servicios, en base a tu consentimiento.</li>
                <li>Mejora del Sitio Web: Analizar el uso del sitio para mejorar la experiencia de usuario y nuestros servicios.</li>
                <li>Marketing: Enviar publicidad y promociones, siempre con tu consentimiento previo.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Legitimación del tratamiento</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                El tratamiento de tus datos personales está basado en los siguientes fundamentos jurídicos:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2">
                <li>Ejecución de un contrato: Para gestionar las relaciones contractuales, como la compra de productos o la prestación de servicios.</li>
                <li>Consentimiento del usuario: Cuando has aceptado expresamente recibir comunicaciones comerciales o al aceptar esta política de privacidad en formularios de contacto o registro.</li>
                <li>Interés legítimo: Para mejorar la experiencia del usuario, el contenido del sitio y la seguridad de la navegación.</li>
                <li>Cumplimiento de obligaciones legales: Cuando sea necesario cumplir con obligaciones legales aplicables.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Conservación de los datos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Conservaremos tus datos personales únicamente durante el tiempo necesario para cumplir con las finalidades descritas en esta política, o mientras exista una obligación legal de hacerlo. Posteriormente, los datos serán eliminados de manera segura.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">5. Cesión de datos a terceros</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                No compartimos tus datos personales con terceros, salvo en los siguientes casos:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2">
                <li>Proveedores de servicios: Terceras partes que nos prestan servicios auxiliares (por ejemplo, plataformas de pago, servicios de alojamiento web, servicios de envío), con quienes hemos firmado contratos de tratamiento de datos.</li>
                <li>Obligaciones legales: Cuando sea necesario para cumplir con una obligación legal, como en caso de requerimiento judicial o de la administración pública.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">6. Derechos de los usuarios</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Como usuario, tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2">
                <li>Acceder: Solicitar información sobre los datos personales que tratamos.</li>
                <li>Rectificar: Corregir datos inexactos o incompletos.</li>
                <li>Suprimir: Solicitar la eliminación de tus datos personales cuando ya no sean necesarios.</li>
                <li>Oponerte: Rechazar el tratamiento de tus datos personales para fines específicos, como el marketing directo.</li>
                <li>Limitación del tratamiento: Restringir el uso de tus datos personales en determinadas circunstancias.</li>
                <li>Portabilidad: Obtener una copia de tus datos personales en un formato estructurado y legible por máquina, o solicitar la transferencia a un tercero.</li>
                <li>Para ejercer estos derechos, puedes enviar una solicitud a <a href="mailto:simplelifesud@gmail.com" className="text-purple-600 hover:text-purple-800">simplelifesud@gmail.com</a>, adjuntando una copia de tu documento de identidad.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">7. Seguridad de los datos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nos comprometemos a proteger la información personal de los usuarios con las medidas de seguridad técnicas y organizativas apropiadas para evitar su pérdida, alteración, uso indebido o acceso no autorizado. No obstante, debes ser consciente de que ninguna medida de seguridad en Internet es completamente invulnerable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">8. Uso de cookies</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                El Sitio Web utiliza cookies para recopilar información sobre la navegación de los usuarios. Puedes consultar todos los detalles sobre el uso de cookies en nuestra <Link href="/cookies" className="text-purple-600 hover:text-purple-800">Política de Cookies</Link>.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">9. Enlaces a terceros</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nuestro Sitio Web puede contener enlaces a sitios web de terceros. No nos hacemos responsables de las políticas de privacidad o el contenido de esos sitios, y te recomendamos revisar sus términos de uso y políticas de privacidad antes de proporcionarles cualquier información personal.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">10. Modificaciones de la Política de Privacidad</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta misma página y te será notificado si implica un cambio significativo en la manera en que tratamos tus datos.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">11. Contacto</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Si tienes alguna pregunta o inquietud sobre esta Política de Privacidad o sobre cómo tratamos tus datos personales, puedes contactarnos en <a href="mailto:simplelifesud@gmail.com" className="text-purple-600 hover:text-purple-800">simplelifesud@gmail.com</a>.
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
            ¿Tienes dudas sobre nuestra Política de Privacidad? <a href="mailto:simplelifesud@gmail.com" className="text-purple-600 hover:text-purple-800 font-medium">Contáctanos</a> para más información.
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