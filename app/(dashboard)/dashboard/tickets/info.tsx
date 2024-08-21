
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
  import { Video } from "lucide-react"
  
  export function Info() {
    return (
      <Alert className="justify-center mt-4" >
        <Video className="h-4 w-4  "  />
        <AlertTitle>¡Aviso!</AlertTitle>
        <AlertDescription>
        Utilice el enlace para unirse al evento.
        </AlertDescription>
      </Alert>
    )
  }
  