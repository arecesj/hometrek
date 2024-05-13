'use client'

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { manageRouteName } from "@/constants/routes";
import SessionEditExistingLender from "./Session/EditExistingLender";

const LendersEdit = () => {
  const { data: session, status } = useSession()
  const { homeClosingContext, setRouteContext } = useAppContext()
  
  useEffect(() => setRouteContext(manageRouteName.LENDERS_EDIT), [])
  return(
    <SessionEditExistingLender
      existingLenders={homeClosingContext.lenders}
      existingTask={homeClosingContext?.tasks?.find(t => t.category === "lenders") ?? {} as TaskContext}
    />
  )
}

export default LendersEdit;