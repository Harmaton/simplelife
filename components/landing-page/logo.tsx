import React from "react";
import Image from "next/image";

export default function Logo({ src }: { src: string }) {
  return (
    <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3 ">
      <Image
        src={src}
        height={60}
        className="filter grayscale"
        width={80}
        alt="Mascot"
      />
    </div>
  );
}
