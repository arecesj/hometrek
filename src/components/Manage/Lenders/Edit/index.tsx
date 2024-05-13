'use client'

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import SessionEditExistingLender from "./Session/EditExistingLender";
import NewUserEditExistingLender from "./NewUser/EditExistingLender";
import { isUserAuthenticated } from "@/lib/utils";

const LendersEdit = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  
  useEffect(() => setRouteContext(manageRouteName.LENDERS_EDIT), [])
  return(
    <>
      {isUserAuthenticated(status) ? (
        <SessionEditExistingLender />
      ) : (
        <NewUserEditExistingLender />
      )}
    </>
  )
}

export default LendersEdit;