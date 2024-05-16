'use client'

import { Dispatch, FC, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, priorities, statuses } from "../TaskTable/DataTable/data/data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"

type TaskDetailsProps = {
  existingTask: TaskContext;
  isUpdateTaskDisabled: boolean;
  setUpdateTaskDisabled: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: { task?: string; status?: string; priority?: string; }) => Promise<void>;
  form: UseFormReturn<{ task?: string; status?: string; priority?: string; }, any, undefined>
}

const TaskDetails: FC<TaskDetailsProps> = (props) => {
  const {
    existingTask,
    isUpdateTaskDisabled,
    setUpdateTaskDisabled,
    form,
    onSubmit
  } = props

  // const existingCategoryLabel = categories.find(c => c.value === existingTask.category)?.label
  const existingStatusLabel = statuses.find(s => s.value === existingTask?.status)?.label
  const existingPriorityLabel = priorities.find(p => p.value === existingTask?.priority)?.label
  
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="bg-muted/50">
            <CardTitle className="group grid grid-cols-2 items-center gap-2 text-lg">
              Task Details
              <div className="flex justify-end space-x-2">
                <Button
                  type="submit"
                  className="w-[116px] self-end"
                  disabled={isUpdateTaskDisabled}
                >
                  Update Task
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Update your task details here
            </CardDescription>
        </CardHeader>
        <CardContent className="p-4 text-sm">
          <div className="pt-1">
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                    Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        defaultValue={existingTask?.task}
                        onChange={e => {
                          setUpdateTaskDisabled(false)
                          field.onChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 pt-3">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={e => {
                        setUpdateTaskDisabled(false)
                        field.onChange(e)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder={existingStatusLabel} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map((status) =>
                          <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>  
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={e => {
                          setUpdateTaskDisabled(false)
                          field.onChange(e)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="priority" aria-label="Select priority">
                            <SelectValue placeholder={existingPriorityLabel} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities.map((priority) =>
                            <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>  
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
            </div>
          </div>
        </CardContent>
      </Card>
        </form>
      </Form>
    </div>
  )
}

export default TaskDetails