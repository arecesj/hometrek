'use client'

import { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, priorities, statuses } from "../TaskTable/DataTable/data/data"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type TaskDetailsProps = {
  existingTask: TaskContext;
  editedTask: TaskContext;
  setEditedTask: (e: TaskContext) => void;
}

const TaskDetails: FC<TaskDetailsProps> = (props) => {
  const {
    existingTask,
    editedTask,
    setEditedTask
  } = props

  const existingCategoryLabel = categories.find(c => c.value === existingTask.category)?.label
  const existingStatusLabel = statuses.find(s => s.value === existingTask.status)?.label
  const existingPriorityLabel = priorities.find(p => p.value === existingTask.priority)?.label
  
  return (
    <div>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Task Details
            </CardTitle>
            <CardDescription>
              Update your task details here
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="pb-6">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              defaultValue={editedTask?.task}
              placeholder="Task description"
              onChange={(e) => {
                e.preventDefault()
                setEditedTask({
                  ...editedTask,
                  task: e.target.value
                })
              }}
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="grid gap-3">
              <Label htmlFor="category">Categories</Label>
              <Select onValueChange={(category: string) => setEditedTask({...editedTask, category})}>
                <SelectTrigger id="category" aria-label="Select category">
                  <SelectValue placeholder={existingCategoryLabel} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(status: string) => setEditedTask({...editedTask, status})}>
                <SelectTrigger id="status" aria-label="Select status">
                  <SelectValue placeholder={existingStatusLabel} />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) =>
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>  
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(priority: string) => setEditedTask({...editedTask, priority})}>
                <SelectTrigger id="priority" aria-label="Select priority">
                  <SelectValue placeholder={existingPriorityLabel} />
                </SelectTrigger>
                <SelectContent>
                {priorities.map((priority) => 
                  <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>  
                )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskDetails