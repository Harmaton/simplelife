"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
interface EmbeddedHotmartCheckoutProps {
  link: string;
}

const EmbeddedHotmartCheckout: React.FC<EmbeddedHotmartCheckoutProps> = ({
  link,
}) => {
  useEffect(() => {
    // Function to import the Hotmart script and stylesheet
    const importHotmart = () => {
      const script = document.createElement("script");
      script.src = "https://static.hotmart.com/checkout/widget.min.js";
      script.async = true;
      document.head.appendChild(script);

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "https://static.hotmart.com/css/hotmart-fb.min.css";
      document.head.appendChild(link);
    };

    // Import Hotmart script and stylesheet
    importHotmart();
  }, []);

  return (
    <div className="flex">
      <Link href={`${link}?checkoutMode=2`} onClick={(e) => e.preventDefault()}>
        <Button className="flex space-x-4 bg-green-500 rounded-md hover:translate-x-2">
          <h3 className="text-white">Comprar Ahora</h3>
          <ShoppingCart className="ml-2 text-white h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default EmbeddedHotmartCheckout;
