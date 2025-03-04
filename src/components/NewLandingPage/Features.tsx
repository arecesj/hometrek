'use client'

import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Dashboard from '@/images/dashboard.png'
import Savings from '@/images/savings.png'
import Secure from '@/images/secure.png'
import { MousePointer2, DollarSign, Lock } from "lucide-react" 

export default function Features() {
  
  const [tab, setTab] = useState<number>(1)

  const tabs = useRef<HTMLDivElement>(null)

  const heightFix = () => {
    // if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
    if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `426px`
  }

  useEffect(() => {
    heightFix()
  }, []) 

  return (
    <section className="relative">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 bg-gray-100 pointer-events-none mb-16" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">A secure, modern home closing experience</h1>
            <p className="text-xl text-gray-600">
              {`It’s time to make home closing less stressful for home buyers `}
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">

            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6" data-aos="fade-right">
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Simple, yet robust</h3>
                <p className="text-xl text-gray-600">
                From finding the ideal lender for a customer to handing off keys to a dream home, close deals safer and faster
                </p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                  href="#0"
                  onClick={(e) => { e.preventDefault(); setTab(1); }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">Easy to use</div>
                    <div className="text-gray-600">Help home buyers focus on what is important and avoid any unnecessary distractions</div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-gray-900 rounded-full shadow flex-shrink-0 ml-3">
                    <MousePointer2 className="h-5 w-5" color="white"/>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 2 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                  href="#0"
                  onClick={(e) => { e.preventDefault(); setTab(2); }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">Avoid junk fees</div>
                    <div className="text-gray-600">Be the agent that saves your home buyer money by avoiding the ever increasing junk fees</div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-gray-900 rounded-full shadow flex-shrink-0 ml-3">
                    <DollarSign className="h-4 w-4" color="white" />
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 3 ? 'bg-white shadow-md border-gray-200 hover:shadow-lg' : 'bg-gray-200 border-transparent'}`}
                  href="#0"
                  onClick={(e) => { e.preventDefault(); setTab(3); }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">Built with security & scalability in mind</div>
                    <div className="text-gray-600">Manage all real estate deals and never worry about leaking personal data</div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-gray-900 rounded-full shadow flex-shrink-0 ml-3">
                    <Lock className="h-4 w-4" color="white" />
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div className="relative flex flex-col text-center lg:text-right" data-aos="zoom-y-out" ref={tabs}>
                  {/* Item 1 */}
                  <div className="w-full">
                    <Transition
                      show={tab === 1}
                      appear={true}
                      enter="transition ease-in-out duration-700 transform order-first"
                      enterFrom="opacity-0 translate-y-16"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in-out duration-300 transform absolute"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-16"
                      beforeEnter={() => heightFix()}
                      unmount={false}                     
                    >
                      <div className="relative inline-flex flex-col">
                        <Image className="md:max-w-none mx-auto rounded border-solid border-2 border-grey-900" src={Dashboard} width="900" height="900" alt="Dashboard" />
                      </div>
                    </Transition>
                  </div>
                  {/* Item 2 */}
                  <div className="w-full">
                    <Transition
                      show={tab === 2}
                      appear={true}
                      enter="transition ease-in-out duration-700 transform order-first"
                      enterFrom="opacity-0 translate-y-16"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in-out duration-300 transform absolute"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-16"
                      beforeEnter={() => heightFix()}
                      unmount={false}                     
                    >
                      <div className="relative inline-flex flex-col">
                        <Image className="md:max-w-none mx-auto rounded border-solid border-2 border-grey-900" src={Savings} width="900" height="900" alt="Savings" />
                      </div>
                    </Transition>
                  </div>
                  {/* Item 3 */}
                  <div className="w-full">
                    <Transition
                      show={tab === 3}
                      appear={true}
                      enter="transition ease-in-out duration-700 transform order-first"
                      enterFrom="opacity-0 translate-y-16"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in-out duration-300 transform absolute"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-16"
                      beforeEnter={() => heightFix()}
                      unmount={false}                     
                    >
                      <div className="relative inline-flex flex-col">
                        <Image className="md:max-w-none mx-auto rounded border-solid border-2 border-grey-900" src={Secure} width="900" height="900" alt="Secure" />
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}