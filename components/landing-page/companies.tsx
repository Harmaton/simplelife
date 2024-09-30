import React from 'react';
import Image from "next/image";

export function CompanyPartners() {
  return (
    <div className="w-full bg-white p-4 flex flex-col items-center">
      <h2 className="text-3xl text-gray-400 mb-4">Empresas Asociadas</h2>
      <div className="w-full overflow-hidden">
        <div className="flex animate-slide">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex whitespace-nowrap">
              <div className="mx-8">
                <Image
                  src="/logos/Bruno.png" 
                  alt="Logo 1"
                  width={68}
                  height={50} 
                />
              </div>
              <div className="mx-8">
                <Image
                  src="/logos/coach.png" 
                  alt="Logo 2"
                  width={68} 
                  height={50} 
                />
              </div>
              <div className="mx-8">
                <Image
                  src="/logos/ttlogo.png" 
                  alt="Logo 3"
                  width={68}
                  height={48} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}