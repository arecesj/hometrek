'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Loading from "@/components/LoadingSpinner"
import { useAppContext } from "@/context"
import { useToast } from "@/components/ui/use-toast"
import { updateHomeClosing } from "@/client/homeClosing"
import { manageRouteName, manageRoutes } from "@/constants/routes"
import { generateNewUserTasks } from "@/constants/newUserTasks"


const GoogleAuth = () => {
  const { data: session, status } = useSession()
  const { homeClosingContext } = useAppContext()
  const [ allowCreate, setCreate ] = useState<boolean>(true)
  const router = useRouter()
  const { toast } = useToast()

  const createSuccessToast = () => {
    return toast({
      title: "Successfully created your account.",
      description: "Redirecting you to the dashboard.",
    })
  }

  const createFailureToast = (description: string) => {
    return toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description,
    })
  }

  const newHomeClosing = async () => {
    let homeClosingBody = homeClosingContext;
    if(!homeClosingContext.tasks?.length) {
      const tasks = generateNewUserTasks(homeClosingContext);
      homeClosingBody = {...homeClosingBody, tasks}
    }
    
    const resp = await updateHomeClosing(session.user?.id, homeClosingBody)
    resp.ok ? createSuccessToast() : createFailureToast("Unable to create user's home closing information at this time")
  }

  useEffect(() => {
    if(!!session && allowCreate) {
      setCreate(false)
      newHomeClosing()
      router.push(manageRoutes[manageRouteName.DASHBOARD].route)
    }
  }, [session])
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-beige to-blue-50">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Loading />
      </div>
    </div>
  )
}

export default GoogleAuth