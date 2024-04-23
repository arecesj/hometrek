'use client'
import Image from "next/image";
import Navigation from "./Navigation";
import window from "../../app/images/window.jpg"
import { Button } from "../ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className=' font-epilogue bg-[hsl(0,0%,98%)]'>
      <div className=' flex flex-col'>
        <Navigation />
        <Image
          src={window}
          alt="image-hero-mobile"
          className=' lg:hidden'
        />
        <div className=' lg:flex lg:mx-44 lg:gap-4 lg:mt-10'>
          <Image
            src={window}
            alt="image-hero-desktop"
            className='hidden lg:flex lg:order-2 lg:w-full lg:h-full overflow-auto'
          />
          <div className='px-5 mt-8 mb-48 lg:pt-20 lg:pr-32'>
            <div className=" flex flex-col items-center lg:items-start">
                <h1 className=" text-4xl font-bold text-[hsl(0,0%,8%)] lg:text-7xl">The all-in-one home closing platform</h1>
                <p className=" text-center lg:text-start lg:pr-11 lg:my-10 text-base lg:text-lg my-6 text-[hsl(0,0%,41%)] font-medium">
                    Save time, money, and avoid bureaucratic headaches
                </p>
                <Button asChild size="lg" className=" text-white bg-[hsl(0,0%,8%)] hover:bg-transparent hover:border hover:text-[hsl(0,0%,8%)] hover:border-[hsl(0,0%,8%)] py-3 px-6 rounded-xl">
                  <Link href="/trek/lenders">Get Started</Link>
                </Button>
            </div>
            <div className=' flex flex-row justify-between mt-14 lg:mt-28 items-center'>
                {/* <img src={ClientDatabiz} alt="client-databiz" className=' h-4'/>
                <img src={ClientAudiophile} alt="client-audiophile" className='h-8'/>
                <img src={ClientMeet} alt="client-meet" className='h-4'/>
                <img src={ClientMaker} alt="client-maker" className='h-5'/> */}
            </div>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default LandingPage