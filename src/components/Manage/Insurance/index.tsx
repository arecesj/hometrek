'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { manageRouteName } from "@/constants/routes"
import FindExistingInsurance from "./FindExistingInsurance"
import { isUserAuthenticated } from "@/utils/helpers"

const Insurance = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()

  useEffect(() => setRouteContext(manageRouteName.INSURANCE), [])
  return (
    <div>
      <SubHeader
        subHeaderContent={"Let's keep track of your home insurance"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={!isUserAuthenticated(status)}
      />
      <FindExistingInsurance />
    </div>
  )
}

export default Insurance