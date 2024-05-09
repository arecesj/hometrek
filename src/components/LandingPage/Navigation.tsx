import { FC } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Image from 'next/image'
import { Button } from "../ui/button"
import { isUserAuthenticated } from "@/lib/utils"

type NavigationProps = {
  isHome: boolean
}

const Navigation: FC<NavigationProps> = ({ isHome }) => {
  const { data: session, status } = useSession()
  const sideBar =
    `flex flex-col absolute top-0 -right-2/3 w-2/3 h-screen px-5 overflow-y-auto transition-transform ease-in-out -translate-x-full bg-[hsl(0,0%,98%)]`
  const homeTrekImage = (
    <Image
      priority
      src="/hometrek.svg"
      height={230}
      width={230}
      alt="HomeTrek"
    />
  )

  return (
    <div>
      <div className='flex justify-between lg:items-center px-5 py-6 lg:px-14'>
        {isHome ? homeTrekImage : (
          <a href="/" className="lg:mr-16">
          {homeTrekImage}
        </a>
        )}
        {/* <div className="hidden lg:flex lg:grow text-[hsl(0,0%,41%)] lg:items-center">
          <ul className="flex">
            <li className="mr-6"><a href="" className="hover:text-[hsl(0,0%,8%)]">Features</a></li>
            <li className="mr-6"><a href="" className="hover:text-[hsl(0,0%,8%)]">Company</a></li>
            <li className="mr-6"><a href="" className="hover:text-[hsl(0,0%,8%)]">Careers</a></li>
            <li className="mr-6"><a href="" className="hover:text-[hsl(0,0%,8%)]">About</a></li>
          </ul>
        </div> */}
        
        <div className="hidden lg:flex lg:items-center text-[hsl(0,0%,41%)] space-x-2">
          {isUserAuthenticated(status) ? (
            <>
              <Button asChild className="text-white bg-[hsl(0,0%,8%)] hover:bg-transparent hover:border hover:text-[hsl(0,0%,8%)] hover:border-[hsl(0,0%,8%)] py-3 px-6 rounded-xl">
                <Link href="/manage/dashboard" className="text-base font-medium">Dashboard</Link>
              </Button>
              <Button
                onClick={() => {
                  signOut({
                    redirect: true,
                    callbackUrl: "/"
                  })
                }}
                className="lg:text-[hsl(0,0%,8%)] lg:bg-transparent border-2 border-[hsl(0,0%,8%)] hover:text-white hover:border-[hsl(0,0%,8%)] py-3 px-6 rounded-xl"
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild className="text-white bg-[hsl(0,0%,8%)] hover:bg-transparent hover:border hover:text-[hsl(0,0%,8%)] hover:border-[hsl(0,0%,8%)] py-3 px-6 rounded-xl">
                <Link href="/signup" className="text-base font-medium">Sign up</Link>
              </Button>
              <Button asChild className="lg:text-[hsl(0,0%,8%)] lg:bg-transparent border-2 border-[hsl(0,0%,8%)] hover:text-white hover:border-[hsl(0,0%,8%)] py-3 px-6 rounded-xl">
                <Link href="/login" className="text-base font-medium">Login</Link>
              </Button>
            </>
          )}
        </div>
        {/* desktop menu end */}

        {/* Mobile */}
        <div className="flex lg:hidden">
          {/* <div>
              {isOpen && (
                  // Overlay
                  <div onClick={handleOverlayClick} className="fixed top-0 left-0 w-full h-screen bg-black opacity-60"></div>
              )}
          </div>
          <button type="button" onClick={toggleSidebar} className=" relative z-10">
              {!isOpen ?  <IconMenu/> : <IconClose/> }
          </button> */}
          <div className={`${sideBar} ${' -left-1/3 pointer-events-none'}`}>
              {/* <ul className="text-[hsl(0,0%,41%)] mt-3 text-lg">
                  <li className="mb-3"><a href="">Products</a></li>
                  <li className="mb-3"><a href="">Company</a></li>
                  <li className="mb-3"><a href="">Careers</a></li>
                  <li className="mb-10"><a href="">About</a></li>
              </ul> */}
              <div className="text-center text-lg text-[hsl(0,0%,41%)]"> 
                  <a href="/signup" className="block mb-5 hover:text-[hsl(0,0%,8%)]">Sign up</a>
                  <div className="text-[hsl(0,0%,41%)] lg:bg-transparent border-2 border-[hsl(0,0%,41%)] hover:text-[hsl(0,0%,8%)] hover:border-[hsl(0,0%,8%)] py-2 px-4 rounded-xl">
                      <a href="/login">Login</a>
                  </div>
              </div>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Navigation