import React from 'react'
import { Boxes } from './ui/background-boxes';

interface TopProps {
    header: string;
    text: string;
}
export default function Top({header, text}: TopProps) {
  return (
    <div className="relative p-4 h-36 mb-2 w-full overflow-hidden bg-blue-500 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="relative z-20 text-center">
        <h1 className="md:text-4xl text-xl font-serif text-white mb-2">
          {header}
        </h1>
        <p className="text-lg font-serif text-neutral-300">
          {text}
        </p>
      </div>
    </div>
  )
}
