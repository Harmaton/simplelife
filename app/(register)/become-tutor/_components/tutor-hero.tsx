import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/landing-page/navbar'
import { Button } from '@/components/ui/button'
export default function TutorHero() {
  return (
    <div className="container mx-auto px-4 py-2">       
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
      <div className="">
          <Image 
            src="/images/pr.png" 
            alt="Become an instructor" 
            width={333}
            height={200}
            layout="responsive"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-6 flex flex-col items-center justify-center text-left">
          <h1 className="text-4xl font-serif text-left font-bold">Conviértete en tutora</h1>
          <p className="text-lg max-w-md mx-auto font-serif">Únete a nuestra comunidad y comienza a enseñar con más de 2000 tutores. Crece junto a 10 000 estudiantes. Crece a nivel internacional.</p>
          <Button className="bg-blue-500 text-white px-6 py-3 rounded-lg  transition duration-300 flex items-center space-x-2 hover:bg-blue-300">
            <span>Conviértete en instructora</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
       
      </div>
    </div>
  )
}
