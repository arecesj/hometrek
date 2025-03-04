'use client'

import { useEffect } from "react"
import { trekRouteName, trekRoutes } from "@/constants/routes"
import { useAppContext } from "@/context";
import SubHeader from "@/components/Trek/SubHeader.tsx"

const Appraisals = () => {
  const { setRouteContext } = useAppContext()

  useEffect(() => setRouteContext(trekRouteName.APPRAISALS), [])
  return(
    <div>
      <SubHeader
        subHeaderContent={"Find the best home appraisers in your area"}
        showPreviousButton={true}
        previousButtonContent={"Back to Inspections"}
        previousButtonHref={trekRoutes[trekRouteName.INSPECTIONS].route}
        nextButtonContent={"Next: Insurance"}
        nextButtonHref={trekRoutes[trekRouteName.INSURANCE].route}
      />
    </div>
  )
}

export default Appraisals