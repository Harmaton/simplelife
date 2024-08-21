
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { BellIcon, CheckIcon } from "lucide-react"

type CardProps = {
    quote: string;
    author: string
}

export function QuoteCard({ quote, author }: CardProps) {
  return (
    <div>
    <Card className={cn("w-[500px] m-auto space-y-2 ")}>
      <CardHeader>
        <CardTitle>Motivación Diaria</CardTitle>
        <CardDescription>Tenemos una cita motivacional diaria para ti. </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 space-y-2 ">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellIcon />
        </div>
        <div>

        <div className=" flex items-center space-x-4 rounded-md border p-4 mb-4 ">
        {quote}
        </div>

        <div className=" flex items-center space-x-4 rounded-md border p-4 bg-pink-200">
        {author}
        </div>
       
        </div>
      </CardContent>
      <CardFooter>
        <Link href='/dashboard/meditation' className="w-full">
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Marcar como leído
        </Button>
        
        </Link>


      </CardFooter>
    </Card>
    </div>
  )
}
