'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { manageRouteName } from "@/constants/routes"
import { isUserAuthenticated } from "@/lib/utils"
import LoadingSpinner from "@/components/LoadingSpinner"
import FindExistingInsurance from "./Session/FindExistingInsurance"

const Insurance = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  const router = useRouter()


  useEffect(() => setRouteContext(manageRouteName.INSURANCE), [])
  
  useEffect(() => {
    if(!isUserAuthenticated(status)) router.push('/login')
    if(isUserAuthenticated(status)) setLoading(false)
  }, [status])
  

  return (
    <div>
      {isLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <SubHeader
            subHeaderContent={"Let's keep track of your home insurance"}
            showPreviousButton={false}
            previousButtonContent={""}
            previousButtonHref={""}
            showCreateProfileButton={!isUserAuthenticated(status)}
          />
          <FindExistingInsurance />
        </>
      )}
    </div>
  )
}

export default Insurance