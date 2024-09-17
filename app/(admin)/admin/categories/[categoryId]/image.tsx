'use client'

import { ChevronUp, ChevronDown } from "lucide-react";
import { ImageForm } from "./_components/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Category } from "@prisma/client";

const ImageFormDropdown = ({ initialData, categoryId }: {initialData: Category, categoryId: string}) => {

    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full mb-2 flex justify-between items-center"
        >
          <span>Imagen de Certificación</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
        {isOpen && (
          <div className="border p-4 rounded-md">
            <ImageForm initialData={initialData} categoryId={categoryId} />
          </div>
        )}
      </div>
    );
  };

  export default ImageFormDropdown