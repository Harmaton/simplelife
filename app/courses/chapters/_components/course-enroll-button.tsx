'use client'

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CourseEnrollButtonProps {
  paymentLink: string | null;
}

export const CourseEnrollButton = ({
  paymentLink,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (paymentLink) {
      router.push(paymentLink);
    } else {
      toast.error("Payment link is not available");
    }
  };

  return paymentLink ? (
    <Link href={paymentLink}>
      
        <Button
          onClick={handleClick}
          disabled={isLoading}
          size="sm"
          className="w-full md:w-auto bg-indigo-500"
        >
          Inscribirse
        </Button>
      
    </Link>
  ) : (
    <Button
      disabled
      size="sm"
      className="w-full md:w-auto bg-gray-300 cursor-not-allowed"
    >
      Inscribirse
    </Button>
  );
};
