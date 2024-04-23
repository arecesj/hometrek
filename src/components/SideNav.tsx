'use client';

import { FC } from "react";
import Link from "next/link"
import {
  Home,
  UserRoundSearch,
  DoorOpen,
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
import { routeNames } from "@/constants/routes";


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
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <DoorOpen className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">HomeTrek</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/trek/dashboard"
                className={routeName === routeNames.DASHBOARD ? selectedClass : mutedClass}
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
                href="/trek/lenders"
                className={routeName === routeNames.LENDERS ? selectedClass : mutedClass}
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
                href="/trek/inspections"
                className={routeName === routeNames.INSPECTIONS ? selectedClass : mutedClass}
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
                href="/trek/appraisals"
                className={routeName === routeNames.APPRAISALS ? selectedClass : mutedClass}
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
                href="/trek/insurance"
                className={routeName === routeNames.INSURANCE ? selectedClass : mutedClass}
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
                href="/trek/title"
                className={routeName === routeNames.TITLE ? selectedClass : mutedClass}
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
                href="/trek/closing-day"
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
                href="/trek/settings"
                className={routeName === routeNames.SETTINGS.toLowerCase() ? selectedClass : mutedClass}
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