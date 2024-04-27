'use client'

import { FC } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { states } from '@/constants/states';   
import { FindLendersProps } from ".";

const FindLenders: FC<FindLendersProps> = ({ form, onSubmit }) => {
    const formFieldClassName = "w-full"
    return (
      <div className="flex justify-center">
        <Card className="w-[850px]">
          <CardHeader className="px-7 bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Find Lenders
              </CardTitle>
            </div>
            <CardDescription>Enter some information to see who we can best match you with</CardDescription>
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
                        <FormLabel>Name</FormLabel>
                        <FormDescription>
                          Your full name
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
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormDescription>
                          Where you plan to buy and live
                        </FormDescription>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map(state => <SelectItem key={state} value={state}>{state}</SelectItem> )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={formFieldClassName}>
                  <FormField
                    control={form.control}
                    name="potentialHomePrice"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Home price</FormLabel>
                          <FormDescription>
                            A rough estimate of the cost of your future home
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
                <div className={formFieldClassName}>
                  <FormField
                    control={form.control}
                    name="potentialDownPayment"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Down payment</FormLabel>
                          <FormDescription>
                            A rough estimate of how much you can put down
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
                <div></div>
                <div className="flex justify-end">
                  <Button type="submit" className="w-[116px]">Submit</Button>
                </div>
                
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
}

export default FindLenders;
