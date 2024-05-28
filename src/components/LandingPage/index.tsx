'use client'

import GetInvolved from "@/app/get-involved/GetInvolved";
import Navigation from "./Navigation";
import Alt from "./alt";

const LandingPage = () => {
  return (
    <div className='font-epilogue'>
      <div className='flex flex-col'>
        <Navigation isHome={true} />
          <Alt />
        <GetInvolved />
      </div>
    </div>
  )
}

export default LandingPage