'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { manageRouteName } from "@/constants/routes"
import { isUserAuthenticated } from "@/lib/utils"
import SessionDashboard from "./Session/Dashboard"
import LoadingSpinner from "@/components/LoadingSpinner"

const Dashboard = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => setRouteContext(manageRouteName.DASHBOARD), [])
  
  useEffect(() => {
    if(!isUserAuthenticated(status)) router.push('/login')
    if(isUserAuthenticated(status)) setLoading(false)
  }, [status])
  
  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SubHeader
            subHeaderContent={"A quick glance into what's left"}
            showPreviousButton={false}
            previousButtonContent={""}
            previousButtonHref={""}
            showCreateProfileButton={!isUserAuthenticated(status)}
          />
          <SessionDashboard />
        </>
)}
    </div>
  )
}

export default Dashboard