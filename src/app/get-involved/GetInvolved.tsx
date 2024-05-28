'use client'

import Image from "next/image"
import five from "@/images/five.jpg"

const GetInvolved = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[700px] lg:grid-cols-2 xl:min-h-[700px]">
      <div className="b relative h-[700px] w-full overflow-hidden brightness-90">
        <Image fill src={five} alt="img" className="w-full object-cover rounded-lg" />
      </div>
      <div className="flex items-start justify-center py-40">
        <div className="mx-auto grid w-[490px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              Get Involved
            </h1>
            <p className="pt-5 text-balance">
            If you want to chat, so do we. Shoot us an email at <a href="mailto:info@hometrek.ai" className="underline">info@hometrek.ai</a> and we will get back to you in a day or two.
            </p>
          </div>
        </div>
      </div>
  </div>
  )
}

export default GetInvolved