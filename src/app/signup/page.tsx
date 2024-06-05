'use client'

import { useEffect, useState } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
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
import { manageRouteName, manageRoutes, universalRouteName, universalRoutes } from "@/constants/routes";
import { createUser } from "@/client/user";
import { LoaderCircle } from "lucide-react";
import { isUserAuthenticated } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { useAppContext } from "@/context"
import { generateNewUserTasks } from "@/constants/newUserTasks"
import Header from "@/components/NewLandingPage/Header"

const FormSchema = z.object({
  name: z.string().min(3, "Name is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required").min(7, "Password must have at least 7 characters")
})

const Signup = () => {
  const { data, data: session, status } = useSession()
  const { homeClosingContext } = useAppContext()
  const router = useRouter()
  const [isCreating, setCreating] = useState<boolean>(false)
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const createSuccessToast = () => {
    return toast({
      title: "Successfully created your account.",
      description: "Redirecting you to the dashboard.",
    })
  }

  const createFailureToast = (m: string) => {
    return toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: m,
    })
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { name, email, password } = data
    setCreating(true)
    
    let homeClosingBody = homeClosingContext;
    if(!homeClosingContext.tasks?.length) {
      const tasks = generateNewUserTasks(homeClosingContext);
      homeClosingBody = {...homeClosingBody, tasks}
    }
    
    const response = await createUser(data, homeClosingBody)
    if (response.ok) {
      createSuccessToast()
      setCreating(false)
      signIn('credentials', { email, password, callbackUrl: manageRoutes[manageRouteName.DASHBOARD].route })
    } else {
      const resp = await response.json();
      createFailureToast(resp.message)
      setCreating(false)
    }
  }

  useEffect(() => {
    if(isUserAuthenticated(status)) router.push(manageRoutes[manageRouteName.DASHBOARD].route)
  }, [status])

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })
  
  return (
    <>
      <Header />
      <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-20 md:pb-60">
            <Card className="mx-auto max-w-xl" data-aos="zoom-y-out" data-aos-delay="150">
              <CardContent>
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
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={isCreating}
                        onClick={() => signIn('google')}
                        >
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup