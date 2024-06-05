'use client'

import InsuranceEdit from "@/components/Manage/Insurance/Edit"
import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"

const InsuranceEditPage = () => {
  return(
    <PageFoundation routeName={manageRouteName.INSURANCE_EDIT}>
      <InsuranceEdit />
    </PageFoundation>
  )
}

export default InsuranceEditPage