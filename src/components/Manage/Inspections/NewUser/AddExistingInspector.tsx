'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { manageRouteName, manageRoutes } from '@/constants/routes'
import { useAppContext } from '@/context'
import AddInspectorForm from "../AddInspectorForm";

const FormSchema = z.object({
  name: z.string().optional(),
  cost: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Cost has to be a number"
  }).optional(),
  date: z.date().optional(),
})

const AddExistingInspector = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const { homeClosingContext, homeClosingContext: { inspections } , setHomeClosingContext } = useAppContext()
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { name, date, cost } = data
    let i: InspectionsContext;

    if((name || date || cost) && !isDisabled) {
      i = {
        hasInspector: true,
        hasInspected: !!date && date < new Date(),
        inspectionDetails: {
          name,
          date,
          cost
        }
      }
    } else {
      i = {
        hasInspector: isDisabled,
        hasInspected: isDisabled,
        inspectionDetails: null
      }
    }

    setHomeClosingContext({
      ...homeClosingContext,
      inspections: {
        ...inspections,
        ...i
      }
    })
    router.push(manageRoutes[manageRouteName.APPRAISALS].route)
  }

  return (
    <AddInspectorForm
      form={form}
      onSubmit={onSubmit}
      isDisabled={isDisabled}
      setDisabled={setDisabled}
    />
  )
}

export default AddExistingInspector;