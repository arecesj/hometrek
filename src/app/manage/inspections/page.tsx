'use client'

import Inspections from "@/components/Manage/Inspections"
import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"


const InspectionsPage = () => {
  return (
    <PageFoundation routeName={manageRouteName.INSPECTIONS}>
      <Inspections />
    </PageFoundation>
  )
}

export default InspectionsPage