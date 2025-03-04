'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/lib/utils";
import SessionEditExistingInspection from "./Session/EditExistingInspection";
import LoadingSpinner from "@/components/LoadingSpinner"

const InspectionsEdit = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  
  useEffect(() => setRouteContext(manageRouteName.INSPECTIONS_EDIT), [])
  useEffect(() => {
    if(!isUserAuthenticated(status)) router.push('/login')
    if(isUserAuthenticated(status)) setLoading(false)
  }, [status])

  return(
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SessionEditExistingInspection />
      )}
    </>
  )
}

export default InspectionsEdit;