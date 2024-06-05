'use client'

import { useEffect, useState } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
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
import { manageRouteName, manageRoutes, universalRouteName, universalRoutes } from "@/constants/routes"
import { LoaderCircle } from "lucide-react"
import { isUserAuthenticated } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/NewLandingPage/Header"

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required").min(7, "Password must have at least 7 characters")
})

const Login = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoggingIn, setLoggingIn] = useState<boolean>(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { email, password } = data
    setLoggingIn(true)

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if(response?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.status === 401 ?
          "Looks like either the email or password were incorrect. Please try again." : 
          "There was a problem logging into your account. Please try again.",
      })
      setLoggingIn(false)
    } else {
      toast({
        title: "Successfully logged into your account.",
        description: "Redirecting you to the dashboard.",
      })
      
      setLoggingIn(false)
      router.push(manageRoutes[manageRouteName.DASHBOARD].route)
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
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-20 md:pb-60">
            <Card className="mx-auto max-w-xl" data-aos="zoom-y-out" data-aos-delay="150">
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                      <h1 className="text-3xl font-bold">Log in</h1>
                      <p className="text-balance text-muted-foreground">
                        Enter your email below to log in to your account
                      </p>
                    </div>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
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
                          <Button type="submit" className="w-full" disabled={isLoggingIn}>
                            {isLoggingIn && (
                              <LoaderCircle
                                className="mr-3 h-5 w-5 animate-spin"
                              />
                            )}  
                            Log in
                          </Button>
                        </div>
                      </form>
                    </Form>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={isLoggingIn}
                      onClick={() => signIn('google')}
                    >
                      Log in with Google
                    </Button>
                    <div className="mt-4 text-center text-sm">
                      {"Don't have an account? "}
                      <Link href={universalRoutes[universalRouteName.SIGNUP].route} className="underline">
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login