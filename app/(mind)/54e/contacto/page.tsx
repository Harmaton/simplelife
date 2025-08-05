import React from 'react'
import Nav from '../_components/nav'
import Contact from '../_components/contact'

function page() {
  return (
    <div>
        <Nav totalCartItems={3} />
        <Contact />
    </div>
  )
}

export default page