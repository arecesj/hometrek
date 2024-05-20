'use client'

import {  useEffect, useState } from "react"
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
import { createTitle, deleteTitle, getTitle, updateTitle } from "@/client/title";
import { getTask, updateTask } from "@/client/tasks";
import LoadingSpinner from "@/components/LoadingSpinner";

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
  const [existingTask, setExistingTask] = useState<TaskContext>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isUpdateTitleDisabled, setUpdateTitleDisabled] = useState<boolean>(true)
  const [isUpdateTaskDisabled, setUpdateTaskDisabled] = useState<boolean>(true)

  const successToast = (title: string, description: string) => {
    return toast({
      title,
      description,
    })
  }

  const failureToast = (title: string, description: string) => {
    return toast({
      variant: "destructive",
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
    const updatedTitle = {
      hasTitleAgent: true,
      hasTitleTransfer: !!date && date < new Date(),
      titleDetails: {
        name: !!name?.length ? name : homeClosingContext.title?.titleDetails?.name,
        date: !!date ?  date : homeClosingContext.title?.titleDetails?.date,
        cost: !!cost?.length ? cost : homeClosingContext.title?.titleDetails?.cost,
      }
    }

    let resp;
    if(!!homeClosingContext?.title?.id) {
      resp = await updateTitle({
        id: homeClosingContext?.title?.id,
        ...updatedTitle
      })
    } else {
      resp = await createTitle(updatedTitle)
    }

    if(resp.ok) {
      const respBody = await resp.json()
      setHomeClosingContext({
        ...homeClosingContext,
        title: {
          ...homeClosingContext.title,
          ...respBody.title
        },
      })
      successToast("Successfully saved your title information!", "")
      setUpdateTitleDisabled(true)
    } else {
      failureToast("Uh oh! Something went wrong.", "Unable to update title information right now")
    }
  }

  const deleteExistingTitle = async () => {
    const resetTaskAndRedirect = async () => {
      const editedTask = {
        ...existingTask,
        status: "todo",
      }
      await updateTask(editedTask)
      successToast("Successfully deleted your title!", "Redirecting you back to the dashboard.")
      router.push(manageRoutes[manageRouteName.DASHBOARD].route)
    }
    if(!!homeClosingContext?.title?.id) {
      const response = await deleteTitle(homeClosingContext?.title?.id ?? "")
      if (response.ok) {
        await resetTaskAndRedirect()
        
      }
      else {
        failureToast("Oh no! There was an issue deleting your title", response.statusText)
      }
    } else {
      await resetTaskAndRedirect()
    }
  }

  // TASK FORM
  // TASK FORM
  // TASK FORM
  const taskForm = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
  });
  
  const updateExistingTask = async (data: z.infer<typeof TaskFormSchema>) => {
    const { task, status, priority } = data
    
    const editedTask = {
      ...existingTask,
      task: !!task?.length ? task : existingTask.task,
      status: !!status?.length ? status : existingTask.status,
      priority: !!priority?.length ? priority: existingTask.priority
    }
    const taskResponse = await updateTask(editedTask)
    if (taskResponse.ok) {

      // TODO @arecesj: This seems lazy and will probably introduce some sort of bug.
      // Keep an eye on it
      // Why I did it: So the side nav triggers :shrug:
      setHomeClosingContext({
        ...homeClosingContext,
        tasks: existingTask,
      })
      successToast("Successfully updated your task!", "")
      setUpdateTaskDisabled(true)
    }
    else {
      failureToast("Oh no! There was an issue updating your lender", taskResponse.statusText)
    }
  }

  const getDetails = async () => {
    const [titleResp, taskResp] = await Promise.all([getTitle(), getTask()])
    const [titleBody, tasksBody] = await Promise.all([titleResp.json(), taskResp.json()])
    const existingTask = tasksBody.tasks?.find(t => t.category === "title") ?? {} as TaskContext
    
    setHomeClosingContext({
      ...homeClosingContext,
      title: {
        ...titleBody.title
      }
    })
    setExistingTask(existingTask)
  }

  useEffect(() => {
    if(!homeClosingContext?.title || !existingTask) getDetails()
    
    setLoading(!homeClosingContext?.title && !existingTask)
  }, [homeClosingContext?.title, existingTask])
  
  return(
    <div>
      <EditSubheader
        subHeaderContent="Edit your existing title details"
        onDelete={() => deleteExistingTitle()}
        onDeleteText="Delete details"
        onCancel={() => router.push(manageRoutes[manageRouteName.DASHBOARD].route)}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </div>
  )
}

export default EditExistingTitle