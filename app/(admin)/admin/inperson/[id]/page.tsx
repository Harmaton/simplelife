import React from 'react'
import { EventImageForm } from '../_components/event-image'
import { MoveLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { EventLogoForm } from '../_components/event-logo'
import { LinkForm } from '../_components/link'
import { TimeForm } from '../_components/time'
import { Banner } from '@/components/banner'
import { IGLinkForm } from '../_components/instagram-link'
import { FbLinkForm } from '../_components/facebook-link'
import { AppLinkForm } from '../_components/whatsapp'
import { SocialLinkForm } from '../_components/social-link'
import { EventActions } from '../_components/event-actions'
import { LocationForm } from '../_components/location'
import { auth } from '@clerk/nextjs/server'

const EventIdPage = async ({
    params
  }: {
    params: { id: string }
  }) => {
    const user = await auth()
    const  userId  = user?.userId
  
    if (!userId) {
      return redirect("/");
    }

    const event = await db.inHouseEvent.findUnique({
        where: {
            id: params.id,
            userId
        },
        
    })

    if(!event){
        redirect('/')
    }
  return (
  <>
    <Banner label={'Por favor complete todas las casillas antes de publicar el evento.IMPORTANTE !! No incluya (https://) al agregar enlaces'} />

    <div className='p-4 space-y-4 flex flex-row'>
        <div className='p-2 w-full'>
        <EventImageForm eventToPublish={event} eventid={params.id} />
        <EventLogoForm eventToPublish={event} eventid={params.id} />
        <LocationForm initialData={event} eventid={params.id} />
        </div>

        <div className='p-2 w-full'>
        <TimeForm initialData={event}  eventid={params.id} />
        <SocialLinkForm initialData={event}  eventid={params.id} />
        <IGLinkForm initialData={event}  eventid={params.id} />
        <FbLinkForm initialData={event}  eventid={params.id} />
        <AppLinkForm initialData={event}  eventid={params.id} />

        <div className='mt-4 m-auto justify center'>

    <EventActions disabled={false} id={params.id} isPublished={event.isPublished} />
    </div>
        </div>  
    </div>
    
    </>
  )
}

export default EventIdPage