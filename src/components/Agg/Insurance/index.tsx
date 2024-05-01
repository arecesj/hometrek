'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { aggRouteName } from "@/constants/routes"
import FindExistingInsurance from "./FindExistingInsurance"
import { isUserAuthenticated } from "@/utils/helpers"

const Insurance = () => {
  const { data: session, status } = useSession()
  const { aggContext, setAggContext } = useAppContext()

  useEffect(() => setAggContext({ ...aggContext, route: aggRouteName.INSURANCE }), [])
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