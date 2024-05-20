'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { manageRouteName, manageRoutes } from '@/constants/routes'
import { useAppContext } from '@/context'
import AddAppraiserForm from "../AddAppraiserForm";

const FormSchema = z.object({
  name: z.string().optional(),
  cost: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Cost has to be a number"
  }).optional(),
  date: z.date().optional(),
})

const AddExistingAppraiser = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const { homeClosingContext, homeClosingContext: { appraisals } , setHomeClosingContext } = useAppContext()
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { name, date, cost } = data
    let i: AppraisalsContext;
    if((name || date || cost) && !isDisabled) {
      i = {
        hasAppraiser: true,
        hasAppraised: !!date && date < new Date(),
        appraisalDetails: {
          name,
          date,
          cost
        }
      }
    } else {
      i = {
        hasAppraiser: isDisabled,
        hasAppraised: isDisabled,
        appraisalDetails: null
      }
    }

    setHomeClosingContext({
      ...homeClosingContext,
      appraisals: {
        ...appraisals,
        ...i
      }
    })
    router.push(manageRoutes[manageRouteName.INSURANCE].route)
  }

  return (
    <AddAppraiserForm
      form={form}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
      setDisabled={setDisabled}
    />
  )
}

export default AddExistingAppraiser;