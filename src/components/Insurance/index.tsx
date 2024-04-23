'use client'

import { useEffect } from "react"
import { routeNames, routes } from "@/constants/routes"
import { useAppContext } from "@/context";
import SubHeader from "../SubHeader.tsx"

const Insurance = () => {
  const { context, setContext } = useAppContext()

  useEffect(() => setContext({ ...context, route: routeNames.INSURANCE }), [])
  return(
    <>
      <SubHeader
        subHeaderContent={"Find the best home insurance in your area"}
        showPreviousButton={true}
        previousButtonContent={"Back to Appraisals"}
        previousButtonHref={routes[routeNames.APPRAISALS].route}
        nextButtonContent={"Next: Find Title"}
        nextButtonHref={routes[routeNames.TITLE].route}
      />
    </>
  )
}

export default Insurance