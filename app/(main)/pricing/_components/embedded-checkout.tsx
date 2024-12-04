"use client";

import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HotmartModalCheckoutProps {
  link: string;
}

const HotmartModalCheckout: React.FC<HotmartModalCheckoutProps> = ({
  link,
}) => {
  useEffect(() => {
    // Dynamically load Hotmart Checkout Elements script
    const script = document.createElement("script");
    script.src = "https://checkout.hotmart.com/lib/hotmart-checkout-elements.js";
    script.async = true;
    
    script.onload = () => {
      try {
        // Initialize overlay checkout with the payment link
        const elements = (window as any).checkoutElements.init('overlayCheckout', {
          url: link
        });
        
        // Attach to the button
        elements.attach('#payment_button');
      } catch (error) {
        console.error("Error initializing Hotmart checkout:", error);
      }
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      document.head.removeChild(script);
    };
  }, [link]);

  return (
    <div className="flex">
      <Button 
        id="payment_button"
        className="flex space-x-4 bg-green-500 rounded-md hover:bg-green-600"
      >
        <h3 className="text-white">Comprar Ahora</h3>
        <ShoppingCart className="ml-2 text-white h-4 w-4" />
      </Button>
    </div>
  );
};

export default HotmartModalCheckout;