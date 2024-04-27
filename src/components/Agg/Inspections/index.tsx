'use client'

import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import AddExistingInspector from "./AddExistingInspector"
import { aggRouteName } from "@/constants/routes"
import { useEffect } from "react"

const Inpsections = () => {
  const { aggContext, setAggContext } = useAppContext()

  useEffect(() => setAggContext({ ...aggContext, route: aggRouteName.INSPECTIONS }), [])
  return (
    <>
      <SubHeader
        subHeaderContent={"Let's keep track of your inspection"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={true}
      />
      <AddExistingInspector />
    </>
  )
}

export default Inpsections