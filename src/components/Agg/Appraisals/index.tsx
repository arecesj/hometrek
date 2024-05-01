'use client'

import { useSession } from "next-auth/react"
import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { aggRouteName } from "@/constants/routes"
import { useEffect } from "react"
import AddExistingAppraiser from "./AddExistingAppraiser"
import { isUserAuthenticated } from "@/utils/helpers"

const Appraisals = () => {
  const { data: session, status } = useSession()
  const { aggContext, setAggContext } = useAppContext()

  useEffect(() => setAggContext({ ...aggContext, route: aggRouteName.APPRAISALS }), [])
  return (
    <div>
      <SubHeader
        subHeaderContent={"Let's keep track of the home appraisal"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={!isUserAuthenticated(status)}
      />
      <AddExistingAppraiser />
    </div>
  )
}

export default Appraisals
