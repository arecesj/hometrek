'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import SessionFindExistingMortgage from "./Session/FindExistingMortgage";
import SubHeader from "@/components/Manage/Subheader";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/lib/utils";
import LoadingSpinner from "@/components/LoadingSpinner";

const Lenders = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  
  useEffect(() => setRouteContext(manageRouteName.LENDERS), [])
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
          subHeaderContent={"Let's get your lender information"}
          showPreviousButton={false}
          previousButtonContent={""}
          previousButtonHref={""}
          showCreateProfileButton={!isUserAuthenticated(status)}
        />
        <SessionFindExistingMortgage />
        </>
      )}
    </div>
  )
}

export default Lenders