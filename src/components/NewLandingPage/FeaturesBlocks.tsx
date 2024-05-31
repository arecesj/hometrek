import {
  HandCoins,
  UserRoundSearch,
  NotebookPen,
  Shield,
  ScrollText,
  Handshake
} from "lucide-react";

export default function FeaturesBlocks() {
  return (
    <section className="relative">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">{`Closing a home requires money, time, and trust`}</h2>
            <p className="text-xl text-gray-600">
              So why is it filled with junk fees, inefficiencies, and a lack of trust?
            </p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">

            {/* 1st item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="pb-4">
                <div className="flex justify-center items-center w-14 h-14 bg-gray-900 rounded-full shadow flex-shrink-0 ml-3">
                  <HandCoins className="h-6 w-6" color="white"/>
                </div>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Selecting the best lender</h4>
              <p className="text-gray-600 text-center">A totally arduous and time-consuming process</p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="pb-4">
                <div className="flex justify-center items-center w-14 h-14 bg-gray-900 rounded-full shadow flex-shrink-0 ml-3">
                  <UserRoundSearch className="h-6 w-6" color="white"/>
                </div>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Finding a home inspector</h4>
              <p className="text-gray-600 text-center">Googling, yelping, and scheduling like their lives depends on it</p>
            </div>
            {/* 3rd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="pb-4">
                <div className="flex justify-center items-center w-14 h-14 bg-gray-900 rounded-full shadow flex-shrink-0 ml-3">
                  <NotebookPen className="h-6 w-6" color="white"/>
                </div>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Scheduling an appraiser</h4>
              <p className="text-gray-600 text-center">More googling, yelping, and scheduling like their lives depends on it</p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="pb-4">
                <div className="flex justify-center items-center w-14 h-14 bg-gray-900 rounded-full shadow flex-shrink-0 ml-3">
                  <Shield className="h-6 w-6" color="white"/>
                </div>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Picking home insurance</h4>
              <p className="text-gray-600 text-center">Who is giving the best rates to home buyers these days?</p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="pb-4">
                <div className="flex justify-center items-center w-14 h-14 bg-gray-900 rounded-full shadow flex-shrink-0 ml-3">
                  <ScrollText className="h-6 w-6" color="white"/>
                </div>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Figuring out title insurance</h4>
              <p className="text-gray-600 text-center">Do home buyers know this exists? What about transferring the title over?</p>
            </div>

            {/* 6th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <div className="pb-4">
                <div className="flex justify-center items-center w-14 h-14 bg-gray-900 rounded-full shadow flex-shrink-0 ml-3">
                  <Handshake className="h-6 w-6" color="white"/>
                </div>
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Surviving closing day</h4>
              <p className="text-gray-600 text-center">Fingers crossed. No alarms and no surprises, please</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}