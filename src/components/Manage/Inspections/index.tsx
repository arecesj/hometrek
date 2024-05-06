'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import AddExistingInspector from "./AddExistingInspector"
import { manageRouteName } from "@/constants/routes"
import { isUserAuthenticated } from "@/utils/helpers"

const Inpsections = () => {
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
      <AddExistingInspector />
    </div>
  )
}

export default Inpsections