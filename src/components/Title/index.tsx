'use client'

import { useEffect } from "react"
import { routeNames, routes } from "@/constants/routes"
import { useAppContext } from "@/context";
import SubHeader from "../SubHeader.tsx"

const Title = () => {
  const { context, setContext } = useAppContext()

  useEffect(() => setContext({ ...context, route: routeNames.TITLE }), [])
  return(
    <>
      <SubHeader
        subHeaderContent={"Find the best title insurance in your area"}
        showPreviousButton={true}
        previousButtonContent={"Back to Home Insurance"}
        previousButtonHref={routes[routeNames.INSURANCE].route}
        nextButtonContent={"Next: Closing Day"}
        nextButtonHref={routes[routeNames.CLOSINGDAY].route}
      />
    </>
  )
}

export default Title