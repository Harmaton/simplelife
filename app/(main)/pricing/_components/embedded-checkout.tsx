"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
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
      <ShoppingCart className="mr-2 h-4 w-4" />
      <Link
        href={`${link}?checkoutMode=2`}
        className="hotmart-fb hotmart__button-checkout"
        onClick={(e) => e.preventDefault()}
      >
        <Image
          src="https://static.hotmart.com/img/btn-buy-green.png"
          alt="Buy Now"
          width={100} // You need to specify the width
          height={100} // You need to specify the height
        />
      </Link>
    </div>
  );
};

export default EmbeddedHotmartCheckout;
