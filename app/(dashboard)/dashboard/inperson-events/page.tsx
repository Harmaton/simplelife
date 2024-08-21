import React from 'react'
import { db } from '@/lib/db'
import Link from 'next/link'
import InHouseEvent from './in-house-event'

export default async function InEventspage() {
    try {
      const allinevents = await db.inHouseEvent.findMany({
        where: {
          isPublished: true
        }
      })

      return (
        <div className='p-4 flex flex-col m-2 space-y-4'>
          
        <h1>Próximos eventos físicos</h1>
        <h2>
        Lo mantendremos informado sobre cualquier evento que planeemos organizar. Entradas y mucho más.
        </h2>
    
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {allinevents.map((event)=> (
            <Link key={event.id} href={`/dashboard/in-person/${event.id}`} >
            <InHouseEvent inevent={event}  />
            </Link>
          )
          )}
          {allinevents.length === 0 && (
            <div className='col-span-full text-center'> 
            {"No tenemos un próximo evento en persona en este momento. Vuelva más tarde"}
            </div>
          )}
        </div>
    </div>
      )
  } catch (error) {
      console.error('Error fetching books:', error)
      return (
          <div className='p-4 flex flex-col m-2 '>
              <p>Error, contacta al desarrollador</p>
          </div>
      )
  }
}