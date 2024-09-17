'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

type RatingProps = {
  courseId: string;
};

const formSchema = z.object({
  value: z.number({
    required_error: "Se requiere calificación",
    invalid_type_error: "Clasificación must be a number",
  }).int(),
});

export function RatingInputButton({ courseId }: RatingProps) {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const onSubmit = async () => {
    try {
      if (selectedRating !== null) {
        await axios.post(`/api/courses/${courseId}/rating`, { value: selectedRating });
        toast.success("Clasificación actualizado");
        router.refresh();
      } else {
        toast.error("Selecciona una calificación antes de enviar.");
      }
    } catch (error) {
      toast.error("Algo salió mal");
    }
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <Button
            key={rating}
            variant="outline"
            onClick={() => handleStarClick(rating)}
            className={selectedRating === rating ? 'bg-yellow-300' : ''}
          >
            <StarIcon className="w-6 h-6" />
          </Button>
        ))}
      </div>

      <Button onClick={onSubmit}>
        Enviar calificación
      </Button>
    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
