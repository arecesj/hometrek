'use client'

import { useEffect } from "react";
import FindExistingMortgage from "./FindExistingMortgage";
import SubHeader from "@/components/Agg/Subheader";
import { useAppContext } from "@/context";
import { aggRouteName } from "@/constants/routes";

const Lenders = () => {
  const { aggContext, setAggContext } = useAppContext()
  
  useEffect(() => setAggContext({ ...aggContext, route: aggRouteName.LENDERS }), [])
  return (
    <>
      <SubHeader
        subHeaderContent={"Let's grab your existing mortgage"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={true}
      />
      <FindExistingMortgage />
    </>
  )
}

export default Lenders