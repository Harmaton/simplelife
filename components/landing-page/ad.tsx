'use client'
import React, { useState } from 'react'

export default function Ad() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-violet-500 text-white py-2">
      <div className="container mx-auto text-center mr-2">
        <p className="font-bold">
          <span className="text-black">Actúa ahora y ahorra en grande,</span> hasta un 10% en todos los cursos
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white hover:text-gray-200"
        aria-label="Close advertisement"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
