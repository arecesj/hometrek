import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import window from "../../app/images/window.jpg"

const Alt = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-start justify-center py-40">
        <div className="mx-auto grid w-[490px] gap-6">
          <div className="grid gap-2 text-left">
            <h1 className=" text-4xl font-bold text-[hsl(0,0%,8%)] lg:text-7xl">
              The all-in-one home closing platform
            </h1>
            <p className="pt-5 text-balance text-muted-foreground">
              Save time & money while avoiding bureaucratic headaches
            </p>
          </div>
          <div className="grid gap-4">
            <Button asChild size="lg" className=" w-[150px] text-white bg-[hsl(0,0%,8%)] hover:bg-transparent hover:border hover:text-[hsl(0,0%,8%)] hover:border-[hsl(0,0%,8%)] py-3 px-6 rounded-xl">
              <Link href="/trek/lenders">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={window}
          alt="Window"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default Alt;
{/* 
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
                    
                    <div>
                    Save time & money
                    </div>
                    <span>
                    Avoid bureaucratic headaches
                    </span>
                    
                </p>
                <Button asChild size="lg" className=" text-white bg-[hsl(0,0%,8%)] hover:bg-transparent hover:border hover:text-[hsl(0,0%,8%)] hover:border-[hsl(0,0%,8%)] py-3 px-6 rounded-xl">
                  <Link href="/trek/lenders">Get Started</Link>
                </Button>
            </div>
            <div className=' flex flex-row justify-between mt-14 lg:mt-28 items-center'>
                <img src={ClientDatabiz} alt="client-databiz" className=' h-4'/>
                <img src={ClientAudiophile} alt="client-audiophile" className='h-8'/>
                <img src={ClientMeet} alt="client-meet" className='h-4'/>
                <img src={ClientMaker} alt="client-maker" className='h-5'/>
            </div>
          </div>
        </div>
        */}