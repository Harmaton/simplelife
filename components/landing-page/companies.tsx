import React from "react";
import Marquee from "react-fast-marquee";
import Logo from "./logo";


export default function CompanyPartners() {

  const logos = [
    "/logos/ttlogo.png",
    "/logos/coach.png",
    "/logos/TeilenTeens.png",
    "/logos/Bruno.png",
  ];
  return (
    <div className="mt-8 p-2">
      <div className="text-center mb-4">
        <h1 className="font-bold border rounded-full p-4  text-gray-400 font-serif text-2xl">
          In partnership with
        </h1>
      </div>
      <Marquee pauseOnHover >
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center mx-4">
            <Logo src={logo} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
