'use client'

import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { aggRouteName } from "@/constants/routes"
import { useEffect } from "react"
import FindExistingTitle from "./FindExistingTitle"

const Title = () => {
  const { aggContext, setAggContext } = useAppContext()

  useEffect(() => setAggContext({ ...aggContext, route: aggRouteName.CLOSINGDAY }), [])
  return (
    <>
      <SubHeader
        subHeaderContent={"Let's keep track of your home title"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={true}
      />
      <FindExistingTitle />
    </>
  )
}

export default Title