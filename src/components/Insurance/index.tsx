'use client'

import { useEffect } from "react"
import { trekRouteName, trekRoutes } from "@/constants/routes"
import { useAppContext } from "@/context";
import SubHeader from "../SubHeader.tsx"

const Insurance = () => {
  const { context, setContext } = useAppContext()

  useEffect(() => setContext({ ...context, route: trekRouteName.INSURANCE }), [])
  return(
    <>
      <SubHeader
        subHeaderContent={"Find the best home insurance in your area"}
        showPreviousButton={true}
        previousButtonContent={"Back to Appraisals"}
        previousButtonHref={trekRoutes[trekRouteName.APPRAISALS].route}
        nextButtonContent={"Next: Title Insurance"}
        nextButtonHref={trekRoutes[trekRouteName.TITLE].route}
      />
    </>
  )
}

export default Insurance