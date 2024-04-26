'use client'

import { useEffect } from "react"
import { routeNames, routes } from "@/constants/routes"
import { useAppContext } from "@/context";
import SubHeader from "../SubHeader.tsx"

const ClosingDay = () => {
  const { context, setContext } = useAppContext()

  useEffect(() => setContext({ ...context, route: routeNames.CLOSINGDAY }), [])
  return(
    <>
      <SubHeader
        subHeaderContent={"Let's get you the keys to your dream home"}
        showPreviousButton={true}
        previousButtonContent={"Back to Title Insurance"}
        previousButtonHref={routes[routeNames.TITLE].route}
        nextButtonContent={"Next: Dashboard"}
        nextButtonHref={routes[routeNames.DASHBOARD].route}
      />
    </>
  )
}

export default ClosingDay