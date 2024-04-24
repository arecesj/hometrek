'use client'

import Navigation from "./Navigation";
import Alt from "./alt";

const LandingPage = () => {
  return (
    <div className=' font-epilogue bg-[hsl(0,0%,98%)]'>
      <div className=' flex flex-col'>
        <Navigation />
        <Alt />      
      </div>
    </div>
  )
}

export default LandingPage