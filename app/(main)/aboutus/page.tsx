"use client";

import React from "react";
import Navbar from "@/components/landing-page/navbar";
import { Footer } from "@/components/landing-page/footer";
import AboutHeader from "./header";
import { TracingBeam } from "./tracing-beam";

export default function Page() {
  return (
    <>
    <svg
  className="absolute inset-0 z-0 h-full w-full stroke-gray-200 "
  style={{ maskImage: 'radial-gradient(100% 100% at center, white, transparent)' }}
  aria-hidden="true"
>
              <defs>
                <pattern
                  id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                  width={150}
                  height={150}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
              />
            </svg>
    <Navbar />
    <AboutHeader />
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative font-serif">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className=" text-violet-500 text-2xl w-fit py-1 mb-4">
              {item.badge}
            </h2>
            <div className=" prose prose-sm dark:prose-invert">
              <h3 className="text-lg">{item.description}</h3>
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
    </>
  );
}

const dummyContent = [
  {
    title: "QUIENES SOMOS NOSOTROS",
    description: (
      <>
        <p>
        Somos una fundación dedicada a promover la salud mental de todas las personas, independientemente de su condición social, económica o cultural. Queremos formar y cuidar la mente, las emociones y el espíritu como los pilares fundamentales para el bienestar integral del ser humano. Todos tenemos derecho a vivir una vida plena y saludable.
        </p>
      </>
    ),
    badge: "QUIENES SOMOS NOSOTROS",
  },

  {
    title: "Nuestra misión en la comunidad y más allá",
    description: (
      <>
        <p >
        Generar un impacto positivo en la sociedad a través de tres áreas fundamentales:
        <ul className='space-y-3 m-2 '>
                <li>Investigar y desarrollar nuevas soluciones innovadoras para el cuidado del bienestar integral.</li>
                <li>Formar y capacitar a profesionales de la salud mental.</li>
                <li> la inclusión y equidad de oportunidades, brindando apoyo y herramientas efectivas.</li>
            </ul>
        </p>
        
      </>
    ),
    badge: "NUESTRA MISIÓN",
    
  },
  {
    title: "Nuestra visión es clara",
    description: (
      <>
       <ul className='space-y-3 m-2 '>
                <li>	Alegría: creamos un ambiente positivo y estimulante donde las personas se sienten acogidas y motivadas para explorar y crecer.</li>
                <li>Respeto: construiremos relaciones sólidas y significativas basadas en la empatía, la comprensión y el apoyo para todos.</li>
                <li>Apertura: valoramos la diversidad de pensamientos, experiencias y perspectivas. Cada voz será escuchada, respetada y libre de expresarse.</li>
                <li>Innovación: buscamos constantemente nuevas ideas, métodos y soluciones que nos permitan mejorar, expandir nuestros servicios y responder de manera efectiva a los desafíos emergentes en el campo de la salud mental.</li>
                <li>Compromiso: estamos comprometidos con la excelencia y la integridad en todo lo que hacemos</li>
                <li>Colaboración: fomentamos la cooperación y el intercambio de conocimientos y habilidades, con el objetivo de enriquecer nuestras perspectivas y fortalecer nuestro impacto.</li>
                </ul>
 
      </>
    ),
    badge: "VALORES",
   
  },
  {
    title: "En nuestra PLATAFORMA VIRTUAL ...",
    description: (
      <>
       <p>En nuestra PLATAFORMA VIRTUAL ofrecemos una variedad de servicios de salud mental, entre los que se incluyen terapia psicológica, coaching, terapias sistémicas y holísticas, consultas nutricionales, fonoaudiología, psicopedagogía y más. Todos nuestros servicios están diseñados para satisfacer las necesidades individuales de cada persona. </p>
 
      </>
    ),
    badge: "SERVICIO",
   
  },
  {
    title: "Creemos que todos...",
    description: (
      <>
       <p>Creemos que todos podemos ser agentes de cambio en la promoción de la salud mental. Por eso, nos comprometemos a trabajar con todos los sectores de la sociedad para crear un mundo más saludable y equitativo. </p>
      </>
    ),
    badge: "COMPROMISO",
   
  },
];
