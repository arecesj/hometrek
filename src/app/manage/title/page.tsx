'use client'

import PageFoundation from "@/components/Manage/PageFoundation"
import Title from "@/components/Manage/Title"
import { manageRouteName } from "@/constants/routes"

const TitlePage = () => {
  return (
    <PageFoundation routeName={manageRouteName.TITLE}>
      <Title />
    </PageFoundation>
  )
}

export default TitlePage