'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/lib/utils";
import SessionEditExistingInsurance from "./Session/EditExistingInsurance";
import LoadingSpinner from "@/components/LoadingSpinner"

const InsuranceEdit = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => setRouteContext(manageRouteName.INSURANCE_EDIT), [])

  useEffect(() => {
    if(!isUserAuthenticated(status)) router.push('/login')
    if(isUserAuthenticated(status)) setLoading(false)
  }, [status])
  
  return(
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SessionEditExistingInsurance />
      )}
    </div>
  )
}

export default InsuranceEdit;