import { Testimonial } from "@/types";
import Marquee from "react-fast-marquee";
import TestimonialCard from "./testimonial-card";

export const dummyTestimonials: Testimonial[] = [
    {
        text: 'Superó mis expectativas con su contenido claro y actividades prácticas que me ayudaron a aplicar lo aprendido de manera efectiva.',
        imageUrl: '/judge.svg',
        name: 'María González',
        role: 'Participante de la Certificación',
    },
    {
        text: 'Me encantó la metodología; aprecié mucho el contenido claro y los ejemplos prácticos que me ayudaron a aprender en profundidad.',
        imageUrl: '/judge.svg',
        name: 'Luis Martínez',
        role: 'Asistente del Curso',
    },
    {
        text: 'Me pareció excelente la metodología de aprendizaje, especialmente el equilibrio entre teoría y ejercicios prácticos.',
        imageUrl: '/testimonial-3.svg',
        name: 'Ana López',
        role: 'Participante de Aprendizaje',
    },
    {
        text: 'Siento que la certificación cumplió su objetivo, ayudándome a mejorar mis habilidades, aunque me hubiera gustado un poco más de profundidad.',
        imageUrl: '/testimonial-3.svg',
        name: 'Carlos Herrera',
        role: 'Desarrollo de Habilidades',
    },
    {
        text: 'Aprecié mucho el curso bien estructurado, con instructores expertos y recursos de alta calidad.',
        imageUrl: '/testimonial-2.svg',
        name: 'Sofía Ramírez',
        role: 'Participante del Curso',
    },
  ];
  
const TestimonialSection = () => {
    return (
        <section className="p-4 mt-4">
            <h2 className="text-center font-extrabold mb-4 lg:text-4xl sm:text-2xl">Historias de éxito</h2>
            <Marquee pauseOnHover >
            {dummyTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
            </Marquee>
        </section>
    )
}

export default TestimonialSection;