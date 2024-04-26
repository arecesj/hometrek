'use client'

import { useEffect } from "react"
import { trekRouteName, trekRoutes } from "@/constants/routes"
import { useAppContext } from "@/context";
import SubHeader from "../SubHeader.tsx"

const ClosingDay = () => {
  const { context, setContext } = useAppContext()

  useEffect(() => setContext({ ...context, route: trekRouteName.CLOSINGDAY }), [])
  return(
    <>
      <SubHeader
        subHeaderContent={"Let's get you the keys to your dream home"}
        showPreviousButton={true}
        previousButtonContent={"Back to Title Insurance"}
        previousButtonHref={trekRoutes[trekRouteName.TITLE].route}
        nextButtonContent={"Next: Dashboard"}
        nextButtonHref={trekRoutes[trekRouteName.DASHBOARD].route}
      />
    </>
  )
}

export default ClosingDay