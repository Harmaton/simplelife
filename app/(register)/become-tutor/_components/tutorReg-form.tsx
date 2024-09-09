'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CircleArrowRight } from 'lucide-react'
import { Select } from '@headlessui/react'
import { submitTutorRegistration } from '@/app/actions/user'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'

export default function TutorRegForm({userId}: {userId: string; }) {
  const [name, setName] = useState('')
  const [profession, setProfession] = useState('')
  const [description, setDescription] = useState('')
  const [linkedin, setLinkedIn] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(true) // State to manage dialog visibility
  const router = useRouter()

  const userfib = useAuth()
  const email = userfib.user?.email

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const whatsappFull = `${countryCode}${whatsappNumber}`
    try {
      if(!email){
        console.log('no email captured')
        throw new Error('No email captured')
      }
      const result = await submitTutorRegistration({ name, profession, description, whatsappFull, linkedin, userId,email })
      if(result.success){
        toast.success('Registro enviado, recibirás un correo electrónico luego de la verificación.')
        setDialogOpen(false) // Close the dialog on successful submission
      }
      router.refresh()
    } catch (error) {
      toast.error('Registro no enviado')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = name && profession && description && countryCode && whatsappNumber && linkedin

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-500 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center space-x-2 hover:bg-blue-500">
          <span>Conviértete en instructora</span>
          <CircleArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registro de SimpleLife Tutor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='h-8'></div>
          <Input
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span className="text-red-500">*</span>
          <Input
            placeholder="LinkedIn o sitio web de currículum"
            value={linkedin}
            onChange={(e) => setLinkedIn(e.target.value)}
            required
          />
          <span className="text-red-500">*</span>
          <Input
            placeholder="Profesión"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
          />
          <span className="text-red-500">*</span>
          <Textarea
            placeholder="Introducción/Descripción de carrera"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <span className="text-red-500">*</span>
          <div className="flex space-x-2">
            <Select
              className="border rounded-md p-2 w-1/3"
              value={countryCode}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCountryCode(e.target.value)}
              required
            >
              <option value="">Seleccionar Código de País</option>
              <option value="+1">🇺🇸 +1 (EE.UU.)</option>
              <option value="+54">🇦🇷 +54 (Argentina)</option>
              <option value="+55">🇧🇷 +55 (Brasil)</option>
              <option value="+56">🇨🇱 +56 (Chile)</option>
              <option value="+57">🇨🇴 +57 (Colombia)</option>
              <option value="+52">🇲🇽 +52 (México)</option>
              <option value="+51">🇵🇪 +51 (Perú)</option>
              <option value="+598">🇺🇾 +598 (Uruguay)</option>
              <option value="+58">🇻🇪 +58 (Venezuela)</option>
              <option value="+34">🇪🇸 +34 (España)</option>
              <option value="+502">🇬🇹 +502 (Guatemala)</option>
              <option value="+503">🇸🇻 +503 (El Salvador)</option>
              <option value="+504">🇭🇳 +504 (Honduras)</option>
              <option value="+505">🇳🇮 +505 (Nicaragua)</option>
              <option value="+506">🇨🇷 +506 (Costa Rica)</option>
              <option value="+507">🇵🇦 +507 (Panamá)</option>
              <option value="+591">🇧🇴 +591 (Bolivia)</option>
              <option value="+593">🇪🇨 +593 (Ecuador)</option>
              <option value="+595">🇵🇾 +595 (Paraguay)</option>
              <option value="+809">🇩🇴 +809 (República Dominicana)</option>
            </Select>
            <Input
              type="tel"
              placeholder="Número de WhatsApp"
              value={whatsappNumber}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, '');
                setWhatsappNumber(numericValue);
              }}
              pattern="[0-9]*"
              inputMode="numeric"
              required
              className="w-2/3"
            />
          </div>
          <span className="text-red-500">*</span>
          <Button type="submit" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
