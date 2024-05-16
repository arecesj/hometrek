'use client'

import InspectionsEdit from "@/components/Manage/Inspections/Edit"
import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"

const InspectionsEditPage = () => {
  return(
    <PageFoundation routeName={manageRouteName.INSPECTIONS_EDIT}>
      <InspectionsEdit />
    </PageFoundation>
  )
}

export default InspectionsEditPage