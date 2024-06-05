'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/lib/utils";
import SessionEditExistingAppraisal from "./Session/EditExistingAppraisal";
import LoadingSpinner from "@/components/LoadingSpinner";

const AppraisalsEdit = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  
  useEffect(() => setRouteContext(manageRouteName.APPRAISALS_EDIT), [])
  useEffect(() => {
    if(!isUserAuthenticated(status)) router.push('/login')
    if(isUserAuthenticated(status)) setLoading(false)
  }, [status])
  
  return(
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SessionEditExistingAppraisal />
      )}
    </>
  )
}

export default AppraisalsEdit;