'use client';

import { FC } from "react";
import Link from "next/link"
import Image from 'next/image'
import {
  LayoutGrid,
  UserRoundSearch,
  Settings,
  HandCoins,
  // Handshake,
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
import { manageRouteName, manageRoutes, universalRouteName, universalRoutes } from "@/constants/routes";
import { useAppContext } from "@/context";


const SideNav = () => {
  const {
    routeContext,
    homeClosingContext: {
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
                href={manageRoutes[manageRouteName.DASHBOARD].route}
                className={routeContext === manageRouteName.DASHBOARD ? selectedClass : mutedClass}
              >
                <LayoutGrid className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {(!!lenders && !!lenders.hasOwnLender) ? (
                <BadgeCheck className="h-5 w-5" color="#3e9392"/>
              ) : (
                <Link
                  href={manageRoutes[manageRouteName.LENDERS].route}
                  className={routeContext === manageRouteName.LENDERS ? selectedClass : mutedClass}
                >
                  <HandCoins className="h-5 w-5"/>
                  <span className="sr-only">Lenders</span>
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent side="right">Lenders</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {(!!inspections && !!inspections.hasInspector && !!inspections.hasInspected) ? (
                <BadgeCheck className="h-5 w-5" color="#3e9392"/>
              ) : (
                <Link
                  href={manageRoutes[manageRouteName.INSPECTIONS].route}
                  className={routeContext === manageRouteName.INSPECTIONS ? selectedClass : mutedClass}
                >
                  <UserRoundSearch className="h-5 w-5"/>
                  <span className="sr-only">Inspections</span>
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent side="right">Inspections</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {(!!appraisals && !!appraisals.hasAppraiser && !!appraisals.hasAppraised) ? (
                <BadgeCheck className="h-5 w-5" color="#3e9392"/>
              ) : (
                <Link
                  href={manageRoutes[manageRouteName.APPRAISALS].route}
                  className={routeContext === manageRouteName.APPRAISALS ? selectedClass : mutedClass}
                >
                  <NotebookPen className="h-5 w-5"/>
                  <span className="sr-only">Appraisals</span>
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent side="right">Appraisals</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {(!!insurance && !!insurance.hasInsurance) ? (
                <BadgeCheck className="h-5 w-5" color="#3e9392"/>
              ) : (
                <Link
                  href={manageRoutes[manageRouteName.INSURANCE].route}
                  className={routeContext === manageRouteName.INSURANCE ? selectedClass : mutedClass}
                >
                  <Shield className="h-5 w-5"/>
                  <span className="sr-only">Insurance</span>
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent side="right">Insurance</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {(!!title && !!title.hasTitleAgent && !!title.hasTitleTransfer) ? (
                <BadgeCheck className="h-5 w-5" color="#3e9392"/>
              ) : (
                <Link
                  href={manageRoutes[manageRouteName.TITLE].route}
                  className={routeContext === manageRouteName.TITLE ? selectedClass : mutedClass}
                >
                  <ScrollText className="h-5 w-5"/>
                  <span className="sr-only">Title</span>
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent side="right">Title</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {(!!closingDay && !!closingDay.hasClosed) ? (
                <BadgeCheck className="h-5 w-5" color="#3e9392"/>
              ) : (
                <Link
                  href={manageRoutes[manageRouteName.CLOSINGDAY].route}
                  className={routeContext === "closing-day" ? selectedClass : mutedClass}
                >
                  <Handshake className="h-5 w-5"/>
                  <span className="sr-only">Closing Day</span>
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent side="right">Closing Day</TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={manageRoutes[manageRouteName.SETTINGS].route}
                className={routeContext === manageRouteName.SETTINGS.toLowerCase() ? selectedClass : mutedClass}
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