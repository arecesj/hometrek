'use client'

import { useEffect } from "react"
import { trekRouteName, trekRoutes } from "@/constants/routes"
import { useAppContext } from "@/context"
import SubHeader from "@/components/Trek/SubHeader.tsx"

const Title = () => {
  const { setRouteContext } = useAppContext()

  useEffect(() => setRouteContext(trekRouteName.TITLE), [])
  return(
    <div>
      <SubHeader
        subHeaderContent={"Find the best title insurance in your area"}
        showPreviousButton={true}
        previousButtonContent={"Back to Insurance"}
        previousButtonHref={trekRoutes[trekRouteName.INSURANCE].route}
        nextButtonContent={"Next: Dashboard"}
        nextButtonHref={trekRoutes[trekRouteName.DASHBOARD].route}
      />
    </div>
  )
}

export default Title