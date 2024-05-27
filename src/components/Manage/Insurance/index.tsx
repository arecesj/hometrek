'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { manageRouteName } from "@/constants/routes"
import NewUserFindExistingInsurance from "./NewUser/FindExistingInsurance"
import SessionFindExistingInsurance from "./Session/FindExistingInsurance"
import { isUserAuthenticated } from "@/lib/utils"

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
      {isUserAuthenticated(status) ? (
        <SessionFindExistingInsurance />
      ) : (
        <NewUserFindExistingInsurance />
      )}
    </div>
  )
}

export default Insurance