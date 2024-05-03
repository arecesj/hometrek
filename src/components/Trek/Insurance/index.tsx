'use client'

import { useEffect } from "react"
import { trekRouteName, trekRoutes } from "@/constants/routes"
import { useAppContext } from "@/context"
import SubHeader from "@/components/Trek/SubHeader.tsx"

const Insurance = () => {
  const { setRouteContext } = useAppContext()

  useEffect(() => setRouteContext(trekRouteName.INSURANCE ), [])
  return(
    <div>
      <SubHeader
        subHeaderContent={"Find the best home insurance in your area"}
        showPreviousButton={true}
        previousButtonContent={"Back to Appraisals"}
        previousButtonHref={trekRoutes[trekRouteName.APPRAISALS].route}
        nextButtonContent={"Next: Title Insurance"}
        nextButtonHref={trekRoutes[trekRouteName.TITLE].route}
      />
    </div>
  )
}

export default Insurance