'use client'
import React from 'react'
import { CardSpotlightDemo } from './card-spotlight-steps'
import TutorRegForm from './tutorReg-form'
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function TutorHero() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-2">       
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-2">
        <div className="m-auto">
          <CardSpotlightDemo />
        </div>
        <div className="space-y-6 flex flex-col items-center justify-center text-left">
          <h1 className="text-4xl font-serif text-left font-bold">Conviértete en tutora</h1>
          <p className="text-lg max-w-md mx-auto font-serif">Únete a nuestra comunidad y comienza a enseñar con más de 2000 tutores. Crece junto a 10 000 estudiantes. Crece a nivel internacional.</p>
          {user && user.email ? (
            <TutorRegForm userId={user.uid}  />
          ) : (
            <Link href="/login">
              <Button className="bg-violet-500 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-blue-500">
                Iniciar sesión para continuar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
