'use client';

import { FC } from "react"
import { useRouter } from "next/navigation";
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
import { trekRouteName, trekRoutes, universalRouteName, universalRoutes } from "@/constants/routes";

type HeaderProps = {
  routeName: trekRouteName;
}

const Header: FC<HeaderProps> = ({ routeName }) => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/trek/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={trekRoutes[routeName].route}>{routeName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
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
            <Link href={trekRoutes[trekRouteName.SETTINGS].route}>
              Settings
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
          <DropdownMenuSeparator />
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
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header;