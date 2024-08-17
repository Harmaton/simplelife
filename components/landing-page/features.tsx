import {
    CardHeader,
    CardContent,
    Card,
  } from "@/components/ui/card";
  import {
    ShieldCheck,
    Speaker,
    StickyNote,
    Tv,
    Users,
    Video,
  } from "lucide-react";
  
  export default function Features() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  
  
        <Card
          className="w-[350px] bg-white p-6 justify-center items-center text-center shadow-md rounded-lg"
          data-aos="fade-up"
        >
          <CardHeader className="flex items-center  space-x-3 mb-4">
            <div className="h-12 w-12 bg-[#8a4dff] mb-2 flex items-center justify-center rounded-lg mr-4">
              <Tv className="text-white p-2 rounded-lg h-8 w-8  text-3xl" />
            </div>
            <h1 className="font-bold " >
              Cursos en línea en vivo
              </h1 >
          </CardHeader>
          <CardContent>
            
              Experimente el aprendizaje en tiempo real con nuestros cursos en
              línea en vivo.
            
          </CardContent>
        </Card>
  
  
  
        <Card
          className="w-[350px] bg-white p-6 shadow-md rounded-lg text-center"
          data-aos="fade-up"
        >
          <CardHeader className="flex items-center space-x-3 mb-4">
            <div className="h-12 w-12 bg-[#34d399] mb-2 flex items-center justify-center rounded-lg mr-4">
              <ShieldCheck className=" text-white p-2 rounded-md h-8 w-8" />
            </div>
            <h1 className="font-bold " >Certificación de diploma</h1 >
          </CardHeader>
          <CardContent>
            
              Obtenga su certificación de diploma fácilmente.
            
          </CardContent>
        </Card>
  
        <Card
          className="w-[350px] bg-white p-6 shadow-md rounded-lg text-center"
          data-aos="fade-up"
        >
          <CardHeader className="flex items-center space-x-3 mb-4">
            <div className="h-12 w-12 bg-pink-500 mb-2 flex items-center justify-center rounded-lg ">
              <Users className=" text-white p-2 rounded-md h-8 w-8" />
            </div>
            <h1 className="font-bold " >Interacción en tiempo real con profesionales.</h1 >
          </CardHeader>
          <CardContent>
            
              Interacción directa con expertos directamente desde simplelife
            
          </CardContent>
        </Card>
  
        <Card
          className="w-[350px] bg-white p-6 shadow-md  rounded-lg text-center"
          data-aos="fade-up"
        >
          <CardHeader className="flex items-center space-x-3 mb-4">
            <div className="h-12 w-12 bg-red-500 mb-2 flex items-center justify-center rounded-lg ">
              <Video className=" text-white p-2 rounded-md h-8 w-8" />
            </div>
            <h1 className="font-bold " >Clases grabadas para consultar cuando quieras</h1 >
          </CardHeader>
          <CardContent>
            
              Disfrute de la comodidad de las clases grabadas, que le brindan
              flexibilidad para volver a visitar las lecciones y estudiar a su
              propio ritmo.
            
          </CardContent>
        </Card>
  
        <Card
          className="w-[350px] bg-white p-6 shadow-md text-center rounded-lg"
          data-aos="fade-up"
        >
          <CardHeader className="flex items-center space-x-3 mb-4">
            <div className="h-12 w-12 bg-orange-500 mb-2 flex items-center justify-center rounded-lg">
              <StickyNote className=" text-white p-2 rounded-md h-8 w-8" />
            </div>
            <h1 className="font-bold " >Profesores expertos</h1 >
          </CardHeader>
          <CardContent>
            
              Benefíciese de la experiencia de nuestro equipo dedicado de
              educadores experimentados que están comprometidos a brindar
              orientación integral.
            
          </CardContent>
        </Card>
  
        <Card
          className="w-[350px] bg-white p-6 shadow-md rounded-lg text-center"
          data-aos="fade-up"
        >
          <CardHeader className="flex items-center space-x-3 mb-4">
            <div className="h-12 w-12 mb-2 bg-yellow-500 flex items-center justify-center rounded-lg ">
              <Speaker className=" text-white p-2 rounded-md h-8 w-8" />
            </div>
            <h1 className="font-bold " >Interacción efectiva</h1 >
          </CardHeader>
          <CardContent>
            
              Diálogos transformadores: interactúe con nuestra experiencia para
              lograr un impacto que altere la vida
            
          </CardContent>
        </Card>
      </div>
    );
  }
  