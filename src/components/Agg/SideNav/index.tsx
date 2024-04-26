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
  NotebookPen,
  BadgeCheck
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { aggRouteName, aggRoutes, universalRouteName, universalRoutes } from "@/constants/routes";
import { useAppContext } from "@/context";


const SideNav = () => {
  const {
    aggContext: {
      route,
      lenders,
      inspections,
      appraisals,
      insurance,
      title,
      closingDay
    }
  } = useAppContext()
  
  const selectedClass = "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
  const mutedClass = "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
  
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href={universalRoutes[universalRouteName.HOME].route}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <DoorOpen className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">HomeTrek</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={aggRoutes[aggRouteName.DASHBOARD].route}
                className={route === aggRouteName.DASHBOARD ? selectedClass : mutedClass}
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
                href={aggRoutes[aggRouteName.LENDERS].route}
                className={route === aggRouteName.LENDERS ? selectedClass : mutedClass}
              >
                {(!!lenders && !!lenders.hasLender) ? (
                  <BadgeCheck className="h-5 w-5" color="#3e9392"/>
                ) : (
                  <HandCoins className="h-5 w-5"/>
                )
                }
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
                href={aggRoutes[aggRouteName.INSPECTIONS].route}
                className={route === aggRouteName.INSPECTIONS ? selectedClass : mutedClass}
              >
                {(!!inspections && !!inspections.hasInspector && !!inspections.hasInspected) ? (
                  <BadgeCheck className="h-5 w-5" color="#3e9392"/>
                ) : (
                  <UserRoundSearch className="h-5 w-5"/>
                )
                }
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
                href={aggRoutes[aggRouteName.APPRAISALS].route}
                className={route === aggRouteName.APPRAISALS ? selectedClass : mutedClass}
              >
                {(!!appraisals && !!appraisals.hasAppraiser && !appraisals.hasAppraised) ? (
                  <BadgeCheck className="h-5 w-5" color="#3e9392"/>
                ) : (
                  <NotebookPen className="h-5 w-5"/>
                )
                }
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
                href={aggRoutes[aggRouteName.INSURANCE].route}
                className={route === aggRouteName.INSURANCE ? selectedClass : mutedClass}
              >
                {(!!insurance && !!insurance.hasInsurance) ? (
                  <BadgeCheck className="h-5 w-5" color="#3e9392"/>
                ) : (
                  <Shield className="h-5 w-5"/>
                )
                }
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
                href={aggRoutes[aggRouteName.TITLE].route}
                className={route === aggRouteName.TITLE ? selectedClass : mutedClass}
              >
                {(!!title && !!title.hasTitle && !!title.hasTitleInsurance) ? (
                  <BadgeCheck className="h-5 w-5" color="#3e9392"/>
                ) : (
                  <ScrollText className="h-5 w-5"/>
                )
                }
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
                href={aggRoutes[aggRouteName.CLOSINGDAY].route}
                className={route === "closing-day" ? selectedClass : mutedClass}
              >
                {(!!closingDay && !!closingDay.hasClosed) ? (
                  <BadgeCheck className="h-5 w-5" color="#3e9392"/>
                ) : (
                  <Handshake className="h-5 w-5"/>
                )
                }
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
                href={aggRoutes[aggRouteName.SETTINGS].route}
                className={route === aggRouteName.SETTINGS.toLowerCase() ? selectedClass : mutedClass}
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