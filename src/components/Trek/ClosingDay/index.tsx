'use client'

import { useEffect } from "react"
import { trekRouteName, trekRoutes } from "@/constants/routes"
import { useAppContext } from "@/context"
import SubHeader from "@/components/SubHeader.tsx"

const ClosingDay = () => {
  const { trekContext, setTrekContext } = useAppContext()

  useEffect(() => setTrekContext({ ...trekContext, route: trekRouteName.CLOSINGDAY }), [])
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