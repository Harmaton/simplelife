import React from "react";
import Logo from "./logo";

export default function CompanyPartners() {
  const logos = [
    "/logos/ttlogo.png",
    "/logos/coach.png",
    "/logos/TeilenTeens.png",
    "/logos/Bruno.png",
  ];

  return (
    <div data-aos="fade-up"  className="mt-8 p-2">
      <div className="text-center mb-4">
        <h1 className="font-bold border rounded-full p-4 text-gray-400 font-serif text-2xl">
          En asociación con
        </h1>
      </div>
      <div  className="flex flex-row justify-center items-center space-x-4">
        {logos.map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <Logo src={logo} />
          </div>
        ))}
      </div>
    </div>
  );
}
