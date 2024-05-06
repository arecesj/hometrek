'use client'

import Inpsections from "@/components/Manage/Inspections"
import PageFoundation from "@/components/Manage/PageFoundation"
import { manageRouteName } from "@/constants/routes"


const InpsectionsPage = () => {
  return (
    <PageFoundation routeName={manageRouteName.INSPECTIONS}>
      <Inpsections />
    </PageFoundation>
  )
}

export default InpsectionsPage