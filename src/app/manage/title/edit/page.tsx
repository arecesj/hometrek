'use client'

import PageFoundation from "@/components/Manage/PageFoundation"
import TitleEdit from "@/components/Manage/Title/Edit"
import { manageRouteName } from "@/constants/routes"

const TitleEditPage = () => {
  return(
    <PageFoundation routeName={manageRouteName.TITLE_EDIT}>
      <TitleEdit />
    </PageFoundation>
  )
}

export default TitleEditPage