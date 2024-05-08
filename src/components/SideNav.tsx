'use client';

import { FC } from "react";
import Link from "next/link"
import Image from 'next/image'
import {
  Home,
  UserRoundSearch,
  Settings,
  HandCoins,
  Handshake,
  ScrollText,
  Shield,
  NotebookPen
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { trekRouteName, trekRoutes, universalRouteName, universalRoutes } from "@/constants/routes";


type SideNavProps = {
  routeName: string;
}
const SideNav: FC<SideNavProps> = ({ routeName }) => {
  const selectedClass = "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
  const mutedClass = "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
  
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href={universalRoutes[universalRouteName.HOME].route}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full md:h-8 md:w-8 md:text-base"
        >
          <Image
            priority
            src="/icon.png"
            height={230}
            width={230}
            alt="HomeTrek"
            className="h-full w-full transition-all group-hover:scale-110 rounded-full"
          />
          <span className="sr-only">HomeTrek</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={trekRoutes[trekRouteName.DASHBOARD].route}
                className={routeName === trekRouteName.DASHBOARD ? selectedClass : mutedClass}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={trekRoutes[trekRouteName.LENDERS].route}
                className={routeName === trekRouteName.LENDERS ? selectedClass : mutedClass}
              >
                <HandCoins className="h-5 w-5"/>
                <span className="sr-only">Lenders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Lenders</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={trekRoutes[trekRouteName.INSPECTIONS].route}
                className={routeName === trekRouteName.INSPECTIONS ? selectedClass : mutedClass}
              >
                <UserRoundSearch className="h-5 w-5"/>
                <span className="sr-only">Inspections</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Inspections</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={trekRoutes[trekRouteName.APPRAISALS].route}
                className={routeName === trekRouteName.APPRAISALS ? selectedClass : mutedClass}
              >
                <NotebookPen className="h-5 w-5"/>
                <span className="sr-only">Appraisals</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Appraisals</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={trekRoutes[trekRouteName.INSURANCE].route}
                className={routeName === trekRouteName.INSURANCE ? selectedClass : mutedClass}
              >
                <Shield className="h-5 w-5"/>
                <span className="sr-only">Insurance</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Insurance</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={trekRoutes[trekRouteName.TITLE].route}
                className={routeName === trekRouteName.TITLE ? selectedClass : mutedClass}
              >
                <ScrollText className="h-5 w-5"/>
                <span className="sr-only">Title</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Title</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={trekRoutes[trekRouteName.CLOSINGDAY].route}
                className={routeName === "closing-day" ? selectedClass : mutedClass}
              >
                <Handshake className="h-5 w-5"/>
                <span className="sr-only">Closing Day</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Closing Day</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={trekRoutes[trekRouteName.SETTINGS].route}
                className={routeName === trekRouteName.SETTINGS.toLowerCase() ? selectedClass : mutedClass}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>)
}

export default SideNav;