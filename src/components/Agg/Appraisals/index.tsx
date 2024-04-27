'use client'

import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { aggRouteName } from "@/constants/routes"
import { useEffect } from "react"
import AddExistingAppraiser from "./AddExistingAppraiser"

const Appraisals = () => {
  const { aggContext, setAggContext } = useAppContext()

  useEffect(() => setAggContext({ ...aggContext, route: aggRouteName.APPRAISALS }), [])
  return (
    <div>
      <SubHeader
        subHeaderContent={"Let's keep track of the home appraisal"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={true}
      />
      <AddExistingAppraiser />
    </div>
  )
}

export default Appraisals
