'use client'

import FindExistingMortgage from "./FindExistingMortgage";
import SubHeader from "@/components/Agg/Subheader";

const Lenders = () => {
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