import { Testimonial } from "@/types";
import Marquee from "react-fast-marquee";
import TestimonialCard from "./testimonial-card";

export const dummyTestimonials: Testimonial[] = [
    {
        text: "El curso cumplió con lo prometido, aunque sentí que faltó algo de interacción. Aun así, adquirí conocimientos valiosos.",
        imageUrl: "/judge.svg",
        name: "Javier Torres",
        role: "Estudiante del Curso",
      },
      {
        text: "La certificación me pareció excelente, dinámica y enfocada en el desarrollo de habilidades.",
        imageUrl: "/judge.svg",
        name: "Fernanda Cruz",
        role: "Graduada de la Certificación",
      },
      {
        text: "Tuve una buena experiencia general; algunas partes me parecieron básicas, pero útiles para reforzar conocimientos previos.",
        imageUrl: "/testimonial-3.svg",
        name: "Alejandro Castillo",
        role: "Participante de Aprendizaje",
      },
      {
        text: "Aprecié mucho la flexibilidad del curso; el contenido me pareció interesante y bien estructurado.",
        imageUrl: "/testimonial-3.svg",
        name: "Camila Vargas",
        role: "Aprendiz Flexible",
      },
      {
        text: "Quedé en general satisfecho; el curso aportó mucho valor al aprendizaje, aunque esperaba más innovación en algunos módulos.",
        imageUrl: "/testimonial-2.svg",
        name: "Ricardo Morales",
        role: "Participante del Curso",
      },
];

const TestimonialSectionTwo = () => {
  return (
    <section className="p-4">
      <Marquee pauseOnHover direction="right">
        {dummyTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </Marquee>
    </section>
  );
};

export default TestimonialSectionTwo;
