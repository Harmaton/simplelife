import React from "react";
import {
  ShieldCheck,
  Speaker,
  StickyNote,
  Tv,
  Users,
  Video,
} from "lucide-react";
import FeatureCard from "./feature-card";
  // Assuming FeatureCard is in the same directory

const featuresData = [
  {
    icon: Tv,
    iconColor: "bg-[#8a4dff]",
    title: "Cursos en línea en vivo",
    description: "Experimente el aprendizaje en tiempo real con nuestros cursos en línea en vivo.",
  },
  {
    icon: ShieldCheck,
    iconColor: "bg-[#34d399]",
    title: "Certificación de diploma",
    description: "Obtenga su certificación de diploma fácilmente.",
  },
  {
    icon: Users,
    iconColor: "bg-pink-500",
    title: "Interacción en tiempo real con profesionales",
    description: "Interacción directa con expertos directamente desde simplelife",
  },
  {
    icon: Video,
    iconColor: "bg-red-500",
    title: "Clases grabadas para consultar cuando quieras",
    description: "Disfrute de la comodidad de las clases grabadas, que le brindan flexibilidad para volver a visitar las lecciones y estudiar a su propio ritmo.",
  },
  {
    icon: StickyNote,
    iconColor: "bg-orange-500",
    title: "Profesores expertos",
    description: "Benefíciese de la experiencia de nuestro equipo dedicado de educadores experimentados que están comprometidos a brindar orientación integral.",
  },
  {
    icon: Speaker,
    iconColor: "bg-yellow-500",
    title: "Interacción efectiva",
    description: "Diálogos transformadores: interactúe con nuestra experiencia para lograr un impacto que altere la vida",
  },
];

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {featuresData.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          iconColor={feature.iconColor}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}