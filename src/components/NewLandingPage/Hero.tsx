import Image from "next/image"
import colors from "@/images/colors.jpg"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-pink-300 to-yellow-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Image */}
        {/* <div className="hidden md:block lg:block xl:block" aria-hidden="true">
          <Image
          src={colors}
          alt="colors"
          layout="fill"
          objectFit="cover"
          priority
          />
        </div> */}
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-52 md:pb-60">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
              The all-in-one
              <br/>
              home closing platform
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-900 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                Be the realtor that saves home buyers time and money
                <br />
                while avoiding the usual headaches
                </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-black bg-white hover:bg-gray-900 hover:text-white w-full mb-4 sm:w-auto sm:mb-0" href="/signup">Get Started</a>
                </div>
                <div>
                  <a className="btn text-white bg-gray-900 hover:bg-white hover:text-gray-900 w-full sm:w-auto sm:ml-4" href="/resources/blog">Learn more</a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
          </div>
        </div>
      </div>
    </section>
  )
}