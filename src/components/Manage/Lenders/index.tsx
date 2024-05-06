'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react";
import FindExistingMortgage from "./FindExistingMortgage";
import SubHeader from "@/components/Manage/Subheader";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/utils/helpers";

const Lenders = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  
  useEffect(() => setRouteContext(manageRouteName.LENDERS), [])
  return (
    <div>
      <SubHeader
        subHeaderContent={"Let's get your existing mortgage"}
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