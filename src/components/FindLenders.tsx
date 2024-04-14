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
import { Label } from "@/components/ui/label"
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
    downPayment: z.number({ 
      required_error: "Down payment is required",
      invalid_type_error: "Down payment must be a number",
     }),
    name: z.string({ 
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
     }),
    state: z.string({ 
      required_error: "State is required",
      invalid_type_error: "State must be a string",
     }),
  })
   

const FindLenders = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          downPayment: 0,
          name: "",
          state: "",
        },
    });
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
      // add it to the context so we can pass it to the next page
      // go to the next place
      console.log("DATA: ", JSON.stringify(data))
      router.push('/get-started/lenders')
    }

    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Find Lenders</CardTitle>
          <CardDescription>Enter some information to see who we can best match you with</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/5 space-y-6">
              <FormField
                control={form.control}
                name="downPayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your email address</FormLabel>
                    <FormControl>
                      <Input placeholder="juan@example.org" {...field} />
                    </FormControl>
                    <FormDescription>
                      A rough estimate of how much you can put down
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Areces" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="NY" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map(state => <SelectItem key={state} value={state}>{state}</SelectItem> )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Where you plan to buy and live
                    </FormDescription>
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
