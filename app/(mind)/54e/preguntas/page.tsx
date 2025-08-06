import React from 'react'
import Nav from '../_components/nav'
import TestimonialsAndFAQ from '../_components/testimonials'

function page() {
  return (
    <div>
        <Nav />
       <section id="testimonials">
                <TestimonialsAndFAQ />
     </section> 
    </div>
  )
}

export default page