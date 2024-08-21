

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { RocketIcon } from "lucide-react"

export function Info() {
  
  return (
    <Alert className="justify-center m-4" >
      <RocketIcon className="h-4 w-4  " color=" #00FF00" />
      <AlertTitle>Seleccione un viaje de meditación a continuación</AlertTitle>
      <AlertDescription>
      ¡Date un fuerte abrazo y reduce la negatividad!
      </AlertDescription>
    </Alert>
  )
}
