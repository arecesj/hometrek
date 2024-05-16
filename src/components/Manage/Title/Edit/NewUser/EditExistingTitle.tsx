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
import TitleDetails from "../TitleDetails";

const TitleFormSchema = z.object({
  name: z.string().optional(),
  cost: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Cost has to be a number"
  }).optional(),
  date: z.date().optional(),
})

const TaskFormSchema = z.object({
  task: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
})

const EditExistingTitle = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const { homeClosingContext, setHomeClosingContext } = useAppContext()
  const existingTask = !!homeClosingContext.tasks ? homeClosingContext?.tasks?.find(t => t?.category === "title") : {} as TaskContext
  const [isUpdateTitleDisabled, setUpdateTitleDisabled] = useState<boolean>(true)
  const [isUpdateTaskDisabled, setUpdateTaskDisabled] = useState<boolean>(true)

  const successToast = (title: string, description: string) => {
    return toast({
      title,
      description,
    })
  }

  // TITLE FORM
  // TITLE FORM
  // TITLE FORM
  const titleForm = useForm<z.infer<typeof TitleFormSchema>>({
    resolver: zodResolver(TitleFormSchema),
  });

  const updateExistingTitle = async (data: z.infer<typeof TitleFormSchema>) => {
    const { name, date, cost } = data
    let i: TitleContext
    if((name || date || cost)) {
      i = {
        hasTitleAgent: true,
        hasTitleTransfer: !!date && date < new Date(),
        titleDetails: {
          name: !!name?.length ? name : homeClosingContext.title?.titleDetails?.name,
          date: !!date ?  date : homeClosingContext.title?.titleDetails?.date,
          cost: !!cost?.length ? cost : homeClosingContext.title?.titleDetails?.cost,
        }
      }
    } else {
      i = {
        hasTitleAgent: false,
        hasTitleTransfer: false,
        titleDetails: null
      }
    }

    setHomeClosingContext({
      ...homeClosingContext,
      title: {
        ...homeClosingContext.title,
        ...i
      },
    })
    successToast("Successfully saved your title information!", "")
    setUpdateTitleDisabled(true)
  }

  const deleteExistingTitle = async () => {
    const updatedTasks = !!homeClosingContext.tasks && homeClosingContext.tasks.map(task => {
      if(!!task && task?.id === existingTask.id) {
        task.status = "todo"
      }
      return task; 
    })
    setHomeClosingContext({
      ...homeClosingContext,
      title: null,
      tasks: updatedTasks,
    })
    successToast("Successfully deleted your title details!", "Redirecting you back to the previous page.")
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
        subHeaderContent="Edit your existing title details"
        onDelete={() => deleteExistingTitle()}
        onDeleteText="Delete details"
        onCancel={() => router.push(manageRoutes[manageRouteName.DASHBOARD].route)}
      />
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-span-2">
          <TitleDetails
            titleDetails={homeClosingContext.title?.titleDetails}
            isUpdateTitleDisabled={isUpdateTitleDisabled}
            setUpdateTitleDisabled={setUpdateTitleDisabled}
            form={titleForm}
            onSubmit={updateExistingTitle}
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

export default EditExistingTitle