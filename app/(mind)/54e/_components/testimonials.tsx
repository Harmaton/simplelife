'use client';

import { useState } from 'react';

export default function TestimonialsAndFAQ() {
  // Updated FAQ Data (15 questions)
  const faqs = [
    {
      question: "¿Dónde debo colocar el parche?",
      answer: "Para obtener mejores resultados, aplicá el parche firmemente sobre piel limpia, seca y sin vello, preferentemente en zonas como el antebrazo, abdomen, muslo o espalda alta. Recordá cambiar la zona de aplicación diariamente."
    },
    {
      question: "¿Cuánto tiempo debo llevar el parche?",
      answer: "Cada parche está diseñado para usarse por un máximo de 12 horas continuas. El de sueño, por ejemplo, se recomienda aplicarlo una hora antes de acostarse y retirarlo al despertar."
    },
    {
      question: "¿Puedo llevar los parches durante más de 12 horas?",
      answer: "No. Después de 12 horas, la eficacia del parche disminuye y el adhesivo pierde su efectividad. Se recomienda retirarlo dentro de ese tiempo."
    },
    {
      question: "¿Hay efectos secundarios?",
      answer: "No se han reportado efectos secundarios comunes. Sin embargo, si presentás irritación en la piel o alguna reacción inesperada, retirá el parche y suspendé su uso. Consultá a un profesional si los síntomas persisten."
    },
    {
      question: "¿Los parches son reutilizables?",
      answer: "No. Todos los parches de 54e son de uso único. Una vez retirado, no deben volver a colocarse, ya que pierden efectividad y adherencia."
    },
    {
      question: "¿Cuánto tiempo debo usarlos para ver resultados?",
      answer: "Algunas personas notan beneficios desde la primera aplicación. Sin embargo, para lograr resultados sostenidos, se recomienda un uso diario por al menos 7 a 15 días, dependiendo del tipo de parche."
    },
    {
      question: "¿Puedo usar más de un tipo de parche al mismo tiempo?",
      answer: "Sí, podés usar dos parches diferentes al mismo tiempo (por ejemplo, uno de concentración y otro de omega 3), siempre que no estén ubicados en la misma zona del cuerpo. No uses dos parches del mismo tipo simultáneamente."
    },
    {
      question: "¿Los parches se pueden usar durante el ejercicio o la ducha?",
      answer: "No se recomienda ducharse ni realizar ejercicios intensos con el parche puesto, ya que el sudor o el calor pueden afectar su adherencia y eficacia."
    },
    {
      question: "¿Son seguros para personas con enfermedades crónicas o en tratamiento médico?",
      answer: "Si tenés alguna condición médica, tomás medicación o estás bajo tratamiento crónico, consultá con tu médico antes de usar los parches. Aunque son naturales y seguros, siempre es mejor actuar con precaución."
    },
    {
      question: "¿Pueden usarlo niños o adolescentes?",
      answer: "Los parches están recomendados para personas mayores de 12 años. No deben ser usados por niños sin supervisión médica."
    },
    {
      question: "¿Dónde y cómo debo almacenar los parches?",
      answer: "Guardalos en un lugar fresco, seco y alejado de la luz solar directa. Una vez abierto el sobre, usalo lo antes posible para mantener su efectividad."
    },
    {
      question: "¿Están registrados los parches?",
      answer: "Sí, todos nuestros parches están registrados por la FDA."
    },
    {
      question: "¿Los parches de enfoque y antiestrés pueden sustituir la medicación?",
      answer: "No. Los parches complementan las recomendaciones médicas y no deben usarse como sustitutos de tratamientos médicos."
    },
    {
      question: "¿El parche para dormir se usa durante todo el día?",
      answer: "No, el parche se usa solo durante las horas de sueño. Se coloca antes de acostarse y se retira al despertar."
    },
    {
      question: "¿Qué debo hacer si tengo una enfermedad?",
      answer: "Los parches no están diseñados para diagnosticar, tratar ni curar enfermedades. Si tienes una condición médica, consulta siempre con tu médico antes de usar cualquier tipo de parche."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Los parches me cambiaron la vida. Por fin duermo profundo sin pastillas.",
      author: "Martina",
      location: "Buenos Aires"
    },
    {
      quote: "Increíble para el estrés. Lo uso antes de meditar y noto la diferencia al instante.",
      author: "Lucas",
      location: "Mendoza"
    },
    {
      quote: "Como atleta, necesito recuperarme rápido. Victory Super Patch es mi aliado diario.",
      author: "Sofía",
      location: "Córdoba"
    },
    {
      quote: "Dejé de fumar gracias a Kick It. Fue la herramienta que necesitaba.",
      author: "Javier",
      location: "Rosario"
    },
    {
      quote: "Mi esposo era escéptico, pero ahora ambos los usamos. ¡Resultados reales!",
      author: "Valeria",
      location: "Mar del Plata"
    }
  ];

  // FAQ Toggle State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Split FAQs into two columns (7 left, 8 right)
  const leftFaqs = faqs.slice(0, 7);
  const rightFaqs = faqs.slice(7);

  return (
    <section className="py-20 bg-white">
      {/* FAQ Section - Top */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Preguntas Frecuentes
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
          {/* Left Column (7 questions) */}
          <div className="space-y-4">
            {leftFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left font-medium text-gray-800 bg-gray-50 hover:bg-purple-50 transition-colors focus:outline-none flex items-center justify-between"
                  aria-expanded={openFaq === index}
                >
                  <span className="flex-1 text-left">{faq.question}</span>
                  <span className="ml-4 text-2xl text-gray-600">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out text-gray-600 px-6 ${
                    openFaq === index
                      ? 'py-4 border-t border-gray-200'
                      : 'max-h-0 opacity-0 overflow-hidden p-0'
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (8 questions) */}
          <div className="space-y-4">
            {rightFaqs.map((faq, index) => {
              const globalIndex = index + 7; // To keep state unique
              return (
                <div
                  key={globalIndex}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(globalIndex)}
                    className="w-full px-6 py-4 text-left font-medium text-gray-800 bg-gray-50 hover:bg-purple-50 transition-colors focus:outline-none flex items-center justify-between"
                    aria-expanded={openFaq === globalIndex}
                  >
                    <span className="flex-1 text-left">{faq.question}</span>
                    <span className="ml-4 text-2xl text-gray-600">
                      {openFaq === globalIndex ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out text-gray-600 px-6 ${
                      openFaq === globalIndex
                        ? 'py-4 border-t border-gray-200'
                        : 'max-h-0 opacity-0 overflow-hidden p-0'
                    }`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section - Below */}
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Lo que dicen nuestros clientes
        </h3>

        <div className="relative h-80 lg:h-96 overflow-hidden">
          <div className="animate-marquee-up h-full flex flex-col justify-end">
            {/* Duplicate for seamless loop */}
            {[...testimonials, ...testimonials].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 p-6 mx-2 mb-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <blockquote className="text-gray-700 leading-relaxed mb-3">
                  <p className="text-lg md:text-xl font-medium italic text-gray-800">
                    "{item.quote}"
                  </p>
                </blockquote>
                <cite className="not-italic text-purple-700 font-semibold block">
                  – {item.author}
                </cite>
                <span className="text-sm text-gray-500">{item.location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for Vertical Marquee */}
      <style jsx>{`
        @keyframes marquee-up {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        .animate-marquee-up {
          animation: marquee-up 30s linear infinite;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .animate-marquee-up:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}