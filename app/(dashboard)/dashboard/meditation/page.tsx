'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import anime from '@/lib/lotties/meditation-lottie.json'
import Lottie from 'lottie-react';
import Link from 'next/link'
import { Info } from './info';
import { HoverCardMeditation } from './hover-card';

export default function Page() {
  return (
    <div className='p-4 mr-4'>
      <Info />
      <Card className="w-full items-center justify-center m-4">
      <CardHeader>
      <CardTitle>Nuestros viajes de meditación</CardTitle>
      <CardDescription>Coloca el cursor sobre un botón de meditación para obtener más información.</CardDescription>
      </CardHeader>
      <CardContent className='m-auto '>
      <Lottie
        animationData={anime} 
        loop={true}
        className="w-[250px] rounded-lg m-auto p-4"
        />    
      </CardContent>
      <CardFooter className="flex flex-col m-2 sm:flex-row justify-between space-y-4">

      <Link href='/dashboard/meditation/zen'> 
      <HoverCardMeditation buttonName={'Meditación Zen (Zazen)'} avatarSrc={''} avatarFallback={'ZM'} backgroundColor={'bg-indigo-200'} smallexplanation={'La meditación Zen, o Zazen, busca cultivar la atención plena y la percepción a través de la meditación sentada. Los practicantes se sientan en una postura específica, se centran en la respiración o contemplan koans (preguntas paradójicas) para profundizar en la conciencia'} monthyr={'November 2023'}  />
      </Link>

      <Link href='/dashboard/meditation/guide'> 
        <HoverCardMeditation buttonName={'Sesiones Guiadas'} avatarSrc={''} avatarFallback={'GS'} backgroundColor={'bg-pink-500'} smallexplanation={' La meditación mindfulness con sesiones guiadas implica seguir la dirección de un maestro o una grabación de audio que lidera la meditación. Puede incluir instrucciones sobre la relajación, la visualización o temas específicos para mejorar el bienestar y el crecimiento personal.'} monthyr={'November 2023'}  />
        </Link> 

        <Link href='/dashboard/meditation/breathing'> 
        <HoverCardMeditation buttonName={'Ejercicio de Respiración'} avatarSrc={''} avatarFallback={'MM'} backgroundColor={'bg-green-500'} smallexplanation={'El ejercicio de respiración en la meditación se centra en la conciencia y control de la respiración para promover la relajación y la calma. Puede implicar técnicas específicas de respiración, como respiración profunda, respiración abdominal o conteo de respiraciones. El objetivo es aumentar la atención plena en la respiración, lo que puede tener beneficios para reducir el estrés y mejorar el enfoque mental.'} monthyr={'November 2023'}  />
        </Link> 
        </CardFooter>
    </Card>


    </div>
  )
}
