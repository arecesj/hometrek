'use client'

import { useEffect } from "react"
import { trekRouteName, trekRoutes } from "@/constants/routes"
import { useAppContext } from "@/context";
import SubHeader from "../SubHeader.tsx"

const Title = () => {
  const { context, setContext } = useAppContext()

  useEffect(() => setContext({ ...context, route: trekRouteName.TITLE }), [])
  return(
    <>
      <SubHeader
        subHeaderContent={"Find the best title insurance in your area"}
        showPreviousButton={true}
        previousButtonContent={"Back to Home Insurance"}
        previousButtonHref={trekRoutes[trekRouteName.INSURANCE].route}
        nextButtonContent={"Next: Closing Day"}
        nextButtonHref={trekRoutes[trekRouteName.CLOSINGDAY].route}
      />
    </>
  )
}

export default Title