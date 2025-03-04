'use client'

import { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories, priorities, statuses } from "../data/data"

type TaskDialogContentProps = {
  currTask: {
    id?: string;
    category?: string;
    task?: string;
    status?:
    string;
    priority?: string;
  }
}
const TaskDialogContent: FC<TaskDialogContentProps> = ({ currTask }) => {
  return (
    <DialogContent className="w-[300px]">
      <DialogHeader>
        <DialogTitle>
          Edit task
        </DialogTitle>
        <DialogDescription>
          Update the category, status, or priority of the task
        </DialogDescription>
      </DialogHeader>
        <Select>
          <SelectTrigger className="w-[100%]">
            <SelectValue placeholder={"Edit the category"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[100%]">
            <SelectValue placeholder={"Edit the status"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Statuses</SelectLabel>
              {statuses.map((status) =>
                <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>  
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[100%]">
            <SelectValue placeholder={"Edit the priority"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Priorities</SelectLabel>
              {priorities.map((priority) => 
                <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>  
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogClose asChild>
          <Button type="button" variant="default">
            Save
          </Button>
        </DialogClose>
    </DialogContent>
  )
}

export default TaskDialogContent
