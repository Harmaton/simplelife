import React from 'react'
import { StartTimeForm } from '../_components/session-time'
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { SessionImageForm } from '../_components/session-image';
import { DurationForm } from '../_components/session-duration';
import { EndTimeForm } from '../_components/end-time';
import { MeditationActions } from '../_components/meditation-actions';
import { Banner } from '@/components/banner';
import { FromForm } from '../_components/from';
import { ToForm } from '../_components/to';
import { auth } from '@/firebase';

const SessionIdPage = async ({
    params
  }: {
    params: { id: string }
  }) => {
    const user = auth.currentUser
    const userId = user?.uid
    if (!userId) {
      return redirect("/");
    }
  
    const session = await db.session.findUnique({
      where: {
        id: params.id,
        userId
      }
    });

    if(!session){
      return redirect('/')
    }
    
    console.log(session)

  return (
    <>
    <Banner variant={'warning'} label={'Publique esta sesión después de haber completado todos los campos para mostrarla como se esperaba'} />
    <div className='p-4 justify-center flex flex-row'>
     
        <div className='p-2'> 
        <StartTimeForm  session={session} id={params.id} />
        <DurationForm session={session} sessionid={params.id} />
        <EndTimeForm session={session} id={params.id} />
        <FromForm session={session} sessionid={params.id} />
       
        </div>

        <div className='p-2 space-y-5'>
        <SessionImageForm sessionid={params.id} session={session} />
        <ToForm session={session} sessionid={params.id}  />
        <MeditationActions disabled={false} id={params.id} isPublished={session.isPublished} />
        </div>
    </div>
    </>
  )
}

export default SessionIdPage
