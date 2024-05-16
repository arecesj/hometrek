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

type ClosingDayDetailsProps = {
  isUpdateClosingDayDisabled: boolean;
  setUpdateClosingDayDisabled: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: { date?: Date; }) => Promise<void>;
  form: UseFormReturn<{
    date?: Date;
  }, any, undefined>;
}

const ClosingDayDetails: FC<ClosingDayDetailsProps> = (props) => {
  const { isUpdateClosingDayDisabled, setUpdateClosingDayDisabled, onSubmit, form } = props
  const formFieldClassName = "w-[95%]"

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="bg-muted/50">
                <CardTitle className="group grid grid-cols-2 items-center gap-2 text-lg">
                  Enter your home closing day information
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="submit"
                      className="w-[116px] self-end"
                      disabled={isUpdateClosingDayDisabled}
                    >
                      Update Details
                    </Button>
                  </div>
                </CardTitle>
              <CardDescription>Update your closing day details here</CardDescription>
            </CardHeader>
            <CardContent className="p-4 w-full grid grid-cols-2 gap-6">
              <div className={formFieldClassName}>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Date of close
                      </FormLabel>
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
                              {field.value && (
                                format(field.value, "PPP")
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
                              setUpdateClosingDayDisabled(false)
                              field.onChange(e)
                            }}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select the date of the home closing
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default ClosingDayDetails;