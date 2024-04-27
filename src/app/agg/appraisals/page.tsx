'use client'

import Appraisals from "@/components/Agg/Appraisals"
import PageFoundation from "@/components/Agg/PageFoundation"
import { aggRouteName } from "@/constants/routes"

const AppraisalsPage = () => {
  return (
    <PageFoundation routeName={aggRouteName.APPRAISALS}>
      <Appraisals />
    </PageFoundation>
  )
}

export default AppraisalsPage