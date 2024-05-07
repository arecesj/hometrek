'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { manageRouteName } from "@/constants/routes"
import AddExistingAppraiser from "./AddExistingAppraiser"
import { isUserAuthenticated } from "@/lib/utils"

const Appraisals = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()

  useEffect(() => setRouteContext(manageRouteName.APPRAISALS), [])
  return (
    <div>
      <SubHeader
        subHeaderContent={"Let's keep track of the home appraisal"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={!isUserAuthenticated(status)}
      />
      <AddExistingAppraiser />
    </div>
  )
}

export default Appraisals
