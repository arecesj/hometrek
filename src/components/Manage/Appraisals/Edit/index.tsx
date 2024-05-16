'use client'

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import { isUserAuthenticated } from "@/lib/utils";
import SessionEditExistingAppraisal from "./Session/EditExistingAppraisal";
import NewUserEditExistingAppraisal from "./NewUser/EditExistingAppraisal";

const AppraisalsEdit = () => {
  const { data: session, status } = useSession()
  const { setRouteContext } = useAppContext()
  
  useEffect(() => setRouteContext(manageRouteName.APPRAISALS_EDIT), [])
  return(
    <>
      {isUserAuthenticated(status) ? (
        <SessionEditExistingAppraisal />
      ) : (
        <NewUserEditExistingAppraisal />
      )}
    </>
  )
}

export default AppraisalsEdit;