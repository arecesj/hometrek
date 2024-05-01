'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import AddExistingInspector from "./AddExistingInspector"
import { aggRouteName } from "@/constants/routes"
import { isUserAuthenticated } from "@/utils/helpers"

const Inpsections = () => {
  const { data: session, status } = useSession()
  const { aggContext, setAggContext } = useAppContext()

  useEffect(() => setAggContext({ ...aggContext, route: aggRouteName.INSPECTIONS }), [])
  return (
    <div>
      <SubHeader
        subHeaderContent={"Let's keep track of your inspection"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={!isUserAuthenticated(status)}
      />
      <AddExistingInspector />
    </div>
  )
}

export default Inpsections