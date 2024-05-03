'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react";
import FindExistingMortgage from "./FindExistingMortgage";
import SubHeader from "@/components/Agg/Subheader";
import { useAppContext } from "@/context";
import { aggRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/utils/helpers";

const Lenders = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  
  useEffect(() => setRouteContext(aggRouteName.LENDERS), [])
  return (
    <div>
      <SubHeader
        subHeaderContent={"Let's grab your existing mortgage"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={!isUserAuthenticated(status)}
      />
      <FindExistingMortgage />
    </div>
  )
}

export default Lenders