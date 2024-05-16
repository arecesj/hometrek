'use client'

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/lib/utils";
import SessionEditExistingTitle from "./Session/EditExistingTitle";
import NewUserEditExistingTitle from "./NewUser/EditExistingTitle";

const TitleEdit = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  
  useEffect(() => setRouteContext(manageRouteName.TITLE_EDIT), [])
  return(
    <>
      {isUserAuthenticated(status) ? (
        <SessionEditExistingTitle />
      ) : (
        <NewUserEditExistingTitle />
      )}
    </>
  )
}

export default TitleEdit;