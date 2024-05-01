'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { aggRouteName, aggRoutes, universalRouteName, universalRoutes } from "@/constants/routes";
import { createUser } from "@/client/user";
import { LoaderCircle } from "lucide-react";
import { isUserAuthenticated } from "@/utils/helpers"

const FormSchema = z.object({
  name: z.string().min(3, "Name is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required").min(7, "Password must have at least 7 characters")
})

const Signup = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isCreating, setCreating] = useState<boolean>(false)
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { name, email, password } = data
    setCreating(true)
    
    const response = await createUser(name, email, password)
    if (response.ok) {
      toast({
        title: "Successfully created your account.",
        description: "Redirecting you to the dashboard.",
      })
      
      setCreating(false)
      router.push(aggRoutes[aggRouteName.DASHBOARD].route)
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem creating your account. Please try again later.",
      })
      setCreating(false)
    }
  }

  useEffect(() => {
    if(isUserAuthenticated(status)) router.push(aggRoutes[aggRouteName.DASHBOARD].route)
  }, [status])
  
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-balance text-muted-foreground">
            Enter your information to create an account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Juan Areces" {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="juan@hometrek.ai" {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isCreating}>    
                {isCreating && (
                  <LoaderCircle
                    className="mr-3 h-5 w-5 animate-spin"
                  />
                )}              
                  Create an account
                </Button>
              </div>
            </form>
          </Form>
          <Button variant="outline" className="w-full" disabled={isCreating}>
            Sign up with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            {"Already have an account? "}
            <Link href={universalRoutes[universalRouteName.LOGIN].route} className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup