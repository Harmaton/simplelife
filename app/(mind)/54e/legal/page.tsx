'use client';

import { FileText, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Legal() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute top-10 left-0 w-48 h-48 bg-purple-200 rounded-full opacity-30 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-40 blur-3xl -z-10 animate-pulse"></div>
      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mb-6">
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-500 bg-clip-text text-transparent mb-5 leading-tight">
            Aviso Legal
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conoce las condiciones que regulan el uso del sitio web de <span className="font-semibold text-purple-700">54e</span>, propiedad de Simple Life.
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
              <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Objeto</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Las presentes condiciones regulan el uso del Sitio Web por parte de los usuarios que acceden al mismo. El acceso a la información, contenidos, productos y servicios disponibles en el Sitio Web está condicionado a la aceptación de este Aviso Legal.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Condiciones de uso del Sitio Web</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                El acceso al Sitio Web es libre y gratuito, no obstante, algunos servicios pueden estar sujetos a condiciones particulares, suscripciones o pagos que serán debidamente informados antes de su contratación.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Los usuarios se comprometen a hacer un uso adecuado del Sitio Web y de los servicios ofrecidos en conformidad con la ley, la moral, el orden público y las presentes condiciones. Queda prohibido:
              </p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 mt-2">
                <li>Utilizar el Sitio Web para realizar actividades ilícitas, fraudulentas, o contrarias a la buena fe.</li>
                <li>Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico, de apología del terrorismo o que atenten contra los derechos humanos.</li>
                <li>Provocar daños en los sistemas físicos o lógicos del Titular, de sus proveedores o de terceros.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Propiedad intelectual e industrial</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Todo el contenido del Sitio Web, incluidos textos, imágenes, gráficos, logotipos, iconos, software, y demás materiales, está protegido por derechos de propiedad intelectual e industrial que son de titularidad exclusiva de Simple Life o de terceros que han autorizado su uso en el Sitio Web. El usuario se compromete a respetar los derechos de propiedad intelectual e industrial del Titular. Queda estrictamente prohibida la reproducción, distribución, transformación o explotación de los contenidos sin el consentimiento expreso del Titular.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Responsabilidad limitada</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                El Titular no garantiza la disponibilidad, acceso continuo, ni la correcta visualización, descarga o utilidad de los elementos e información contenida en el Sitio Web, que pueden verse impedidos, dificultados o interrumpidos por factores o circunstancias fuera de su control. El Titular no se hace responsable de los daños y perjuicios que pudieran derivarse de interferencias, interrupciones o desconexiones del sistema, virus informáticos, fallos o averías de hardware o software no imputables al Titular. El Titular no será responsable de los contenidos, productos o servicios que puedan ser visualizados o adquiridos en sitios web de terceros accesibles a través de enlaces en el Sitio Web.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">5. Protección de datos personales</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                En cumplimiento de lo dispuesto en el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD), informamos a los usuarios que los datos personales recogidos a través de los formularios de contacto y de registro del Sitio Web serán tratados conforme a la Política de Privacidad, disponible en el mismo. Los usuarios podrán ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de los datos enviando una solicitud escrita a <a href="mailto:info@comprarsuperparches.com" className="text-purple-600 hover:text-purple-800">info@comprarsuperparches.com</a>, adjuntando copia de su documento de identidad.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">6. Uso de cookies</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                El Sitio Web utiliza cookies propias y de terceros para optimizar la experiencia del usuario y analizar la navegación. Para más detalles sobre el uso de cookies, por favor consulta nuestra <Link href="/cookies" className="text-purple-600 hover:text-purple-800">Política de Cookies</Link>.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">7. Enlaces a terceros</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                El Sitio Web puede contener enlaces a sitios web de terceros. El acceso a estos sitios web externos se realiza bajo la responsabilidad del usuario y el Titular no se hace responsable del contenido o servicios ofrecidos en los mismos.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">8. Comercio electrónico y contratación online</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                En caso de que a través del Sitio Web se ofrezcan productos o servicios sujetos a contratación online, las condiciones particulares de dichos productos o servicios estarán debidamente detalladas y serán accesibles antes de realizar cualquier compra. Todos los pagos realizados a través del Sitio Web serán gestionados mediante sistemas de pago seguros que garanticen la protección de los datos financieros del usuario.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">9. Responsabilidad sobre opiniones de usuarios</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                El Sitio Web puede permitir a los usuarios publicar opiniones y comentarios. El Titular no se hace responsable de las opiniones vertidas por los usuarios y se reserva el derecho de eliminar aquellos comentarios que vulneren la ley, los derechos de terceros, o que contengan contenido ofensivo o inadecuado.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">10. Jurisdicción y ley aplicable</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                El presente Aviso Legal se rige por la legislación española. En caso de controversia en la interpretación o aplicación de estas condiciones, las partes se someterán a la jurisdicción de los Juzgados y Tribunales locales, salvo que la normativa aplicable disponga lo contrario.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">11. Modificaciones del Aviso Legal</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                El Titular se reserva el derecho a modificar, en cualquier momento y sin previo aviso, la presentación, configuración y contenido del Sitio Web, así como el presente Aviso Legal. Los usuarios deberán consultar periódicamente este documento para conocer las actualizaciones.
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
            ¿Tienes preguntas sobre nuestro Aviso Legal? <a href="mailto:simplelifesud@gmail.com" className="text-purple-600 hover:text-purple-800 font-medium">Contáctanos</a> para más información.
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