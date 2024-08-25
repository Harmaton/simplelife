import React from 'react'
import { UserPlus, UserCog, BookPlus, Presentation } from 'lucide-react';

export default function How() {
  const steps = [
    { icon: UserPlus, color: 'bg-blue-100', title: 'Aplicar', description: 'Envíe su solicitud para convertirse en instructor' },
    { icon: UserCog, color: 'bg-green-100', title: 'Configurar y editar perfil', description: 'Crea tu perfil y muestra tu experiencia' },
    { icon: BookPlus, color: 'bg-yellow-100', title: 'Crear nuevo curso', description: 'Diseña y desarrolla el contenido de tu curso' },
    { icon: Presentation, color: 'bg-purple-100', title: 'Empezar a enseñar', description: 'Comienza a inspirar y educar a las estudiantes.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-4">
      <h2 className="text-3xl font-bold text-center mb-8 font-serif">Cómo convertirse en instructora e inspirar a otras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <div className={`${step.color} p-3 rounded-full mb-4`}>
              <step.icon className="w-8 h-8 text-gray-800" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{`${index + 1}. ${step.title}`}</h3>
            <p className="text-center text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
