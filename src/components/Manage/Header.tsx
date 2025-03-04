'use client';

import { FC } from "react"
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import {
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { manageRouteName, manageRoutes, universalRouteName, universalRoutes } from "@/constants/routes";
import { isUserAuthenticated } from "@/lib/utils";

type HeaderProps = {
  routeName: manageRouteName;
}

const Header: FC<HeaderProps> = ({ routeName }) => {
  const { data: session, status } = useSession()
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={manageRoutes[manageRouteName.DASHBOARD].route}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {routeName !== manageRouteName.DASHBOARD && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={manageRoutes[routeName].route}>{routeName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        /> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <User />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>HomeTrek</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={manageRoutes[manageRouteName.SETTINGS].route}>
              Settings
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          { isUserAuthenticated(status) ? (
            <DropdownMenuItem
              onClick={() => {
                signOut({
                  redirect: true,
                  callbackUrl: "/"
                })
              }}
            >
              Logout
            </DropdownMenuItem>  
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => {
                router.push(universalRoutes[universalRouteName.LOGIN].route)
                }}
              >
                Login
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                router.push(universalRoutes[universalRouteName.SIGNUP].route)
                }}
              >
                Signup
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header;