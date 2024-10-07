import React from "react";
import { UserPlus, UserCog, BookPlus, Presentation } from "lucide-react";

export default function How() {
  const steps = [
    {
      icon: UserPlus,
      color: "bg-blue-100",
      title: "Aplicar",
      description: "Envíe su solicitud para convertirse en instructor",
    },
    {
      icon: UserCog,
      color: "bg-green-100",
      title: "Configurar y editar perfil",
      description: "Crea tu perfil y muestra tu experiencia",
    },
    {
      icon: BookPlus,
      color: "bg-yellow-100",
      title: "Crear nuevo curso",
      description: "Diseña y desarrolla el contenido de tu curso",
    },
    {
      icon: Presentation,
      color: "bg-purple-100",
      title: "Empezar a enseñar",
      description: "Comienza a inspirar y educar a las estudiantes.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <h2 className="text-3xl font-bold text-center mb-12 font-serif border rounded-full p-4 inline-block mx-auto">
        Cómo convertirse en instructora e inspirar a otras
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg relative overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
                opacity: 0.05,
              }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <div className={`${step.color} p-4 rounded-full mb-6`}>
                <step.icon className="w-10 h-10 text-gray-800" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{`${index + 1}. ${
                step.title
              }`}</h3>
              <p className="text-center text-gray-600 text-lg">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
