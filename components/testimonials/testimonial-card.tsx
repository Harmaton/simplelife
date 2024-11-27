import { Testimonial } from "@/types";
import { QuoteIcon } from "lucide-react";
import Image from "next/image";

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-sm mx-4">
        <QuoteIcon className="text-purple-500 h-6 w-6 text-left" />
      <p className="text-gray-700 mb-4">{testimonial.text}</p>
      <div className="flex flex-col items-center">
        <Image
          src={testimonial.imageUrl || "/person.jpg"}
          alt="testimonials"
          width={60}
          height={60}
          className="rounded-full m-auto"
        />
        <div className="text-center">
           
          <h4 className="text-gray-800 font-bold">{testimonial.name}</h4>
          <p className="text-gray-600">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;