'use client'

import { useAppContext } from "@/context"
import SubHeader from "../Subheader"
import { aggRouteName } from "@/constants/routes"
import { useEffect } from "react"
import CostBreakdown from "./CostBreakdown.tsx"
import TaskTable from "../TaskTable"
import { generateNewUserTasks } from "@/constants/newUserTasks"

const Dashboard = () => {
  const { aggContext, setAggContext } = useAppContext()
  const tasks = generateNewUserTasks(aggContext);

  useEffect(() => setAggContext({ ...aggContext, route: aggRouteName.DASHBOARD }), [])
  return (
    <div>
      <SubHeader
        subHeaderContent={"Where we track it all"}
        showPreviousButton={false}
        previousButtonContent={""}
        previousButtonHref={""}
        showCreateProfileButton={true}
      />
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
          <TaskTable tasks={tasks} />
        </div>
        <CostBreakdown />
      </div>
      
    </div>
  )
}

export default Dashboard