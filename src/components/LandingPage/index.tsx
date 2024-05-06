'use client'

import Navigation from "./Navigation";
import Alt from "./alt";

const LandingPage = () => {
  return (
    <div className=' font-epilogue'>
      <div className=' flex flex-col'>
        <Navigation isHome={true} />
        <Alt />
      </div>
    </div>
  )
}

export default LandingPage