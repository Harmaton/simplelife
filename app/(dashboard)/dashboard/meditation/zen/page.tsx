'use client'

import { Button } from '@/components/ui/button'
import { ArrowDownLeftIcon, LogOut, PauseCircle, Play, PlayCircle, StopCircle } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import Lottie from 'lottie-react'
import breath from '@/lib/lotties/zen.json'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'

export default function Page() {

    const instructions = `reathing meditation is a simple and effective technique for cultivating mindfulness and reducing stress. Here's a basic guide to get you started:

    Find a Comfortable Position:
    
    Sit or lie down in a comfortable position. If sitting, keep your back straight but not rigid. Rest your hands on your lap or knees.
    Close Your Eyes or Soften Your Gaze:
    
    Closing your eyes can help you focus inward, but if that's uncomfortable or not possible, you can also soften your gaze and look downward.
    Bring Attention to Your Breath:
    
    Start by becoming aware of your breath. Notice the sensation of each inhale and exhale. You can focus on the rise and fall of your chest or the sensation of air passing through your nostrils.
    Breathe Naturally:
    
    Allow your breath to flow naturally. You don't need to control it; just observe it as it is.
    Mindful Observation:
    
    Pay close attention to the entire breath cycle. Notice the inhalation, the brief pause at the top, the exhalation, and the momentary pause at the bottom. Be fully present with each breath.
    Gentle Attention:
    
    If your mind begins to wander (and it likely will), gently redirect your attention back to your breath. You can do this without judgment; it's normal for thoughts to arise.
    Counting Breaths (Optional):
    
    If you find it helpful, you can count your breaths. For example, count each inhale and exhale cycle up to 10, and then start again at 1. If you lose count, simply start over.
    Body Scan (Optional):
    
    As you become more comfortable with the practice, you can also do a body scan. Pay attention to any tension or sensations in different parts of your body, and consciously release any tension as you exhale.
    Set a Time Limit:
    
    Especially when starting, you may want to set a specific time for your meditation, like 5 or 10 minutes. As you become more accustomed to the practice, you can gradually extend the duration.
    End Mindfully:
    
    When you're ready to finish, bring your awareness back to your surroundings. Gently open your eyes if they were closed. Take a moment to observe how you feel.`
  
    const [audio, setAudio] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [voices, setVoices] = useState([]);
    const [isBreathing,setisBreathing ] = useState(false)
    const [totalBreathingTime, setTotalBreathingTime] = useState(0);
    const [breathText, setBreathText] = useState('Breath In');

    let timer: NodeJS.Timeout | null = null;

    const handleGenerateTTS = async () => {
    
        setLoading(true);
        try {

          const response = await fetch("/api/eleven-labs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: instructions,
            //   voice: selectedVoice,
            }),
          });
    
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
    
          const { file } = await response.json();
    
          setAudio(file);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };


      const startBreathingTime = new Date();

      const handleToggleBreathing = () => {
        if (isBreathing) {
          const endBreathingTime = new Date();
          const breathingDuration = endBreathingTime.getTime() - startBreathingTime.getTime();
          setTotalBreathingTime(totalBreathingTime + breathingDuration);
        }
    
        setisBreathing(!isBreathing);
      };
    
      useEffect(() => {
        const textAlternator = setInterval(() => {
          setBreathText((prevText) => (prevText === 'Respirar' ? 'Respira' : 'Respirar'));
        }, 5000);
    
        return () => clearInterval(textAlternator);
      }, []);


    
    //   useEffect(() => {
    //     async function getVoices() {
    //       try {
    //         const response = await fetch("https://api.elevenlabs.io/v1/voices");
    
    //         if (!response.ok) {
    //           throw new Error("Something went wrong");
    //         }
    
    //         const data = await response.json();
    
    //         setVoices(data.voices);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    
    //     getVoices();
    //   }, []);


    const startBreathingTime1 = useRef<Date | null>(null);

    const [audioSrc, setAudioSrc] = useState('');

    useEffect(() => {
        if (isBreathing) {
          startBreathingTime1.current = new Date();
      
          const intervalId = setInterval(() => {
            const currentBreathingTime = new Date();
            const elapsedTime =
              currentBreathingTime.getTime() - startBreathingTime1.current!.getTime();
            const elapsedSeconds = Math.floor(elapsedTime / 1000);
            setTotalBreathingTime(elapsedSeconds);
          }, 1000);

          const audioFiles = [
            '/audio/breath-meditation.mp3',
            '/audio/med-1.mp3',
            '/audio/med-2.mp3',
            '/audio/med-3.mp3',
            '/audio/med-4.mp3',
            '/audio/med-5.mp3',
            '/audio/med-6.mp3',
            '/audio/med-7.mp3',
            '/audio/med-8.mp3',
            '/audio/zutos.mp3',
          ];
      
          // Select a random audio file from the list
          const randomAudioSrc = audioFiles[Math.floor(Math.random() * audioFiles.length)];
      
          // Set the selected audio file as the source
          setAudioSrc(randomAudioSrc);
      
          return () => {
            clearInterval(intervalId);
          };

      
        }
      }, [isBreathing]);
     

    
  return (
    <div className='m-auto'>
        <div className='p-4 flex space-x-5'>      
          <PageHeader id='billing-header' aria-labelledby='billing-header-heading'>
        <PageHeaderHeading size='sm'>Meditación Zen</PageHeaderHeading>
      </PageHeader>
      <Link href="/dashboard/meditation" className='mr-2'>
            <Button size="sm" className='p-2' variant="outline">
              <ArrowDownLeftIcon className="h-4 w-4 m-2 mr-2" />
              Todas las meditaciones
            </Button>
          </Link>
        </div>
        <Separator />


        <Card className='p-4 m-6 '>
        <div className='m-auto p-2'>

         
        <h2 className='p-2 m-auto text-center font-semibold'>Instrucciones</h2>
         <audio className='p-2 m-auto bg-pink-200' autoPlay controls src={audioSrc} />
       </div>

            
       <div className='m-auto p-2 flex mt-5'>
       <Button
        className='m-auto p-2 bg-green-400'
        onClick={() => setisBreathing(!isBreathing)}
      >
        {isBreathing ? (
          <>
            <PauseCircle className='h-4 w-4 mr-2' />
            Pausa
          </>
        ) : (
          <>
            <PlayCircle className='h-4 w-4 mr-2' />
            Comenzar
          </>
        )}
      </Button>
        
        </div>

        </Card>

        {isBreathing && (
            
        <Card className='p-4 w-[350px] m-auto '>
        <CardContent>
             
                
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='lg:text-center lg:justify-center'>
              <h1 className='text-center animate-pulse'>{formatTime(totalBreathingTime)}</h1>
            </div>
  
          </div>
          <Lottie
                className="w-[250px] rounded-lg m-auto p-4"
                animationData={breath}
                />
            </CardContent>
        </Card> )}
 
    </div>
    
  )
}

const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
  
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };