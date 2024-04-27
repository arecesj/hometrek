'use client'

import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { aggRouteName } from "@/constants/routes"
import { useEffect } from "react"
import FindExistingInsurance from "./FindExistingInsurance"

const Insurance = () => {
  const { aggContext, setAggContext } = useAppContext()

  useEffect(() => setAggContext({ ...aggContext, route: aggRouteName.INSURANCE }), [])
  return (
    <>
      <SubHeader
        subHeaderContent={"Let's keep track of your home insurance"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={true}
      />
      <FindExistingInsurance />
    </>
  )
}

export default Insurance