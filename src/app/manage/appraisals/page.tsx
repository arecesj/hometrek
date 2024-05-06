'use client'

import Appraisals from "@/components/Manage/Appraisals"
import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"

const AppraisalsPage = () => {
  return (
    <PageFoundation routeName={manageRouteName.APPRAISALS}>
      <Appraisals />
    </PageFoundation>
  )
}

export default AppraisalsPage