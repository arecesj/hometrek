'use client'

import { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DataTable from "./DataTable"
import { columns } from "./DataTable/columns"

type TaskTableProps = {
  tasks: TaskContext[]
}

const TaskTable: FC<TaskTableProps> = ({ tasks }) => {
  return (
    <Card x-chunk="dashboard-05-chunk-4">
      <CardHeader className="px-7 bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
          Closing tasks
          </CardTitle>
          <CardDescription>
            The steps that bring you closer to your dream home
          </CardDescription>
        </div>  
      </CardHeader>
      <CardContent className="p-7 text-sm">
        <DataTable data={tasks} columns={columns} />
      </CardContent>
    </Card>
  )
}

export default TaskTable