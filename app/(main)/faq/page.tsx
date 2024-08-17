import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/landing-page/navbar';
// import { getFaqs } from '@/app/_actions/faq';

async function FAQ() {

const faqs = [
    {
        question: "¿Cómo es la modalidad de cursada?  ",
        answer: "En SimpleLife todos los cursos son en vivo pero tambien quedaran las clases grabadas por si no podes asistir o si queres rever algo. Nos adaptamos a tus necesidades.Todos nuestros cursos cuentan con profesores que te van a ayudar a resolver tus dudas teóricas "
    },
    {
        question: "¿Qué validez tienen los cursos y carreras? ",
        answer: "Nuestros Diplomados tienen validez universitaria. "
    },
    {
        question: "¿Hay pruebas o examenes? ",
        answer: "Sí hay evaluación constante en los Diplomados de Postgrado"
    },
    {
        question: "¿Necesito cumplir con asistencia?",
        answer: "Si, en las diplomaturas necesitas 85% de asistencia para obtener el certificado. En los cursos no es necesario la asistencia sincrónica. "
    },
    {
        question: "¿Cuáles son los medios de pago?",
        answer: "Puedes pagar con tarjeta de crédito o débito a través de Hotmart. El pago se realizará en la moneda local del país en el que estés. "
    }
]

  if (!faqs) {
   
    return  <div className='lg:h-[80vh] grid place-items-center mb-10 p-6 '>
    <Card className='max-w-7xl my-8 drop-shadow-lg mx-4 md:mx-auto  p-4'>
      <h1 className='text-center font-lato lg:text-5xl text-3xl my-8'>
      PREGUNTAS FRECUENTES
        <span className='align-text-bottom font-caveat'>PREGUNTAS FRECUENTES</span>
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className=' p-5 shadow-inner'>
          <Image src='/faqimage.svg' alt='FAQ' width={500} height={500} className=' bg-cover  p-2' />
        </div>
        <div className=''>
        Aún no hay preguntas frecuentes
        </div>
      </div>
    </Card>
  </div>
  }

  return (
    <>
    <Navbar />
    <div className='lg:h-[80vh] grid place-items-center mb-10 '>
      <Card className='max-w-7xl my-8 drop-shadow-lg mx-4 md:mx-auto p-4 font-serif'>
        <h1 className='text-center font-lato lg:text-5xl text-3xl my-8'>
        PREGUNTAS FRECUENTES

        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-white'>
          <div className=' p-5 shadow-inner'>
            <Image src='/faqimage.svg' alt='FAQ' width={500} height={500} className=' bg-cover  p-2' />
          </div>
          <div className=''>
            <Accordion type='single' collapsible className='w-full rounded-xl'>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Card>
    </div>
    </>
  );
}

export default FAQ;
