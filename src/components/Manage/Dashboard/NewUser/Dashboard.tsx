'use client'

import { useEffect, useState } from "react"
import { useAppContext } from "@/context"
import { generateNewUserTasks } from "@/constants/newUserTasks"
import TaskTable from "../../TaskTable"
import CostBreakdown from "../CostBreakdown.tsx"
import LoadingSpinner from "@/components/LoadingSpinner"


const Dashboard = () => {
  const { homeClosingContext, setHomeClosingContext} = useAppContext()
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if(!homeClosingContext.tasks?.length) {
      const tasks = generateNewUserTasks(homeClosingContext);
      
      setHomeClosingContext({
        ...homeClosingContext,
        tasks
      })
    }

    setLoading(false)
  }, [])
  return (
    <>
    {isLoading ? (
      <LoadingSpinner />
    ) : (
      // TOD) @arecesj: add grid back in for when cost breakdown comes back in
      // <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
          <TaskTable tasks={homeClosingContext.tasks ?? []} />
        </div>
        {/* <CostBreakdown /> */}
      </div>
    )}
    </>
  )
}

export default Dashboard