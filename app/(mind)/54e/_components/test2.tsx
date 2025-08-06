// import React from 'react'
// import { Star } from 'lucide-react'
// const testimonials = [
//   {
//     id: 1,
//     name: 'Maria Santos',
//     location: 'Manila',
//     rating: 5,
//     image:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
//     text: "I've tried many pain relief patches before, but 54e Patches are in a league of their own. The relief is almost immediate and lasts throughout the day. I can finally enjoy my activities without constant pain.",
//   },
//   {
//     id: 2,
//     name: 'Carlos Reyes',
//     location: 'La Paz',
//     rating: 5,
//     image:
//       'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
//     text: "As an athlete, muscle recovery is crucial for my performance. The 54e Cooling Patches have become an essential part of my recovery routine. They're easy to apply and provide consistent relief.",
//   },
//   {
//     id: 3,
//     name: 'Sophia Lim',
//     location: 'Davao',
//     rating: 4,
//     image:
//       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
//     text: 'I have sensitive skin and was hesitant to try yet another patch. The 54e Herbal Patches were gentle on my skin while still providing the relief I needed. I appreciate the natural ingredients.',
//   },
// ]
// const renderStars = (rating: number) => {
//   return Array(5)
//     .fill(0)
//     .map((_, index) => (
//       <Star
//         key={index}
//         size={18}
//         className={`${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
//       />
//     ))
// }
// export const TestimonialsSection = () => {
//   return (
//     <section id="testimonials" className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             What Our Customers Say
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Don&quot;t just take our word for it. Hear from people who have
//             experienced the benefits of 54e Patches.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial) => (
//             <div
//               key={testimonial.id}
//               className="bg-white p-6 rounded-lg shadow-md"
//             >
//               <div className="flex items-center mb-4">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="w-12 h-12 rounded-full object-cover mr-4"
//                 />
//                 <div>
//                   <h4 className="font-bold">{testimonial.name}</h4>
//                   <p className="text-sm text-gray-600">
//                     {testimonial.location}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
//               <p className="text-gray-700 italic">"{testimonial.text}"</p>
//             </div>
//           ))}
//         </div>
//         <div className="mt-12 text-center">
//           <p className="text-xl font-medium mb-6">
//             Join thousands of satisfied customers who&quot;ve found relief with 54e
//             Patches
//           </p>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition">
//             Read More Reviews
//           </button>
//         </div>
//       </div>
//     </section>
//   )
// }

import React from 'react'

export default function test2() {
  return (
    <div>test2</div>
  )
}
