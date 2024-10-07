'use client'

import React, { useState, useEffect } from 'react'

export default function Ad() {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState(14 * 60 * 60 + 20 * 60 + 53) // 14h 20m 53s in seconds

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible])

  if (!isVisible) return null

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  return (
    <div className="relative bg-yellow-100 text-black py-2">
      <div className="container mx-auto text-center mr-2">
        <p className="font-bold">
        ¡Solo hoy! Oferta relámpago de 24 horas. | Certificaciones con hasta un 15 % de descuento.
        </p>
        <p className="text-sm">
        Termina en {hours}h {minutes}m {seconds}s.
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-black hover:text-gray-600"
        aria-label="Close advertisement"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}