'use client'

import { useEffect } from "react"
import { routeNames, routes } from "@/constants/routes"
import { useAppContext } from "@/context";
import SubHeader from "../SubHeader.tsx"

const Appraisals = () => {
  const { context, setContext } = useAppContext()

  useEffect(() => setContext({ ...context, route: routeNames.APPRAISALS }), [])
  return(
    <>
      <SubHeader
        subHeaderContent={"Find the best home appraisers in your area"}
        showPreviousButton={true}
        previousButtonContent={"Back to Inspections"}
        previousButtonHref={routes[routeNames.INSPECTIONS].route}
        nextButtonContent={"Next: Find Insurance"}
        nextButtonHref={routes[routeNames.INSURANCE].route}
      />
    </>
  )
}

export default Appraisals