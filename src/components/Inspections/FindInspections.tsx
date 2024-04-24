'use client'

import { FC } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { FindInspectionsProps } from "."

const FindInspections: FC<FindInspectionsProps> = ({ form, onSubmit}) => {
  return (
    <div className="flex justify-center">
      <Card className="w-[450px]">
        <CardHeader className="px-7 bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {`Let's find a home inspector`}
            </CardTitle>
          </div>
          <CardDescription>
            The right home inspector is crucial to your HomeTrek success
          </CardDescription>
        </CardHeader>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-5/5 space-y-6">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormDescription>
                      Enter the zip code of the home you want to inspect
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">{`Let's Inspect!`}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FindInspections