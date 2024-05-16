'use client'

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/lib/utils";
import SessionEditExistingInspection from "./Session/EditExistingInspection";
import NewUserEditExistingInspection from "./NewUser/EditExistingInspection";

const InspectionsEdit = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  
  useEffect(() => setRouteContext(manageRouteName.INSPECTIONS_EDIT), [])
  return(
    <>
      {isUserAuthenticated(status) ? (
        <SessionEditExistingInspection />
      ) : (
        <NewUserEditExistingInspection />
      )}
    </>
  )
}

export default InspectionsEdit;