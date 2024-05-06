'use client'

import { useState } from "react"
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
  CardFooter
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { manageRouteName, manageRoutes } from '@/constants/routes'
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

const AddExistingInspector = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const { homeClosingContext, homeClosingContext: { inspections } , setHomeClosingContext } = useAppContext()
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

const onSubmit = (data: z.infer<typeof FormSchema>) => {
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

  const formFieldClassName = "w-[100%]"
    return (
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-[850px]">
              <CardHeader className="px-7 bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Enter your home inspection information
                  </CardTitle>
                </div>
                <CardDescription>Deets for the inspa</CardDescription>
              </CardHeader>
              <CardContent className="p-7 w-full grid grid-cols-2 gap-6">
                <div className={formFieldClassName}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={isDisabled ? "text-slate-300" : ""}>
                          Home Inspection Company
                        </FormLabel>
                        <FormDescription className={isDisabled ? "text-slate-300" : ""}>
                          The company working with you
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder="" {...field}
                            disabled={isDisabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    disabled={isDisabled}
                  />
                </div>
                <div className={formFieldClassName}>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={isDisabled ? "text-slate-300" : ""}>
                          Date of inspection
                        </FormLabel>
                        <FormDescription className={isDisabled ? "text-slate-300" : ""}>
                          Select the date of the home inspection
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
                                disabled={isDisabled}
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
                    disabled={isDisabled}
                  />
                </div>
                <div className={formFieldClassName}>
                  <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className={isDisabled ? "text-slate-300" : ""}>
                            Inspection price
                          </FormLabel>
                          <FormDescription className={isDisabled ? "text-slate-300" : ""}>
                            A rough estimate of the cost of the home inspection
                          </FormDescription>
                          <FormControl>
                            <Input
                              type="number" {...field }
                              disabled={isDisabled}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }
                      
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-6">
                <div className="pl-2 flex justify-start space-x-2">
                  <Checkbox id="track" onClick={() => {
                    setDisabled(!isDisabled)
                  }} />
                    <label
                      htmlFor="track"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {"I won't need HomeTrek to track this"}
                    </label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="submit"
                    className="w-[116px] self-end"
                  >
                    Next
                  </Button>
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-[116px] self-end"
                    disabled={isDisabled}
                  >
                    Skip, for now
                  </Button>
                  </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    )
}

export default AddExistingInspector;