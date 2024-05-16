'use client'

import {  useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import TaskDetails from "../../../Edit/TaskDetails";
import EditSubheader from "../../../Edit/EditSubHeader";
import { useAppContext } from "@/context";
import { manageRouteName, manageRoutes } from "@/constants/routes";
import ClosingDayDetails from "../ClosingDayDetails";

const ClosingDayFormSchema = z.object({
  date: z.date().optional(),
})

const TaskFormSchema = z.object({
  task: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
})

const EditExistingClosingDay = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const { homeClosingContext, setHomeClosingContext } = useAppContext()
  const existingTask = !!homeClosingContext.tasks ? homeClosingContext?.tasks?.find(t => t?.category === "closingday") : {} as TaskContext
  const [isUpdateClosingDayDisabled, setUpdateClosingDayDisabled] = useState<boolean>(true)
  const [isUpdateTaskDisabled, setUpdateTaskDisabled] = useState<boolean>(true)

  const successToast = (title: string, description: string) => {
    return toast({
      title,
      description,
    })
  }

  // CLOSING DAY FORM
  // CLOSING DAY FORM
  // CLOSING DAY FORM
  const closingDayForm = useForm<z.infer<typeof ClosingDayFormSchema>>({
    resolver: zodResolver(ClosingDayFormSchema),
  });

  const updateExistingClosingDay = async (data: z.infer<typeof ClosingDayFormSchema>) => {
    const { date } = data
    let i: ClosingDayContext
    if(date) {
      i = {
        hasClosed: !!date && date < new Date(),
        closingDate: date
      }
      // TODO @arecesj: I dont think I need this
    } else {
      i = {
        hasClosed: false,
        closingDate: null
      }
    }

    setHomeClosingContext({
      ...homeClosingContext,
      closingDay: {
        ...homeClosingContext.closingDay,
        ...i
      },
    })
    successToast("Successfully saved your closing day information!", "")
    setUpdateClosingDayDisabled(true)
  }

  const deleteExistingClosingDay = async () => {
    const updatedTasks = !!homeClosingContext.tasks && homeClosingContext.tasks.map(task => {
      if(!!task && task?.id === existingTask.id) {
        task.status = "todo"
      }
      return task; 
    })
    setHomeClosingContext({
      ...homeClosingContext,
      closingDay: null,
      tasks: updatedTasks,
    })
    successToast("Successfully deleted your closing day details!", "Redirecting you back to the previous page.")
    router.back()
  }

  // TASK FORM
  // TASK FORM
  // TASK FORM
  const taskForm = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
  });
  
  const updateExistingTask = async (data: z.infer<typeof TaskFormSchema>) => {
    const { task, status, priority } = data
    const updatedTasks = homeClosingContext.tasks.map(t => {
      if(t.category === existingTask.category) {
        return {
          ...existingTask,
          task: !!task?.length ? task : existingTask.task,
          status: !!status?.length ? status : existingTask.status,
          priority: !!priority?.length ? priority: existingTask.priority
        }
      }
      return t
    })

    setHomeClosingContext({
      ...homeClosingContext,
      tasks: updatedTasks
    })

    successToast("Successfully updated your task!", "")
    setUpdateTaskDisabled(true)
  }
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing closing day details"
        onDelete={() => deleteExistingClosingDay()}
        onDeleteText="Delete details"
        onCancel={() => router.push(manageRoutes[manageRouteName.DASHBOARD].route)}
      />
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-span-2">
          <ClosingDayDetails
            isUpdateClosingDayDisabled={isUpdateClosingDayDisabled}
            setUpdateClosingDayDisabled={setUpdateClosingDayDisabled}
            form={closingDayForm}
            onSubmit={updateExistingClosingDay}
          />
        </div>
        <TaskDetails
          existingTask={existingTask}
          isUpdateTaskDisabled={isUpdateTaskDisabled}
          setUpdateTaskDisabled={setUpdateTaskDisabled}
          form={taskForm}
          onSubmit={updateExistingTask}
        />
      </div>
    </div>
  )
}

export default EditExistingClosingDay