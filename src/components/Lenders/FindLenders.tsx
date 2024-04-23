'use client';

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
    return (
      <div className="flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Find Lenders</CardTitle>
            <CardDescription>Enter some information to see who we can best match you with</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-5/5 space-y-6">
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
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      )
}

export default FindLenders;
