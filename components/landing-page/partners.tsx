import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function CompanyPartners() {
  return (
    <div className="m-2 w-full p-4 mr-10 ">
      <Card className="m-4 w-full p-2">
        <CardHeader className="items-center m-2">
          <CardTitle>Nuestros compañeros</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3 sm:grid-cols-1">
          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4  hover:text-accent-foreground hover:bg-transparent">
            <Image
              src="/logos/Bruno.png" 
              alt="Logo 1"
              width={68}
              height={50} 
            />
          </div>
          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-transparent hover:text-accent-foreground">
            <Image
              src="/logos/coach.png" 
              alt="Logo 2"
              width={68} 
              height={50} 
            />
    
          </div>
          <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-transparent hover:text-accent-foreground">
            <Image
              src="/logos/ttlogo.png" 
              alt="Logo 3"
              width={68}
              height={48} 
            />
            
          </div>
        </CardContent>
      </Card>
      {/* <BackgroundBeams /> */}
    </div>
  );
}
