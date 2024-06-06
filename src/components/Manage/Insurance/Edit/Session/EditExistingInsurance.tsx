'use client'

import {  useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import TaskDetails from "../../../Edit/TaskDetails"
import EditSubheader from "../../../Edit/EditSubHeader"
import { getPlaidLiabilities } from "@/client/plaid"
import { useAppContext } from "@/context"
import { manageRouteName, manageRoutes } from "@/constants/routes"

const TaskFormSchema = z.object({
  task: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
})

const EditExistingInsurance = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  const { homeClosingContext, setHomeClosingContext } = useAppContext()
  const existingTask = !!homeClosingContext.tasks ? homeClosingContext?.tasks?.find(t => t?.category === "insurance") : {} as TaskContext
  const [isConnected, setConnected] = useState<boolean>(false)
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

  return (
    <div>EditExistingInsurance</div>
  )
}

export default EditExistingInsurance

