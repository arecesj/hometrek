'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import SessionEditExistingLender from "./Session/EditExistingLender";
import { isUserAuthenticated } from "@/lib/utils";
import LoadingSpinner from "@/components/LoadingSpinner"

const LendersEdit = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => setRouteContext(manageRouteName.LENDERS_EDIT), [])

  useEffect(() => {
    if(!isUserAuthenticated(status)) router.push('/login')
    if(isUserAuthenticated(status)) setLoading(false)
  }, [status])
  
  return(
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SessionEditExistingLender />
      )}
    </>
  )
}

export default LendersEdit;