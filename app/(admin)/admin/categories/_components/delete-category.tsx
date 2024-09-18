'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useRouter } from 'next/navigation'
import { removeCategory } from '@/app/actions/categories'
import { toast } from 'sonner'

export default function DeleteCategory({ categoryId }: {categoryId : string}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer..")) {
      setIsDeleting(true)
      try {
        await removeCategory(categoryId)
        router.push('/admin/categories')
      } catch (error) {
        console.error('Error deleting category:', error)
        toast.error('Error')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <Button 
      onClick={handleDelete} 
      disabled={isDeleting}
      variant="destructive"
    >
      <Trash className="mr-2 h-4 w-4" />
      {isDeleting ? 'Eliminando...' : 'Eliminar categoría'}
    </Button>
  )
}
