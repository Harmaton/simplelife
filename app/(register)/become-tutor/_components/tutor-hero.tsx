
import React from 'react'
import { CardSpotlightDemo } from './card-spotlight-steps'
import TutorRegForm from './tutorReg-form'
import { SignInButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export default async function TutorHero() {
const user = await currentUser()
  return (
    <div className="container mx-auto px-4 py-2">       
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-2">
        <div className="mr-2">
          <CardSpotlightDemo />
        </div>
        <div className="space-y-6 flex flex-col items-center justify-center text-left">
          <h1 className="text-4xl font-serif text-left font-bold">Conviértete en tutora</h1>
          <p className="text-lg max-w-md mx-auto font-serif">Únete a nuestra comunidad y comienza a enseñar con más de 2000 tutores. Crece junto a 10 000 estudiantes. Crece a nivel internacional.</p>
          {user && user.id ? (
            <TutorRegForm userId={user.id}  />
          ) : (
            <SignInButton mode='modal'>
              Acceso
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  )
}
