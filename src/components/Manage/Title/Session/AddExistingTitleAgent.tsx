'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { manageRouteName, manageRoutes } from '@/constants/routes'
import { useAppContext } from '@/context'
import AddTitleAgentForm from "../AddTitleAgentForm";
import { createTitle } from "@/client/title";
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  name: z.string().optional(),
  cost: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Cost has to be a number"
  }).optional(),
  date: z.date().optional(),
})

const AddExistingTitleAgent = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const { homeClosingContext, homeClosingContext: { title } , setHomeClosingContext } = useAppContext()
  const router = useRouter()
  const { toast } = useToast()

  const createSuccessToast = () => {
    return toast({
      title: "Successfully saved your title information.",
      description: "Moving on to Insurance.",
    })
  }

  const createFailureToast = () => {
    return toast({
      variant: "destructive",
      title: "Oh no! We're unable to update your title information right now.",
      description: "Let's try again later.",
    })
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { name, date, cost } = data
    let i: TitleContext;
    
    if((name || date || cost) && !isDisabled) {
      i = {
        hasTitleAgent: !!name.length,
        hasTitleTransfer: !!date && date < new Date(),
        titleDetails: {
          name,
          date,
          cost
        }
      }
    } else {
      i = {
        hasTitleAgent: isDisabled,
        hasTitleTransfer: isDisabled,
        titleDetails: null
      }
    }

    const resp = await createTitle(i)
    if(resp.ok) {
      setHomeClosingContext({
        ...homeClosingContext,
        title: {
          ...title,
          ...i
        }
      })
      createSuccessToast()
      router.push(manageRoutes[manageRouteName.DASHBOARD].route)
    } else {
      createFailureToast()
    }
  }

  return (
    <AddTitleAgentForm
      form={form}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
      setDisabled={setDisabled}
    />
  )
}

export default AddExistingTitleAgent;