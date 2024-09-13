import React from 'react'
import TutorHero from './_components/tutor-hero'
import Navbar from '@/components/landing-page/navbar'
import How from './_components/how'
import { Footer } from '@/components/landing-page/footer'
import Top from '@/components/top-page'

export default function Page() {
  return (
    <div className='p-2'>
        <Navbar />
        <Top header='Modo Instructor' text='Empiece su viaje para enseñar en Simplelife' />
        <TutorHero />
        <How />
        <Footer />
    </div>
  )
}
