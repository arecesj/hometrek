'use client'

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/lib/utils";
import SessionEditExistingClosingDay from "./Session/EditExistingClosingDay";
import NewUserEditExistingClosingDay from "./NewUser/EditExistingClosingDay";

const ClosingDayEdit = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  
  useEffect(() => setRouteContext(manageRouteName.CLOSINGDAY_EDIT), [])
  return(
    <>
      {isUserAuthenticated(status) ? (
        <SessionEditExistingClosingDay />
      ) : (
        <NewUserEditExistingClosingDay />
      )}
    </>
  )
}

export default ClosingDayEdit;