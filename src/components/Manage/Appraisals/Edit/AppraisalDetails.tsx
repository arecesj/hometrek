'use client'

import { Dispatch, FC, SetStateAction } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { UseFormReturn } from "react-hook-form"

type AppraisalDetailsProps = {
  appraisalDetails: AppraisalDetails;
  isUpdateAppraisalDisabled: boolean;
  setUpdateAppraisalDisabled: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: { name?: string; cost?: string; date?: Date; }) => Promise<void>;
  form: UseFormReturn<{
    name?: string;
    cost?: string;
    date?: Date;
  }, any, undefined>;
}

const AppraisalDetails: FC<AppraisalDetailsProps> = (props) => {
  const { appraisalDetails, isUpdateAppraisalDisabled, setUpdateAppraisalDisabled, onSubmit, form } = props
  const formFieldClassName = "w-[95%]"

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="bg-muted/50">
                <CardTitle className="group grid grid-cols-2 items-center gap-2 text-lg">
                  Enter your home appraisal information
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="submit"
                      className="w-[116px] self-end"
                      disabled={isUpdateAppraisalDisabled}
                    >
                      Update Details
                    </Button>
                  </div>
                </CardTitle>
              <CardDescription>Update your appraisal details here</CardDescription>
            </CardHeader>
            <CardContent className="p-4 w-full grid grid-cols-2 gap-6">
              <div className={formFieldClassName}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>
                          Home Appraisal Company
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            defaultValue={appraisalDetails?.name}
                            onChange={e => {
                              setUpdateAppraisalDisabled(false)
                              field.onChange(e.target.value)
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          The company working with you
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
              <div className={formFieldClassName}>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Date of appraisal
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              defaultValue={`${appraisalDetails?.date}`}
                              className={cn(
                                "w-[100%] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                appraisalDetails?.date && format(appraisalDetails?.date, "PPP")
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(e) => {
                              setUpdateAppraisalDisabled(false)
                              field.onChange(e)
                            }}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select the date of the home appraisal
                      </FormDescription>
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
                        <FormLabel>
                          Total cost
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field }
                            defaultValue={appraisalDetails?.cost}
                            onChange={e => {
                              setUpdateAppraisalDisabled(false)
                              field.onChange(e.target.value)
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          A rough estimate of the cost of the home appraisal
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }
                    
                  }
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default AppraisalDetails;