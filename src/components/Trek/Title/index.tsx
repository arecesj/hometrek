'use client'

import { useEffect } from "react"
import { trekRouteName, trekRoutes } from "@/constants/routes"
import { useAppContext } from "@/context"
import SubHeader from "@/components/Trek/SubHeader.tsx"

const Title = () => {
  const { trekContext, setTrekContext } = useAppContext()

  useEffect(() => setTrekContext({ ...trekContext, route: trekRouteName.TITLE }), [])
  return(
    <div>
      <SubHeader
        subHeaderContent={"Find the best title insurance in your area"}
        showPreviousButton={true}
        previousButtonContent={"Back to Home Insurance"}
        previousButtonHref={trekRoutes[trekRouteName.INSURANCE].route}
        nextButtonContent={"Next: Closing Day"}
        nextButtonHref={trekRoutes[trekRouteName.CLOSINGDAY].route}
      />
    </div>
  )
}

export default Title