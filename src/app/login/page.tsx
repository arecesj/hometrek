'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
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
import { aggRouteName, aggRoutes, universalRouteName, universalRoutes } from "@/constants/routes"
import { LoaderCircle } from "lucide-react"
import { isUserAuthenticated } from "@/utils/helpers"
import bedroom from "@/images/bedroom.jpg"

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
        description: "There was a problem logging into your account. Please try again.",
      })
      setLoggingIn(false)
    } else {
      toast({
        title: "Successfully logged into your account.",
        description: "Redirecting you to the dashboard.",
      })
      
      setLoggingIn(false)
      router.push(aggRoutes[aggRouteName.DASHBOARD].route)
    }
  }

  useEffect(() => {
    if(isUserAuthenticated(status)) router.push(aggRoutes[aggRouteName.DASHBOARD].route)
  }, [status])
  
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="b relative h-[800px] w-full overflow-hidden">
        <Image fill src={bedroom} alt="img" className="w-full object-cover" />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
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
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex justify-center"> or </div>
          <Button
            variant="outline"
            className="w-full"
            disabled={isLoggingIn}
            onClick={() => signIn('google')}
          >
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            {"Don't have an account? "}
            <Link href={universalRoutes[universalRouteName.SIGNUP].route} className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login