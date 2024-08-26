import Navbar from '@/components/landing-page/navbar'
import Top from '@/components/top-page'
import React from 'react'

export default function Page() {
  return (
    <>
    <Navbar />
    <div className='p-2'>
    <Top header='Instructoras' text='Todos los instructores aprobados aparecen aquí' /> 
        Teachers page
        
    </div>
    </>
  )
}
