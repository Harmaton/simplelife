import { ArrowRight, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SubCategory, Course, Category} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  subcategory: SubCategory & {
    Courses: Course[]
    category: Category
  };
}

export default function SubcategoryItem({ subcategory }: Props) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <div className="absolute right-0 top-0 h-40 w-40">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <pattern 
            id={`dots-${subcategory.id}`} 
            x="0" 
            y="0" 
            width="10" 
            height="10" 
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="black" />
          </pattern>
          <rect 
            x="0" 
            y="0" 
            width="100" 
            height="100" 
            fill={`url(#dots-${subcategory.id})`}
            fillOpacity="0.1"
          />
        </svg>
      </div>
      
      <CardContent className="flex p-6">
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-semibold">{subcategory.name}</h3>
          <p className="mb-2 text-sm text-gray-500">{subcategory.category.name}</p>
          <p className="mb-4 text-sm text-gray-600">{subcategory.description}</p>
          <div className="mb-4 flex items-center text-sm text-gray-500">
            <span className="mr-2">
              {subcategory.Courses.length} {subcategory.Courses.length === 1 ? 'curso' : 'cursos'}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300"></span>
            <span className="ml-2 flex items-center text-green-600">
              <Check className="mr-1 h-4 w-4" />
              Certificación
            </span>
          </div>
          
          <Link 
            href={`/search/subcategory/${subcategory.id}`}
            className="inline-flex items-center text-sm font-medium text-purple-600 transition-colors hover:text-purple-800"
          >
            Ver más
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="relative ml-6 h-32 w-32 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent z-10"></div>
          <Image
            src={subcategory.imageUrl || '/cert.svg'}
            alt={subcategory.name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>
      </CardContent>
    </Card>
  );
}