'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import NewUserAddExistingInspector from "./NewUser/AddExistingInspector"
import SessionAddExistingInspector from "./Session/AddExistingInspector"
import { manageRouteName } from "@/constants/routes"
import { isUserAuthenticated } from "@/lib/utils"

const Inspections = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()

  useEffect(() => setRouteContext(manageRouteName.INSPECTIONS), [])
  return (
    <div>
      <SubHeader
        subHeaderContent={"Let's keep track of your inspection"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={!isUserAuthenticated(status)}
      />
      {isUserAuthenticated(status) ? (
        <SessionAddExistingInspector />
      ) : (
        <NewUserAddExistingInspector />
      )}
    </div>
  )
}

export default Inspections