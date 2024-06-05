'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/lib/utils";
import SessionEditExistingTitle from "./Session/EditExistingTitle";
import LoadingSpinner from "@/components/LoadingSpinner"

const TitleEdit = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => setRouteContext(manageRouteName.TITLE_EDIT), [])

  useEffect(() => {
    if(!isUserAuthenticated(status)) router.push('/login')
    if(isUserAuthenticated(status)) setLoading(false)
  }, [status])
  
  return(
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SessionEditExistingTitle />
      )}
    </>
  )
}

export default TitleEdit;