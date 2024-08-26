import React from 'react'

interface TopProps {
    header: string;
    text: string;
}

export default function Top({header, text}: TopProps) {
  return (
    <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600 via-sky-600 to-indigo-600 py-12 mb-8 text-center font-serif text-white">
        <h1 className="text-4xl font-bold mb-4">{header}</h1>
        <p className="text-lg">{text}</p>
      </div>
  )
}
