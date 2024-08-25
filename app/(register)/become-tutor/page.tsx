import React from 'react'
import TutorHero from './_components/tutor-hero'
import Stat from './_components/stat'
import Navbar from '@/components/landing-page/navbar'
import How from './_components/how'
import { Footer } from '@/components/landing-page/footer'

export default function Page() {
  return (
    <div className='p-2'>
         <Navbar />
        <TutorHero />
        <Stat />
        <How />
        <Footer />
    </div>
  )
}
