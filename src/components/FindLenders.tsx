'use client';
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { states } from "@/constants/states";


const FormSchema = z.object({
    downPayment: z.string().refine((val) => {
      const int = parseInt(val, 10)
      return !Number.isNaN(int) || val.length >= 10000
    }, {
      message: "Down payment is required and needs to be at least $10,000"
    }),
    name: z.string().min(5, { 
      message: "Name is required",
     }),
    state: z.string().min(2, { 
      message: "State is required",
     }),
  })
   

const FindLenders = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          name: "",
          state: "",
          downPayment: "",
        },
    });
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
      const { name, state, downPayment } = data;
      router.push(`/trek/lenders?name=${name}&state=${state}&downPayment=${downPayment}`)
    }

    return (
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
                name="downPayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Down payment</FormLabel>
                    <FormDescription>
                      A rough estimate of how much you can put down
                    </FormDescription>
                    <FormControl>
                      <Input type="number" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          
        </CardFooter>
      </Card>
      )
}

export default FindLenders;
