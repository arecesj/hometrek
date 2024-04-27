'use client'

import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { aggRouteName, aggRoutes } from '@/constants/routes'
import { useAppContext } from '@/context'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const FormSchema = z.object({
  name: z.string().optional(),
  cost: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Cost has to be a number"
  }).optional(),
  date: z.date().optional(),
})

const AddExistingAppraiser = () => {
  const { aggContext, aggContext: { appraisals } , setAggContext } = useAppContext()
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

const onSubmit = (data: z.infer<typeof FormSchema>) => {
  const { name, date, cost } = data
  let i: AggAppraisalsContext;
  
  if(name || date || cost) {
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
      hasAppraiser: false,
      hasAppraised: false,
      appraisalDetails: null
    }
  }

  setAggContext({
    ...aggContext,
    appraisals: {
      ...appraisals,
      ...i
    }
  })
  router.push(aggRoutes[aggRouteName.INSURANCE].route)
}

  const formFieldClassName = "w-[100%]"
    return (
      <div className="flex justify-center">
        <Card className="w-[850px]">
          <CardHeader className="px-7 bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Enter your home appraiser information
              </CardTitle>
            </div>
            <CardDescription>Deets for the apraisa</CardDescription>
          </CardHeader>
          <CardContent className="p-7">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-6">
                <div className={formFieldClassName}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Home Appraiser Company</FormLabel>
                        <FormDescription>
                          The company working with you
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={formFieldClassName}>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of appraisal</FormLabel>
                        <FormDescription>
                        Select the date of the home appraisal
                        </FormDescription>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[100%] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={formFieldClassName}>
                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Appraisal price</FormLabel>
                          <FormDescription>
                            A rough estimate of the cost of the home appraisal
                          </FormDescription>
                          <FormControl>
                            <Input type="number" {...field } />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }
                      
                    }
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="submit"
                    className="w-[116px] self-end"
                  >
                    Submit
                  </Button>
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-[116px] self-end"
                  >
                    Skip, for now
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
}

export default AddExistingAppraiser;