'use client'
import { useEffect } from "react";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

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
      <Link
        href={`${link}?checkoutMode=2`}
        className="hotmart-fb hotmart__button-checkout "
        onClick={(e) => e.preventDefault()}
      >
        <div className="flex space-x-2">
        <h3 className="text-white text-sm">Comprar ahora</h3> 
        <ShoppingBagIcon className="ml-2 text-white h-4 w-4" />
        </div>
        </Link>
    </div>
  );
};

export default EmbeddedHotmartCheckout;