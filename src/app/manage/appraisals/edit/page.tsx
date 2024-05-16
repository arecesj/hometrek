'use client'

import AppraisalsEdit from "@/components/Manage/Appraisals/Edit"
import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"

const AppraisalsEditPage = () => {
  return(
    <PageFoundation routeName={manageRouteName.APPRAISALS_EDIT}>
      <AppraisalsEdit />
    </PageFoundation>
  )
}

export default AppraisalsEditPage