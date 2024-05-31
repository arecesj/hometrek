import Image from "next/image"
import spanish_home from "@/images/spanish_home.jpg"
import colors from "@/images/colors.jpg"

export default function Hero() {
  return (
    <section className="relative">

      {/* Illustration behind hero content */}
      {/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div> */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-52 md:pb-60">
            <Image
            src={colors}
            alt="colors"
            layout="fill"
            objectFit="cover"
            />
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
              The all-in-one
              <br/>
              home closing platform
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-900 mb-8" data-aos="zoom-y-out" data-aos-delay="150">Save time and money while avoiding the usual headaches</p>
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
          {/* <button className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg" onClick={() => { setModalOpen(true) }}>
            <svg className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
              <path d="M10 17l6-5-6-5z" />
            </svg>
            <span className="ml-3">Watch the full video (2 min)</span>
          </button> */}
        </div>

          
          {/* <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="@/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080} /> */}

        </div>

      </div>
    </section>
  )
}