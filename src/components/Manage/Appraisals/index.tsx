'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { manageRouteName } from "@/constants/routes"
import SessionAddExistingAppraiser from "./Session/AddExistingAppraiser"
import { isUserAuthenticated } from "@/lib/utils"
import LoadingSpinner from "@/components/LoadingSpinner"

const Appraisals = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => setRouteContext(manageRouteName.APPRAISALS), [])
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
          subHeaderContent={"Let's keep track of the home appraisal"}
          showPreviousButton={false}
          previousButtonContent={""}
          previousButtonHref={""}
          showCreateProfileButton={!isUserAuthenticated(status)}
        />
        <SessionAddExistingAppraiser />
        </>  
      )}
    </div>
  )
}

export default Appraisals
