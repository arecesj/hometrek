'use client'

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { manageRouteName } from "@/constants/routes"
import { isUserAuthenticated } from "@/lib/utils"
import NewUserDashboard from "./NewUser/Dashboard"
import SessionDashboard from "./Session/Dashboard"

const Dashboard = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()

  useEffect(() => {
    setRouteContext(manageRouteName.DASHBOARD)
  }, [])
  
  return (
    <div>
      <SubHeader
        subHeaderContent={"A quick glance into what's left"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={!isUserAuthenticated(status)}
      />
      {isUserAuthenticated(status) ? (
        <SessionDashboard />
      ) : (
        <NewUserDashboard />
      )}
    </div>
  )
}

export default Dashboard